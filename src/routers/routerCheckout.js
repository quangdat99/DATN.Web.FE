export default [
    {
        path: '/checkout/:key?',
        component: () => import("@/views/checkout/CheckOut.vue"),
        meta: {
            role: 1
        },
        name: 'Thanh toán',
    }
]