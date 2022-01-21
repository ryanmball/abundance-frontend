<template>
  <div class="monthly-balances-create">
    <form v-on:submit.prevent="monthlyBalanceCreate()">
      <h1>Create New Monthly Balance</h1>
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
        <label>Checking 1:</label>
        <input type="text" v-model="newBalanceParams.checking1" />
      </div>
      <div>
        <label>Checking 2:</label>
        <input type="text" v-model="newBalanceParams.checking2" />
      </div>
      <div>
        <label>Savings 1:</label>
        <input type="text" v-model="newBalanceParams.savings1" />
      </div>
      <div>
        <label>Savings 2:</label>
        <input type="text" v-model="newBalanceParams.savings2" />
      </div>
      <div>
        <label>Credit Card 1:</label>
        <input type="text" v-model="newBalanceParams.credit_card1" />
      </div>
      <div>
        <label>Credit Card 2:</label>
        <input type="text" v-model="newBalanceParams.credit_card2" />
      </div>
      <div>
        <label>Credit Card 3:</label>
        <input type="text" v-model="newBalanceParams.credit_card3" />
      </div>
      <div>
        <label>Credit Card 4:</label>
        <input type="text" v-model="newBalanceParams.credit_card4" />
      </div>
      <div>
        <label>Loan 1:</label>
        <input type="text" v-model="newBalanceParams.loan1" />
      </div>
      <div>
        <label>Loan 2:</label>
        <input type="text" v-model="newBalanceParams.loan2" />
      </div>
      <div>
        <label>Personal IRA:</label>
        <input type="text" v-model="newBalanceParams.personal_IRA" />
      </div>
      <input type="submit" value="Submit" />
    </form>
    <form v-on:submit.prevent="monthlyBalanceCreate()">
      <h1>Create New Balance</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Month:</label>
        <input type="number" v-model="newBalanceParams.month" />
      </div>
      <div>
        <label>Date:</label>
        <input type="date" v-model="newincomeParams.date" />
      </div>
      <div>
        <label>Date:</label>
        <input type="date" v-model="newBalanceParams.year" />
      </div>
      <div>
        <label>Checking 1:</label>
        <input type="text" v-model="newBalanceParams.checking1" />
      </div>
      <div>
        <label>Checking 2:</label>
        <input type="text" v-model="newBalanceParams.checking2" />
      </div>
      <div>
        <label>Savings 1:</label>
        <input type="text" v-model="newBalanceParams.savings1" />
      </div>
      <div>
        <label>Savings 2:</label>
        <input type="text" v-model="newBalanceParams.savings2" />
      </div>
      <div>
        <label>Credit Card 1:</label>
        <input type="text" v-model="newBalanceParams.credit_card1" />
      </div>
      <div>
        <label>Credit Card 2:</label>
        <input type="text" v-model="newBalanceParams.credit_card2" />
      </div>
      <div>
        <label>Credit Card 3:</label>
        <input type="text" v-model="newBalanceParams.credit_card3" />
      </div>
      <div>
        <label>Credit Card 4:</label>
        <input type="text" v-model="newBalanceParams.credit_card4" />
      </div>
      <div>
        <label>Loan 1:</label>
        <input type="text" v-model="newBalanceParams.loan1" />
      </div>
      <div>
        <label>Loan 2:</label>
        <input type="text" v-model="newBalanceParams.loan2" />
      </div>
      <div>
        <label>Personal IRA:</label>
        <input type="text" v-model="newBalanceParams.personal_IRA" />
      </div>
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newBalanceParams: {},
      errors: [],
    };
  },
  methods: {
    monthlyBalanceCreate: function () {
      axios
        .post("/monthly_balances", this.newBalanceParams)
        .then((response) => {
          console.log(response.data);
          this.newBalanceParams = {};
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    clearNewBalanceParams: function () {
      this.newBalanceParams = {};
    },
  },
};
</script>
