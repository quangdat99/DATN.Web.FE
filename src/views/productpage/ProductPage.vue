<template>
  <div class="product-page flex flex-column">
    <div class="product-navigation">
      <a :href="homepage">Trang chủ /</a> {{ product.product_name }}
    </div>
    <div class="product-page-content flex flex-row">
      <div class="product-page-image-container flex-column">
        <div class="list-product-image">
          <base-thumbnail-slider :listSlider="listSlider">
          </base-thumbnail-slider>
        </div>
      </div>
      <div class="product-page-infor flex flex-column">
        <div class="product-infor d-flex mb-4">
          <div
            class="outstanding mr-4 fs-12 color-white"
            v-if="product.outstanding > 5"
          >
            Nổi bật
          </div>
          <div class="product-infor-name">
            {{ product.product_name }}
          </div>
        </div>
        <div class="d-flex mb-4">
          <div class="rating d-flex mr-4">
            <div class="rate-text mr-3 fs-16 color-primary">
              {{ product.rate }}
            </div>
            <star-rating
              :rating="product.rate"
              :increment="0.01"
              :star-size="15"
              read-only
              :show-rating="false"
              active-color="#C20000"
              :padding="2"
            ></star-rating>
          </div>
          <div class="count-comment d-flex pl-4 bl-grey mr-4">
            <div class="count-cm mr-2">{{ product.count_comment }}</div>
            <div class="text-cm txt-grey-2">Đánh Giá</div>
          </div>
          <div class="count-order d-flex pl-4 bl-grey">
            <div class="count-ord mr-2">{{ product.count_order }}</div>
            <div class="text-ord txt-grey-2">Đã Bán</div>
          </div>
        </div>
        <div class="ml-4">
          <div class="d-flex align-center mb-4">
            <div
              class="product-detail product-old-price mr-4"
              v-if="product.sale_price_old > 0"
            >
              {{ formatVND(product.sale_price_old) }}
            </div>
            <div
              class="product-detail product-price mr-4"
              v-if="
                product.sale_price_min == product.sale_price_max &&
                product.sale_price_min > 0
              "
            >
              {{ formatVND(product.sale_price_min) }}
            </div>
            <div
              class="d-flex mr-4"
              v-if="
                product.sale_price_min != product.sale_price_max &&
                product.sale_price_min > 0
              "
            >
              <div class="product-detail product-price">
                {{ formatVND(product.sale_price_min) }}
              </div>
              <div class="product-detail product-price">&nbsp;-&nbsp;</div>
              <div class="product-detail product-price">
                {{ formatVND(product.sale_price_max) }}
              </div>
            </div>
            <div class="discount" v-if="product.product_discount > 0">
              {{ product.product_discount }}% GIẢM
            </div>
          </div>
          <div class="product-infor-type flex flex-row flex-between">
            <div class="product-detail-title">Màu sắc</div>
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
          <div class="product-infor-type flex flex-row flex-between">
            <div class="product-detail-title">Size</div>
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
          <div class="product-infor-quantity mb-4 flex flex-row flex-between">
            <div class="product-detail-title">Số lượng</div>
            <div class="product-detail-content">
              <vue-number-input
                v-model="value"
                :min="1"
                :max="product.total_quantity"
                size="small"
                inline
                controls
              >
              </vue-number-input>
            </div>
          </div>
          <div class="product-infor-placement flex flex-row">
            <div class="btn-add-to-cart mr-4">
              <div class="icon24 add-to-cart mr-3"></div>
              <div class="add-to-cart-text">Thêm Vào Giỏ Hàng</div>
            </div>
            <div class="buy-now">Mua Ngay</div>
          </div>
        </div>
      </div>
    </div>
    <div class="product-genaral flex-row">
      <div class="product-description-container flex4">
        <div class="product-description flex-column" v-if="countAttributes > 0">
          <div class="product-description-info">
            <div class="title-info">THÔNG TIN SẢN PHẨM</div>
            <div class="product-list-info flex flex-column">
              <div
                v-for="(attr, index) in attributes"
                :key="index"
                class="flex flex-row list-information-item fs-16 mb-4"
              >
                <div class="flex1 txt-grey-2">
                  {{ attr.attribute_title }}
                </div>
                <div class="flex4">
                  {{ attr.attribute_value }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="product-description-main mt-4">
          <div class="product-description-title">MÔ TẢ SẢN PHẨM</div>
          <div
            class="product-description-detail"
            v-if="product.description"
            v-html="product.description"
          ></div>
          <div class="product-description-detail" v-if="!product.description">
            Chưa có mô tả chi tiết sản phẩm
          </div>
        </div>

        <div class="product-page-rate mt-4">
          <div class="product-page-rate-title grid-title">
            ĐÁNH GIÁ SẢN PHẨM
          </div>
          <div class="product-page-rate-content" v-if="product.rate > 0">
            <div class="option-rate">
              <div class="rate-info flex-column flex1">
                <div class="flex-row">
                  <div class="rate-real">{{ product.rate }}</div>
                  <div class="sub">&nbsp; trên 5</div>
                </div>
                <star-rating
                  :rating="product.rate"
                  :increment="0.01"
                  :star-size="24"
                  read-only
                  :show-rating="false"
                  active-color="#C20000"
                  :padding="2"
                ></star-rating>
              </div>
              <div class="rate-search ml-4 flex4">
                <div class="flex-column">
                  <div class="list-option">
                    <div
                      class="option-item"
                      :class="{
                        active: item.active,
                      }"
                      v-for="(item, i) in listRateOption"
                      :key="i"
                      @click="chooseOptionRate(item.title, item.active)"
                    >
                      {{ item.title }}
                      <div class="icon-stick"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="review-content">
              <div class="comment-item flex-row">
                <div class="cmt-avatar ml-4">
                  <img src="~@/assets/images/user.png" alt="" />
                </div>
                <div class="cmt-content ml-4">
                  <div class="cmt-user-name mt-2">kimngandiu</div>
                  <div class="rate-cmt mt-2">
                    <star-rating
                      :rating="5"
                      :increment="1"
                      :star-size="12"
                      read-only
                      :show-rating="false"
                      active-color="#C20000"
                      :padding="2"
                    ></star-rating>
                  </div>
                  <div class="sub-info d-flex mt-2">
                    <div class="date">2022-10-26 19:40</div>
                    <div class="category ml-2">
                      | Phân loại hàng: Vàng,size 6 (23 - 28kg)
                    </div>
                  </div>

                  <div class="content-body mt-2">
                    Áo đẹp lắm ạ, nhẹ, form dáng chuẩn, có chống nước bé rất
                    thích, shop giao hàng nhanh. Sẽ ủng hộ tiếp ạ 0:15
                  </div>
                  <div class="image-cmt mt-4">
                    <img src="~@/assets/images/logo.jpg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="product-page-rate-content txt-grey-2"
            v-if="product.rate == 0"
          >
            chưa có đánh giá nào
          </div>
        </div>
        <div
          class="product-page-relation mt-4 mb-4"
          v-if="listProductRelationCount > 0"
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
      <div
        class="ml-4 mt-4 flex-column relation-content-sell"
        v-if="listProductRelationSellCount > 0"
      >
        <div class="title-relation-sell txt-grey-2 fs-14">Top Sản Phẩm Bán Chạy</div>
        <product-card
          v-for="(relation, index) in listProductRelationSell"
          :key="index"
          :product="relation"
        ></product-card>
      </div>
    </div>
    <!-- <div class="product-page-relation">
      <div class="product-page-relation-title grid-title">
        <div>Sản phẩm liên quan</div>
      </div>
      <div class="product-page-relation-content">
        <grid-relation-product-card
          :listProduct="listProductRelation"
        ></grid-relation-product-card>
      </div>
    </div> -->
  </div>
