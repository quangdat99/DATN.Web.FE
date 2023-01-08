export default [
    {
        path: '/profile/:key?',
        component: () => import("@/views/profile/Profile.vue"),
        meta: {
            role: 1
        },
        name: 'Trang cá nhân',
    }
]