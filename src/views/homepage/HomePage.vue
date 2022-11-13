<template>
  <div class="homepage-container">
    <div class="advertise-slider" v-if="!search">
      <base-slider :autoplay="true">
        <template #slider-content>
          <div
            class="banner"
            v-for="(item, index) in listSlider"
            :key="index"
            style=""
          >
            <a :href="item.page" style="">
              <img src="~@/assets/images/slide1.jpg" alt="" style="" />
            </a>
          </div>
        </template>
      </base-slider>
    </div>
    <grid-product-card
      :productList="gridList"
      :search="search"
      :model="model"
      @update:model="updateModel"
    ></grid-product-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BaseSlider from "@/components/slider/slider.vue";
import GridProductCard from "@/components/card/GridProductCard.vue";
import { ref, onMounted, getCurrentInstance, reactive, watch } from "vue";
import { useRoute } from "vue-router";
export default {
  components: {
    BaseSlider,
    GridProductCard,
  },
  name: "HomePage",
  setup() {
    const { proxy } = getCurrentInstance();
    const search = ref(true); // Đánh dấu có đang tìm kiếm không
    const route = useRoute();
    const model = ref({
      keyword: null,
      rating: null,
      fromAmount: null,
      toAmount: null,
      page: null,
      sort: null,
    });
    const listSlider = ref([
      {
        src: "https://res.cloudinary.com/mp32022/image/upload/Banner/slide1.jpg",
        page: "",
      },
      {
        src: "https://res.cloudinary.com/mp32022/image/upload/Banner/slide2.jpg",
        page: "",
      },
      {
        src: "https://res.cloudinary.com/mp32022/image/upload/Banner/slide3.jpg",
        page: "",
      },
      {
        src: "https://res.cloudinary.com/mp32022/image/upload/Banner/slide4.jpg",
        page: "",
      },
    ]);
    const product_discountList = ref({
      productId: "386825b2-1b4d-11ed-8dc4-34415dd21b70",
      product_discount: 25,
      product_name:
        "Bánh bơ trứng Richy gói 270g bơ trứng Richy gói 270g Bánh bơ trứng Richy gói 270g",
      product_unit: "Gói",
      sale_price: 27400,
      sale_price_old: 36400,
      rating: 3.6,
      img_url:
        "https://res.cloudinary.com/mp32022/image/upload/v1659936363/Banner/slide5.jpg",
    });
    const gridList = ref([]);
    onMounted(() => {
      setTimeout(() => {}, 200);
      for (let i = 0; i < 20; i++) {
        let item = Object.assign({}, product_discountList.value);
        gridList.value.push(item);
      }
      window.proxy = proxy;

      let query = route.query;
      Object.assign(model.value, query);
    });

    watch(model.value, (newVal, oldVal) => {
      if (newVal != oldVal) {
        let query = Object.assign({}, model.value);
        Object.keys(query).forEach((key) => {
          if (query[key] === null || query[key] === "") {
            delete query[key];
          }
        });
        proxy.$router.push({ path: "search", query: query });
      }
    });

    /**
     * Cập nhật model
     */
    const updateModel = (value) => {
      Object.assign(model.value, value);
    };

    return {
      listSlider,
      gridList,
      search,
      model,
      updateModel,
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
@import "./HomePage.scss";
</style>