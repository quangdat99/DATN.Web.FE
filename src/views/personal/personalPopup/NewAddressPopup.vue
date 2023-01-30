<template>
  <dynamic-popup
    :width="500"
    :height="500"
    class="new-address-password"
    name="NewAddressPopup"
    @beforeOpen="beforeOpen($event, close)"
  >
    <template v-slot:content-title>
      <span class="title">{{ title }}</span>
    </template>
    <template v-slot:icon="{ close }">
      <div class="button icon24 close" @click="closePopup(close)"></div>
    </template>
    <template v-slot:content>
      <div class="flex-column h-100 popup-container">
        <div class="flex-row">
          <base-input
            title="Họ và tên"
            placeholder="Họ và tên"
            class="flex1"
            v-model="model.name"
            :maxLength="100"
            :rules="[{ name: 'required' }]"
          ></base-input>
          <base-input
            title="Số điện thoại"
            placeholder="Số điện thoại"
            class="flex1 ml-2"
            v-model="model.phone"
            :maxLength="50"
            :rules="[{ name: 'required' }]"
          ></base-input>
        </div>
        <div class="flex-row mt-4">
          <base-combobox
            title="Tỉnh/ Thành phố"
            placeholder="Tỉnh/ Thành phố"
            class="flex1"
            valueField="code"
            displayField="name"
            :chosenValue="model.province_code"
            :initText="model.province"
            :data="dataProvince"
            @update:modelValue="
              (value, displayField) => {
                model.province_code = value;
                model.province = displayField;
              }
            "
            @change="changeProvince"
            :rules="[{ name: 'required' }]"
          ></base-combobox>
          <base-combobox
            title="Quận/ Huyện"
            placeholder="Quận/ Huyện"
            class="flex1 ml-2"
            valueField="code"
            displayField="name"
            :chosenValue="model.district_code"
            :initText="model.district"
            :data="dataDistricts"
            @update:modelValue="
              (value, displayField) => {
                model.district_code = value;
                model.district = displayField;
              }
            "
            @change="changeDistrict"
            :disabled="!model.province_code"
            :rules="[{ name: 'required' }]"
          ></base-combobox>
        </div>
        <div class="flex-row mt-4">
          <base-combobox
            title="Xã/ Phường"
            placeholder="Xã/ Phường"
            class="flex1"
            valueField="code"
            displayField="name"
            :chosenValue="model.commune_code"
            :initText="model.commune"
            :data="dataWards"
            @update:modelValue="
              (value, displayField) => {
                model.commune_code = value;
                model.commune = displayField;
              }
            "
            :disabled="!model.district_code"
            :rules="[{ name: 'required' }]"
          ></base-combobox>
          <div class="flex1 ml-2"></div>
        </div>
        <div class="flex-row mt-4">
          <base-textarea
            title="Địa chỉ cụ thể"
            placeholder="Địa chỉ cụ thể"
            v-model="model.address_detail"
            :maxLength="255"
            :rules="[{ name: 'required' }]"
          ></base-textarea>
        </div>
        <div class="flex-row mt-4">
          <base-checkbox
            class="mt-1"
            v-model="model.is_default"
            label="Đặt làm địa chỉ mặc định"
          ></base-checkbox>
        </div>
        <div class="flex-row mt-4"></div>
      </div>
    </template>
    <template v-slot:footer="{ close }">
      <div class="h-100 flex-end align-center flex1">
        <base-button
          class="transparent"
          type="secondary"
          text="Trở lại"
          @click="closePopup(close)"
        ></base-button>
        <base-button
          class="ml-4"
          @click="newAddress"
          text="Hoàn Thành"
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
import addressAPI from "@/apis/components/addressAPI";
import popupUtil from '@/commons/popupUtil';

