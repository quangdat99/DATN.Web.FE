export default [{
  path: '/admin',
  component: () => import("@/views/admin/AdminPage.vue"),
  meta: {
    anonymous: false
  },
  name: 'Trang tổng quan',
  redirect: '/admin/dashboard',
  children: [
    {
      path: 'dashboard',
      component: () => import("@/views/admin/dashboard/Dashboard.vue"),
      name: 'Tổng quan',
      meta: {
        anonymous: false
      }
    }
    , {
      path: 'productmanage',
      component: () => import("@/views/admin/product/ProductManage.vue"),
      name: 'Danh sách Sản phẩm',
      meta: {
        anonymous: false
      }
    },
    {
      path: 'category',
      component: () => import("@/views/admin/category/CategoryManage.vue"),
      name: 'Loại sản phẩm',
      meta: {
        anonymous: false
      }
    }, {
      path: 'order',
      component: () => import("@/views/admin/order/OrderManage.vue"),
      name: 'Đơn hàng',
      meta: {
        anonymous: false
      }
    }, {
      path: 'color',
      component: () => import("@/views/admin/color/ColorManage.vue"),
      name: 'Màu sắc',
      meta: {
        anonymous: false
      }
    }, {
      path: 'size',
      component: () => import("@/views/admin/size/SizeManage.vue"),
      name: 'Kích cỡ',
      meta: {
        anonymous: false
      }
    }
  ]
}]