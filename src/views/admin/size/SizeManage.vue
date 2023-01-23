<template>
  <div class="size-manage">
    <div class="toolbar">
      <div class="toolbar-left">
        <div class="toolbar-title">Danh sách kích cỡ</div>
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
        :api="sizeAPI"
        :fields="['size_id', 'size_name']"
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
import { useSizeManage } from "./SizeManage.js";
import sizeAPI from "@/apis/components/sizeAPI.js";
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
    const { headers } = useSizeManage();
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
      sizeAPI,
      add,
      showClearSort,
      clearSort,
      hasSort,
    };
  },
};
</script>

<style lang="scss">
@import "./SizeManage.scss";
</style>