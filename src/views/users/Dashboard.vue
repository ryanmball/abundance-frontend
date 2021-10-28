<template>
  <div>
    <p>
      <strong>Total Expenses:</strong>
      {{ monthly_expenses.total }}
    </p>
    <p>
      <strong>Total Incomes:</strong>
      {{ monthly_incomes.total }}
    </p>
    <p>
      <strong>Net Change:</strong>
      {{ netChange(monthly_incomes.total, monthly_expenses.total) }}
    </p>
    <!-- {{ category_expenses }}
    <div v-for="category in category_expenses.category_expenses" v-bind:key="category">
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
      monthly_expenses: [],
      category_expenses: [],
      monthly_incomes: [],
      category_incomes: [],
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
      this.monthly_expenses = response.data;
    });
    // axios.get("/category_expenses").then((response) => {
    //   console.log(response.data);
    //   this.category_expenses = response.data;
    // });
    axios.get("/monthly_incomes").then((response) => {
      console.log(response.data);
      this.monthly_incomes = response.data;
    });
    // axios.get("/category_incomes").then((response) => {
    //   console.log(response.data);
    //   this.category_incomes = response.data;
    // });
  },
  methods: {
    netChange: (income, expense) => {
      return (income - expense).toFixed(2);
    },
  },
};
</script>
