export default [
    {
        path: '/homepage/:key?',
        component: () => import("@/views/homepage/HomePage.vue"),
        meta: {
            anonymous: true
        },
        name: 'Trang chủ',
    }
]
