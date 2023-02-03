import { reactive } from 'vue';
import { getCurrentInstance, onMounted, ref } from 'vue';

export const useAdminPage = () => {
  const { proxy } = getCurrentInstance();

  const menuList = reactive([
    {
      iconClass: 'icon24 dashboard',
      content: 'Tổng quan',
      route: '/admin/dashboard',
      key: 'dashboard',
      isSelected: true
    }, {
      iconClass: 'icon24 user-white',
      content: 'Khách hàng',
      route: '/admin/user',
      key: 'user',
      isSelected: false
    }, {
      iconClass: 'icon24 order-white',
      content: 'Đơn hàng',
      route: '/admin/order',
      key: 'order',
      isSelected: false
    }, {
      iconClass: 'icon24 product',
      content: 'Sản phẩm',
      route: '/admin/productmanage',
      key: 'productmanage',
      isSelected: false
    }, {
      iconClass: 'icon24 category',
      content: 'Loại sản phẩm',
      route: '/admin/category',
      key: 'category',
      isSelected: false
    }, {
      iconClass: 'icon24 attribute',
      content: 'Nhóm thuộc tính',
      route: '/admin/attribute',
      key: 'attribute',
      isSelected: false
    }, {
      iconClass: 'icon24 color',
      content: 'Màu sắc',
      route: '/admin/color',
      key: 'color',
      isSelected: false
    }, {
      iconClass: 'icon24 size',
      content: 'Kích cỡ',
      route: '/admin/size',
      key: 'size',
      isSelected: false
    },
  ]);

  const changeChosenTabMenuItem = async (key) => {
    menuList.forEach(item => {
      if (item.key == key) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
    });
    await proxy.$store.dispatch('updateMenuItems', menuList);
  }

  return {
    menuList,
    changeChosenTabMenuItem
  }
}