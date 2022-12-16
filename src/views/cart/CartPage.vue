<template>
  <div class="cart-page">
    <div class="cart-title">Giỏ Hàng</div>
    <div class="table-cart" v-if="countProduct > 0">
      <div class="table-header">
        <base-checkbox
          class="ml-4"
          v-model="selectedAll"
          @change="changeSelectedAll"
        ></base-checkbox>
        <div class="product-name">Sản Phẩm</div>
        <div class="product-unitprice">Đơn Giá</div>
        <div class="product-quantity">Số Lượng</div>
        <div class="product-amount">Số Tiền</div>
        <div class="product-handle">Thao Tác</div>
      </div>
      <div class="table-body">
        <div class="product-item" v-for="(product, p) in productList" :key="p">
          <base-checkbox
            class="ml-4"
            v-model="product.selected"
            @change="selectedProduct"
          ></base-checkbox>
          <div class="product-name">
            <div class="image">
              <img :src="product.img_url" alt="" />
            </div>
            <div class="name">{{ product.product_name }}</div>
            <div class="classify">
              <span class="fs-12">Phân loại hàng:</span>
              <span class="detail">
                {{
                  classifyProduct(product.color_name, product.size_name)
                }}</span
              >
            </div>
          </div>
          <div class="product-unitprice">
            <div class="price-old">
              {{
                product.sale_price_old ? formatVND(product.sale_price_old) : ""
              }}
            </div>
            <div class="price">{{ formatVND(product.sale_price) }}</div>
          </div>
          <div class="product-quantity">
            <vue-number-input
              v-model="product.quantity"
              :min="1"
              :max="product.quantity_max"
              size="small"
              inline
              controls
            >
            </vue-number-input>
          </div>
          <div class="product-amount">
            {{ formatVND(product.quantity * product.sale_price) }}
          </div>
          <div class="product-handle">
            <base-button text="Xóa" type="white"></base-button>
          </div>
        </div>
      </div>
      <div class="table-footer">
        <div class="footer-left">
          <base-checkbox
            class="ml-4"
            v-model="selectedAll"
            @change="changeSelectedAll"
          ></base-checkbox>
          <div class="label-checkbox">Chọn tất cả ( {{ countProduct }} )</div>
        </div>
        <div class="footer-right">
          <div class="label-payment">
            Tổng thanh toán ( {{ countSelected }} sản phẩm)
          </div>
          <div class="color-primary fs-16 ml-4">
            {{ formatVND(moneyPayment) }}
          </div>
          <base-button
            text="Mua hàng"
            class="ml-4 mr-4 pl-6 pr-6"
            @click="checkout()"
          ></base-button>
        </div>
      </div>
    </div>
    <div class="cart-empty" v-if="countProduct == 0">
      <img src="@/assets/images/empty_cart.png" width="64" height="64" alt="" />
      <div class="text fs-16 mt-4">Giỏ hàng của bạn còn trống</div>
      <base-button
        text="Mua ngay"
        class="ml-4 mr-4 pl-6 pr-6 mt-4"
        @click="$router.push('/homepage')"
      ></base-button>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/button/BaseButton.vue";
import baseInput from "@/components/input/BaseInput.vue";
import VueNumberInput from "@chenfengyuan/vue-number-input";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useFormat } from "@/commons/format.js";
import { usePrimeVue } from "primevue/config";
import { mapActions, mapGetters, mapState } from "vuex";
import { ref, getCurrentInstance, computed, onMounted, watch } from "vue";
import commonFn from "@/commons/commonFunction.js";

export default {
  components: {
    baseInput,
    BaseButton,
    VueNumberInput,
    ConfirmDialog,
  },
  props: {},
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const { formatVND } = useFormat();
    const toast = useToast();
    const confirm = useConfirm();
    const selectedAll = ref(false);
    const productList = ref([]);
    const changeToVietnamese = () => {
      const primevue = usePrimeVue();
      primevue.config.locale.accept = "Có";
      primevue.config.locale.reject = "Không";
    };
    const confirmDeleteAll = () => {
      confirm.require({
        message:
          "Cảnh báo: Toàn bộ sản phẩm trong giỏi hàng hiện tại sẽ bị xóa đi",
        header: "XÓA GIỎ HÀNG?",
        accept: () => {
          proxy.$store.dispatch("emptyProductCart");
          toast.add({
            severity: "info",
            summary: "Thông báo",
            detail: "Xóa thành công",
            life: 3000,
          });
        },
        reject: () => {},
      });
    };
    const confirmDeleteProduct = (product) => {
      confirm.require({
        message: `Bạn có chắc chắn muốn xóa sản phẩm ${product.product_name} khỏi giỏ hàng không?`,
        header: "XÓA SẢN PHẨM?",
        accept: () => {
          proxy.$store.dispatch("removeProductCart", product);
          toast.add({
            severity: "info",
            summary: "Thông báo",
            detail: "Xóa thành công",
            life: 3000,
          });
        },
        reject: () => {},
      });
    };

    const totalComputedMoney = computed(() => {
      let total = 0;
      if (proxy.$store.state.productCartList) {
        proxy.$store.state.productCartList.forEach(
          (item) => (total += item.productQuantity * item.sale_price)
        );
      }
      return total;
    });
    const goBackToHomepage = () => {
      proxy.$router.push("/");
    };
    const confirmDeleteCart = () => {
      confirmDeleteAll();
    };

    const goToCheckout = () => {
      proxy.$router.push("/checkout");
    };

    onMounted(async () => {
      changeToVietnamese();
      commonFn.mask();
      let data = await proxy.$store.dispatch("moduleCart/updateCart");
      if (data && data.length > 0) {
        productList.value = JSON.parse(JSON.stringify(data));
      }
      commonFn.unmask();
    });
    const countSelected = computed(() => {
      return productList.value.filter((x) => x.selected).length;
    });

    const moneyPayment = computed(() => {
      let total = 0;
      productList.value.forEach((x) => {
        if (x.selected) {
          total += x.sale_price * x.quantity;
        }
      });
      return total;
    });
    const changeSelectedAll = () => {
      if (selectedAll.value) {
        productList.value.forEach((x) => (x.selected = true));
      } else {
        productList.value.forEach((x) => (x.selected = false));
      }
    };
    const selectedProduct = (value) => {
      let products = productList.value;
      if (proxy.countProduct == products.filter((x) => x.selected).length) {
        selectedAll.value = true;
      } else {
        selectedAll.value = false;
      }
    };
    const checkout = () => {
      let selecteds = productList.value.filter((x) => x.selected);
      if (selecteds.length > 0) {
        proxy.$store.commit("moduleCart/updateCheckout", selecteds);
        proxy.$router.push("/checkout");
      } else {
        proxy.$toast.warning("Vui lòng chọn sản phẩm cần thanh toán");
      }
    };
    const classifyProduct = (color, size) => {
      if (color && size) {
        return `${color}, ${size}`;
      } else if (color && !size) {
        return `${color}`;
      } else if (!color && size) {
        return `${size}`;
      } else {
        return "";
      }
    };
    return {
      productList,
      totalComputedMoney,
      formatVND,
      goToCheckout,
      countSelected,
      selectedAll,
      selectedProduct,
      moneyPayment,
      changeSelectedAll,
      checkout,
      classifyProduct,
    };
  },

  computed: {
    ...mapGetters({
      countProduct: "moduleCart/countProduct",
    }),
  },
};
</script>

<style lang="scss">
@import "./CartPage.scss";
</style>