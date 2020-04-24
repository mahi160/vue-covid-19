import Vue from "vue";
import VueRouter from "vue-router";
// import App from "../App"

Vue.use(VueRouter);

const routes = [
  {
    path: "/countries",
    name: "Countries",
    component: () => import("../views/Countries.vue")
  },
  {
    path: "/world",
    name: "World",
    component: () => import("../views/World.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  }
];

const router = new VueRouter({
  // mode: history,
  routes
});

export default router;
