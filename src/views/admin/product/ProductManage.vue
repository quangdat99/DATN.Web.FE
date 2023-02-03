<template>
  <div class="product-manage">
    <div class="toolbar">
      <div class="toolbar-left">
        <div class="toolbar-title">Danh sách sản phẩm</div>
      </div>
      <div class="toolbar-right">
        <div
          class="icon24 reload cursor-pointer mr-4"
          title="Lấy lại dữ liệu"
          @click="clearSort()"
        ></div>
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
              class="icon24 edit cursor-pointer"
              title="Sửa"
              @click="editRow(item)"
            ></div>
            <div
              class="icon24 delete cursor-pointer ml-1"
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
        options: {
          submit: () => {
            proxy.$refs.gridView.loadData();
          },
        },
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

    const editRow = (item) => {
      popupUtil.show("ProductDetail", {
        mode: "Edit",
        data: item,
        options: {
          submit: () => {
            proxy.$refs.gridView.loadData();
          },
        },
      });
    };

    const deleteRow = (item) => {
      item.status = item.status ? true : false;
      proxy.$confirm.require({
        message: `Bạn có chắc chắn muốn xóa sản phẩm < ${item.product_name} > không?`,
        header: "Xóa",
        accept: () => {
          productAPI.delete(item, item.product_id).then((res) => {
            if (res && res.status == 200) {
              if (res.data.statusCode == 200) {
                proxy.$toast.success(
                  `Xóa sản phẩm < ${item.product_name} > thành công`
                );
              } else if (res.data.statusCode == 210) {
                proxy.$confirm.require({
                  message: res.data.userMessage,
                  header: "Thông báo",
                  rejectClass: "d-none",
                });
              }
            }
            proxy.$refs.gridView.loadData();
          });
        },
        reject: () => {},
      });
    };
    return {
      headers,
      productAPI,
      add,
      showClearSort,
      clearSort,
      hasSort,
      editRow,
      deleteRow,
    };
  },
};
</script>

<style lang="scss">
@import "./ProductManage.scss";
</style>