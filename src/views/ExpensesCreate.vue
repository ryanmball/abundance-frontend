<template>
  <div class="expenses-create">
    <form v-on:submit.prevent="expenseCreate()">
      <h1>Create Expense</h1>
      <label>Recurring Expense:</label>
      <input type="checkbox" value="true" v-model="isRecurring" @change="clearRecurring" />
      <br />
      <span v-if="isRecurring">
        <select id="recurring" name="recurring" v-model="nameSelected" @change="setRecurring()">
          <optgroup v-for="category in recurringCategories" v-bind:key="category" :label="category">
            <option v-for="name in recurringNames[category]" :key="name" :value="name">
              {{ name }}
            </option>
          </optgroup>
        </select>
      </span>
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
      <div>
        <label>Expense Group:</label>
        <select id="group" name="group" v-model="newExpenseParams.expense_group_id">
          <option v-for="group in expenseGroups" :key="group.id" :value="group.id">
            {{ group.name }}
          </option>
        </select>
      </div>
      <input type="submit" value="Submit" />
      <button type="button" @click="clearParams()">Clear</button>
    </form>
    <form v-on:submit.prevent="expenseGroupCreate()">
      <h1>Create Expense Group</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Name:</label>
        <input type="text" v-model="newExpenseGroupParams.name" />
      </div>
      <div>
        <label>Start Date:</label>
        <input type="date" v-model="newExpenseGroupParams.start_date" />
      </div>
      <div>
        <label>End Date:</label>
        <input type="date" v-model="newExpenseGroupParams.end_date" />
      </div>
      <input type="submit" value="Submit" />
      <button type="button" @click="clearParams()">Clear</button>
    </form>
    <div v-for="group in expenseGroups" :key="group.id">
      <h4>{{ group.name }} - {{ group.total }}</h4>
      <span v-for="expense in group.expenses" :key="expense.id">
        <strong>Date:</strong>
        {{ expense.date }}&nbsp;
        <strong>Category:</strong>
        {{ expense.category }}&nbsp;
        <strong>Description:</strong>
        {{ expense.description }}&nbsp;
        <strong>Amount:</strong>
        {{ expense.amount }}
        <br />
      </span>
    </div>
    <!-- <div>
      <h3>Recurring Expenses</h3>
      <ul>
        <li v-for="expense in recurringExpenses" :key="expense.id">
          <strong>Name:</strong>
          {{ expense.name }}&nbsp;&nbsp;&nbsp;
          <strong>Estimate:</strong>
          {{ expense.estimate }}
        </li>
      </ul>
    </div> -->
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
      recurringCategories: [],
      recurringTotals: [],
      recurringNames: [],
      nameSelected: "",
      recurringSelected: {},
      isRecurring: false,
      expenseGroups: [],
      newExpenseGroupParams: {},
    };
  },
  created: function () {
    axios.get("/recurring_expenses").then((response) => {
      console.log("Recurring Expenses", response.data);
      this.recurringExpenses = response.data;
    });
    axios.get("/recurring_expenses_totals").then((response) => {
      console.log("Recurring Totals", response.data);
      this.recurringTotals = response.data;
    });
    axios.get("/recurring_expenses_names").then((response) => {
      console.log("Recurring Names", response.data);
      this.recurringNames = response.data;
      this.recurringCategories = Object.keys(response.data).sort();
    });
    axios.get("/expense_groups").then((response) => {
      console.log("Expense Groups", response.data);
      this.expenseGroups = response.data;
    });
  },
  methods: {
    expenseCreate: function () {
      this.newExpenseParams.recurring = this.isRecurring;
      axios
        .post("/expenses", this.newExpenseParams)
        .then((response) => {
          console.log(response.data);
          this.newExpenseParams = {};
          this.isRecurring = false;
          this.nameSelected = "";
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    expenseGroupCreate: function () {
      axios
        .post("/expense_groups", this.newExpenseGroupParams)
        .then((response) => {
          console.log(response.data);
          this.newExpenseGroupParams = {};
          this.expenseGroups.push(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    clearParams: function () {
      this.newExpenseParams = {};
      this.newExpenseGroupParams = {};
      this.isRecurring = false;
      this.nameSelected = "";
    },
    clearRecurring: function () {
      this.nameSelected = "";
      this.newExpenseParams = {};
    },
    setRecurring: function () {
      this.recurringSelected = this.recurringExpenses.find((expense) => expense.name === this.nameSelected);
      this.newExpenseParams.category = this.recurringSelected.category;
      this.newExpenseParams.description = this.recurringSelected.description;
    },
  },
};
</script>
