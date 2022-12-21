<template>
  <div class="signup-page">
    <div class="signup-container flex flex-row">
      <div
        class="signup-content-left w-50 d-flex flex-column"
        v-show="step == 1"
      >
        <div class="signup-content-left-title">Đăng ký</div>
        <div class="signup-field-container d-flex">
          <div class="flex-column flex2">
            <div class="signup-field-label">Họ</div>
            <div class="signup-field-input">
              <base-input
                title="Họ"
                class="flex1"
                v-model="model.first_name"
                :maxLength="50"
                :rules="[{ name: 'required' }]"
              ></base-input>
            </div>
          </div>
          <div class="flex-column flex3 ml-2">
            <div class="signup-field-label">Tên</div>
            <div class="signup-field-input">
              <base-input
                title="Tên"
                class="flex1"
                v-model="model.last_name"
                :maxLength="50"
                :rules="[{ name: 'required' }]"
              ></base-input>
            </div>
          </div>
        </div>
        <div class="signup-field-container d-flex">
          <div class="flex-column flex2">
            <div class="signup-field-label">Email</div>
            <div class="signup-field-input">
              <base-input
                ref="email"
                title="Email"
                v-model="model.email"
                :maxLength="100"
                :rules="[{ name: 'required' }, { name: 'email' }]"
              ></base-input>
            </div>
          </div>
          <div class="flex-column flex1 ml-2">
            <div class="signup-field-label">Số điện thoại</div>
            <div class="signup-field-input">
              <base-input
                ref="phone"
                title="Số điện thoại"
                v-model="model.phone"
                :maxLength="10"
                :rules="[{ name: 'required' }, { name: 'phoneNumber' }]"
              ></base-input>
            </div>
          </div>
        </div>

        <div class="signup-field-container d-flex">
          <div class="flex-column flex1">
            <div class="signup-field-label">Mật khẩu</div>
            <div class="signup-field-input">
              <base-input
                title="Mật khẩu"
                v-model="model.password"
                type="password"
                :maxLength="50"
                :rules="[{ name: 'required' }, { name: 'password' }]"
              ></base-input>
            </div>
          </div>
        </div>
        <div class="signup-field-container d-flex">
          <div class="flex-column flex1">
            <div class="signup-field-label">Nhập lại mật khẩu</div>
            <div class="signup-field-input">
              <base-input
                title="Nhập lại mật khẩu"
                v-model="model.confirmPassword"
                type="password"
                :maxLength="50"
                :rules="[
                  { name: 'required' },
                  { name: 'password' },
                  { name: 'comparePassword', compareValue: model.password },
                ]"
              ></base-input>
            </div>
          </div>
        </div>

        <div class="signup-button d-flex flex-between mt-auto">
          <base-button
            text="Quay lại"
            customClass="white btn-padding w-100"
            @click="changeStep(0)"
          >
          </base-button>
          <base-button
            text="Tiếp tục"
            customClass="white btn-padding w-100"
            @click="changeStep(2)"
          >
          </base-button>
        </div>
      </div>
      <div
        class="signup-content-left w-50 d-flex flex-column"
        v-show="step == 2"
      >
        <div class="signup-content-left-title">Hoàn thành hồ sơ</div>

        <div class="signup-field-container d-flex">
          <div class="flex-column flex1">
            <div class="signup-field-label">Tỉnh/ Thành phố</div>
            <div class="signup-field-input">
              <base-combobox
                title="Tỉnh/ Thành phố"
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
            </div>
          </div>
          <div class="flex-column flex1 ml-2">
            <div class="signup-field-label">Quận/ Huyện</div>
            <div class="signup-field-input">
              <base-combobox
                title="Quận/ Huyện"
                class="flex1"
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
          </div>
        </div>
        <div class="signup-field-container d-flex">
          <div class="flex-column flex1">
            <div class="signup-field-label">Xã/ Phường</div>
            <div class="signup-field-input">
              <base-combobox
                title="Xã/ Phường"
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
            </div>
          </div>
          <div class="flex-column flex1 ml-2"></div>
        </div>
        <div class="signup-field-container flex-column">
          <div class="signup-field-label">Địa chỉ cụ thể</div>
          <div class="signup-field-input">
            <base-input
              title="Địa chỉ cụ thể"
              v-model="model.address_detail"
              :maxLength="255"
              :rules="[{ name: 'required' }]"
            ></base-input>
          </div>
        </div>
        <div class="signup-field-container flex-column">
          <div class="signup-field-label">Ảnh đại diện</div>
          <div class="signup-field-input mt-1">
            <div className="complete-profile__upload-photo">
              <label htmlFor="upload-photo-avatar" class="mr-4">
                <span>Tải ảnh lên</span>
              </label>
              <input
                type="file"
                name=""
                id="upload-photo-avatar"
                @change="uploadPhotoHandler"
                accept="image/gif, image/jpeg"
              />
              <img :src="model.avatar" alt="" v-show="model.avatar" />
            </div>
          </div>
        </div>

        <div class="signup-button d-flex flex-between mt-auto">
          <base-button
            text="Quay lại"
            customClass="white btn-padding w-100"
            @click="changeStep(1)"
          >
          </base-button>
          <base-button
            text="Đăng ký"
            customClass="white btn-padding w-100"
            @click="signup"
          >
          </base-button>
        </div>
      </div>
      <div class="signup-content-right w-50 flex flex-center flex-column">
        <div class="logo-container flex-column flex-center">
          <a href="/">
            <div class="logo"></div>
          </a>
          <div class="welcome-text">Chào mừng bạn đến mới Eshop</div>
        </div>
        <div class="ask">Bạn đã có tài khoản?</div>
        <div class="signup-button">
          <base-button
            text="ĐĂNG NHẬP"
            customClass="primary btn-padding"
            @click="goToLogin"
          >
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/button/BaseButton.vue";
import BaseInput from "@/components/input/BaseInput.vue";
import BaseCombobox from "@/components/combobox/BaseCombobox.vue";
import AccountAPI from "@/apis/components/accountAPI";
import { ref, getCurrentInstance, onMounted, nextTick, watch } from "vue";
import commonFn from "@/commons/commonFunction.js";
import axios from "axios";
import baseDetail from "../baseDetail";
// import http from "@/apis/base/httpCommon.js";
import fileAPI from "@/apis/components/fileAPI";
import commonFunction from "@/commons/commonFunction.js";
export default {
  name: "SignupPage",
  extends: baseDetail,
  components: {
    BaseButton,
    BaseCombobox,
    BaseInput,
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const dataProvince = ref([]); // Danh sách Tỉnh/ Thành phố
    const dataDistricts = ref([]); // Danh sách Quận/ huyện
    const dataWards = ref([]); // Danh sách Xã/ phường
    const BASE_API_URL = "https://provinces.open-api.vn/api";
    const step = ref(1);
    const model = ref({});

    onMounted(async () => {
      commonFn.mask();
      const res = await axios.get(`${BASE_API_URL}/p/`);
      if (res && res.data) {
        dataProvince.value = res.data;
      }
      commonFn.unmask();
      window.signup = proxy;
    });

    const changeProvince = async (obj) => {
      commonFn.mask();
      let res = await axios.get(`${BASE_API_URL}/p/${obj.code}?depth=2`);
      if (res && res.data) {
        dataDistricts.value = res.data.districts;
      }

      commonFn.unmask();
    };

    const changeDistrict = async (obj) => {
      commonFn.mask();
      let res = await axios.get(`${BASE_API_URL}/d/${obj.code}?depth=2`);
      if (res && res.data) {
        dataWards.value = res.data.wards;
      }
      commonFn.unmask();
    };

    const updateValue = (value, field) => {
      model.value[field] = value;
    };
    const goToLogin = () => {
      proxy.$router.push("/login");
    };

    const changeStep = (value) => {
      const me = proxy;
      if (value == 0) {
        proxy.$router.go(-1);
      }
      if (value == 1) {
        step.value = 1;
      }
      if (value == 2) {
        if (!me.validateComponents()) {
          nextTick(() => {
            me.focusFirstError();
          });
          return;
        }
        step.value = 2;
      }
    };

    const signup = async () => {
      const me = proxy;

      if (!me.validateComponents()) {
        nextTick(() => {
          me.focusFirstError();
        });
        return;
      }

      commonFn.mask();
      model.value.gender = 1; // Nam
      let res = await proxy.$store.dispatch(
        "moduleContext/signup",
        model.value
      );

      commonFn.unmask();
      if (!res) {
        return;
      }
      if (res.statusCode == 200) {
        proxy.$router.push("homepage");
      } else if (res.statusCode == 205) {
        proxy.$toast.error(res.userMessage);
        step.value = 1;
        setTimeout(() => {
          proxy.$refs.email.$el.querySelector("input").focus();
        }, 100);
      } else if (res.statusCode == 206) {
        proxy.$toast.error(res.userMessage);
        step.value = 1;
        setTimeout(() => {
          proxy.$refs.phone.$el.querySelector("input").focus();
        }, 100);
      } else {
        proxy.$toast.error(`Đã xảy ra lỗi`);
      }
    };

    const uploadPhotoHandler = async (e) => {
      const file = e.target.files[0];
      try {
        model.value.avatar = "./images/loading-image.gif";
        var formdata = new FormData();
        formdata.append("file", file);

        let res = await fileAPI.upload(
          "avatar_" + commonFunction.generateUUID(),
          formdata
        );
        if (res) {
          model.value.avatar = res.url;
        }
      } catch (error) {
        console.log(error);
      }
    };

    watch(
      () => model.value.province_code,
      (value) => {
        model.value.district_code = null;
        model.value.district = null;
        model.value.commune_code = null;
        model.value.commune = null;
      }
    );
    watch(
      () => model.value.district_code,
      (value) => {
        model.value.commune_code = null;
        model.value.commune = null;
      }
    );

    return {
      model,
      step,
      updateValue,
      goToLogin,
      changeStep,
      dataProvince,
      changeProvince,
      dataDistricts,
      changeDistrict,
      dataWards,
      uploadPhotoHandler,
      signup,
    };
  },
};
</script>

<style lang="scss">
@import "./SignupPage.scss";
</style>