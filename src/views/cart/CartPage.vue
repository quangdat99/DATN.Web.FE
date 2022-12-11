<template>
  <div class="cart-page">
    <div class="cart-title">Giỏ Hàng</div>
    <div class="table-cart">
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
                  product.color_name && product.size_name
                    ? ` ${product.color_name}, ${product.size_name}`
                    : ""
                }}{{
                  product.color_name && !product.size_name
                    ? ` ${product.color_name}`
                    : ""
                }}{{
                  !product.color_name && product.size_name
                    ? ` ${product.size_name}`
                    : ""
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
          ></base-button>
        </div>
      </div>
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

    onMounted(() => {
      changeToVietnamese();
      productList.value = JSON.parse(
        JSON.stringify(proxy.$store.state["moduleCart"].products)
      );
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