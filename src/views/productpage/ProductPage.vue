<template>
  <div
    class="product-page flex flex-column"
    v-if="product && product.product_id"
  >
    <div class="product-navigation">
      <a :href="homepage">Trang chủ /</a> {{ product.product_name }}
    </div>
    <div class="product-page-content flex flex-row">
      <div class="product-page-image-container flex-column">
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
              v-if="salePriceOld > 0"
            >
              {{ formatVND(salePriceOld) }}
            </div>
            <div class="d-flex align-center" v-if="!productDetail">
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
            <div class="d-flex align-center" v-if="productDetail">
              <div class="product-detail product-price mr-4">
                {{ formatVND(productDetail.sale_price) }}
              </div>
              <div class="discount" v-if="productDetail.product_discount > 0">
                {{ productDetail.product_discount }}% GIẢM
              </div>
            </div>
          </div>
          <div
            class="product-infor-type flex flex-row flex-between"
            v-if="colors.length > 0"
          >
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
          <div
            class="product-infor-type flex flex-row flex-between"
            v-if="sizes.length > 0"
          >
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
            <div class="product-detail-content flex-row align-center">
              <vue-number-input
                v-model="productQuantity"
                :min="1"
                :max="maxQuantity"
                size="small"
                inline
                controls
                @change="changeQuantity()"
              >
              </vue-number-input>
              <div class="product-detail-title ml-2">
                {{ countQuantity }} sản phẩm có sẵn
              </div>
            </div>
          </div>
          <div class="product-infor-placement flex flex-row">
            <div class="btn-add-to-cart mr-4" @click="addToCart()">
              <div class="icon24 add-to-cart mr-3"></div>
              <div class="add-to-cart-text">Thêm Vào Giỏ Hàng</div>
            </div>
            <div class="buy-now" @click="clickBuy()">Mua Ngay</div>
          </div>
        </div>
      </div>
    </div>
    <div class="product-genaral flex-row">
      <div class="product-description-container flex4">
        <div
          class="product-description flex-column mt-4"
          v-if="countAttributes > 0"
        >
          <div class="product-description-info">
            <div class="title-info">THÔNG TIN SẢN PHẨM</div>
            <div class="product-list-info flex flex-column">
              <div
                v-for="(attr, index) in attributes"
                :key="index"
                class="flex flex-row list-information-item fs-16 mb-4"
              >
                <div class="flex1 txt-grey-2">
                  {{ attr.attribute_name }}
                </div>
                <div class="flex4">
                  {{ attr.value }}
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

        <div class="product-page-rate mt-4 mb-4">
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
                      @click="chooseOptionRate(item.rateCode, item.active)"
                    >
                      {{ item.title }}
                      <div class="icon-stick"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="review-content" v-if="countComment > 0">
              <div
                class="comment-item flex-row"
                v-for="(comment, i) in listCommentProduct"
                :key="i"
              >
                <div class="cmt-avatar ml-4">
                  <img
                    :src="
                      comment.avatar
                        ? comment.avatar
                        : '~@/assets/images/user.png'
                    "
                    alt=""
                  />
                </div>
                <div class="cmt-content ml-4">
                  <div class="cmt-user-name mt-2">
                    {{ parseEmailToName(comment.email) }}
                  </div>
                  <div class="rate-cmt mt-2">
                    <star-rating
                      :rating="comment.rate"
                      :increment="1"
                      :star-size="12"
                      read-only
                      :show-rating="false"
                      active-color="#C20000"
                      :padding="2"
                    ></star-rating>
                  </div>
                  <div class="sub-info d-flex mt-2">
                    <div class="date">
                      {{ formatDate(comment.created_date) }}
                    </div>
                    <div class="category ml-1">
                      {{
                        commentCategory(comment.color_name, comment.size_name)
                      }}
                    </div>
                  </div>

                  <div class="content-body mt-2">
                    {{ comment.content }}
                  </div>
                  <div class="image-cmt mt-4" v-if="comment.img_url">
                    <img :src="comment.img_url" alt="" />
                  </div>
                </div>
              </div>
              <div class="paging-comment">
                <grid-product-paging
                  :pageNumber="pageComment"
                  :totalPage="totalPageComment"
                  @updatePage="updatePageComment"
                ></grid-product-paging>
              </div>
            </div>
            <div class="review-content empty" v-if="countComment == 0">
              <div class="img-empty-comment"></div>
              <div class="empty-text mt-4">Chưa có đánh giá</div>
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
          v-if="listProductRelation.length > 0"
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
        v-if="listProductRelationSell.length > 0"
      >
        <div class="title-relation-sell txt-grey-2 fs-14">
          Top Sản Phẩm Bán Chạy
        </div>
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
  <div
    class="product-page flex flex-column"
    style="min-height: 500px; align-items: center; justify-content: center"
    v-if="!product || !product.product_id"
  >
    <img src="@/assets/images/empty_cart.png" width="64" height="64" alt="" />
    <div class="text fs-16 mt-4">Không tìm thấy sản phẩm</div>
  </div>
