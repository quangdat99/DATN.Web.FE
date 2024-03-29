import { defineAsyncComponent } from 'vue';
import NewAddressPopup from '@/views/personal/personalPopup/NewAddressPopup.vue';
import ChoseAddressPopup from '@/views/checkout/ChoseAddressPopup.vue';
import ProductDetail from '@/views/admin/product/popup/ProductDetail.vue';
import ColorDetail from '@/views/admin/color/popup/ColorDetail.vue';
import SizeDetail from '@/views/admin/size/popup/SizeDetail.vue';
import AttributeDetail from '@/views/admin/attribute/popup/AttributeDetail.vue';
import CategoryDetail from '@/views/admin/category/popup/CategoryDetail.vue';
import OrderDetail from '@/views/admin/order/popup/OrderDetail.vue';
import UserDetail from '@/views/admin/user/popup/UserDetail.vue';
import CommentProductDetail from '@/views/personal/personalPopup/CommentProductDetail.vue';
import CompareProductDetail from '@/views/productpage/CompareProductDetail.vue';
import DashboardOrderDetail from '@/views/admin/dashboard/popup/DashboardOrderDetail.vue';
import UpdateRelationDetail from '@/views/admin/UpdateRelationDetail.vue';

export function register(app) {
  app.component('NewAddressPopup', NewAddressPopup);
  app.component('ChoseAddressPopup', ChoseAddressPopup);
  app.component('ProductDetail', ProductDetail);
  app.component('ColorDetail', ColorDetail);
  app.component('SizeDetail', SizeDetail);
  app.component('AttributeDetail', AttributeDetail);
  app.component('CategoryDetail', CategoryDetail);
  app.component('OrderDetail', OrderDetail);
  app.component('UserDetail', UserDetail);
  app.component('CommentProductDetail', CommentProductDetail);
  app.component('CompareProductDetail', CompareProductDetail);
  app.component('DashboardOrderDetail', DashboardOrderDetail);
  app.component('UpdateRelationDetail', UpdateRelationDetail);
}
