import { createRouter, createWebHistory } from "vue-router";
import OperationView from "../views/OperationView.vue";

const routes = [
  {
    path: "/",
    redirect: "/sum/10/1", // Default to sum, focus 10, seed 1
  },
  {
    path: "/:operation/:focus/:seed/:negative?",
    name: "operation",
    component: OperationView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory("/fun-op/"),
  routes,
});

export default router;
