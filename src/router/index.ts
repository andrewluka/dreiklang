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
      name: "search",
      component: () => import("@/views/SearchView.vue"),
    },
  ],
  scrollBehavior(to, from) {
    const bothSearch = to.name === "search" || from.name === "search";
    const sameSearchTerm = !!to.query.q && to.query.q === from.query.q;
    const goingToNextPage = Number(to.query.p || 0) - 1 === Number(from.query.p || 0);

    if (bothSearch && sameSearchTerm && goingToNextPage) {
      const main = document.querySelector("main");
      if (main) main.scrollTop = 0;
    }
  },
});

export default router;
