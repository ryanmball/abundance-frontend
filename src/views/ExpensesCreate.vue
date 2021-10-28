<template>
  <div class="">
    <form v-on:submit.prevent="expenseCreate()">
      <h1>Create Expense</h1>
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
    };
  },
  created: function () {},
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
