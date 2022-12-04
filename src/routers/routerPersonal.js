export default [
  {
      path: '/personal/:key?',
      component: () => import("@/views/personal/PersonalPage.vue"),
      meta: {},
      name: 'Trang cá nhân',
  }
]