export default {
  name: "NewAddressPopup",
  extends: baseDetail,
  components: {
    DynamicPopup,
    BaseButton,
    BaseCombobox,
    BaseInput,
    BaseTextarea,
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const dataProvince = ref([]); // Danh sách Tỉnh/ Thành phố
    const dataDistricts = ref([]); // Danh sách Quận/ huyện
    const dataWards = ref([]); // Danh sách Xã/ phường
    const BASE_API_URL = "https://provinces.open-api.vn/api";
    const title = ref("");
    const model = ref({
      name: null,
      phone: null,
      province_code: null,
      district_code: null,
      commune_code: null,
      province: null,
      district: null,
      commune: null,
      is_default: false,
    });
    onMounted(() => {});
    const changeProvince = async (obj) => {
      commonFn.mask();
      let res = await axios.get(`${BASE_API_URL}/p/${obj.code}?depth=2`);
      if (res && res.data) {
        dataDistricts.value = res.data.districts;
        model.value.district_code = null;
        model.value.district = null;
        model.value.commune_code = null;
        model.value.commune = null;
      }

      commonFn.unmask();
    };

    const changeDistrict = async (obj) => {
      commonFn.mask();
      let res = await axios.get(`${BASE_API_URL}/d/${obj.code}?depth=2`);
      if (res && res.data) {
        dataWards.value = res.data.wards;

        model.value.commune_code = null;
        model.value.commune = null;
      }
      commonFn.unmask();
    };

    const newAddress = () => {
      const me = proxy;
      if (!me.validateComponents()) {
        nextTick(() => {
          me.focusFirstError();
        });
        return;
      }
      commonFn.mask();
      if (proxy._formParam?.mode == "Add") {
        addressAPI
          .createAddress(model.value)
          .then(async () => {
            proxy.$toast.success("Thêm mới địa chỉ thành công");
            if (proxy._formParam.options) {
              proxy._formParam.options.submit();
            }
            popupUtil.hide("NewAddressPopup");
          })
          .finally(() => {
            commonFn.unmask();
          });
      } else {
        addressAPI
          .updateAddress(model.value)
          .then(async () => {
            proxy.$toast.success("Cập nhật địa chỉ thành công");
            if (proxy._formParam.options) {
              proxy._formParam.options.submit();
            }
            popupUtil.hide("NewAddressPopup");
          })
          .finally(() => {
            commonFn.unmask();
          });
      }
    };

    const closePopup = (close) => {
      proxy.resetValdiate();
      close();
    };

    const beforeOpen = async (e, close) => {
      proxy.super("beforeOpen", baseDetail, e, close);
      window.proxy = proxy;
      proxy.resetValdiate();
      changeTitle();
      getProvinces();

      // model.value = {
      //   name: null,
      //   phone: null,
      //   province_code: null,
      //   district_code: null,
      //   commune_code: null,
      //   province: null,
      //   district: null,
      //   commune: null,
      // };
      if (proxy._formParam.data) {
        Object.assign(model.value, proxy._formParam.data);
        if (model.value.province_code) {
          let res1 = await axios.get(
            `${BASE_API_URL}/p/${model.value.province_code}?depth=2`
          );
          if (res1 && res1.data) {
            dataDistricts.value = res1.data.districts;
          }
        }
        if (model.value.district_code) {
          let res2 = await axios.get(
            `${BASE_API_URL}/d/${model.value.district_code}?depth=2`
          );
          if (res2 && res2.data) {
            dataWards.value = res2.data.wards;
          }
        }
      }
    };

    const getProvinces = async () => {
      commonFn.mask();
      const res = await axios.get(`${BASE_API_URL}/p/`);
      if (res && res.data) {
        dataProvince.value = res.data;
      }
      commonFn.unmask();
    };
    // watch(
    //   () => model.value.province_code,
    //   (value) => {
    //     model.value.district_code = null;
    //     model.value.district = null;
    //     model.value.commune_code = null;
    //     model.value.commune = null;
    //   }
    // );
    // watch(
    //   () => model.value.district_code,
    //   (value) => {
    //     model.value.commune_code = null;
    //     model.value.commune = null;
    //   }
    // );

    const changeTitle = () => {
      if (proxy._formParam?.mode == "Add") {
        title.value = "Địa chỉ mới";
      } else {
        title.value = "Cập nhật địa chỉ";
      }
    };
    return {
      model,
      title,
      dataProvince,
      changeProvince,
      dataDistricts,
      changeDistrict,
      dataWards,
      newAddress,
      closePopup,
      beforeOpen,
    };
  },
};
</script>
<style lang="scss" scoped>
.popup-container {
  padding: 20px;
}
.title {
  font-size: 22px;
  font-weight: 600;
  color: #262807;
}
</style>
