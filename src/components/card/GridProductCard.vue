<template>
  <div class="grid-product-card">
    <div class="grid-product-card-header">
      <div class="header-left" v-if="search">
        <div class="icon24 filter mr-2"></div>
        <div class="title-filter fw-600 txt-grey">BỘ LỌC TÌM KIẾM</div>
      </div>
      <div class="header-right" v-if="search">
        <div class="key-filter-container d-flex mb-2" v-if="model.keyword">
          <div class="icon24 research mr-2"></div>
          <div class="key-filter">
            Kết quả tìm kiếm cho từ khoá "<span>{{ model.keyword }}</span
            >"
          </div>
        </div>
        <div class="sort-option d-flex align-center">
          <div class="sort-title ml-4 mr-2">Sắp xếp theo</div>
          <base-button
            text="Mới nhất"
            class="mr-2"
            :type="model.sort == 1 ? 'primary' : 'white'"
            @click="updateSort(1)"
          ></base-button>
          <base-button
            text="Bán chạy"
            class="mr-2"
            :type="model.sort == 2 ? 'primary' : 'white'"
            @click="updateSort(2)"
          ></base-button>
          <base-dropdown
            valueField="id"
            displayField="content"
            placeholder="Giá"
            :listDropdownData="[
              { content: 'Giá: Thấp đến cao', id: 3 },
              { content: 'Giá: Cao đến thấp', id: 4 },
            ]"
            :chosenValue="model.sort"
            @update:modelValue="updateSort"
          >
          </base-dropdown>
          <div class="paging d-flex flex1" style="flex-direction: row-reverse">
            <div class="paging-btn d-flex align-center">
              <div class="mr-4">
                <span class="color-primary">{{ model.page + 1 }}</span>
                <span class="black">/{{ paging.totalPage }}</span>
              </div>
              <base-button
                class="mr-1"
                leftIcon="previous-black mr-1px"
                classIcon="mr-1px"
                type="white"
                :disabled="model.page == 0"
                @click="updatePage(model.page - 1)"
              ></base-button>
              <base-button
                class="mr-3"
                leftIcon="next-black mr-1px"
                type="white"
                :disabled="model.page == paging.totalPage - 1"
                @click="updatePage(model.page + 1)"
              ></base-button>
            </div>
          </div>
        </div>
      </div>
      <div class="header-right" v-if="!search">Gợi ý sản phẩm</div>
    </div>
    <div class="container-grid mb-4">
      <div class="container-filter" v-if="search">
        <div class="group-filter">
          <div class="title-ft fs-14 black">Đánh Giá</div>
          <div class="container-ft ml-2">
            <div
              class="container-rating d-flex align-center cursor-pointer mt-2"
              @click="updateRating(6 - i)"
              v-for="i in 5"
              :key="i"
              :class="[model.rating == 6 - i ? 'active' : '']"
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
              <base-number
                :min="0"
                placeholder="&#8363; Từ"
                :width="80"
                v-model="data.fromAmount"
              ></base-number>
              <span class="ml-1 mr-1 mt-2">-</span>
              <base-number
                :min="0"
                placeholder="&#8363; Đến"
                :width="80"
                v-model="data.toAmount"
              ></base-number>
            </div>
            <div class="txt-error fs-11 mt-3" v-if="errorAmount">
              Vui lòng điền khoảng giá phù hợp
            </div>
            <div class="d-flex mt-4">
              <base-button
                text="ÁP DỤNG"
                class="w-100"
                @click="updateAmount()"
              ></base-button>
            </div>
          </div>
        </div>
        <div class="group-filter mt-4 mr-4">
          <div class="title-ft fs-14 black">Theo Danh Mục</div>
          <div
            class="container-ft mt-4"
            v-for="(category, i) in listCategory"
            :key="i"
          >
            <base-checkbox
              class="mt-1"
              :modelValue="category.selected"
              :label="category.category_name"
              @change="
                updateCategory(!category.selected, category.category_code)
              "
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
    <div
      class="paging-container d-flex justify-center mb-4"
      v-if="paging.totalPage > 1 && search"
    >
      <grid-product-paging
        :pageNumber="model.page"
        :totalPage="paging.totalPage"
        @updatePage="updatePage"
      ></grid-product-paging>
    </div>
    <div class="option-filter d-flex justify-center mb-4" v-if="!search">
      <base-button
        text="Xem thêm sản phẩm"
        :width="300"
        @click="searchProduct()"
      ></base-button>
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
import BaseDropdown from "../dropdown/BaseDropdown.vue";
import GridProductPaging from "./GridProductPaging.vue";
export default defineComponent({
  name: "GridProductCard",
  components: {
    ProductCard,
    BaseButton,
    MenuItem,
    StarRating,
    BaseDropdown,
    GridProductPaging,
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
    listCategory: {
      type: Array,
      default: [],
    },
    paging: {
      type: Object,
      default: null,
    },
  },
  emits: [
    "update:model",
    "update:listCategory",
    "update:sort",
    "update:page",
    "updateStatusSearch",
  ],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const data = ref({});
    const errorAmount = ref(false);
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
      emit("update:model", data.value);
    };

    /**
     * thay đổi khoảng tiền
     */
    const updateAmount = () => {
      let fromAmount = data.value.fromAmount;
      let toAmount = data.value.toAmount;

      if (fromAmount == 0) {
        fromAmount = null;
      }
      if (toAmount == 0) {
        toAmount = null;
      }

      if (fromAmount && toAmount && fromAmount > toAmount) {
        errorAmount.value = true;
        return;
      }
      emit("update:model", data.value);
      errorAmount.value = false;
    };

    /**
     * Thay đổi nhóm hàng hóa
     * @param {*} selected
     * @param {*} categoryCode mã nhóm
     */
    const updateCategory = (selected, categoryCode) => {
      emit("update:listCategory", selected, categoryCode);
    };

    const updateValue = (value, field) => {
      // model.value[field] = value;
    };
    /**
     * Thay đổi sắp xếp
     */
    const updateSort = (sort) => {
      emit("update:sort", sort);
    };
    /**
     * Thay đổi trang
     */
    const updatePage = (page) => {
      emit("update:page", page);
    };

    const searchProduct = () => {
      document.getElementsByClassName(
        "main-container-content"
      )[0].scrollTop = 0;

      proxy.$router.push({ path: "search" });
      document
        .getElementsByClassName("input-filter-product")[0]
        .getElementsByTagName("input")[0]
        .focus();
      emit("updateStatusSearch", true);
      // setTimeout(() => {
      //   proxy.$router.go();
      // }, 100);
    };

    watch(
      () => props.model,
      (value) => {
        if (value !== data.value) {
          Object.assign(data.value, value);
        }
      },
      { deep: true }
    );

    return {
      sort_amount,
      updateRating,
      errorAmount,
      updateAmount,
      data,
      updateCategory,
      updateSort,
      updateValue,
      updatePage,
      searchProduct,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./GridProductCard.scss";
</style>