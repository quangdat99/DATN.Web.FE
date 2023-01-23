<template>
  <div class="category-manage">
    <div class="toolbar">
      <div class="toolbar-left">
        <div class="toolbar-title">Danh sách loại sản phẩm</div>
      </div>
      <div class="toolbar-right">
        <base-button
          type="transparent"
          text="Xóa sắp xếp"
          @click="clearSort()"
        >
        </base-button>
        <base-button text="Thêm mới" @click="add()"> </base-button>
      </div>
    </div>
    <div class="container-grid">
      <grid-view
        ref="gridView"
        :api="categoryAPI"
        :fields="['category_id', 'category_name']"
        :headers="headers"
        @hasSort="hasSort"
      >
        <template v-slot:item-operation="{ item }">
          <div class="d-flex flex-center">
            <div
              class="icon24 delete cursor-pointer"
              title="Sửa"
              @click="editRow(item)"
            ></div>
            <div
              class="icon24 edit cursor-pointer ml-1"
              title="Xóa"
              @click="deleteRow(item)"
            ></div>
          </div>
        </template>
      </grid-view>
    </div>
  </div>
</template>

<script>
import gridView from "@/components/gridView/GridView.vue";
import { useCategoryManage } from "../category/CategoryManage.js";
import categoryAPI from "@/apis/components/categoryAPI.js";
import popupUtil from "@/commons/popupUtil";
import {
  ref,
  onMounted,
  getCurrentInstance,
  reactive,
  watch,
  computed,
} from "vue";
export default {
  components: { gridView },
  setup() {
    const { proxy } = getCurrentInstance();
    const { headers } = useCategoryManage();
    const showClearSort = ref(false);
    onMounted(() => {
      window.proxy = proxy;
    });
    const add = () => {
      popupUtil.show("ProductDetail", {
        mode: "Add",
      });
    };

    const hasSort = (value) => {
      showClearSort.value = value;
    };

    const clearSort = () =>{
      proxy.$refs.gridView.serverOptions.sortBy = [];
      proxy.$refs.gridView.serverOptions.sortType = [];
      showClearSort.value = false;
    }
    return {
      headers,
      categoryAPI,
      add,
      showClearSort,
      clearSort,
      hasSort,
    };
  },
};
</script>

<style lang="scss">
@import "./CategoryManage.scss";
</style>