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
        <div class="card-image">
          <img
            :src="product.img_url"
            alt=""
            style="width: 100%; height: 100%"
          />
        </div>
      </div>
      <div class="card-bottom">
        <div class="card-name">
          {{ product.product_name }}
        </div>
        <div class="card-detail-information">
          <div
            class="product-detail product-old-price"
            v-if="product.sale_price_old > 0"
          >
            {{ formatVND(product.sale_price_old) }}
          </div>
          <div
            class="product-detail product-price"
            v-if="product.sale_price > 0"
          >
            {{ formatVND(product.sale_price) }}
          </div>
        </div>
        <div class="product-rating" v-if="product.rating > 0">
          <star-rating
            :rating="product.rating"
            :increment="0.1"
            :star-size="12"
            read-only
            :show-rating="false"
          ></star-rating>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/button/BaseButton.vue";
import { getCurrentInstance } from "vue";
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
      default: null,
    },
  },
  emits: ["cardClick"],
  setup(props, { emit }) {
    const toast = useToast();
    const { proxy } = getCurrentInstance();
    const { formatVND } = useFormat();
    const cardClick = (e) => {
      proxy.$router.push({ path: "/product" });
      proxy.$store.dispatch(
        "moduleProductPage/updateProductId",
        product.productId
      );
    };

    return {
      cardClick,
      formatVND,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./ProductCard.scss";
</style>