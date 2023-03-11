<template>
  <div class="product-card">
    <div class="card flex-column" @click="cardClick">
      <div class="card-top">
        <div class="card-sub-information" v-if="product.product_discount > 0">
          <div class="info-discount">
            <div class="product-discount">{{ product.product_discount }}%</div>
            <div class="dis-text">GIẢM</div>
          </div>
        </div>
        <div class="card-sub-outstanding" v-if="product.outstanding >= 8">
          <div class="info-outstanding">
            <div class="product-outstanding">Nổi bật</div>
          </div>
        </div>
        <div class="card-image">
          <img
            v-if="productImg"
            :src="productImg"
            alt=""
            style="width: 100%; height: 100%"
          />
          <img
            v-if="!productImg"
            src="~@/assets/images/product_empty.png"
            alt=""
            style="width: 100%; height: 100%"
          />
        </div>
      </div>
      <div class="card-bottom">
        <div class="card-name">
          {{ product.product_name }}
        </div>
        <div
          class="card-detail-information row-amount"
          v-if="product.count_detail == 1"
        >
          <span
            class="product-detail product-old-price mr-2"
            v-if="product.sale_price_old > 0"
          >
            {{ formatVND(product.sale_price_old) }}
          </span>
          <span
            class="product-detail product-price"
            v-if="product.sale_price_min"
          >
            {{ formatVND(product.sale_price_min) }}
          </span>
        </div>
        <div
          class="card-detail-information row-amount"
          v-if="product.count_detail > 1"
        >
          <span
            class="product-detail product-price product-old-price mr-2"
            v-if="
              product.sale_price_old > 0 &&
              product.sale_price_min == product.sale_price_max
            "
          >
            {{ formatVND(product.sale_price_old) }}
          </span>
          <span
            class="product-detail product-price"
            v-if="
              product.sale_price_min == product.sale_price_max &&
              product.sale_price_min > 0
            "
          >
            {{ formatVND(product.sale_price_min) }}
          </span>
          <div
            class="d-flex row-amount"
            v-if="
              product.sale_price_min != product.sale_price_max &&
              product.sale_price_min > 0
            "
          >
            <span class="product-detail product-price">
              {{ formatVND(product.sale_price_min) }}
            </span>
            <span class="product-detail product-price">&nbsp;-&nbsp;</span>
            <span class="product-detail product-price">
              {{ formatVND(product.sale_price_max) }}
            </span>
          </div>
        </div>
        <div class="d-flex">
          <div class="product-rating mr-1">
            <star-rating
              :rating="product.rate"
              :increment="0.01"
              :star-size="12"
              read-only
              :show-rating="false"
            ></star-rating>
          </div>
          <div class="count-order" v-if="product.count_order > 0">
            Đã bán {{ product.count_order }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/button/BaseButton.vue";
import { computed, getCurrentInstance, watch } from "vue";
import { useFormat } from "@/commons/format.js";
import { useToast } from "primevue/usetoast";
import StarRating from "vue-star-rating";

export default {
  name: "ProductCard",
  components: {
    BaseButton,
    StarRating,
  },
  props: {
    product: {
      type: Object,
      default: {},
    },
  },
  emits: ["cardClick"],
  setup(props, { emit }) {
    const toast = useToast();
    const { proxy } = getCurrentInstance();
    const { formatVND } = useFormat();
    const cardClick = (e) => {
      proxy.$router.push({
        path: "/product",
        query: { id: props.product.product_id },
      });
      proxy.$store.dispatch(
        "moduleProductPage/updateProductId",
        props.product.product_id
      );
    };

    watch(
      () => proxy.$router.currentRoute.value.fullPath,
      (newVal, oldVal) => {
        if (newVal != oldVal && newVal && newVal.includes("/product")) {
          proxy.$router.go();
        }
      }
    );

    const productImg = computed(() => {
      if (props.product.img_url) {
        let arr = props.product.img_url?.split(";");
        arr = arr.filter((x) => x != "");
        return arr[0];
      }
      return null;
    });

    return {
      cardClick,
      formatVND,
      productImg,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./ProductCard.scss";
</style>