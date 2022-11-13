export default [
  {
      path: '/search/:key?',
      component: () => import("@/views/homepage/HomePage.vue"),
      meta: {
          anonymous: true
      },
      name: 'Tìm kiếm',
  }
]