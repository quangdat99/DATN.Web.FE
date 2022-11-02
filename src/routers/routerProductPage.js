export default [
    {
        path: '/product/:key?',
        component: () => import("@/views/product/ProductPage.vue"),
        meta: {},
        name: 'Sản phẩm',
    }
]