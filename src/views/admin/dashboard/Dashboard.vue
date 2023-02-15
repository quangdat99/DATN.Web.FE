<template>
  <div class="dashboard-manage">
    <div class="toolbar">
      <div class="toolbar-left">
        <div class="toolbar-title">Thống kê doanh thu</div>
      </div>
      <div class="toolbar-right">
        <base-button text="Thêm mới" @click="add()"> </base-button>
      </div>
    </div>

    <div class="list-tab">
      <div
        class="tab-option"
        :class="{ active: tabActive == 1 }"
        @click="clickTabActive(1)"
      >
        Chi tiết theo đơn hàng
      </div>
      <div
        class="tab-option"
        :class="{ active: tabActive == 2 }"
        @click="clickTabActive(2)"
      >
        Chi tiết theo sản phẩm
      </div>
    </div>
    <div class="list-tab-content">
      <div class="tab-content" v-show="tabActive == 1">
        <div class="total-info flex-row">
          <div class="flex2">
            <div class="amount-info total-amount">
              Tổng doanh thu: &nbsp; {{ totalObject.totalAmount }} đồng
            </div>
            <div class="amount-info purchase-amount">
              Tổng tiền vốn: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {{ totalObject.purchaseAmount }} đồng
            </div>
            <div class="amount-info profit-amount">
              Tổng lợi nhuận: &nbsp;&nbsp;&nbsp; {{ totalObject.profitAmount }} đồng
            </div>
          </div>
          <div class="flex-column">
            <div
              class="icon24 reload cursor-pointer mr-2 mb-2"
              style="margin-top: auto"
              title="Lấy lại dữ liệu"
              @click="clearSort()"
            ></div>
          </div>
        </div>
        <div class="container-grid">
          <grid-view
            ref="gridView"
            :api="DashboardOrderAPI"
            :fields="['size_id', 'size_name']"
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
              </div>
            </template>
          </grid-view>
        </div>
      </div>
      <div class="tab-content" v-show="tabActive == 2"></div>
    </div>
  </div>
</template>

<script>
import gridView from "@/components/gridView/GridView.vue";
import { useDashboard } from "./Dashboard.js";
import DashboardOrderAPI from "@/apis/components/dashboardOrderAPI.js";
import popupUtil from "@/commons/popupUtil";
import {
  ref,
  onMounted,
  getCurrentInstance,
  reactive,
  watch,
  computed,
} from "vue";
import dashboardOrderAPI from "@/apis/components/dashboardOrderAPI.js";
export default {
  components: { gridView },
  setup() {
    const { proxy } = getCurrentInstance();
    const { headers } = useDashboard();
    const tabActive = ref(1);
    const showClearSort = ref(false);
    const totalObject = ref({});
    onMounted(() => {
      window.proxy = proxy;
      dashboardOrderAPI.dashboardOrderTotal("").then((res) => {
        totalObject.value = res;
      });
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

    const clickTabActive = (tab) => {
      tabActive.value = tab;
    };

    return {
      headers,
      DashboardOrderAPI,
      add,
      showClearSort,
      clearSort,
      hasSort,
      editRow,
      tabActive,
      clickTabActive,
      totalObject,
    };
  },
};
</script>

<style lang="scss">
@import "./Dashboard.scss";
</style>