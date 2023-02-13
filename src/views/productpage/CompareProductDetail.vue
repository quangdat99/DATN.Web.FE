<template>
  <dynamic-popup
    :width="widthForm"
    :height="600"
    class="compare-product-detail"
    title="So sánh sản phẩm"
    @beforeOpen="beforeOpen($event, close)"
  >
    <template v-slot:icon="{ close }">
      <base-combobox
        title=""
        placeholder="Nhập tìm kiếm sản phẩm"
        valueField="product_id"
        displayField="product_name"
        :data="listData"
        :chosenValue="searchId"
        :initText="searchName"
        @update:modelValue="
          (value, displayField) => {
            selectProduct(value, displayField);
            searchId = value;
            searchName = displayField;
          }
        "
        class="mr-4"
        style="width: 300px"
      ></base-combobox>
      <div class="button icon24 close" @click="close()"></div>
    </template>
    <template v-slot:content>
      <div class="flex-column h-100 popup-container">
        <div class="row-detail bg-grey">
          <div class="left-label label pl-2">Thông tin sản phẩm</div>
          <div class="flex2 color-blue">
            {{ model.product_name }}
          </div>
          <div
            class="flex2 color-blue cursor-pointer ml-4"
            v-if="model2.product_id"
            @click="clickToProduct(model2.product_id)"
          >
            {{ model2.product_name }}
          </div>
        </div>
        <div class="row-detail">
          <div class="left-label label pl-2">Hình ảnh</div>
          <div class="flex2 flex-column align-center">
            <div class="list-product-image">
              <base-thumbnail-slider
                v-if="listSlider.length > 0"
                :listSlider="listSlider"
              >
              </base-thumbnail-slider>
              <img
                class="product_empty"
                v-if="listSlider.length == 0"
                src="~@/assets/images/product_empty.png"
                alt=""
              />
            </div>
          </div>
          <div
            class="flex2 flex-column align-center ml-4"
            v-if="model2.product_id"
          >
            <div class="list-product-image">
              <base-thumbnail-slider
                v-if="listSlider2.length > 0"
                :listSlider="listSlider2"
              >
              </base-thumbnail-slider>
              <img
                class="product_empty"
                v-if="listSlider2.length == 0"
                src="~@/assets/images/product_empty.png"
                alt=""
              />
            </div>
          </div>
        </div>

        <div class="row-detail bg-grey mt-2">
          <div class="left-label label pl-2">Giá sản phẩm</div>
          <div class="flex2">
            <div class="d-flex align-center">
              <div class="d-flex align-center" v-if="!productDetail">
                <div
                  class="product-detail product-price mr-4"
                  v-if="
                    model.sale_price_min == model.sale_price_max &&
                    model.sale_price_min > 0
                  "
                >
                  {{ formatVND(model.sale_price_min) }}
                </div>
                <div
                  class="d-flex mr-4"
                  v-if="
                    model.sale_price_min != model.sale_price_max &&
                    model.sale_price_min > 0
                  "
                >
                  <div class="product-detail product-price">
                    {{ formatVND(model.sale_price_min) }}
                  </div>
                  <div class="product-detail product-price">&nbsp;-&nbsp;</div>
                  <div class="product-detail product-price">
                    {{ formatVND(model.sale_price_max) }}
                  </div>
                </div>
              </div>
              <div class="d-flex align-center" v-if="productDetail">
                <div class="product-detail product-price mr-4">
                  {{ formatVND(productDetail.sale_price) }}
                </div>
              </div>
            </div>
          </div>
          <div class="flex2 ml-4" v-if="model2.product_id">
            <div class="d-flex align-center">
              <div class="d-flex align-center" v-if="!productDetail2">
                <div
                  class="product-detail product-price mr-4"
                  v-if="
                    model2.sale_price_min == model2.sale_price_max &&
                    model2.sale_price_min > 0
                  "
                >
                  {{ formatVND(model2.sale_price_min) }}
                </div>
                <div
                  class="d-flex mr-4"
                  v-if="
                    model2.sale_price_min != model2.sale_price_max &&
                    model2.sale_price_min > 0
                  "
                >
                  <div class="product-detail product-price">
                    {{ formatVND(model2.sale_price_min) }}
                  </div>
                  <div class="product-detail product-price">&nbsp;-&nbsp;</div>
                  <div class="product-detail product-price">
                    {{ formatVND(model2.sale_price_max) }}
                  </div>
                </div>
              </div>
              <div class="d-flex align-center" v-if="productDetail2">
                <div class="product-detail product-price mr-4">
                  {{ formatVND(productDetail2.sale_price) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row-detail mt-2">
          <div class="left-label label pl-2">Màu sắc</div>
          <div class="flex2">
            <div
              class="product-infor-type flex flex-row flex-between"
              v-if="colors.length > 0"
            >
              <div class="product-detail-content">
                <div
                  class="option-item"
                  :class="{
                    active: item.active,
                  }"
                  v-for="(item, i) in colors"
                  :key="i"
                  @click="chooseColor(item.option, item.active)"
                >
                  {{ item.option }}
                  <div class="icon-stick"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex2 ml-4" v-if="model2.product_id">
            <div
              class="product-infor-type flex flex-row flex-between"
              v-if="colors2.length > 0"
            >
              <div class="product-detail-content">
                <div
                  class="option-item"
                  :class="{
                    active: item.active,
                  }"
                  v-for="(item, i) in colors2"
                  :key="i"
                  @click="chooseColor2(item.option, item.active)"
                >
                  {{ item.option }}
                  <div class="icon-stick"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row-detail bg-grey mt-2">
          <div class="left-label label pl-2">Kích cỡ</div>
          <div class="flex2">
            <div
              class="product-infor-type flex flex-row flex-between"
              v-if="sizes.length > 0"
            >
              <div class="product-detail-content">
                <div
                  class="option-item"
                  :class="{
                    active: item.active,
                  }"
                  v-for="(item, i) in sizes"
                  :key="i"
                  @click="chooseSize(item.option, item.active)"
                >
                  {{ item.option }}
                  <div class="icon-stick"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex2 ml-4" v-if="model2.product_id">
            <div
              class="product-infor-type flex flex-row flex-between"
              v-if="sizes2.length > 0"
            >
              <div class="product-detail-content">
                <div
                  class="option-item"
                  :class="{
                    active: item.active,
                  }"
                  v-for="(item, i) in sizes2"
                  :key="i"
                  @click="chooseSize2(item.option, item.active)"
                >
                  {{ item.option }}
                  <div class="icon-stick"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row-detail mt-2">
          <div class="left-label label pl-2">Chất lượng</div>
          <div class="flex2 flex-row" v-if="model.rate">
            <star-rating
              :rating="model.rate"
              :star-size="15"
              read-only
              :show-rating="false"
              active-color="#C20000"
              :padding="2"
            ></star-rating>
            <div class="rate-text ml-3 fs-14 color-primary">
              {{ model.rate }}
            </div>
          </div>
          <div class="flex2 flex-row" v-if="!model.rate">Chưa có đánh giá</div>
          <div class="flex2 ml-4 flex-row" v-if="model2.rate">
            <star-rating
              :rating="model2.rate"
              :star-size="15"
              read-only
              :show-rating="false"
              active-color="#C20000"
              :padding="2"
            ></star-rating>
            <div class="rate-text ml-3 fs-14 color-primary">
              {{ model2.rate }}
            </div>
          </div>
          <div
            class="flex2 flex-row ml-4"
            v-if="!model2.rate && model2.product_id"
          >
            Chưa có đánh giá
          </div>
        </div>
        <div class="row-detail bg-grey mt-2">
          <div class="left-label label pl-2">Đánh giá</div>
          <div class="flex2">
            {{ model.count_comment ? model.count_comment : "Chưa có" }} đánh giá
          </div>
          <div class="flex2 ml-4" v-if="model2.product_id">
            {{ model2.count_comment ? model2.count_comment : "Chưa có" }} đánh
            giá
          </div>
        </div>
        <div class="row-detail mt-2">
          <div class="left-label label pl-2">Đã bán</div>
          <div class="flex2">{{ model.count_order }}</div>
          <div class="flex2 ml-4" v-if="model2.product_id">
            {{ model2.count_order }}
          </div>
        </div>
        <div class="row-detail bg-grey mt-2">
          <div class="left-label label pl-2">Mô tả</div>
          <div class="flex2" v-html="model.description"></div>
          <div
            class="flex2 ml-4"
            v-html="model2.description"
            v-if="model2.product_id"
          ></div>
        </div>
        <div
          class="row-detail mt-2"
          :class="{ 'bg-grey': i % 2 == 1 }"
          v-for="(attr, i) in attributes"
          :key="i"
        >
          <div class="left-label label pl-2">{{ attr.attribute_name }}</div>
          <div class="flex2">{{ attr.value1 }}</div>
          <div class="flex2 ml-4">{{ attr.value2 }}</div>
        </div>
      </div>
    </template>
    <template v-slot:footer="{ close }">
      <div class="h-100 d-flex align-center flex1">
        <div class="flex1 flex-end">
          <!-- <base-button
            class="transparent"
            type="secondary"
            text="Trở lại"
            @click="close()"
          ></base-button> -->
          <base-button
            class="ml-4"
            @click="close()"
            text="Trở lại"
          ></base-button>
        </div>
      </div>
    </template>
  </dynamic-popup>
