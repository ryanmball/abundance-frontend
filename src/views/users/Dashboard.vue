<template>
  <div>
    <h3>Activity</h3>
    <p>
      <strong>Total Expenses:</strong>
      {{ monthlyExpenses.total }}
    </p>
    <p>
      <strong>Total Incomes:</strong>
      {{ monthlyIncomes.total }}
    </p>
    <p>
      <strong>Net Change:</strong>
      {{ netChange(monthlyIncomes.total, monthlyExpenses.total) }}
    </p>
    <hr />
    <h3>Cash Available</h3>
    <p>
      <strong>Net Cash Beginning:</strong>
      <!-- Equal to the netCash total from the previous month -->
      {{ netCash[netCash.length - 1][1] }}
    </p>
    <form v-on:submit.prevent="currentBalanceCreate()">
      <h3>New Current Balance</h3>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Checking 1:</label>
        <input type="text" v-model="currentBalanceParams.checking1" />
      </div>
      <div>
        <label>Checking 2:</label>
        <input type="text" v-model="currentBalanceParams.checking2" />
      </div>
      <div>
        <label>Savings 1:</label>
        <input type="text" v-model="currentBalanceParams.savings1" />
      </div>
      <div>
        <label>Savings 2:</label>
        <input type="text" v-model="currentBalanceParams.savings2" />
      </div>
      <div>
        <label>Credit Card 1:</label>
        <input type="text" v-model="currentBalanceParams.credit_card1" />
      </div>
      <div>
        <label>Credit Card 2:</label>
        <input type="text" v-model="currentBalanceParams.credit_card2" />
      </div>
      <div>
        <label>Credit Card 3:</label>
        <input type="text" v-model="currentBalanceParams.credit_card3" />
      </div>
      <div>
        <label>Credit Card 4:</label>
        <input type="text" v-model="currentBalanceParams.credit_card4" />
      </div>
      <input type="submit" value="Submit" />
    </form>
    <p>
      <strong>Net Cash Current:</strong>
      {{ currentBalance.net_cash }}
    </p>
    <p>
      <strong>Difference:</strong>
      {{ cashDifference(currentBalance.net_cash, netCash[netCash.length - 1][1]) }}
    </p>
    <p>
      <strong>Transactions Missing:</strong>
      {{
        transactionsMissing(
          cashDifference(currentBalance.net_cash, netCash[netCash.length - 1][1]),
          netChange(monthlyIncomes.total, monthlyExpenses.total)
        )
      }}
    </p>
    <!-- {{ categoryExpenses }}
    <div v-for="category in categoryExpenses.categoryExpenses" v-bind:key="category">
      <p>{{ category }}</p>
    </div> -->
    <h1>Expenses</h1>
    <div v-for="expense in expenses" v-bind:key="`${expense.id}A`">
      <p>{{ expense.date }} {{ expense.category }} {{ expense.amount }}</p>
    </div>
    <h1>Incomes</h1>
    <div v-for="income in incomes" v-bind:key="`${income.id}B`">
      <p>{{ income.date }} {{ income.category }} {{ income.amount }}</p>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      expenses: [],
      incomes: [],
      monthlyExpenses: [],
      categoryExpenses: [],
      monthlyIncomes: [],
      categoryIncomes: [],
      netCash: [[0, 0]],
      currentBalance: {},
      currentBalanceParams: {},
      errors: [],
    };
  },
  created: function () {
    axios.get("/expenses").then((response) => {
      console.log(response.data);
      this.expenses = response.data;
    });
    axios.get("/incomes").then((response) => {
      console.log(response.data);
      this.incomes = response.data;
    });
    axios.get("/monthly_expenses").then((response) => {
      console.log(response.data);
      this.monthlyExpenses = response.data;
    });
    // axios.get("/category_expenses").then((response) => {
    //   console.log(response.data);
    //   this.categoryExpenses = response.data;
    // });
    axios.get("/monthly_incomes").then((response) => {
      console.log(response.data);
      this.monthlyIncomes = response.data;
    });
    // axios.get("/category_incomes").then((response) => {
    //   console.log(response.data);
    //   this.categoryIncomes = response.data;
    // });
    axios.get("/net_cash").then((response) => {
      console.log(response.data);
      this.netCash = response.data;
    });
    axios.get("/current_balances").then((response) => {
      console.log(response.data);
      this.currentBalance = response.data;
    });
  },
  methods: {
    netChange: (income, expense) => {
      return (income - expense).toFixed(2);
    },
    cashDifference: (current, start) => {
      return (current - start).toFixed(2);
    },
    transactionsMissing: (cashDiff, netChange) => {
      return (cashDiff - netChange).toFixed(2);
    },
    currentBalanceCreate: function () {
      axios
        .post("/current_balances", this.currentBalanceParams)
        .then((response) => {
          console.log(response.data);
          this.currentBalanceParams = {};
          this.currentBalance = response.data;
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    clearCurrentBalanceParams: function () {
      this.currentBalanceParams = {};
    },
  },
};
</script>
