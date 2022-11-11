<template>
  <div class="grid-product-card">
    <div class="grid-product-card-header">
      <div class="header-left" v-if="search">
        <div class="icon24 right search-red mr-2"></div>
        <div class="title-filter">BỘ LỌC TÌM KIẾM</div>
      </div>
      <div class="header-right" v-if="search">
        <div class="key-filter">Kết quả tìm kiếm cho từ khoá "{{ "abc" }}"</div>
        <div class="sort-option d-flex">
          <div class="sort-title">Sắp xếp theo</div>
          <base-button
            text="Mới nhất"
            customClass="btn-white btn-padding no-active"
          ></base-button>
          <base-button
            text="Bán chạy"
            customClass="btn-white btn-padding no-active"
          ></base-button>
          <menu-wrapper classRoot="sort-amount">
            <template #menu-button="{ toggleMenu }">
              <base-button text="Giá" @click="toggleMenu"></base-button>
            </template>
            <template #menu-content>
              <menu-item @menu-item-click="sort()">Giá: Thấp đến cao</menu-item>
              <menu-item @menu-item-click="sort()">Giá: Cao đến thấp</menu-item>
            </template>
          </menu-wrapper>
        </div>
      </div>
      <div class="header-right" v-if="!search">Gợi ý sản phẩm</div>
    </div>
    <div class="container-grid">
      <div class="container-filter"></div>
      <div class="product-container" :class="[search ? 'search' : '']">
        <product-card
          v-for="(product, index) in productList"
          :key="index"
          :product="product"
        ></product-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductCard from "@/components/card/ProductCard.vue";
import BaseButton from "@/components/button/BaseButton.vue";
import MenuWrapper from "@/components/menu/menuwrapper/MenuWrapper.vue";
import MenuItem from "@/components/menu/menuitem/MenuItem.vue";
export default {
  name: "GridProductCard",
  components: {
    ProductCard,
    BaseButton,
    MenuWrapper,
    MenuItem,
  },
  props: {
    productList: {
      type: Array,
      default: null,
    },
    search: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    return {};
  },
  // computed: {
  //   ...mapGetters({
  //     search: "moduleHomePage/Search",
  //   }),
  // },
};
</script>

<style lang="scss">
@import "@/assets/scss/variables.scss";
.grid-product-card {
  .grid-product-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0px;
    color: $black;
    line-height: 24px;
    font-size: 16px;
    font-weight: 600;
    .header-left {
      flex: 1;
      display: flex;
      font-size: 14px;
      font-weight: 600;
    }
    .header-right {
      flex: 5;
      color: $text-grey;
    }
  }
  .container-grid {
    display: flex;
    .container-filter {
      flex: 1;
    }
    .product-container {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 5px;
      background-color: $white;
      width: fit-content;
      &.search {
        grid-template-columns: repeat(5, 1fr);
      }
    }
  }

  @media only screen and (max-width: 414px) {
    .product-container {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>