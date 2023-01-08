export default [
  {
      path: '/personal/:key?',
      component: () => import("@/views/personal/PersonalPage.vue"),
      meta: {
        role: 1
    },
      name: 'Trang cá nhân',
  }
]