<template>
  <div class="grid-list-product-card">
    <div class="product-container">
      <product-card
        v-for="(product, index) in productList"
        :key="index"
        :product="product"
      >
      </product-card>
    </div>
    <div class="button-action flex flex-between" v-if="productList?.length > 6">
      <div v-if="indexView == 0"></div>
      <div
        class="button-prev icon24 previous"
        @click="handleClickButtonAction(-1)"
        v-if="indexView > 0"
      ></div>
      <div
        class="button-next icon24 next"
        @click="handleClickButtonAction(1)"
        v-if="indexView + 5 < productList?.length - 1"
      ></div>
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/card/ProductCard.vue";
import { ref } from "vue";
export default {
  name: "GridRelationProductCard",
  components: {
    ProductCard,
  },
  props: {
    productList: {
      type: Object,
      default: null,
    },
  },
  setup(props, { emit }) {
    const indexView = ref(0);
    const handleClickButtonAction = (direction) => {
      if (indexView.value > 0 || direction > 0) {
        if (
          !(direction > 0 && indexView.value == props.productList.length - 1)
        ) {
          indexView.value = indexView.value + direction;
        }
      }
    };
    return {
      indexView,
      handleClickButtonAction,
    };
  },
};
</script>

<style lang="scss">
.grid-list-product-card {
  transition: all 0.3s ease;

  .product-container {
    position: relative;
    padding: 0px 35px;
    max-width: 100%;
    display: flex;
    overflow: hidden;
    gap: 5px;
    width: fit-content;
  }

  .flex1 {
    flex: 1;
  }

  .button-action {
    padding: 0px 8px;
    position: absolute;
    top: 50%;
    width: 100%;

    .button-next {
      &:hover {
        transform: translateX(5px);
      }

      transition: all 0.3s ease;
    }

    .button-prev {
      &:hover {
        transform: translateX(-5px);
      }

      transition: all 0.3s ease;
    }
  }
}
</style>