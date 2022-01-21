import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/users/Dashboard.vue";
import Signup from "../views/users/Signup.vue";
import Login from "../views/users/Login.vue";
import Logout from "../views/users/Logout.vue";
import ExpensesCreate from "../views/ExpensesCreate.vue";
import IncomesCreate from "../views/IncomesCreate.vue";
import BalancesCreate from "../views/BalancesCreate.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/users/:id",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout,
  },
  {
    path: "/expenses",
    name: "expenses-create",
    component: ExpensesCreate,
  },
  {
    path: "/incomes",
    name: "incomes-create",
    component: IncomesCreate,
  },
  {
    path: "/balances",
    name: "balances-create",
    component: BalancesCreate,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
