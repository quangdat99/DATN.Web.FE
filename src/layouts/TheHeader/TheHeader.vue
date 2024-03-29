<template>
  <div class="the-header">
    <div class="flex-between container">
      <div class="logo-container flex-between">
        <a href="/">
          <div class="logo"></div>
        </a>
      </div>

      <div class="search flex-row flex-center">
        <base-input
          class="input-filter-product"
          placeholder="Nhập tên sản phẩm..."
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
        <div
          v-if="!token || role != 1"
          @click="goToLogin"
          class="row-group cart-container flex-row flex-center cart"
        >
          <div class="icon24 shopping-cart mr-4"></div>

          <!-- This will be the popover reference (for the events and position) -->
          <div class="text text-white">
            {{ cartContent }}
          </div>
        </div>
        <v-menu v-if="token && role == 1">
          <div
            class="row-group cart-container flex-row flex-center cart"
            @click="viewCart"
          >
            <div class="icon24 shopping-cart mr-4"></div>

            <!-- This will be the popover reference (for the events and position) -->
            <div class="text text-white">
              {{ cartContent }}
            </div>
          </div>

          <!-- This will be the content of the popover -->
          <template #popper>
            <div
              class="product-cart-list"
              style="width: 400px"
              v-if="countProduct > 0"
            >
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
                  <div class="product-detail-content-price flex-end">
                    {{ formatVND(product.quantity * product.sale_price) }}
                  </div>
                </div>
              </div>
            </div>
            <div
              class="product-cart-summary flex flex-row flex-between"
              v-if="countProduct > 0"
            >
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
            <div
              class="product-cart-action flex flex-row flex-between"
              v-if="countProduct > 0"
            >
              <div class="flex1"></div>
              <base-button
                text="Xem Giỏ hàng"
                customClass="white btn-padding no-active"
                @click="viewCart"
              >
              </base-button>
            </div>
            <div
              class="product-cart-empty"
              style="width: 320px; height: 200px"
              v-if="countProduct == 0"
            >
              <img
                src="@/assets/images/empty_cart.png"
                width="48"
                height="48"
                alt=""
              />
              <div class="text fs-12 mt-4">Giỏ hàng của bạn còn trống</div>
            </div>
          </template>
        </v-menu>
        <div
          v-if="!token || role != 1"
          class="row-group account flex-row flex-center cursor-pointer"
          @click="goToLogin"
        >
          <div class="icon24 account ml-2 mr-2"></div>
          <div class="text text-white">Tài khoản</div>
        </div>
        <v-menu v-if="token && role == 1">
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
          <template #popper>
            <div class="list-option-account flex-column">
              <div
                class="option cursor"
                @click="
                  () => {
                    $router.push('/personal');
                  }
                "
              >
                Tài Khoản Của Tôi
              </div>
              <div
                class="option cursor"
                @click="
                  () => {
                    $router.push('/personal/4');
                  }
                "
              >
                Đơn Mua
              </div>
              <div class="option cursor" @click="logout()">Đăng Xuất</div>
            </div>
          </template>
        </v-menu>
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
    const role = ref(null);
    const { formatVND } = useFormat();
    const cartContent = computed(() => {
      if (token.value) {
        return "Giỏ hàng (" + proxy.countProduct + ")";
      } else {
        return "Giỏ hàng";
      }
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
      if (!token.value || role.value != 1) {
        proxy.$router.push("/login");
      } else {
        proxy.$router.push("/personal");
      }
    };

    const updateSearch = () => {
      if (route.path != "/search") {
        proxy.$router.push({
          path: "/search",
          query: { keyword: search.value },
        });
      }

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
        role.value = data.Context.role;
        context.value = data.Context;
      }
      if (route.path == "/homepage") {
        search.value = "";
      } else {
        search.value = proxy.$store.state["moduleHomePage"].searchText;
      }
      if (role.value) {
        getProductCart();
      }
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
    };

    const logout = () => {
      proxy.$store.dispatch("moduleContext/logout");
      proxy.$router.push("/login");
    };

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
      logout,
      role,
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
