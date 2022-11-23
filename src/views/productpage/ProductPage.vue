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
    <div class="product-page-description">
      <div class="product-page-description-title flex flex-row grid-title">
        <div class="flex5">Mô tả</div>
        <div class="flex2">Thông tin</div>
      </div>
      <div class="product-page-description-content flex flex-row">
        <div
          class="product-page-description-main flex5"
          v-html="description"
        ></div>
        <div class="product-page-description-information flex2">
          <div class="product-description-list-information flex flex-column">
            <div
              v-for="(information, index) in descriptionInformation"
              :key="index"
              class="flex flex-row list-information-item fw-400"
            >
              <div class="flex2">
                {{ information.title }}
              </div>
              <div class="flex1">
                {{ information.content }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="product-page-rate">
      <div class="product-page-rate-title grid-title">
        <div>Đánh giá sản phẩm</div>
      </div>
      <div class="product-page-rate-content">
        <div class="review-content"></div>
        <div class="product-rate-form flex flex-column">
          <div class="rate-star flex flex-row product-rate-item flex-center">
            <div class="rate-start-title flex1 product-rate-title">
              Đánh giá <span class="color-red">*</span>
            </div>
            <div class="flex5">
              <star-rating
                :rating="rating"
                :increment="0.5"
                :star-size="25"
                :show-rating="false"
              ></star-rating>
            </div>
          </div>
          <div
            class="name-customer flex flex-row flex-center product-rate-item"
          >
            <div class="name-customer-title flex1 product-rate-title">
              Khách hàng <span class="color-red">*</span>
            </div>
            <div class="name-customer-input flex5">
              <base-input placeholder="Nhập tên khách hàng..."></base-input>
            </div>
          </div>
          <div
            class="email-customer flex flex-row flex-center product-rate-item"
          >
            <div class="email-customer-title flex1 product-rate-title">
              Email
            </div>
            <div class="email-customer-input flex5">
              <base-input placeholder="Nhập email..."></base-input>
            </div>
          </div>
          <div
            class="phone-customer flex flex-row flex-center product-rate-item"
          >
            <div class="phone-customer-title flex1 product-rate-title">
              Điện thoại <span class="color-red">*</span>
            </div>
            <div class="phone-customer-input flex5">
              <base-input placeholder="Nhập số điện thoại..."></base-input>
            </div>
          </div>
          <div
            class="topic-customer flex flex-row flex-center product-rate-item"
          >
            <div class="topic-customer-title flex1 product-rate-title">
              Tiêu đề <span class="color-red">*</span>
            </div>
            <div class="topic-customer-input flex5">
              <base-input placeholder="Nhập tiêu đề..."></base-input>
            </div>
          </div>
          <div
            class="content-customer flex flex-row flex-center product-rate-item"
          >
            <div class="content-customer-title flex1 product-rate-title">
              Nội dung <span class="color-red">*</span>
            </div>
            <div class="content-customer-input flex5">
              <base-input placeholder="Nhập nội dung..."></base-input>
            </div>
          </div>
          <div class="flex button-rate flex-row">
            <div class="flex1"></div>
            <div class="flex5">
              <base-button text="ĐÁNH GIÁ" customClass="white btn-padding ">
              </base-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="product-page-relation">
      <div class="product-page-relation-title grid-title">
        <div>Sản phẩm liên quan</div>
      </div>
      <div class="product-page-relation-content">
        <grid-relation-product-card
          :listProduct="productRelationProducts"
        ></grid-relation-product-card>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, getCurrentInstance } from "vue";
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
  },
  async setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const route = useRoute();
    const { formatVND } = useFormat();
    const isChoosed = ref(false);
    const colors = ref([]);
    const sizes = ref([]);
    const product = ref({});

    const homepage = ref();
    const product_name = ref("Bánh bơ trứng Richy gói 270g");
    const listSlider = ref([]);
    const value = ref(1);
    const description =
      ref(`<h2>Nước táo lên men Strongbow Apple Ciders Red Berries chai 330ml (Vị dâu đỏ)</h2>
    <br/>
    <h3>Thông tin sản phẩm</h3><br/>
    <strong>Nước táo lên men Strongbow Apple Ciders Red Berries chai 330ml(Vị dâu đỏ)</strong> là loại thức uống có nguồn gốc từ châu Âu và đã phổ biến toàn cầu với cách thức chế biến đầy ấn tượng từ quá trình lên men táo tự nhiên, mang đến chất men thuần khiết và hài hòa.<br/>
    <br/>
    <strong>Nước táo lên men Strongbow Apple Ciders Red Berries chai 330ml(Vị dâu đỏ)</strong> phù hợp sử dụng trong những bữa tiệc đồ nướng, hải sản, lẩu, những dịp tụ tập, gặp mặt bạn bè hay khi đi du lịch, dã ngoại… Sản phẩm mang đến những trải nghiệm vị giác mới mẻ, đầy thú vị.<br/>
    <br/>
    <strong>Hướng dẫn sử dụng:</strong>
  <br/>
  <ol>
  <li data-list="bullet">Dùng trực tiếp, ngon hơn dùng với đá.</li>
  <li data-list="bullet">Sản phẩm dành cho người trên 18 tuổi.</li>
  <li data-list="bullet">Không dành cho phụ nữ mang thai.</li>
  <li data-list="bullet">Đã uống đồ uống có cồn thì không lái xe</li>
  </ol>
  <strong>Hướng dẫn bảo quản:</strong>
  <br/>
  <ol>
  <li data-list="bullet">Bảo quản nơi sạch sẽ, khô ráo thoáng mát.</li>
  <li data-list="bullet">Tránh ánh nắng mặt trời.</li>
  <li data-list="bullet">Tránh bị đông đá.</li>
  </ol>

  <strong>Lưu ý:</strong>
  <p><strong>- Hạn sử dụng thực tế quý khách vui lòng xem trên bao bì.</strong></p>
  <p><strong>- Hình sản phẩm chỉ mang tính chất minh họa, hình thực tế bao bì của sản phẩm tùy thời điểm sẽ khác so với thực tế.</strong></p>  
`);

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

    const productRelationProducts = ref();

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
      // Gán sản phẩm liên quan
      productRelationProducts.value = product.value.relationProduct;
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
      description,
      descriptionInformation,
      rating,
      productRelationProducts,
      product,
      formatVND,
      isChoosed,
      colors,
      sizes,
      chooseColor,
      chooseSize,
    };
  },
};
</script>

<style lang="scss">
@import "./ProductPage.scss";
</style>