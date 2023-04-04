import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

import { supabase } from "@/config/supabase";

Vue.use(VueRouter);

async function guard(to, from, next) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    localStorage.setItem("user", user.data.user.email);
    next();
  } else {
    if (to.query.continue) {
      next(`/auth/login?continue=${to.query.continue}`);
    } else {
      next(`/auth/login?continue=${to.fullPath}`);
    }
  }
}

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/house",
    name: "HousesView",
    redirect: "/"
  },
  {
    path: "/house/:id",
    name: "HouseView",
    component: () => import ("../views/Houses/HouseView.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
