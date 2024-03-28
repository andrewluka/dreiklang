import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeView,
    },
    {
      path: "/explore",
      // route level code-splitting
      // this generates a separate chunk (Explore.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/ExploreView.vue"),
    },
    {
      path: "/work/:id",
      component: () => import("@/views/WorkView.vue"),
    },
    {
      path: "/history",
      component: () => import("@/views/HistoryView.vue"),
    },
    {
      path: "/search",
      component: () => import("@/views/SearchView.vue"),
    },
  ],
});

export default router;
