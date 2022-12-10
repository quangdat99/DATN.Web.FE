<template>
  <div class="header">
    <div class="flex-between container">
      <div class="logo-container flex-between">
        <a href="/">
          <div class="logo"></div>
        </a>
      </div>

      <div class="search flex-row flex-center">
        <base-input
          class="input-filter-product"
          placeholder="Nhập tên sản phẩm, mã sản phẩm, từ khóa cần tìm..."
          :width="450"
          rightIcon="search-red"
          @onClickRightIcon="updateSearch"
          @baseKeyup="enterSearch"
          :hasBorder="false"
          v-model="search"
          :modelValue="searchText"
        ></base-input>
      </div>
      <div class="row-action flex-between">
        <v-menu>
          <div class="row-group cart-container flex-row flex-center cart">
            <div class="icon24 shopping-cart mr-4"></div>

            <!-- This will be the popover reference (for the events and position) -->
            <div class="text text-white">
              {{ cartContent }}
            </div>
          </div>

          <!-- This will be the content of the popover -->
          <template #popper>
            <div class="product-cart-list" style="width: 400px">
              <div class="product-list-content flex flex-column">
                <div
                  class="product-detail-content flex flex-row"
                  v-for="(product, index) in listProductCard"
                  :key="index"
                >
                  <div class="product-detail-content-img mr-2">
                    <img :src="product.img_url" alt="" />
                  </div>
                  <div
                    class="product-detail-content-main flex flex-column flex2"
                  >
                    <div class="product-detail-content-main-name">
                      {{ product.product_name
                      }}{{
                        product.color_name && product.size_name
                          ? ` (${product.color_name}/${product.size_name})`
                          : ""
                      }}{{
                        product.color_name && !product.size_name
                          ? ` (${product.color_name})`
                          : ""
                      }}{{
                        !product.color_name && product.size_name
                          ? ` (${product.size_name})`
                          : ""
                      }}
                    </div>
                    <div
                      class="product-detail-content-main-quantity color-primary"
                    >
                      x{{ product.quantity }}
                    </div>
                  </div>
                  <div class="product-detail-content-price flex flex-end flex2">
                    {{ formatVND(product.quantity * product.sale_price) }}
                  </div>
                </div>
              </div>
            </div>
            <div class="product-cart-summary flex flex-row flex-between">
              <div class="product-cart-total-product">
                Có tổng số
                <span class="color-primary">{{ countProduct }}</span> sản phẩm
              </div>
              <div class="product-cart-total-price">
                Tổng số:
                <span class="color-red">{{
                  formatVND(totalComputedMoney)
                }}</span>
              </div>
            </div>
            <div class="product-cart-action flex flex-row flex-between">
              <base-button
                text="Xem chi tiết"
                customClass="white btn-padding no-active"
                @click="viewCart"
              >
              </base-button>
              <base-button
                text="Thanh toán ngay"
                customClass="primary btn-padding no-active"
                @click="goToCheckout"
              >
              </base-button>
            </div>
          </template>
        </v-menu>
        <div
          class="row-group account flex-row flex-center cursor-pointer"
          @click="goToLogin"
        >
          <div class="icon24 account ml-2 mr-2" v-if="!sourceAvatar"></div>
          <div v-else class="avatar">
            <img :src="sourceAvatar" alt="" />
          </div>
          <div class="text text-white">
            {{ accountName }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { ref, computed, getCurrentInstance, watch, onMounted } from "vue";
import baseInput from "@/components/input/BaseInput.vue";
import BaseButton from "@/components/button/BaseButton.vue";
import { useRoute } from "vue-router";
import { useFormat } from "@/commons/format.js";
import productCartAPI from "@/apis/components/productCartAPI";

export default {
  components: {
    baseInput,
    BaseButton,
  },
  setup() {
    const search = ref("");
    const route = useRoute();
    const menus = ref([
      {
        text: "Home",
        isActive: true,
        route: "/home",
      },
      {
        text: "Shop",
        isActive: true,
        route: "/shop",
      },
      {
        text: "Service",
        subMenus: [
          {
            text: "Shopping Card",
            route: "/shopping-cart",
          },
          {
            text: "Check out",
            route: "/check-out",
          },
        ],
      },
      {
        text: "Contact",
        isActive: true,
        route: "/contact",
      },
    ]);
    const { proxy } = getCurrentInstance();
    const context = ref({});
    const token = ref("");
    const { formatVND } = useFormat();
    const cartContent = computed(() => {
      return "Giỏ hàng (" + proxy.countProduct + ")";
    });
    const listProductCard = computed(() => {
      return proxy.$store.state["moduleCart"].products;
    });
    const totalComputedMoney = computed(() => {
      let total = 0;
      proxy.$store.state["moduleCart"].products.forEach(
        (item) => (total += item.quantity * item.sale_price)
      );
      return total;
    });
    const viewCart = () => {
      proxy.$router.push("/cart");
    };
    const goToCheckout = () => {
      proxy.$router.push("/checkout");
    };

    const goToLogin = () => {
      if (!token.value) {
        proxy.$router.push("/login");
      } else {
        proxy.$router.push("/personal");
      }
    };

    const updateSearch = () => {
      proxy.$store.commit("moduleHomePage/updateSearch", search.value);
    };

    const enterSearch = (e, value) => {
      if (e.keyCode == 13) {
        updateSearch();
      }
    };

    onMounted(() => {
      let data = proxy.$store.state["moduleContext"];
      if (data.Token) {
        token.value = data.Token;
        context.value = data.Context;
      }
      if (route.path == "/homepage") {
        search.value = "";
      } else {
        search.value = proxy.$store.state["moduleHomePage"].searchText;
      }
      getProductCart();
    });

    const accountName = computed(() => {
      if (token.value) {
        return `${context.value.firstName} ${context.value.lastName}`;
      }
      return "Tài khoản";
    });
    const sourceAvatar = computed(() => {
      if (token.value && context.value.avatar) {
        return context.value.avatar;
      }
      return "";
    });

    const getProductCart = async () => {
      let productCarts = await proxy.$store.dispatch("moduleCart/updateCart");
      if (productCarts) {
        listProductCard.value = productCarts;
      }
    }

    return {
      menus,
      cartContent,
      listProductCard,
      formatVND,
      totalComputedMoney,
      viewCart,
      goToCheckout,
      goToLogin,
      search,
      updateSearch,
      enterSearch,
      accountName,
      token,
      sourceAvatar,
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
@import "./TheHeader.scss";
</style>
