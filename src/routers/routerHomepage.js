export default [
    {
        path: '/homepage/:key?',
        component: () => import("@/views/homepage/HomePage.vue"),
        meta: {},
        name: 'Trang chủ',
    }
]