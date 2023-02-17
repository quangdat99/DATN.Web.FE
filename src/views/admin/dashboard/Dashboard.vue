<template>
  <div class="dashboard-manage">
    <div class="toolbar">
      <div class="toolbar-left">
        <div class="toolbar-title">Thống kê doanh thu</div>
      </div>
      <div class="toolbar-right">
        <div class="labe-range">{{ labelRangeDate }}</div>
        <Datepicker
          v-model="dateRange"
          range
          :preset-ranges="presetRanges"
          cancelText="Hủy bỏ"
          selectText="Xác nhận"
          :format="format"
          style="width: 460px"
          @cleared="clearedDate"
          @update:model-value="updateDateRange"
          ><template #yearly="{ label, range, presetDateRange }">
            <span @click="presetDateRange(range)">{{ label }}</span>
          </template></Datepicker
        >
        <!-- <base-button class="ml-4" text="Lấy dữ liệu" @click="filter()">
        </base-button> -->
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
              Tổng doanh thu: &nbsp;&nbsp;&nbsp;
              {{ totalObject.totalAmount || 0 }} đồng
            </div>
            <div class="amount-info purchase-amount">
              Tổng tiền vốn: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {{ totalObject.purchaseAmount || 0 }} đồng
            </div>
            <div class="amount-info profit-amount">
              Tổng lợi nhuận: &nbsp;&nbsp;&nbsp;
              {{ totalObject.profitAmount || 0 }} đồng
            </div>
          </div>
          <div class="flex4 flex-row"></div>
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
            ref="gridView1"
            :api="DashboardOrderAPI"
            :fields="['size_id', 'size_name']"
            :headers="headers"
            @hasSort="hasSort"
            :filters="filterGrid"
          >
            <template v-slot:item-operation="{ item }">
              <div class="d-flex flex-center">
                <div
                  class="color-blue cursor-pointer bold"
                  @click="editRow1(item)"
                >
                  Chi tiết
                </div>
              </div>
            </template>
          </grid-view>
        </div>
      </div>
      <div class="tab-content" v-show="tabActive == 2">
        <div class="total-info flex-row">
          <div class="flex2">
            <div class="amount-info total-amount">
              Tổng doanh thu: &nbsp;&nbsp;&nbsp;
              {{ totalObject.totalAmount || 0 }} đồng
            </div>
            <div class="amount-info purchase-amount">
              Tổng tiền vốn: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {{ totalObject.purchaseAmount || 0 }} đồng
            </div>
            <div class="amount-info profit-amount">
              Tổng lợi nhuận: &nbsp;&nbsp;&nbsp;
              {{ totalObject.profitAmount || 0 }} đồng
            </div>
          </div>
          <div class="flex4 flex-row"></div>
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
            ref="gridView2"
            :api="DashboardProductAPI"
            :fields="['size_id', 'size_name']"
            :headers="headers2"
            @hasSort="hasSort"
            :filters="filterGrid"
          >
          </grid-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gridView from "@/components/gridView/GridView.vue";
import { useDashboard } from "./Dashboard.js";
import DashboardProductAPI from "@/apis/components/dashboardProductAPI.js";
import popupUtil from "@/commons/popupUtil";
import {
  ref,
  onMounted,
  getCurrentInstance,
  reactive,
  watch,
  computed,
} from "vue";
import DashboardOrderAPI from "@/apis/components/dashboardOrderAPI.js";
import { endOfMonth, startOfMonth } from "date-fns";

export default {
  components: { gridView },
  setup() {
    const { proxy } = getCurrentInstance();
    const { headers, headers2, presetRanges, format } = useDashboard();
    const tabActive = ref(1);
    const showClearSort = ref(false);
    const totalObject = ref({});
    const dateRange = ref();
    const filterGrid = ref("");
    const labelRangeDate = ref("");

    onMounted(() => {
      window.proxy = proxy;
      clearedDate();
    });

    const hasSort = (value) => {
      showClearSort.value = value;
    };

    const clearSort = () => {
      proxy.$refs.gridView1.serverOptions.sortBy = [];
      proxy.$refs.gridView1.serverOptions.sortType = [];
      proxy.$refs.gridView2.serverOptions.sortBy = [];
      proxy.$refs.gridView2.serverOptions.sortType = [];
      showClearSort.value = false;
    };
    const editRow1 = (item) => {
      popupUtil.show("DashboardOrderDetail", {
        data: item,
        options: {
          submit: () => {
            proxy.$refs.gridView1.loadData();
            proxy.$refs.gridView2.loadData();
          },
        },
      });
    };

    const clickTabActive = (tab) => {
      tabActive.value = tab;
    };

    const clearedDate = () => {
      dateRange.value = [startOfMonth(new Date()), endOfMonth(new Date())];
      updateDateRange(dateRange.value);
    };

    /**
     * Thay đổi Thời gian
     */
    const updateDateRange = (dataRange) => {
      if (!dataRange) {
        dataRange = [startOfMonth(new Date()), endOfMonth(new Date())];
      }
      let existOption = presetRanges.value.find(
        (x) => x.range.toString() == dataRange.toString()
      );
      if (existOption) {
        labelRangeDate.value = existOption.label;
      } else {
        labelRangeDate.value = "Tùy chọn";
      }

      let fromDate = dataRange[0];
      let toDate = dataRange[1];
      let filterStatus = [];
      if (fromDate && toDate) {
        filterStatus = [
          {
            Field: "success_date",
            Operator: ">=",
            Value: fromDate,
          },
          {
            Field: "success_date",
            Operator: "<=",
            Value: toDate,
          },
        ];
      } else {
        filterStatus = [];
      }
      filterGrid.value = JSON.stringify(filterStatus);
      DashboardOrderAPI.dashboardOrderTotal({ filter: filterGrid.value }).then(
        (res) => {
          totalObject.value = res;
        }
      );
      setTimeout(() => {
        proxy.$refs.gridView1.loadData();
        proxy.$refs.gridView2.loadData();
      }, 50);
    };

    return {
      headers,
      headers2,
      DashboardOrderAPI,
      DashboardProductAPI,
      showClearSort,
      clearSort,
      hasSort,
      editRow1,
      tabActive,
      clickTabActive,
      totalObject,
      dateRange,
      presetRanges,
      format,
      clearedDate,
      filterGrid,
      updateDateRange,
      labelRangeDate,
    };
  },
};
</script>

<style lang="scss">
@import "./Dashboard.scss";
</style>