import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('/@/pages/home.vue'),
    },
];

const route = createRouter({
    history: createWebHistory(),
    routes,
});

export default route;