</template>

<script>
import { onMounted, ref, getCurrentInstance, computed } from "vue";
import BaseSlider from "@/components/slider/slider.vue";
import BaseThumbnailSlider from "@/components/slider/thumbnailslider.vue";
import BaseMultiButton from "@/components/button/BaseMultiButton.vue";
import BaseButton from "@/components/button/BaseButton.vue";
import VueNumberInput from "@chenfengyuan/vue-number-input";
import StarRating from "vue-star-rating";
import BaseInput from "@/components/input/BaseInput.vue";
import GridRelationProductCard from "@/components/card/GridRelationProductCard.vue";
import ProductAPI from "@/apis/components/productAPI";
import { useFormat } from "@/commons/format.js";
import { useRoute } from "vue-router";
import ProductCard from "@/components/card/ProductCard.vue";

export default {
  components: {
    BaseSlider,
    BaseThumbnailSlider,
    BaseMultiButton,
    VueNumberInput,
    BaseButton,
    StarRating,
    BaseInput,
    GridRelationProductCard,
    ProductCard,
  },
  async setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const route = useRoute();
    const { formatVND } = useFormat();
    const isChoosed = ref(false);
    const colors = ref([]);
    const sizes = ref([]);
    const product = ref({});
    const attributes = ref([]);

    const homepage = ref();
    const product_name = ref("Bánh bơ trứng Richy gói 270g");
    const listSlider = ref([]);
    const value = ref(1);
    const rateComments = ref([
      {
        option: "Tất cả",
      },
      {
        option: "5 Sao (117)",
      },
      {
        option: "4 Sao (6)",
      },
      {
        option: "3 Sao (2)",
      },
      {
        option: "2 Sao (1107)",
      },
      {
        option: "1 Sao (2)",
      },
      {
        option: "Có Bình Luận (54)",
      },
      {
        option: "Có Hình Ảnh (41)",
      },
    ]);

    const countAttributes = computed(() => {
      return attributes.value.length;
    });

    const descriptionInformation = ref([
      {
        title: "Xuất xứ",
        content: "United Kingdom",
      },
      {
        title: "Thành Phần",
        content:
          "Cider (nước ép táo lên men với sucrose), nước, siro, màu caramel (E150a), chất điều chỉnh độ acid (E296), khí carbonate, chất bảo quản Kali Metabisulfit (E224), hương táo tự nhiên",
      },
      {
        title: "Hướng Dẫn Sử Dụng",
        content: "Sử dụng trực tiếp. Ngon hơn khi dùng với đá",
      },
      {
        title: "Bảo Quản",
        content: "Để nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp",
      },
    ]);

    const rating = ref(0);

    const listProductRelation = ref([]);
    const listProductRelationCount = ref(0);
    const listProductRelationSell = ref([]);
    const listProductRelationSellCount = ref(0);
    const listRateOption = ref([]);

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
    onMounted(async () => {
      window.proxy = proxy;
      // let productId = proxy.$store.state["moduleProductPage"].productId;
      let query = route.query;
      let productId = query.id;

      const data = await proxy.$store.dispatch(
        "moduleProductPage/updateProduct",
        productId
      );
      product.value = data;
      colors.value = handleOption(data.colors);
      sizes.value = handleOption(data.sizes);
      attributes.value = data.attributes;
      homepage.value = "/";
      // Gán ảnh cho sản phẩm
      if (product.value && product.value.productDetails) {
        if (Array.isArray(product.value.productDetails)) {
          product.value.productDetails.forEach((item) => {
            if (item.img_url) {
              listSlider.value.push({
                src: item.img_url,
              });
            }
          });
        } else {
          listSlider.value.push({
            src: product.value.img_url,
          });
        }
      }

      // Sp liên quan sắp xếp theo mới nhất đến cũ
      const dataRelation = await ProductAPI.getProductRelation(
        data.product_id,
        1
      );

      // Sp liên quan sắp xếp theo bán chạy
      const dataRelationSell = await ProductAPI.getProductRelation(
        data.product_id,
        2
      );
      // Gán sản phẩm liên quan
      listProductRelation.value = dataRelation;
      listProductRelationSell.value = dataRelationSell;
      listProductRelationCount.value = listProductRelation.value.length;
      listProductRelationSellCount.value = listProductRelationSell.value.length;

      // Các option đánh giá của sản phẩm
      listRateOption.value = await ProductAPI.getRateOption(data.product_id);
    });

    function chooseColor(value, active) {
      colors.value.forEach((x) => (x.active = false));
      let item = colors.value.find((x) => x.option == value);
      if (item) {
        item.active = !active;
      }
    }

    function chooseSize(value, active) {
      sizes.value.forEach((x) => (x.active = false));
      let item = sizes.value.find((x) => x.option == value);
      if (item) {
        item.active = !active;
      }
    }
    return {
      homepage,
      product_name,
      listSlider,
      value,
      descriptionInformation,
      rating,
      listProductRelation,
      listProductRelationSell,
      listProductRelationCount,
      listProductRelationSellCount,
      product,
      attributes,
      countAttributes,
      formatVND,
      isChoosed,
      colors,
      sizes,
      chooseColor,
      chooseSize,
      rateComments,
      listRateOption,
    };
  },
};
</script>

<style lang="scss">
@import "./ProductPage.scss";
</style>