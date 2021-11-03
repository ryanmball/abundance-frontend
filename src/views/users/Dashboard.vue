<template>
  <div>
    Year:
    <select id="year" name="year" v-model="yearFilter">
      <option></option>
      <option value="2021">2021</option>
      <option value="2022">2022</option>
      <option value="2023">2023</option>
      <option value="2024">2024</option>
      <option value="2025">2025</option>
      <option value="2026">2026</option>
      <option value="2027">2027</option>
      <option value="2028">2028</option>
      <option value="2029">2029</option>
      <option value="2030">2030</option>
    </select>
    Month:
    <select id="month" name="month" v-model="monthFilter">
      <option></option>
      <option value="01">January</option>
      <option value="02">February</option>
      <option value="03">March</option>
      <option value="04">April</option>
      <option value="05">May</option>
      <option value="06">June</option>
      <option value="07">July</option>
      <option value="08">August</option>
      <option value="09">September</option>
      <option value="10">October</option>
      <option value="11">November</option>
      <option value="12">December</option>
    </select>
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
      <!-- Equal to the net cash available at the start of the current month -->
      {{
        monthlyNetCash
          .filter((balance) => balance.year == yearFilter)
          .filter((currentYearBalance) => currentYearBalance.month == monthFilter)[0].net_cash
      }}
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
      <!-- {{ cashDifference(currentBalance.net_cash, monthlyNetCash[monthlyNetCash.length - 1][1]) }} -->
    </p>
    <p>
      <strong>Transactions Missing:</strong>
      <!-- {{
        transactionsMissing(
          cashDifference(currentBalance.net_cash, monthlyNetCash[monthlyNetCash.length - 1][1]),
          netChange(monthlyIncomes.total, monthlyExpenses.total)
        )
      }} -->
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
      monthlyNetCash: [{ net_cash: 0 }],
      currentBalance: {},
      currentBalanceParams: {},
      errors: [],
      yearFilter: new Date().getFullYear(),
      monthFilter: new Date().getMonth() + 1,
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
      this.monthlyNetCash = response.data;
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
