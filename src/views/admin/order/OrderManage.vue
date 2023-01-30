<template>
  <div class="order-manage">
    <div class="toolbar">
      <div class="toolbar-left">
        <div class="toolbar-title">Danh sách đơn hàng</div>
      </div>
      <div class="toolbar-right">
        <div
          class="icon24 reload cursor-pointer mr-4"
          title="Lấy lại dữ liệu"
          @click="clearSort()"
        ></div>
      </div>
    </div>
    <div class="container-grid">
      <grid-view
        ref="gridView"
        :api="orderAPI"
        :fields="['order_id', 'order_code']"
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
          </div>
        </template>
      </grid-view>
    </div>
  </div>
</template>

<script>
import gridView from "@/components/gridView/GridView.vue";
import { useOrderManage } from "./OrderManage.js";
import orderAPI from "@/apis/components/orderAPI.js";
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
    const { headers } = useOrderManage();
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

    const clearSort = () => {
      proxy.$refs.gridView.serverOptions.sortBy = [];
      proxy.$refs.gridView.serverOptions.sortType = [];
      showClearSort.value = false;
    };
    return {
      headers,
      orderAPI,
      add,
      showClearSort,
      clearSort,
      hasSort,
    };
  },
};
</script>

<style lang="scss">
@import "./OrderManage.scss";
</style>