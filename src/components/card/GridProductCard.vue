<template>
  <div class="grid-product-card">
    <div class="grid-product-card-header">
      <div class="header-left" v-if="search">
        <div class="icon24 filter mr-2"></div>
        <div class="title-filter fw-600 txt-grey">BỘ LỌC TÌM KIẾM</div>
      </div>
      <div class="header-right" v-if="search">
        <div class="key-filter-container d-flex mb-2">
          <div class="icon24 research mr-2"></div>
          <div class="key-filter">
            Kết quả tìm kiếm cho từ khoá "<span>{{ "abc" }}</span
            >"
          </div>
        </div>
        <div class="sort-option d-flex align-center">
          <div class="sort-title ml-4 mr-2">Sắp xếp theo</div>
          <base-button text="Mới nhất" class="mr-2" type="white"></base-button>
          <base-button text="Bán chạy" class="mr-2" type="white"></base-button>
          <base-dropdown
            v-model="sort_amount"
            :options="[
              { name: 'Giá: Thấp đến cao', code: 'A' },
              { name: 'Giá: Cao đến thấp', code: 'B' },
            ]"
            optionLabel="name"
            optionValue="code"
            placeholder="Giá"
            :width="180"
            :fontSize="14"
          ></base-dropdown>
        </div>
      </div>
      <div class="header-right" v-if="!search">Gợi ý sản phẩm</div>
    </div>
    <div class="container-grid">
      <div class="container-filter">
        <div class="group-filter">
          <div class="title-ft fs-14 black">Đánh giá</div>
          <div class="container-ft ml-2">
            <div
              class="d-flex align-center cursor-pointer mt-2"
              v-for="i in 5"
              :key="i"
            >
              <star-rating
                :rating="6 - i"
                :increment="1"
                :star-size="15"
                read-only
                :show-rating="false"
                :border-color="'#999'"
                :padding="3"
              ></star-rating>
              <div class="ft" v-if="i > 1">trở lên</div>
            </div>
          </div>
        </div>
        <div class="group-filter mt-4">
          <div class="title-ft fs-14 black">Khoảng giá</div>
          <div class="container-ft mt-2">
            <div class="d-flex">
              <base-number placeholder="&#8363; Từ" :width="80"></base-number>
              <span class="ml-1 mr-1 mt-2">-</span>
              <base-number placeholder="&#8363; Đến" :width="80"></base-number>
            </div>
          </div>
        </div>
      </div>
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
import { ref } from "vue";
import { mapGetters } from "vuex";
import ProductCard from "@/components/card/ProductCard.vue";
import BaseButton from "@/components/button/BaseButton.vue";
import MenuItem from "../menu/menuitem/MenuItem.vue";
import StarRating from "vue-star-rating";
export default {
  name: "GridProductCard",
  components: {
    ProductCard,
    BaseButton,
    MenuItem,
    StarRating,
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
    const sort_amount = ref(null);
    return {
      sort_amount,
    };
  },
  // computed: {
  //   ...mapGetters({
  //     search: "moduleHomePage/Search",
  //   }),
  // },
};
</script>

<style lang="scss">
@import "@/assets/scss/_variables.scss";
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
      margin-top: 32px;
    }
    .header-right {
      flex: 5;
      color: $text-grey;
      .sort-option {
        height: 60px;
        background-color: $bg-grey-1;
      }
      .sort-title {
        font-size: 14px;
      }
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
  .key-filter {
    span {
      color: $primary;
    }
  }
}
</style>