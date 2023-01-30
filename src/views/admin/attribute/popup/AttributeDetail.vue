<template>
  <dynamic-popup
    :width="500"
    :height="300"
    class="attribute-detail"
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
              <label>Tên nhóm thuộc tính</label>
            </div>
            <base-input
              ref="refFocus"
              title="Tên nhóm thuộc tính"
              class="mt-1"
              v-model="model.attribute_name"
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
import attributeAPI from "@/apis/components/attributeAPI";
import popupUtil from "@/commons/popupUtil";

export default {
  name: "AttributeDetail",
  extends: baseDetail,
  components: {
    DynamicPopup,
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const title = ref("");
    const model = ref({
      attribute_name: null,
      status: true,
    });

    onMounted(() => {
      proxy.$refs.refFocus.$el.querySelector("input").focus();
    });

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
        attributeAPI
          .saveData(model.value, 1)
          .then((res) => {
            if (res && res.status == 200 && res.data.statusCode == 209) {
              proxy.$confirm.require({
                message: res.data.userMessage,
                header: "Thông báo",
                accept: () => {
                  proxy.$refs.refFocus.$el.querySelector("input").focus();
                },
                reject: () => {
                  proxy.hide();
                },
              });
              // proxy.$toast.warning(res.data.userMessage);
            } else {
              proxy.$toast.success("Thêm nhóm thuộc tính thành công");
              if (proxy._formParam.options) {
                proxy._formParam.options.submit();
              }
              proxy.hide();
            }
          })
          .finally(() => {});
      } else if (proxy._formParam?.mode == "Edit") {
        attributeAPI
          .saveData(model.value, 2)
          .then((res) => {
            if (res && res.status == 200 && res.data.statusCode == 209) {
              proxy.$confirm.require({
                message: res.data.userMessage,
                header: "Thông báo",
                accept: () => {
                  proxy.$refs.refFocus.$el.querySelector("input").focus();
                },
                rejectClass: "d-none",
              });
            } else {
              proxy.$toast.success("Cập nhật nhóm thuộc tính thành công");
              if (proxy._formParam.options) {
                proxy._formParam.options.submit();
              }
              proxy.hide();
            }
          })
          .finally(() => {});
      }
    };

    const beforeOpen = async (e, close) => {
      proxy.super("beforeOpen", baseDetail, e, close);
      proxy._popup =
        proxy.$vfm.dynamicModals[proxy.$vfm.dynamicModals.length - 1];
      window.proxy = proxy;
      proxy.mode = proxy._formParam?.mode;
      if (proxy.mode == "Edit") {
        model.value = await attributeAPI.getById(
          proxy._formParam.data.attribute_id
        );
      } else if (proxy.mode == "Add") {
        attributeAPI.newCode().then((res) => {
          model.value = res;
        });
      }
      changeTitle();
    };

    const changeTitle = () => {
      if (proxy._formParam?.mode == "Add") {
        title.value = "Thêm mới nhóm thuộc tính";
        model.value.attribute_name = "";
      } else {
        title.value = "Sửa nhóm thuộc tính";
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
<style lang="scss" scoped>
.popup-container {
  padding: 16px;
}
</style>
