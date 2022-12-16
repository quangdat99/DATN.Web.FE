export default [
    {
        path: '/product/:key?',
        component: () => import("@/views/productpage/ProductPage.vue"),
        meta: {
            anonymous: true
        },
        name: 'Sản phẩm',
    }
]