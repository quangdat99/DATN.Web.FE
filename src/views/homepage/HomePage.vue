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
              <img :src="item.src" alt="" style="" />
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
import commonFn from "@/commons/commonFunction.js";
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
      pageSize: 20,
      totalPage: 15,
    });
    const listCategory = ref([
      // {
      //   selected: false,
      //   category_id: "A0001",
      //   category_name: "Áo khoác",
      // },
      // {
      //   selected: false,
      //   category_id: "A0002",
      //   category_name: "Áo hoodie",
      // },
      // {
      //   selected: false,
      //   category_id: "A0003",
      //   category_name: "Quần jean",
      // },
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
    const gridList = ref([]);
    onMounted(() => {
      window.proxy = proxy;
      if (route.path == "/search") {
        search.value = true;
      } else {
        proxy.$store.dispatch("moduleHomePage/search", "");
        model.value.keyword = null;
        model.value.rating = null;
        model.value.fromAmount = null;
        model.value.toAmount = null;
        model.value.page = 0;
        model.value.sort = null;
        model.value.category = null;
      }

      let query = route.query;
      Object.assign(model.value, query);
      parceValue(model.value);

      if (model.value.keyword) {
        proxy.$store.dispatch("moduleHomePage/search", model.value.keyword);
      } else {
        proxy.$store.dispatch("moduleHomePage/search", "");
      }

      fetchProductHomePage();
      fetchCategory();
    });

    /**
     * Lấy ds sản phẩm
     */
    const fetchProductHomePage = async () => {
      commonFn.mask();
      let payload = Object.assign({}, model.value);
      payload.pageSize = paging.value.pageSize;
      let products = await proxy.$store.dispatch(
        "moduleHomePage/fetchHomePage",
        payload
      );
      gridList.value = products;
      if (products.length > 0) {
        paging.value.totalPage = Math.ceil(
          products[0].totalRecord / paging.value.pageSize
        );
      }

      document.getElementsByClassName(
        "main-container-content"
      )[0].scrollTop = 0;
      commonFn.unmask();
    };

    const fetchCategory = async () => {
      let categorys = await proxy.$store.dispatch(
        "moduleHomePage/fetchCategory"
      );
      listCategory.value = categorys;
      if (model.value.category) {
        let arrCode = model.value.category.split("%");
        arrCode.forEach((item) => {
          let category = listCategory.value.find((x) => x.category_id == item);
          if (category) {
            category.selected = true;
          }
        });
      }
    };
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

    // watch(
    //   listCategory.value,
    //   (value) => {
    //     debugger;
    //     let listChecked = value.filter((x) => x.selected == true);
    //     if (listChecked.length > 0) {
    //       model.value.category = listChecked
    //         .map((x) => x.category_id)
    //         .join("%");
    //     } else {
    //       model.value.category = null;
    //     }
    //   },
    //   { deep: true }
    // );

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
      model.value.page = 0;
      fetchProductHomePage();
    };

    /**
     * Cập nhật lại trạng thái của nhóm sản phẩm
     */
    const updateListCategory = (selected, categoryCode) => {
      let category = listCategory.value.find(
        (x) => x.category_id == categoryCode
      );
      if (category) {
        category.selected = selected;
      }

      let listChecked = listCategory.value.filter((x) => x.selected == true);
      if (listChecked.length > 0) {
        model.value.category = listChecked.map((x) => x.category_id).join("%");
      } else {
        model.value.category = null;
      }
      model.value.page = 0;
      fetchProductHomePage();
    };

    const updateSort = (sort) => {
      if (model.value.sort != sort) {
        model.value.sort = sort;
      } else {
        model.value.sort = null;
      }
      model.value.page = 0;
      fetchProductHomePage();
    };
    const updatePage = (page) => {
      model.value.page = page;
      fetchProductHomePage();
    };

    const searchText = computed(() => {
      return proxy.$store.state["moduleHomePage"].searchText;
    });

    const updateStatusSearch = (status) => {
      search.value = status;
    };

    watch(searchText, (value) => {
      model.value.keyword = value;
      search.value = true;
      model.value.page = 0;
      fetchProductHomePage();
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