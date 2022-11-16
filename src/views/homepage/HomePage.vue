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
      :listCategory="listCategory"
      :paging="paging"
      @update:model="updateModel"
      @update:listCategory="updateListCategory"
      @update:sort="updateSort"
      @update:page="updatePage"
      @updateStatusSearch="updateStatusSearch"
    ></grid-product-card>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import BaseSlider from "@/components/slider/slider.vue";
import GridProductCard from "@/components/card/GridProductCard.vue";
import {
  ref,
  onMounted,
  getCurrentInstance,
  reactive,
  watch,
  computed,
} from "vue";
import { useRoute } from "vue-router";
export default {
  components: {
    BaseSlider,
    GridProductCard,
  },
  name: "HomePage",
  setup() {
    const { proxy } = getCurrentInstance();
    const search = ref(false); // Đánh dấu có đang tìm kiếm không
    const route = useRoute();
    const model = ref({
      keyword: null,
      rating: null,
      fromAmount: null,
      toAmount: null,
      page: 0,
      sort: null, // 1: Mới nhất, 2: Báy chạy, 3: Giá Thấp đến cao, 4: Giá Cao đến thấp
      category: null,
    });
    const paging = ref({
      pageSize: 5,
      totalPage: 15,
    });
    const listCategory = ref([
      {
        selected: false,
        category_code: "A0001",
        category_name: "Áo khoác",
      },
      {
        selected: false,
        category_code: "A0002",
        category_name: "Áo hoodie",
      },
      {
        selected: false,
        category_code: "A0003",
        category_name: "Quần jean",
      },
    ]);
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
      if (route.path == "/search") {
        search.value = true;
      } else {
        proxy.$store.dispatch("moduleHomePage/search", "");
      }

      let query = route.query;
      Object.assign(model.value, query);
      parceValue(model.value);

      if (model.value.category) {
        let arrCode = model.value.category.split("%");
        arrCode.forEach((item) => {
          let category = listCategory.value.find(
            (x) => x.category_code == item
          );
          if (category) {
            category.selected = true;
          }
        });
      }

      if (model.value.keyword) {
        proxy.$store.dispatch("moduleHomePage/search", model.value.keyword);
      } else {
        proxy.$store.dispatch("moduleHomePage/search", "");
      }
    });

    /**
     * Chuẩn hóa dữ liệu
     */
    const parceValue = (data) => {
      if (data.toAmount) {
        data.toAmount = parseInt(data.toAmount);
      }
      if (data.fromAmount) {
        data.fromAmount = parseInt(data.fromAmount);
      }
      if (data.rating) {
        data.rating = parseInt(data.rating);
      }
      if (data.sort) {
        data.sort = parseInt(data.sort);
      }
      if (data.page) {
        data.page = parseInt(data.page);
      }
    };

    watch(
      listCategory.value,
      (value) => {
        let listChecked = value.filter((x) => x.selected == true);
        if (listChecked.length > 0) {
          model.value.category = listChecked
            .map((x) => x.category_code)
            .join("%");
        } else {
          model.value.category = null;
        }
      },
      { deep: true }
    );

    watch(model.value, (newVal) => {
      let query = Object.assign({}, model.value);
      Object.keys(query).forEach((key) => {
        if (query[key] === null || query[key] === "" || query[key] === 0) {
          delete query[key];
        }
      });
      proxy.$router.push({ path: "search", query: query });
    });

    /**
     * Cập nhật model
     */
    const updateModel = (value) => {
      Object.assign(model.value, value);
    };

    /**
     * Cập nhật lại trạng thái của nhóm sản phẩm
     */
    const updateListCategory = (selected, categoryCode) => {
      let category = listCategory.value.find(
        (x) => x.category_code == categoryCode
      );
      if (category) {
        category.selected = selected;
      }
    };

    const updateSort = (sort) => {
      if (model.value.sort != sort) {
        model.value.sort = sort;
      } else {
        model.value.sort = null;
      }
    };
    const updatePage = (page) => {
      model.value.page = page;
      document.getElementsByClassName(
        "main-container-content"
      )[0].scrollTop = 0;
    };

    const searchText = computed(() => {
      return proxy.$store.state["moduleHomePage"].searchText;
    });

    const updateStatusSearch = (status) => {
      search.value = status;
    };

    watch(searchText, (value) => {
      if (value) {
        model.value.keyword = value;
        search.value = true;
      }
    });

    return {
      listSlider,
      gridList,
      search,
      model,
      updateModel,
      listCategory,
      updateListCategory,
      updateSort,
      paging,
      updatePage,
      updateStatusSearch,
    };
  },
  // computed: {
  //   ...mapGetters({
  //     searchText: "moduleHomePage/Search",
  //   }),
  //   ...mapState("moduleHomePage", {
  //     searchText: state => state.searchText
  //   })
  // },
};
</script>

<style lang="scss">
@import "./HomePage.scss";
</style>