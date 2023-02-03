<template>
  <div class="user-manage">
    <div class="toolbar">
      <div class="toolbar-left">
        <div class="toolbar-title">Danh sách khách hàng</div>
      </div>
      <div class="toolbar-right">
        <div
          class="icon24 reload cursor-pointer"
          title="Lấy lại dữ liệu"
          @click="clearSort()"
        ></div>
      </div>
    </div>
    <div class="container-grid">
      <grid-view
        ref="gridView"
        :api="userAPI"
        :fields="['user_id', 'user_name']"
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
</template>

<script>
import gridView from "@/components/gridView/GridView.vue";
import { useUserManage } from "./UserManage.js";
import userAPI from "@/apis/components/userAPI.js";
import popupUtil from "@/commons/popupUtil";
import {
  ref,
  onMounted,
  getCurrentInstance,
  defineComponent,
  reactive,
  watch,
  computed,
} from "vue";
export default defineComponent({
  components: { gridView },
  setup() {
    const { proxy } = getCurrentInstance();
    const { headers } = useUserManage();
    const showClearSort = ref(false);
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
      popupUtil.show("UserDetail", {
        data: item,
        options: {
          submit: () => {
            proxy.$refs.gridView.loadData();
          },
        },
      });
    };

    return {
      headers,
      userAPI,
      showClearSort,
      clearSort,
      hasSort,
      editRow,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./UserManage.scss";
</style>