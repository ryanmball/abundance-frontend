import Vue from "vue";
import VueRouter from "vue-router";
import UserShow from "../views//users/UserShow.vue";
import Signup from "../views//users/Signup.vue";
import Login from "../views//users/Login.vue";
import Logout from "../views//users/Logout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/users/:id",
    name: "user-show",
    component: UserShow,
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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
