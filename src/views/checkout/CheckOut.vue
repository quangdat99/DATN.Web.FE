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
            <div class="name">{{ address.name }}</div>
            <div class="phone ml-2">({{ address.phone }})</div>
            <div class="detail ml-4">
              {{
                `${address.commune}, ${address.district}, ${address.province}`
              }}
            </div>
            <div class="default ml-4" v-if="address.is_default">Mặc định</div>
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
            <!-- <div class="label-checkbox color-primary">
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
            </div> -->
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

    <div
      class="product-page-relation mt-4 mb-4"
      v-if="listProductRelation.length > 0"
    >
      <div class="product-page-relation-title">
        <div>SẢN PHẨM LIÊN QUAN</div>
      </div>
      <div class="relation-content">
        <product-card
          v-for="(relation, index) in listProductRelation"
          :key="index"
          :product="relation"
        ></product-card>
      </div>
    </div>
  </div>
</template>

<script>
import BaseCombobox from "@/components/combobox/BaseCombobox.vue";
import { useFormat } from "@/commons/format.js";
import { ref, computed, getCurrentInstance, onMounted } from "vue";
import addressAPI from "@/apis/components/addressAPI";
import commonFn from "@/commons/commonFunction.js";
import productCartAPI from "@/apis/components/productCartAPI";
import popupUtil from "@/commons/popupUtil";
import ProductCard from "@/components/card/ProductCard.vue";
import ProductAPI from "@/apis/components/productAPI";

export default {
  components: {
    BaseCombobox,
    ProductCard,
  },
  setup() {
    const { formatVND } = useFormat();
    const { proxy } = getCurrentInstance();
    const productList = ref([]);
    const addresses = ref([]);
    const address = ref({});
    const model = ref({
      method_payment: 1,
    });
    const listProductRelation = ref([]);
    /**
     * Sp liên quan theo đơn hàng
     */
    async function getProductRelation(listProductId) {
      const dataRelation = await ProductAPI.getProductRelationOrder(
        listProductId
      );
      if (dataRelation) {
        listProductRelation.value = dataRelation;
      }
    }
    onMounted(async () => {
      let data = await proxy.$store.state["moduleCart"].productCheckouts;
      if (data && data.length > 0) {
        productList.value = JSON.parse(JSON.stringify(data));
      } else {
        productList.value = [];
      }

      getProductRelation(productList.value.map((x) => x.product_id).join(","));
      commonFn.mask();
      addresses.value = await addressAPI.getAddresses();
      address.value = addresses.value.find((x) => x.is_default) || {};
      commonFn.unmask();
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
      popupUtil.show("ChoseAddressPopup", {
        options: {
          submit: (_address) => {
            changeAddress(_address);
          },
        },
      });
    };
    const changeAddress = (_address) => {
      address.value = _address;
    };

    const checkout = () => {
      let payload = {
        address_id: address.value.address_id,
        method_payment: model.value.method_payment,
        listProduct: productList.value,
      };

      commonFn.mask();
      productCartAPI
        .checkout(payload)
        .then((res) => {
          if (res && res.data && res.data.data) {
            proxy.$toast.success("Đặt hàng thành công");
            proxy.$store.dispatch("moduleCart/updateCart");
            proxy.$store.commit("moduleCart/updateCheckout", []);
            proxy.$router.push("/personal/4");
          }
        })
        .finally(() => {
          commonFn.unmask();
        });
    };

    return {
      model,
      formatVND,
      productList,
      countProduct,
      moneyPayment,
      classifyProduct,
      choseAddress,
      address,
      checkout,
      listProductRelation,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./Checkout.scss";
</style>