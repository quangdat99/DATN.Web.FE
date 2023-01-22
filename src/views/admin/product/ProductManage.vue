<template>
  <div class="product-manage">
    <div class="toolbar">
      <div class="toolbar-left">
        <div class="toolbar-title">Danh sách sản phẩm</div>
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
        :api="productAPI"
        :fields="['product_id', 'product_code', 'product_name']"
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
import { useProductManage } from "./ProductManage.js";
import productAPI from "@/apis/components/productAPI.js";
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
    const { headers } = useProductManage();
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
      productAPI,
      add,
      showClearSort,
      clearSort,
      hasSort,
    };
  },
};
</script>

<style lang="scss">
@import "./ProductManage.scss";
</style>