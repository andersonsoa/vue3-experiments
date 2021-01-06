import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "./composables/use-auth";

import Login from "./pages/Login/index.vue";
import Dashboard from "./pages/Dashboard/index.vue";
import About from "./pages/About/index.vue";
import Contact from "./pages/Contact/index.vue";

const { token } = useAuth();

export const routes = [
  {
    path: "/",
    component: Dashboard,
    name: "dashboard",
    meta: {
      protected: true
    }
  },
  {
    path: "/login",
    component: Login,
    name: "login",
    meta: {
      public: true
    }
  },
  {
    path: "/about",
    component: About,
    name: "about",
    meta: {
      public: true
    }
  },
  {
    path: "/contact",
    component: Contact,
    name: "contact",
    meta: {
      public: true
    }
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = () => !!token.value;

  if (to.matched.some((rota) => rota.meta.protected)) {
    if (!isAuthenticated()) {
      next({ name: "login" });
    } else {
      next();
    }
  } else if (to.matched.some((rota) => rota.meta.public)) {
    if (isAuthenticated() && to.path === "/login") {
      next("/");
    } else next();
  } else next();
});
