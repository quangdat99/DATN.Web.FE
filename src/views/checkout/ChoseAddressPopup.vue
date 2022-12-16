<template>
  <dynamic-popup
    :width="700"
    :height="500"
    title="Địa chỉ của tôi"
    class="chose-address-password"
    name="ChoseAddressPopup"
    @beforeOpen="beforeOpen($event, close)"
  >
    <template v-slot:icon="{ close }">
      <div class="button icon24 close" @click="closePopup(close)"></div>
    </template>
    <template v-slot:content>
      <div class="flex-column h-100 popup-container">
        <div class="address-list">
          <div class="address-item" v-for="(address, i) in addresses" :key="i">
            <base-radio
              name="choseAddress"
              :keyValue="i"
              v-model="model.chose_address"
            ></base-radio>
            <div class="item-left ml-2">
              <div class="left-title">
                <div class="name">{{ address.name }}</div>
                <div class="phone">{{ address.phone }}</div>
              </div>
              <div class="detail-address">{{ address.address_detail }}</div>
              <div class="address-commune">
                {{
                  `${address.commune}, ${address.district}, ${address.province}`
                }}
              </div>
              <div class="default" v-if="address.is_default">Mặc định</div>
            </div>
            <div class="item-right">
              <div class="flex-end">
                <div
                  class="update-address"
                  @click="addAddress('Edit', address)"
                >
                  Cập nhật
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="add-new-address mt-2">
          <base-button
            leftIcon="plus-grey"
            text="Thêm địa chỉ mới"
            type="white"
            @click="addAddress('Add')"
          ></base-button>
        </div>

        <new-address-popup></new-address-popup>
      </div>
    </template>
    <template v-slot:footer="{ close }">
      <div class="h-100 flex-end align-center flex1">
        <base-button
          class="transparent"
          type="secondary"
          text="Hủy"
          @click="closePopup(close)"
        ></base-button>
        <base-button
          class="ml-4"
          @click="choseAddress"
          text="Xác nhận"
        ></base-button>
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
import BaseCombobox from "@/components/combobox/BaseCombobox.vue";
import BaseButton from "@/components/button/BaseButton.vue";
import commonFn from "@/commons/commonFunction.js";
import axios from "axios";
import BaseTextarea from "@/components/textarea/BaseTextarea.vue";
import BaseInput from "@/components/input/BaseInput.vue";
import baseDetail from "@/views/baseDetail.js";
import NewAddressPopup from "../personal/personalPopup/NewAddressPopup.vue";
import addressAPI from "@/apis/components/addressAPI";

export default {
  name: "ChoseAddressPopup",
  extends: baseDetail,
  components: {
    DynamicPopup,
    BaseButton,
    BaseCombobox,
    BaseInput,
    BaseTextarea,
    NewAddressPopup,
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const model = ref({
      chose_address: 0,
    });
    const addresses = ref([]);
    onMounted(() => {});

    const choseAddress = () => {
      let address = addresses.value[model.value.chose_address];
      if (proxy._formParam.options) {
        proxy._formParam.options.submit(address);
      }
      proxy.$vfm.hide("ChoseAddressPopup");
    };

    const closePopup = (close) => {
      proxy.resetValdiate();
      close();
    };

    const beforeOpen = async (e, close) => {
      window.ChoseAddressPopup = proxy;
      await proxy.super("beforeOpen", baseDetail, e, close);
      commonFn.mask();
      await getAddress();
      commonFn.unmask();
      window.proxy = proxy;
      proxy.resetValdiate();
    };

    const getAddress = async () => {
      addresses.value = await addressAPI.getAddresses();
    };

    const addAddress = (mode, data) => {
      proxy.$vfm.show("NewAddressPopup", {
        mode: mode,
        data: data,
        options: {
          submit: () => {
            getAddress();
          },
        },
      });
    };

    return {
      model,
      choseAddress,
      closePopup,
      beforeOpen,
      addresses,
      addAddress,
    };
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/_variables.scss";

.chose-address-password {
  .modal__title {
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  }
  .popup-container {
    padding: 0 20px;
    overflow: auto;
  }
  .address-list {
    .address-item {
      font-size: 14px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.09);
      padding: 20px 0;
      display: flex;

      .item-left {
        flex: 3;

        .left-title {
          display: flex;

          .name {
            font-size: 16px;
            padding-right: 8px;

            border-right: 1px solid $text-grey;
          }

          .phone {
            margin-left: 8px;
            font-size: 14px;
            color: $text-grey;
          }
        }

        .detail-address {
          color: $text-grey;
          margin-top: 8px;
        }

        .address-commune {
          color: $text-grey;
          margin-top: 4px;
        }

        .default {
          color: $primary;
          border: 1px solid $primary;
          padding: 2px;
          width: fit-content;
          margin-top: 6px;
        }
      }

      .item-right {
        flex: 1;

        .update-address {
          color: $blue;
          cursor: pointer;
        }

        .delete-address {
          color: $blue;
          cursor: pointer;
        }

        .setting-default {
          margin-top: 12px;
          border: 1px solid rgba(0, 0, 0, 0.26);
          padding: 4px 12px;
          height: 28px;
          cursor: pointer;
          color: rgba(0, 0, 0, 0.87);

          &.disabled {
            cursor: not-allowed;
            opacity: 0.7;
          }
        }
      }
    }
  }
  .add-new-address {
    .base-button {
      .text {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.87);
      }
    }
  }
}
</style>
