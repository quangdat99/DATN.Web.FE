<template>
  <div class="product-manage">
    <div class="toolbar">
      <div class="toolbar-left">
        <div class="toolbar-title">Danh sách sản phẩm</div>
      </div>
      <div class="toolbar-right">
        <base-button text="Thêm mới" @click="add()"> </base-button>
      </div>
    </div>
    <grid-view :api="productAPI" :headers="headers"></grid-view>
  </div>
</template>

<script>
import gridView from "@/components/gridView/GridView.vue";
import { useProductManage } from "./ProductManage.js";
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

    const add = () => {
      popupUtil.show("ProductDetail", {
        mode: "Add",
      });
    };

    return { headers, add };
  },
};
</script>

<style lang="scss">
@import "./ProductManage.scss";
</style>