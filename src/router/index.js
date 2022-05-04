import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "login",
            // component: HomeView,
            component: () => import("../views/Login.vue"),
        },
        {
            path: "/home",
            name: "home",
            meta: { layout: "with-nav" },
            component: () => import("../views/Shop.vue"),
        },
        {
            path: "/shop",
            name: "shop",
            meta: { layout: "with-nav" },
            component: () => import("../views/Shop.vue"),
        },
        {
            path: "/papers",
            name: "papers",
            meta: { layout: "with-nav" },
            component: () => import("../views/Paper/Index.vue"),
        },
        {
            path: "/paper/create",
            name: "papers_create",
            meta: { layout: "with-nav" },
            component: () => import("../views/Paper/Create.vue"),
        },
    ],
});

export default router;
