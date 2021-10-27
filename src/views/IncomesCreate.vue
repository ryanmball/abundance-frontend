<template>
  <div class="">
    <form v-on:submit.prevent="incomeCreate()">
      <h1>Create Income</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Date:</label>
        <input type="date" v-model="newincomeParams.date" />
      </div>
      <div>
        <label>Amount:</label>
        <input type="text" v-model="newincomeParams.amount" />
      </div>
      <div>
        <label>Category:</label>
        <input type="text" v-model="newincomeParams.category" />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" v-model="newincomeParams.description" />
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
      newincomeParams: {},
      errors: [],
    };
  },
  created: function () {},
  methods: {
    incomeCreate: function () {
      axios
        .post("/incomes", this.newincomeParams)
        .then((response) => {
          console.log(response.data);
          this.newincomeParams = {};
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    clearNewParams: function () {
      this.newincomeParams = {};
    },
  },
};
</script>
