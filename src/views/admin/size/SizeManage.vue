<template>
  <div class="size-manage">
    <div class="toolbar">
      <div class="toolbar-left">
        <div class="toolbar-title">Danh sách kích cỡ</div>
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
      popupUtil.show("SizeDetail", {
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
      popupUtil.show("SizeDetail", {
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
      proxy.$confirm.require({
        message: `Bạn có chắc chắn muốn xóa kích cỡ < ${item.size_name} > không?`,
        header: "Xóa",
        accept: () => {
          sizeAPI.delete(item, item.size_id).then((res) => {
            proxy.$toast.success(`Xóa kích cỡ < ${item.size_name} > thành công`);
            proxy.$refs.gridView.loadData();
          });
        },
        reject: () => {},
      });
    };
    return {
      headers,
      sizeAPI,
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
@import "./SizeManage.scss";
</style>