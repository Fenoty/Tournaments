import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: 'Tour',
            meta: {
                requiresAuth: true,
                hideForAuth: false,
            },
            children: [
                {
                    path: "",
                    name: "Tournaments",
                    component: () => import("@views/tour/index.vue"),
                    meta: {
                        requiresAuth: true,
                        hideForAuth: false,
                    },
                },
                {
                    path: '/tour/:id',
                    name: 'Tournament',
                    component: () => import("@views/tour/detail.vue"),
                    meta: {
                        requiresAuth: true,
                        hideForAuth: false,
                    },
                },

            ]
        },
        {
            path: "/contacts",
            name: "Contacts",
            component: () => import("@views/contacts.vue"),
            meta: {
                requiresAuth: true,
                hideForAuth: false,
            },
        },
        {
            path: "/login",
            name: "Login",
            component: () => import("@views/login.vue"),
            meta: {
                requiresAuth: true,
                hideForAuth: false,
            },
        },
    ],

});

export default router;
