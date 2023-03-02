<template>
  <dynamic-popup
    :width="600"
    :height="300"
    class="size-detail"
    title="Cập nhật sản phẩm mua kèm"
    @beforeOpen="beforeOpen($event, close)"
  >
    <template v-slot:icon="{ close }">
      <div class="button icon24 close" @click="close()"></div>
    </template>
    <template v-slot:content>
      <div class="flex-column h-100 popup-container">
        <div class="flex-row">
          <div class="flex1">
            <div class="control-title">
              <label>Nhập số sản phẩm mua kèm cho mỗi sản phẩm</label>
            </div>
            <div class="flex-row align-center mt-2">
              <base-number
                title="số sản phẩm mua kèm cho mỗi sản phẩm"
                :width="80"
                isNullable
                v-model="model.number"
              ></base-number>
              <span class="ml-4" style="font-style: italic"
                >Số lượng có thể nhập là từ 1 đến 20</span
              >
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer="{ close }">
      <div class="h-100 d-flex align-center flex1">
        <div class="flex1 flex-end">
          <base-button
            class="transparent"
            type="secondary"
            text="Trở lại"
            @click="close()"
          ></base-button>
          <base-button
            class="ml-4"
            @click="saveForm"
            text="Cập nhật"
          ></base-button>
        </div>
      </div>
    </template>
  </dynamic-popup>
</template>
<script>
import {
  ref,
  onMounted,
  watch,
  defineComponent,
  getCurrentInstance,
  reactive,
  nextTick,
  computed,
} from "vue";
import DynamicPopup from "@/components/dynamicPopup/DynamicPopup.vue";
import commonFn from "@/commons/commonFunction.js";
import axios from "axios";
import baseDetail from "@/views/baseDetail.js";
import productAPI from "@/apis/components/productAPI";
import popupUtil from "@/commons/popupUtil";

export default {
  name: "SizeDetail",
  extends: baseDetail,
  components: {
    DynamicPopup,
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const model = ref({
      number: null,
    });

    onMounted(() => {});

    const saveForm = () => {
      const me = proxy;
      if (!(model.value.number >= 1 && model.value.number <= 20)) {
        proxy.$confirm.require({
          message:
            "<Số sản phẩm mua kèm cho mỗi sản phẩm> phải nằm trong khoảng tử 1 đến 20",
          header: "Thông báo",
          accept: () => {},
          rejectClass: "d-none",
        });
        return;
      }
      productAPI.UpdateProductRelation(model.value.number).then((res) => {
        if (res && res.status == 200 && res.data.statusCode == 200) {
          proxy.$confirm.require({
            message: "Cập nhật sản phẩm mua kèm thành công",
            header: "Thông báo",
            accept: () => {},
            rejectClass: "d-none",
          });
          proxy.hide();
        } else {
          proxy.$confirm.require({
            message: "Cập nhật sản phẩm mua kèm thành công",
            header: "Thông báo",
            accept: () => {},
            rejectClass: "d-none",
          });
          proxy.hide();
        }
      });
    };

    const beforeOpen = async (e, close) => {
      proxy.super("beforeOpen", baseDetail, e, close);
      proxy._popup =
        proxy.$vfm.dynamicModals[proxy.$vfm.dynamicModals.length - 1];
      window.proxy = proxy;
    };

    return {
      model,
      saveForm,
      beforeOpen,
    };
  },
};
</script>
<style lang="scss" scoped>
.popup-container {
  padding: 16px;
}
</style>