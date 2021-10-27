<template>
  <div>
    <p>
      <strong>Total expenses:</strong>
      {{ monthly_totals.total }}
    </p>
    <!-- {{ category_totals }}
    <div v-for="category in category_totals.category_totals" v-bind:key="category">
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
      monthly_totals: [],
      category_totals: [],
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
    axios.get("/monthly_totals").then((response) => {
      console.log(response.data);
      this.monthly_totals = response.data;
    });
    // axios.get("/category_totals").then((response) => {
    //   console.log(response.data);
    //   this.category_totals = response.data;
    // });
  },
  methods: {},
};
</script>
