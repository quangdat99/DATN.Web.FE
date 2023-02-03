<template>
  <dynamic-popup
    :width="500"
    :height="300"
    class="user-detail"
    title="Thông tin khách hàng"
    @beforeOpen="beforeOpen($event, close)"
  >
    <template v-slot:icon="{ close }">
      <div class="button icon24 close" @click="close()"></div>
    </template>
    <template v-slot:content>
      <div class="flex-column h-100 popup-container">
        <div class="flex-row">
          <div class="flex1">
            <div class="profile-img">
              <img
                v-if="!model.avatar"
                src="~@/assets/images/profile-user.png"
                alt=""
              />
              <img
                v-if="model.avatar"
                class="avatar"
                :src="model.avatar"
                alt=""
              />
            </div>
          </div>
          <div class="flex2 ml-2">
            <div class="flex-row align-center mt-2">
              <div class="flexa">
                <div class="control-title">
                  <label>Tên khách hàng:</label>
                </div>
              </div>
              <div class="flex ml-2">
                {{ model.first_name + " " + model.last_name }}
              </div>
            </div>
            <div class="flex-row align-center mt-2">
              <div class="flexa">
                <div class="control-title">
                  <label>Giới tính:</label>
                </div>
              </div>
              <div class="flex ml-2">
                {{ genderName(model.gender) }}
              </div>
            </div>
            <div class="flex-row align-center mt-2">
              <div class="flexa">
                <div class="control-title">
                  <label>Ngày sinh:</label>
                </div>
              </div>
              <div
                class="flex ml-2"
                v-if="model.day && model.month && model.year"
              >
                ngày {{ model.day }} {{ model.month }} năm {{ model.year }}
              </div>
            </div>
            <div class="flex-row align-center mt-2">
              <div class="flexa">
                <div class="control-title">
                  <label>Email:</label>
                </div>
              </div>
              <div class="flex ml-2">
                {{ model.email }}
              </div>
            </div>
            <div class="flex-row align-center mt-2">
              <div class="flexa">
                <div class="control-title">
                  <label>Số điện thoại:</label>
                </div>
              </div>
              <div class="flex ml-2">
                {{ model.phone }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer="{ close }">
      <div class="h-100 d-flex align-center flex1">
        <base-checkbox v-model="model.is_block" label="Chặn"></base-checkbox>
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
import userAPI from "@/apis/components/userAPI";
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
      is_block: false,
    });

    const saveForm = () => {
      userAPI
        .updateStatus({
          is_block: model.value.is_block,
          user_id: model.value.user_id,
        })
        .then((res) => {
          proxy.$toast.success("Cập nhật thành công");
          if (proxy._formParam.options) {
            proxy._formParam.options.submit();
          }
          proxy.hide();
        })
        .finally(() => {});
    };

    const beforeOpen = async (e, close) => {
      proxy.super("beforeOpen", baseDetail, e, close);
      proxy._popup =
        proxy.$vfm.dynamicModals[proxy.$vfm.dynamicModals.length - 1];
      window.proxy = proxy;
      model.value = await userAPI.getUser(proxy._formParam.data.user_id);
    };

    const genderName = (gender) => {
      switch (gender) {
        case 1:
          return "Nam";
        case 2:
          return "Nữ";

        default:
          return "Khác";
      }
    };
    return {
      model,
      saveForm,
      beforeOpen,
      genderName,
    };
  },
};
</script>
<style lang="scss">
.user-detail {
  .popup-container {
    padding: 16px;

    .profile-img {
      background-size: contain;
      background-repeat: no-repeat;
      align-items: center;
      display: flex;
      justify-content: center;
      height: 100%;

      img {
        width: 64px;
        height: 64px;

        &.avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px,
            rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px,
            rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px,
            rgba(0, 0, 0, 0.07) 0px 32px 64px;
        }
      }
    }
  }
}
</style>