<template>
  <div class="balances-create">
    <form v-on:submit.prevent="monthlyBalanceCreate()">
      <h1>Create New Monthly Balance</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Month:</label>
        <input type="number" v-model="newMonthlyBalanceParams.month" />
      </div>
      <div>
        <label>Year:</label>
        <input type="number" v-model="newMonthlyBalanceParams.year" />
      </div>
      <div>
        <label>Checking 1:</label>
        <input type="text" v-model="newMonthlyBalanceParams.checking1" />
      </div>
      <div>
        <label>Checking 2:</label>
        <input type="text" v-model="newMonthlyBalanceParams.checking2" />
      </div>
      <div>
        <label>Savings 1:</label>
        <input type="text" v-model="newMonthlyBalanceParams.savings1" />
      </div>
      <div>
        <label>Savings 2:</label>
        <input type="text" v-model="newMonthlyBalanceParams.savings2" />
      </div>
      <div>
        <label>Credit Card 1:</label>
        <input type="text" v-model="newMonthlyBalanceParams.credit_card1" />
      </div>
      <div>
        <label>Credit Card 2:</label>
        <input type="text" v-model="newMonthlyBalanceParams.credit_card2" />
      </div>
      <div>
        <label>Credit Card 3:</label>
        <input type="text" v-model="newMonthlyBalanceParams.credit_card3" />
      </div>
      <div>
        <label>Credit Card 4:</label>
        <input type="text" v-model="newMonthlyBalanceParams.credit_card4" />
      </div>
      <div>
        <label>Loan 1:</label>
        <input type="text" v-model="newMonthlyBalanceParams.loan1" />
      </div>
      <div>
        <label>Loan 2:</label>
        <input type="text" v-model="newMonthlyBalanceParams.loan2" />
      </div>
      <div>
        <label>Personal IRA:</label>
        <input type="text" v-model="newMonthlyBalanceParams.personal_IRA" />
      </div>
      <input type="submit" value="Submit" />
    </form>
    <br />
    <br />
    <br />
    <form v-on:submit.prevent="balanceCreate()">
      <h1>Create New Balance</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Month:</label>
        <input type="number" v-model="newBalanceParams.month" />
      </div>
      <div>
        <label>Year:</label>
        <input type="number" v-model="newBalanceParams.year" />
      </div>
      <div>
        <label>Amount:</label>
        <input type="text" v-model="newBalanceParams.amount" />
      </div>
      <div>
        <label>Account:</label>
        <!-- ADD ACCOUNT_ID SELECT DROPDOWN HERE -->
      </div>
      <input type="submit" value="Submit" />
    </form>
    <br />
    <br />
    <br />
    <form v-on:submit.prevent="accountCreate()">
      <h1>Create New Account</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Name:</label>
        <input type="text" v-model="newAccountParams.name" />
      </div>
      <div>
        <label>Account Identifier:</label>
        <input type="text" v-model="newAccountParams.account_identifier" />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" v-model="newAccountParams.description" />
      </div>
      <div>
        <label>Account Type:</label>
        <input type="text" v-model="newAccountParams.account_type" />
      </div>
      <div>
        <label>Accounting Type:</label>
        <input type="text" v-model="newAccountParams.accounting_type" />
      </div>
      <div>
        <label>Part of Net Cash?</label>
        <input type="checkbox" id="checkbox" v-model="newAccountParams.net_cash_calc" />
      </div>
      <input type="submit" value="Submit" />
    </form>
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newMonthlyBalanceParams: {},
      newBalanceParams: {},
      newAccountParams: {},
      errors: [],
    };
  },
  methods: {
    monthlyBalanceCreate: function () {
      axios
        .post("/monthly_balances", this.newMonthlyBalanceParams)
        .then((response) => {
          console.log(response.data);
          this.clearParams();
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    balanceCreate: function () {
      axios
        .post("/balances", this.newBalanceParams)
        .then((response) => {
          console.log(response.data);
          this.clearParams();
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    accountCreate: function () {
      axios
        .post("/accounts", this.newAccountParams)
        .then((response) => {
          console.log(response.data);
          this.clearParams();
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    clearParams: function () {
      this.newMonthlyBalanceParams = {};
      this.newBalanceParams = {};
      this.newAccountParams = {};
    },
  },
};
</script>
