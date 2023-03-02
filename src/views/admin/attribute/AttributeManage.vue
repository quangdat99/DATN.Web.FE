<template>
  <div class="attribute-manage">
    <div class="toolbar">
      <div class="toolbar-left">
        <div class="toolbar-title">Danh sách nhóm thuộc tính</div>
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
        :api="attributeAPI"
        :fields="['attribute_id', 'attribute_name']"
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
import { useAttributeManage } from "../attribute/AttributeManage.js";
import attributeAPI from "@/apis/components/attributeAPI.js";
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
    const { headers } = useAttributeManage();
    const showClearSort = ref(false);
    onMounted(() => {
      window.proxy = proxy;
    });
    const add = () => {
      popupUtil.show("AttributeDetail", {
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
      popupUtil.show("AttributeDetail", {
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
        message: `Bạn có chắc chắn muốn xóa nhóm thuộc tính < ${item.attribute_name} > không?`,
        header: "Xóa",
        accept: () => {
          attributeAPI.delete(item, item.attribute_id).then((res) => {
            if (res && res.status == 200) {
              if (res.data.statusCode == 200) {
                proxy.$toast.success(
                  `Xóa nhóm thuộc tính < ${item.attribute_name} > thành công`
                );
              } else if (res.data.statusCode == 210) {
                proxy.$toast.warning(res.data.userMessage);
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
      attributeAPI,
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
@import "./AttributeManage.scss";
</style>