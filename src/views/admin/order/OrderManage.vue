<template>
  <div class="order-manage">
    <div class="toolbar">
      <div class="toolbar-left">
        <div class="toolbar-title">Danh sách đơn hàng</div>
      </div>
      <div class="toolbar-right">
        <base-dropdown
          valueField="status"
          displayField="status_name"
          placeholder="Trạng thái đơn hàng"
          :listDropdownData="[
            { status_name: 'Tất cả', status: null },
            { status_name: 'Chờ xác nhận', status: 5 },
            { status_name: 'Chờ lấy hàng', status: 2 },
            { status_name: 'Đang giao hàng', status: 3 },
            { status_name: 'Đã hủy đơn', status: 4 },
            { status_name: 'Giao thành công', status: 1 },
            { status_name: 'Giao hàng thất bại', status: 6 },
            { status_name: 'Đã hoàn trả lại', status: 7 },
          ]"
          :chosenValue="model.status"
          @update:chosenObj="updateStatus"
          :width="160"
        >
        </base-dropdown>
        <div
          class="icon24 reload cursor-pointer ml-4"
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
        :filters="filterGrid"
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
              :class="{ disabled: item.status != 5 && item.status != 2 }"
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
import { useOrderManage } from "./OrderManage.js";
import orderAPI from "@/apis/components/orderAPI.js";
import popupUtil from "@/commons/popupUtil";
import BaseDropdown from "@/components/dropdown/BaseDropdown.vue";
import {
  ref,
  onMounted,
  getCurrentInstance,
  reactive,
  watch,
  computed,
} from "vue";
export default {
  components: { gridView, BaseDropdown },
  setup() {
    const { proxy } = getCurrentInstance();
    const { headers } = useOrderManage();
    const showClearSort = ref(false);
    const model = ref({ status: null });
    const filterGrid = ref("");
    onMounted(() => {
      window.proxy = proxy;
    });

    const hasSort = (value) => {
      showClearSort.value = value;
    };

    const clearSort = () => {
      proxy.$refs.gridView.serverOptions.sortBy = [];
      proxy.$refs.gridView.serverOptions.sortType = [];
      showClearSort.value = false;
    };

    const editRow = (item) => {
      popupUtil.show("OrderDetail", {
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
        message: `Bạn có chắc chắn muốn xóa đơn hàng < ${item.order_code} > không?`,
        header: "Xóa",
        accept: () => {
          orderAPI.delete(item, item.order_id).then((res) => {
            if (res && res.status == 200) {
              if (res.data.statusCode == 200) {
                proxy.$toast.success(
                  `Xóa đơn hàng < ${item.order_code} > thành công`
                );
              } else if (res.data.statusCode == 210) {
                proxy.$confirm.require({
                  message: res.data.userMessage,
                  header: "Thông báo",
                  rejectClass: "d-none",
                });
              }

              proxy.$refs.gridView.loadData();
            }
          });
        },
        reject: () => {},
      });
    };
    /**
     * Thay đổi trạng thái
     */
    const updateStatus = (status) => {
      model.value.status = status;
      let filterStatus = "[]";
      if (status != null) {
        filterStatus = [
          {
            Field: "status",
            Value: status,
          },
        ];
      } else {
        filterStatus = [];
      }
      filterGrid.value = JSON.stringify(filterStatus);
      setTimeout(() => {
        proxy.$refs.gridView.loadData();
      }, 50);
    };
    return {
      headers,
      orderAPI,
      model,
      showClearSort,
      clearSort,
      hasSort,
      editRow,
      deleteRow,
      updateStatus,
      filterGrid,
    };
  },
};
</script>

<style lang="scss">
@import "./OrderManage.scss";
</style>