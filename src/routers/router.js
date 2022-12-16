import { createRouter, createWebHistory } from "vue-router";
import routerHomepage from "./routerHomePage.js";
import routerSearch from "./routerSearch.js";
import routerProductPage from "./routerProductPage.js";
import routerCart from "./routerCart.js";
import routerCheckout from "./routerCheckout.js";
import routerProfile from './routerProfile.js';
import routerPersonal from './routerPersonal.js';
import commonFn from '@/commons/commonFunction.js';
import auth from '@/commons/authService.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "",
      redirect: '/homepage',
      name: 'Trang chủ',
      component: () => import('@/layouts/MainLayout/MainLayout.vue'),
      meta: {
        anonymous: false
      },
      children: [
        ...routerHomepage,
        ...routerSearch,
        ...routerProductPage,
        ...routerCart,
        ...routerCheckout,
        ...routerProfile,
        ...routerPersonal
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/notfound/NotFound.vue'),
      meta: {
        anonymous: true
      }
    }, {
      path: '/login',
      component: () => import('@/views/login/LoginPage.vue'),
      name: 'Đăng nhập',
      meta: {
        anonymous: true
      }
    }, {
      path: '/signup',
      component: () => import('@/views/signup/SignupPage.vue'),
      name: 'Đăng ký',
      meta: {
        anonymous: true
      }
    }, {
      path: '/completeProfile',
      component: () => import('@/views/signup/CompleteProfile.vue'),
      name: 'Hoàn thành hồ sơ',
      meta: {
        anonymous: true
      }
    }
  ],
});

router.beforeEach((to, from, next) => {
  // khi chuyển router sẽ show maskLoading cho người dùng xử lý

  commonFn.mask();
  document.title = to.name;
  if (to.meta.anonymous) {
    next();
    return;
  }
  // kiểm tra authen --> redirect login
  if (!auth.isAuthenticated()) {
    auth.login(to.path);
    return;
  }
  next();
})

router.afterEach(() => {
  commonFn.unmask();
})

export default router;