</template>
<script>
import {
  ref,
  onMounted,
  watch,
  defineComponent,
  getCurrentInstance,
  reactive,
  nextTick,
  computed,
} from "vue";
import DynamicPopup from "@/components/dynamicPopup/DynamicPopup.vue";
import commonFn from "@/commons/commonFunction.js";
import axios from "axios";
import baseDetail from "@/views/baseDetail.js";
import popupUtil from "@/commons/popupUtil";
import BaseThumbnailSlider from "@/components/slider/thumbnailslider.vue";
import StarRating from "vue-star-rating";
import { useFormat } from "@/commons/format.js";
import BaseCombobox from "@/components/combobox/BaseCombobox.vue";
import productAPI from "@/apis/components/productAPI.js";

export default {
  name: "CompareProductDetail",
  extends: baseDetail,
  components: {
    DynamicPopup,
    BaseThumbnailSlider,
    StarRating,
    BaseCombobox,
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const title = ref("");
    const { formatVND } = useFormat();
    const widthForm = ref(800);
    const model = ref({});
    const model2 = ref({});
    const listSlider = ref([]);
    const listSlider2 = ref([]);
    const productDetail = ref(null);
    const productDetail2 = ref(null);
    const colors = ref([]);
    const colors2 = ref([]);
    const sizes = ref([]);
    const sizes2 = ref([]);
    const listData = ref([]);
    const searchName = ref(null);
    const searchId = ref(null);
    const attributes = ref([]);

    onMounted(() => {});

    const beforeOpen = async (e, close) => {
      proxy.super("beforeOpen", baseDetail, e, close);
      proxy._popup =
        proxy.$vfm.dynamicModals[proxy.$vfm.dynamicModals.length - 1];
      window.proxy = proxy;
      model.value = proxy._formParam.data;

      model.value.productDetails.forEach((item) => {
        if (
          item.img_url &&
          !listSlider.value.some((x) => x.src == item.img_url)
        ) {
          listSlider.value.push({
            src: item.img_url,
          });
        }
      });

      colors.value = handleOption(model.value.colors);
      sizes.value = handleOption(model.value.sizes);

      listData.value = await productAPI.listProductCompare(
        model.value.product_id
      );

      getAttributes();
    };

    const getAttributes = () => {
      attributes.value = [];
      model.value.attributes.forEach((item) => {
        attributes.value.push({
          attribute_name: item.attribute_name,
          value1: item.value,
          value2: null,
        });
      });
      if (model2.value) {
        model2.value.attributes.forEach((item) => {
          let exist = attributes.value.find(
            (x) => x.attribute_name == item.attribute_name
          );
          if (exist) {
            exist.value2 = item.value;
          } else {
            attributes.value.push({
              attribute_name: item.attribute_name,
              value1: null,
              value2: item.value,
            });
          }
        });
      }

      attributes.value = attributes.value.sort((a, b) =>
        Comparator(a.attribute_name, b.attribute_name)
      );
    };

    function Comparator(a, b) {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    }

    const saveForm = () => {
      widthForm.value = 1600;
    };

    function handleOption(options) {
      let onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
      };
      let arr = options
        ?.split(";")
        ?.filter((x) => x != "")
        ?.filter(onlyUnique);
      if (arr) {
        arr = arr.map((x) => ({
          active: false,
          option: x,
        }));
        return arr;
      }
      return [];
    }

    function chooseColor(value, active) {
      colors.value.forEach((x) => (x.active = false));
      let item = colors.value.find((x) => x.option == value);
      if (item) {
        item.active = !active;
      }
      filterProductDetail();
    }

    function chooseColor2(value, active) {
      colors2.value.forEach((x) => (x.active = false));
      let item = colors2.value.find((x) => x.option == value);
      if (item) {
        item.active = !active;
      }
      filterProductDetail2();
    }

    function chooseSize(value, active) {
      sizes.value.forEach((x) => (x.active = false));
      let item = sizes.value.find((x) => x.option == value);
      if (item) {
        item.active = !active;
      }
      filterProductDetail();
    }

    function chooseSize2(value, active) {
      sizes2.value.forEach((x) => (x.active = false));
      let item = sizes2.value.find((x) => x.option == value);
      if (item) {
        item.active = !active;
      }
      filterProductDetail2();
    }
    function filterProductDetail() {
      productDetail.value = null;
      let color = colors.value.find((x) => x.active == true);
      let size = sizes.value.find((x) => x.active == true);
      if (model.value.count_detail == 1) {
        if (color) {
          productDetail.value = model.value.productDetails.find(
            (x) => x.color_name == color.option
          );
        } else if (size) {
          productDetail.value = model.value.productDetails.find(
            (x) => x.size_name == size.option
          );
        }
      } else if (model.value.count_detail > 1) {
        if (color && size) {
          productDetail.value = model.value.productDetails.find(
            (x) => x.color_name == color.option && x.size_name == size.option
          );
        }
      }
    }

    function filterProductDetail2() {
      productDetail2.value = null;
      let color = colors2.value.find((x) => x.active == true);
      let size = sizes2.value.find((x) => x.active == true);
      if (model2.value.count_detail == 1) {
        if (color) {
          productDetail2.value = model2.value.productDetails.find(
            (x) => x.color_name == color.option
          );
        } else if (size) {
          productDetail2.value = model2.value.productDetails.find(
            (x) => x.size_name == size.option
          );
        }
      } else if (model2.value.count_detail > 1) {
        if (color && size) {
          productDetail2.value = model2.value.productDetails.find(
            (x) => x.color_name == color.option && x.size_name == size.option
          );
        }
      }
    }
    const selectProduct = async (value, displayField) => {
      if (!displayField) {
        return;
      }
      if (value && model2.value.product_id != value) {
        let product = await productAPI.getProductInfo(value);
        model2.value = product;

        listSlider2.value = [];
        model2.value.productDetails.forEach((item) => {
          if (
            item.img_url &&
            !listSlider2.value.some((x) => x.src == item.img_url)
          ) {
            listSlider2.value.push({
              src: item.img_url,
            });
          }
        });

        if (model2.value.rate > 0) {
          model2.value.rate = model2.value.rate.toFixed(2);
        }

        colors2.value = handleOption(model2.value.colors);
        sizes2.value = handleOption(model2.value.sizes);
      }

      searchName.value = null;
      searchId.value = null;
      getAttributes();
    };
    watch(
      () => model2.value.product_id,
      (value) => {
        if (value) {
          widthForm.value = 1000;
        } else {
          widthForm.value = 800;
        }
      }
    );

    const clickToProduct = (productId) => {
      proxy.$router.push({
        path: "/product",
        query: { id: productId },
      });
      proxy.$store.dispatch("moduleProductPage/updateProductId", productId);
    };

    return {
      model,
      beforeOpen,
      widthForm,
      saveForm,
      listSlider,
      listSlider2,
      productDetail,
      productDetail2,
      formatVND,
      chooseColor,
      chooseColor2,
      chooseSize,
      chooseSize2,
      colors,
      colors2,
      sizes,
      sizes2,
      model2,
      listData,
      selectProduct,
      searchName,
      searchId,
      clickToProduct,
      attributes,
    };
  },
};
</script>
<style lang="scss">
@import "./CompareProductDetail.scss";
</style>