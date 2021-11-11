<template>
  <div class="expenses-create">
    <form v-on:submit.prevent="expenseCreate()">
      <h1>Create Expense</h1>
      <datalist id="recurring">
        <option v-for="expense in recurringExpenses" v-bind:key="expense.id">
          {{ expense.description }}
        </option>
      </datalist>
      <input type="text" list="recurrring" v-model="recurringSelected" />
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Date:</label>
        <input type="date" v-model="newExpenseParams.date" />
      </div>
      <div>
        <label>Amount:</label>
        <input type="text" v-model="newExpenseParams.amount" />
      </div>
      <div>
        <label>Category:</label>
        <input type="text" v-model="newExpenseParams.category" />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" v-model="newExpenseParams.description" />
      </div>
      <input type="submit" value="Submit" />
    </form>
    {{ recurringExpenses }}
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newExpenseParams: {},
      errors: [],
      recurringExpenses: [],
      recurringSelected: "",
    };
  },
  created: function () {
    axios.get("/recurring_expenses").then((response) => {
      console.log("Recurring Expenses", response.data);
      this.recurringExpenses = response.data;
    });
  },
  methods: {
    expenseCreate: function () {
      axios
        .post("/expenses", this.newExpenseParams)
        .then((response) => {
          console.log(response.data);
          this.newExpenseParams = {};
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    clearNewExpenseParams: function () {
      this.newExpenseParams = {};
    },
  },
};
</script>
