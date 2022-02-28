<template>
  <div>
    <span>
      Year:
      <select id="year" name="year" v-model="yearFilter">
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
    </span>
    <span>
      Month:
      <select id="month" name="month" v-model="monthFilter">
        <option value="JAN">January</option>
        <option value="FEB">February</option>
        <option value="MAR">March</option>
        <option value="APR">April</option>
        <option value="MAY">May</option>
        <option value="JUN">June</option>
        <option value="JUL">July</option>
        <option value="AUG">August</option>
        <option value="SEP">September</option>
        <option value="OCT">October</option>
        <option value="NOV">November</option>
        <option value="DEC">December</option>
      </select>
    </span>
    <h3>Activity</h3>
    <div v-for="month in filterBy(monthlyData, dateID, 'date_identifier')" v-bind:key="month.date_identifier">
      <p>
        <strong>Total Expenses:</strong>
        {{ month.expenses }}
      </p>
      <p>
        <strong>Total Incomes:</strong>
        {{ month.incomes }}
      </p>
      <p>
        <strong>Net Change:</strong>
        {{ (month.incomes - month.expenses).toFixed(2) }}
      </p>
      <hr />
      <h3>Cash Available</h3>
      <p>
        <strong>Net Cash Beginning:</strong>
        {{ month.beginning_net_cash }}
      </p>
      <div v-if="currentDate">
        <p>
          <strong>Net Cash Current:</strong>
          {{ currentBalance.net_cash }}
        </p>
        <p>
          <strong>Difference:</strong>
          {{ (currentBalance.net_cash - month.beginning_net_cash).toFixed(2) }}
        </p>
        <p>
          <strong>Transactions Missing:</strong>
          {{ (currentBalance.net_cash - month.beginning_net_cash - (month.incomes - month.expenses)).toFixed(2) }}
        </p>
      </div>
      <div v-else>
        <p>
          <strong>Net Cash Ending:</strong>
          {{ month.ending_net_cash }}
        </p>
        <p>
          <strong>Difference:</strong>
          {{ (month.ending_net_cash - month.beginning_net_cash).toFixed(2) }}
        </p>
        <p>
          <strong>Transactions Missing:</strong>
          {{ (month.ending_net_cash - month.beginning_net_cash - (month.incomes - month.expenses)).toFixed(2) }}
        </p>
      </div>
    </div>
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
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      expenses: [],
      incomes: [],
      monthlyData: [],
      currentBalance: {},
      currentBalanceParams: {},
      errors: [],
      dateID: "",
      currentDate: true,
      yearFilter: new Date().getFullYear(),
      monthFilter: new Date().toLocaleString("default", { month: "short" }).toUpperCase(),
    };
  },
  created: function () {
    axios.get("/expenses").then((response) => {
      console.log("All Expenses", response.data);
      this.expenses = response.data;
    });
    axios.get("/incomes").then((response) => {
      console.log("All Incomes", response.data);
      this.incomes = response.data;
    });
    axios.get("/calcs/monthly_data").then((response) => {
      console.log("Monthly Data", response.data);
      this.monthlyData = response.data;
    });
    axios.get("/current_balances").then((response) => {
      console.log("Current Balance", response.data);
      this.currentBalance = response.data;
    });
  },
  watch: {
    yearFilter: {
      handler: "updateDate",
      immediate: true,
    },
    monthFilter: "updateDate",
  },
  methods: {
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
    updateDate: function () {
      this.dateID = `${this.monthFilter}.${this.yearFilter}`;
      if (
        this.monthFilter != new Date().toLocaleString("default", { month: "short" }).toUpperCase() ||
        this.yearFilter != new Date().getFullYear()
      ) {
        this.currentDate = false;
      } else {
        this.currentDate = true;
      }
    },
  },
};
</script>
