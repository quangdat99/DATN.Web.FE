export default [
    {
        path: '/cart/:key?',
        component: () => import("@/views/cart/CartPage.vue"),
        meta: {
            role: 1
        },
        name: 'Giỏ hàng',
    }
]