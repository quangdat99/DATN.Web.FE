<template>
  <div class="checkout-page">
    <div class="checkout-title">Thanh toán</div>
    <div class="checkout-body">
      <div class="border-top"></div>
      <div class="checkout-address">
        <div class="address-title">
          <div class="icon24 address-red"></div>
          <div class="title ml-4">Địa Chỉ Nhận Hàng</div>
        </div>
        <div class="address-detail">
          <div class="flex1 flex-row">
            <div class="name">Quang Đạt</div>
            <div class="phone ml-2">(+84) 868389674</div>
            <div class="detail ml-4">
              Số 36 ngõ 348 Nguyễn Trãi, Phường Văn Quán, Quận Hà Đông, Hà Nội
            </div>
            <div class="default ml-4">Mặc định</div>
          </div>
          <div class="change-address" @click="choseAddress()">Thay đổi</div>
        </div>
      </div>
      <div class="product-detail mt-2">
        <div class="table-header">
          <div class="product-name">Sản Phẩm</div>
          <div class="product-unitprice">Đơn Giá</div>
          <div class="product-quantity">Số Lượng</div>
          <div class="product-amount">Thành Tiền</div>
        </div>
        <div class="table-body">
          <div
            class="product-item"
            v-for="(product, p) in productList"
            :key="p"
          >
            <div class="product-name">
              <div class="image">
                <img :src="product.img_url" alt="" />
              </div>
              <div class="name">{{ product.product_name }}</div>
              <div class="classify">
                <span class="detail">{{
                  classifyProduct(product.color_name, product.size_name)
                }}</span>
              </div>
            </div>
            <div class="product-unitprice">
              <div class="price">{{ formatVND(product.sale_price) }}</div>
            </div>
            <div class="product-quantity">
              {{ product.quantity }}
            </div>
            <div class="product-amount">
              {{ formatVND(product.quantity * product.sale_price) }}
            </div>
          </div>
        </div>
        <div class="table-footer">
          <div class="footer-left">
            <div class="label-checkbox color-primary">
              Hình thức thanh toán:
            </div>
            <div class="label-checkbox">
              <base-radio
                name="methodPayment"
                label="Thanh toán trực tuyến"
                :keyValue="1"
                v-model="model.method_payment"
              >
              </base-radio>
            </div>
            <div class="label-checkbox">
              <base-radio
                name="methodPayment"
                label="Thanh toán khi nhận hàng"
                :keyValue="2"
                v-model="model.method_payment"
              >
              </base-radio>
            </div>
          </div>
          <div class="footer-right">
            <div class="label-payment">
              Tổng số tiền ( {{ countProduct }} sản phẩm)
            </div>
            <div class="color-primary fs-16 ml-4">
              {{ formatVND(moneyPayment) }}
            </div>
            <base-button
              text="Đặt hàng"
              class="ml-4 mr-4 pl-6 pr-6"
              @click="checkout()"
            ></base-button>
          </div>
        </div>
      </div>
    </div>
    <chose-address-popup></chose-address-popup>
  </div>
</template>

<script>
import BaseCombobox from "@/components/combobox/BaseCombobox.vue";
import { useFormat } from "@/commons/format.js";
import { ref, computed, getCurrentInstance, onMounted } from "vue";
import ChoseAddressPopup from "./ChoseAddressPopup.vue";
export default {
  components: {
    BaseCombobox,
    ChoseAddressPopup,
  },
  setup() {
    const { formatVND } = useFormat();
    const { proxy } = getCurrentInstance();
    const productList = ref([]);
    const model = ref({
      method_payment: 1,
    });

    onMounted(async () => {
      let data = await proxy.$store.dispatch("moduleCart/updateCart");
      if (data && data.length > 0) {
        productList.value = JSON.parse(JSON.stringify(data));
      }
    });

    const countProduct = computed(() => {
      return productList.value.length;
    });
    const moneyPayment = computed(() => {
      let total = 0;
      productList.value.forEach((x) => {
        total += x.sale_price * x.quantity;
      });
      return total;
    });

    const classifyProduct = (color, size) => {
      if (color && size) {
        return `Loại: ${color}, ${size}`;
      } else if (color && !size) {
        return `Loại: ${color}`;
      } else if (!color && size) {
        return `Loại: ${size}`;
      } else {
        return "";
      }
    };
    const choseAddress = () => {
      proxy.$vfm.show("ChoseAddressPopup", {});
    };
    return {
      model,
      formatVND,
      productList,
      countProduct,
      moneyPayment,
      classifyProduct,
      choseAddress,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./Checkout.scss";
</style>