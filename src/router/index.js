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
    next();
  } else {
    next(`/`);
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
  },
  {
    path: '/admin',
    name: "AdminDashboard",
    component: () => import ("../views/Dashboards/AdminDashboard.vue"),
    beforeEnter: guard,
  },
  {
    path: "/landlord",
    name: "LandlordDashboard",
    component: () => import ("../views/Dashboards/AgentDashboard.vue"),
    beforeEnter: guard,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
