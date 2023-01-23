<template>
  <dynamic-popup
    :width="500"
    :height="300"
    class="product-detail"
    :title="title"
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
              <label>Tên màu sắc</label>
            </div>
            <base-input
              title="Tên màu sắc"
              class="mt-1"
              v-model="model.color_name"
              :maxLength="255"
              :rules="[{ name: 'required' }]"
            ></base-input>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer="{ close }">
      <div class="h-100 d-flex align-center flex1">
        <base-checkbox
          v-if="mode != 'Add'"
          v-model="model.status"
          label="Sử dụng"
        ></base-checkbox>
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
            text="Hoàn Thành"
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
import colorAPI from "@/apis/components/colorAPI";
import popupUtil from "@/commons/popupUtil";

export default {
  name: "ColorDetail",
  extends: baseDetail,
  components: {
    DynamicPopup,
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const title = ref("");
    const model = ref({
      color_name: null,
      status: true,
    });

    onMounted(() => {});

    const saveForm = () => {
      const me = proxy;
      me.resetValdiate();
      me.addObserveControl();
      if (!me.validateComponents()) {
        nextTick(() => {
          me.focusFirstError();
        });
        return;
      }
      if (proxy._formParam?.mode == "Add") {
        colorAPI
          .saveData(model.value, 1)
          .then((res) => {
            if (res && res.status == 200 && res.data.statusCode == 209) {
              proxy.$toast.warning(res.data.userMessage);
            } else {
              proxy.$toast.success("Thêm màu sắc thành công");
              if (proxy._formParam.options) {
                proxy._formParam.options.submit();
              }
              popupUtil.hideAll();
            }
          })
          .finally(() => {});
      } else if (proxy._formParam?.mode == "Edit") {
        colorAPI
          .saveData(model.value, 2)
          .then((res) => {
            if (res && res.status == 200 && res.data.statusCode == 209) {
              proxy.$toast.warning(res.data.userMessage);
            } else {
              proxy.$toast.success("Cập nhật màu sắc thành công");
              if (proxy._formParam.options) {
                proxy._formParam.options.submit();
              }
              popupUtil.hideAll();
            }
          })
          .finally(() => {});
      }
    };

    const beforeOpen = async (e, close) => {
      proxy.super("beforeOpen", baseDetail, e, close);
      window.proxy = proxy;
      proxy.mode = proxy._formParam?.mode;
      if (proxy.mode == "Edit") {
        // model.value = JSON.parse(JSON.stringify(proxy._formParam.data));
        model.value = await colorAPI.getById(proxy._formParam.data.color_id);
      }
      changeTitle();
    };

    const changeTitle = () => {
      if (proxy._formParam?.mode == "Add") {
        title.value = "Thêm mới màu sắc";
        model.value.color_name = "";
        model.value.color_id = commonFn.generateUUID();
      } else {
        title.value = "Sửa màu sắc";
      }
    };

    return {
      model,
      title,
      saveForm,
      beforeOpen,
    };
  },
};
</script>
<style lang="scss">
// @import "./ProductDetail.scss";
</style>
