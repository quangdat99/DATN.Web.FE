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
          <div class="title-ft fs-14 black">Đánh Giá</div>
          <div class="container-ft ml-2">
            <div
              class="d-flex align-center cursor-pointer mt-2"
              @click="updateRating(6 - i)"
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
        <div class="group-filter mt-4 mr-4">
          <div class="title-ft fs-14 black">Khoảng Giá</div>
          <div class="container-ft mt-4">
            <div class="d-flex justify-between">
              <base-number placeholder="&#8363; Từ" :width="80"></base-number>
              <span class="ml-1 mr-1 mt-2">-</span>
              <base-number placeholder="&#8363; Đến" :width="80"></base-number>
            </div>
            <div class="d-flex mt-4">
              <base-button text="ÁP DỤNG" class="w-100"></base-button>
            </div>
          </div>
        </div>
        <div class="group-filter mt-4 mr-4">
          <div class="title-ft fs-14 black">Theo Danh Mục</div>
          <div class="container-ft mt-4">
            <base-checkbox class="mt-1" label="Áo khoác"></base-checkbox>
            <base-checkbox class="mt-2" label="Áo Hoode"></base-checkbox>
            <base-checkbox
              class="mt-2"
              label="Quần jean"
              :disabled="true"
              checked
            ></base-checkbox>
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
import {
  ref,
  onMounted,
  watch,
  defineComponent,
  getCurrentInstance,
  reactive,
} from "vue";
import { mapGetters } from "vuex";
import ProductCard from "@/components/card/ProductCard.vue";
import BaseButton from "@/components/button/BaseButton.vue";
import MenuItem from "../menu/menuitem/MenuItem.vue";
import StarRating from "vue-star-rating";
export default defineComponent({
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
    model: {
      type: Object,
      default: null,
    },
  },
  emits: ["update:model"],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const data = ref({});
    onMounted(() => {
      Object.assign(data.value, props.model);
    });
    const sort_amount = ref(null);

    /**
     * Thay đổi đánh giá
     */
    const updateRating = (rating) => {
      if (data.value.rating != rating) {
        data.value.rating = rating;
      } else {
        data.value.rating = null;
      }
    };

    watch(
      () => data.value,
      (value) => {
        if (value !== props.model) {
          emit("update:model", value);
        }
      },
      { deep: true }
    );

    return {
      sort_amount,
      data,
      updateRating,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./GridProductCard.scss";
</style>