</template>

<script>
import { onMounted, ref, getCurrentInstance, computed, watch } from "vue";
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
import moment from "moment";
import commonFn from "@/commons/commonFunction.js";
import GridProductPaging from "@/components/card/GridProductPaging.vue";
import productCartAPI from "@/apis/components/productCartAPI";

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
    GridProductPaging,
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
    const productDetail = ref(null);

    const homepage = ref();
    const listSlider = ref([]);
    const value = ref(1);
    const countAttributes = computed(() => {
      return attributes.value.length;
    });
    const rating = ref(0);

    const listProductRelation = ref([]);
    const listProductRelationSell = ref([]);
    const listRateOption = ref([]);
    const listCommentProduct = ref([]);
    const activeCommentCode = ref("All");
    const pageComment = ref(0);
    const totalPageComment = ref(1);
    const pageSizeComment = ref(3);
    const productQuantity = ref(1);

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
      if (!data) {
        // proxy.$router.push("/NotFound");
        return;
      }
      if (data.rate > 0) {
        data.rate = data.rate.toFixed(2);
      }
      product.value = data;
      colors.value = handleOption(data.colors);
      sizes.value = handleOption(data.sizes);
      if (colors.value.length == 0 && sizes.value.length == 0) {
        productDetail.value = product.value.productDetails[0];
      }
      attributes.value = data.attributes;
      homepage.value = "/";
      // Gán ảnh cho sản phẩm
      if (product.value && product.value.productDetails) {
        if (Array.isArray(product.value.productDetails)) {
          product.value.productDetails.forEach((item) => {
            if (
              item.img_url &&
              !listSlider.value.some((x) => x.src == item.img_url)
            ) {
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

      getProductRelation(data.product_id);
      getProductRelationSell(data.product_id);
      getRateOption(data.product_id);
      getCommentProduct(data.product_id);
    });

    /**
     * Các option đánh giá của sản phẩm
     */
    async function getCommentProduct(productId) {
      let payload = {
        product_id: productId,
        filterCode: activeCommentCode.value,
        pageNumber: pageComment.value,
        pageSize: pageSizeComment.value,
      };
      commonFn.mask();
      let listData = await ProductAPI.getCommentProduct(payload);
      if (listData) {
        listCommentProduct.value = listData;
        if (listData.length > 0) {
          totalPageComment.value = Math.ceil(
            listData[0].count_comment / pageSizeComment.value
          );
        }
      }
      commonFn.unmask();
    }

    /**
     * Các option đánh giá của sản phẩm
     */
    async function getRateOption(productId) {
      listRateOption.value = await ProductAPI.getRateOption(productId);
    }

    /**
     * Sp liên quan theo đơn hàng
     */
    async function getProductRelation(productId) {
      const dataRelation = await ProductAPI.getProductRelationOrder(productId);
      if (dataRelation) {
        listProductRelation.value = dataRelation;
      }
    }

    /**
     * Sp liên quan sắp xếp theo bán chạy
     */
    async function getProductRelationSell(productId) {
      const dataRelationSell = await ProductAPI.getProductRelation(
        productId,
        2
      );
      // Gán sản phẩm liên quan
      if (dataRelationSell) {
        listProductRelationSell.value = dataRelationSell;
      }
    }

    function chooseColor(value, active) {
      colors.value.forEach((x) => (x.active = false));
      let item = colors.value.find((x) => x.option == value);
      if (item) {
        item.active = !active;
      }
      filterProductDetail();
    }

    function chooseSize(value, active) {
      sizes.value.forEach((x) => (x.active = false));
      let item = sizes.value.find((x) => x.option == value);
      if (item) {
        item.active = !active;
      }
      filterProductDetail();
    }

    function filterProductDetail() {
      productDetail.value = null;
      let color = colors.value.find((x) => x.active == true);
      let size = sizes.value.find((x) => x.active == true);
      if (product.value.count_detail == 1) {
        if (color) {
          productDetail.value = product.value.productDetails.find(
            (x) => x.color_name == color.option
          );
        } else if (size) {
          productDetail.value = product.value.productDetails.find(
            (x) => x.size_name == size.option
          );
        }
      } else if (product.value.count_detail > 1) {
        if (color && size) {
          productDetail.value = product.value.productDetails.find(
            (x) => x.color_name == color.option && x.size_name == size.option
          );
        }
      }
    }

    const salePriceOld = computed(() => {
      if (productDetail.value) {
        return productDetail.value.sale_price_old;
      }
      return product.value.sale_price_old;
    });

    const maxQuantity = computed(() => {
      if (productDetail.value) {
        return productDetail.value.quantity;
      }
      return product.value.total_quantity;
    });

    watch(maxQuantity, (value) => {
      if (productQuantity.value > value) {
        productQuantity.value = value;
      }
    });

    const changeQuantity = () => {
      if (!(productQuantity.value > 0)) {
        productQuantity.value = 1;
      }
    };

    function commentCategory(color, size) {
      if (color) {
        if (size) {
          return `| Phân loại hàng: ${color}, ${size}`;
        } else {
          return `| Phân loại hàng: ${color}`;
        }
      } else {
        if (size) {
          return `| Phân loại hàng: ${size}`;
        } else {
          return null;
        }
      }
    }
    function parseEmailToName(email) {
      return email.split("@")[0];
    }
    function formatDate(date) {
      return moment(date).format("MM/DD/YYYY hh:mm");
    }
    async function chooseOptionRate(rateCode, active) {
      pageComment.value = 0;
      listRateOption.value.forEach((x) => (x.active = false));
      let item = listRateOption.value.find((x) => x.rateCode == rateCode);
      if (item) {
        item.active = !active;
        activeCommentCode.value = item.rateCode;
      }
      commonFn.mask();
      await getCommentProduct(product.value.product_id);
      commonFn.unmask();
    }
    const countComment = computed(() => {
      return listCommentProduct.value.length;
    });

    const updatePageComment = (page) => {
      pageComment.value = page;
      getCommentProduct(product.value.product_id);
    };

    const addToCart = () => {
      let data = proxy.$store.state["moduleContext"];
      if (!data.Token || data.Context.role != 1) {
        proxy.$router.push("/login");
        return;
      }
      if (!(productQuantity.value > 0)) {
        proxy.$toast.warning("Vui lòng chọn số lượng sản phẩm");
        return;
      }
      if (productDetail.value) {
        let payload = {
          quantity: productQuantity.value,
          product_detail_id: productDetail.value.product_detail_id,
          product_id: productDetail.value.product_id,
        };
        productCartAPI.addToCart(payload).then(() => {
          proxy.$toast.success("Sản phẩm đã được thêm vào Giỏ hàng");
          proxy.$store.dispatch("moduleCart/updateCart");
        });
      } else {
        proxy.$toast.warning("Vui lòng chọn phân loại sản phẩm");
      }
    };
    const countQuantity = computed(() => {
      if (productDetail.value) {
        return productDetail.value.quantity;
      } else {
        let quantity = 0;
        if (product.value && product.value.product_id) {
          product.value.productDetails.forEach((item) => {
            quantity += item.quantity;
          });

          return quantity;
        } else {
          return 0;
        }
      }
    });

    const clickBuy = () => {
      let data = proxy.$store.state["moduleContext"];
      if (!data.Token || data.Context.role != 1) {
        proxy.$router.push("/login");
        return;
      }
      if (!(productQuantity.value > 0)) {
        proxy.$toast.warning("Vui lòng chọn số lượng sản phẩm");
        return;
      }
      if (productDetail.value) {
        let products = [
          {
            quantity: productQuantity.value,
            product_detail_id: productDetail.value.product_detail_id,
            product_id: productDetail.value.product_id,
            product_name: product.value.product_name,
            size_name: productDetail.value.size_name,
            color_name: productDetail.value.color_name,
            img_url: productDetail.value.img_url,
            sale_price: productDetail.value.sale_price,
            sale_price_old: productDetail.value.sale_price_old,
          },
        ];
        proxy.$store.commit("moduleCart/updateCheckout", products);
        proxy.$router.push("/checkout");
      } else {
        proxy.$toast.warning("Vui lòng chọn phân loại sản phẩm");
      }
    };
    return {
      homepage,
      listSlider,
      value,
      rating,
      listProductRelation,
      listProductRelationSell,
      product,
      attributes,
      countAttributes,
      formatVND,
      isChoosed,
      colors,
      sizes,
      chooseColor,
      chooseSize,
      listRateOption,
      listCommentProduct,
      commentCategory,
      parseEmailToName,
      formatDate,
      chooseOptionRate,
      countComment,
      pageComment,
      totalPageComment,
      updatePageComment,
      productDetail,
      salePriceOld,
      maxQuantity,
      productQuantity,
      addToCart,
      countQuantity,
      changeQuantity,
      clickBuy,
    };
  },
};
</script>

<style lang="scss">
@import "./ProductPage.scss";
</style>