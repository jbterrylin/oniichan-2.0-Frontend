import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "login",
            // component: HomeView,
            meta: { requiresAuth: false },
            component: () => import("../views/Login.vue"),
        },
        {
            path: "/home",
            name: "home",
            meta: { layout: "with-nav", requiresAuth: true },
            component: () => import("../views/Shop.vue"),
        },
        {
            path: "/shop",
            name: "shop",
            meta: { layout: "with-nav", requiresAuth: true },
            component: () => import("../views/Shop.vue"),
        },
        {
            path: "/papers",
            name: "papers",
            meta: { layout: "with-nav", requiresAuth: true },
            component: () => import("../views/Paper/Index.vue"),
        },
        {
            path: "/paper/create",
            name: "paper_create",
            meta: { layout: "with-nav", requiresAuth: true },
            component: () => import("../views/Paper/Create.vue"),
        },
        {
            path: "/paper/create/:id",
            name: "paper_create_with_copy",
            meta: { layout: "with-nav", requiresAuth: true },
            component: () => import("../views/Paper/Create.vue"),
        },
        {
            path: "/papers/:id",
            name: "paper_show",
            meta: { layout: "with-nav", requiresAuth: true },
            component: () => import("../views/Paper/Create.vue"),
        },
        {
            path: "/paper_templete/:id",
            name: "paper_templete",
            meta: { requiresAuth: true },
            component: () => import("../views/Paper/PaperTemplete.vue"),
        },
    ],
});

export default router;
