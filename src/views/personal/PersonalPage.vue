<template>
  <div class="personal-container">
    <div class="container-left">
      <div class="menu-tab">
        <div class="menu-title" @click="expandAccount()">
          <div class="icon24 my-account mr-2"></div>
          <div class="title-text">Tài khoản của tôi</div>
          <div
            class="icon24 next ml-auto mr-2"
            :class="{ expand: expAccount }"
          ></div>
        </div>
        <div v-if="expAccount">
          <div
            class="menu-item"
            :class="{ active: activeTab == 1 }"
            @click="changeActiveTab(1)"
          >
            <div class="icon24 file mr-2"></div>
            <div class="text-item">Hồ sơ</div>
          </div>
          <div
            class="menu-item"
            :class="{ active: activeTab == 2 }"
            @click="changeActiveTab(2)"
          >
            <div class="icon24 address mr-2"></div>
            <div class="text-item">Địa chỉ</div>
          </div>
          <div
            class="menu-item"
            :class="{ active: activeTab == 3 }"
            @click="changeActiveTab(3)"
          >
            <div class="icon24 change-key mr-2"></div>
            <div class="text-item">Đổi mật khẩu</div>
          </div>
        </div>
        <div class="menu-title" @click="expandOrder()">
          <div class="icon24 order mr-2"></div>
          <div class="title-text">Đơn mua</div>
          <div
            class="icon24 next ml-auto mr-2"
            :class="{ expand: expOrder }"
          ></div>
        </div>
        <div v-if="expOrder">
          <div
            class="menu-item"
            :class="{ active: activeTab == 4 }"
            @click="changeActiveTab(4)"
          >
            <div class="icon24 order-all mr-2"></div>
            <div class="text-item">Tất cả</div>
          </div>
          <div
            class="menu-item"
            :class="{ active: activeTab == 5 }"
            @click="changeActiveTab(5)"
          >
            <div class="icon24 order-await mr-2"></div>
            <div class="text-item">Chờ xác nhận</div>
          </div>
          <div
            class="menu-item"
            :class="{ active: activeTab == 6 }"
            @click="changeActiveTab(6)"
          >
            <div class="icon24 order-await-2 mr-2"></div>
            <div class="text-item">Chờ lấy hàng</div>
          </div>
          <div
            class="menu-item"
            :class="{ active: activeTab == 7 }"
            @click="changeActiveTab(7)"
          >
            <div class="icon24 order-delivery mr-2"></div>
            <div class="text-item">Đang giao</div>
          </div>
          <div
            class="menu-item"
            :class="{ active: activeTab == 8 }"
            @click="changeActiveTab(8)"
          >
            <div class="icon24 order-delivery-2 mr-2"></div>
            <div class="text-item">Đã giao</div>
          </div>
          <div
            class="menu-item"
            :class="{ active: activeTab == 9 }"
            @click="changeActiveTab(9)"
          >
            <div class="icon24 order-cancel mr-2"></div>
            <div class="text-item">Đã Hủy</div>
          </div>
          <div
            class="menu-item"
            :class="{ active: activeTab == 10 }"
            @click="changeActiveTab(10)"
          >
            <div class="icon24 order-return mr-2"></div>
            <div class="text-item">Trả hàng/Hoàn tiền</div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-right">
      <div class="content profile" v-if="activeTab == 1">
        <div class="profile-title">Hồ sơ của tôi</div>
        <div class="profile-sub-title mt-2">
          Quản lý thông tin hồ sơ cá nhân
        </div>
        <div class="hr mt-4"></div>
        <div class="container-profile mt-4">
          <div class="profile-left">
            <div class="profile-item">
              <div class="label flex1">Họ</div>
              <base-input class="flex2 ml-4" v-model="profile.first_name">
              </base-input>
            </div>
            <div class="profile-item mt-4">
              <div class="label flex1">Tên</div>
              <base-input class="flex2 ml-4" v-model="profile.last_name">
              </base-input>
            </div>
            <div class="profile-item mt-4">
              <div class="label flex1">Địa chỉ Email</div>
              <base-input class="flex2 ml-4" v-model="profile.email">
              </base-input>
            </div>
            <div class="profile-item mt-4">
              <div class="label flex1">Số điện thoại</div>
              <base-input class="flex2 ml-4" v-model="profile.phone">
              </base-input>
            </div>

            <div class="profile-item mt-4">
              <div class="label flex1">Giới tính</div>
              <div class="group-gender ml-4 flex2 flex-row">
                <base-radio
                  name="genderX"
                  label="Nam"
                  :keyValue="1"
                  v-model="profile.gender"
                >
                </base-radio>
                <base-radio
                  name="genderX"
                  class="ml-4"
                  label="Nữ"
                  :keyValue="2"
                  v-model="profile.gender"
                >
                </base-radio>
                <base-radio
                  name="genderX"
                  class="ml-4"
                  label="Khác"
                  :keyValue="3"
                  v-model="profile.gender"
                >
                </base-radio>
              </div>
            </div>
            <div class="profile-item mt-4">
              <div class="label flex1">Ngày sinh</div>
              <div class="flex-row flex2 ml-4">
                <base-combobox
                  title="Ngày sinh"
                  class="flex1"
                  valueField="value"
                  displayField="value"
                  :chosenValue="profile.day"
                  :initText="profile.day"
                  :data="days"
                  @update:modelValue="
                    (value, displayField) => {
                      profile.day = value;
                    }
                  "
                ></base-combobox>
                <base-combobox
                  title="Tháng sinh"
                  class="flex1 ml-2"
                  valueField="value"
                  displayField="value"
                  :chosenValue="profile.month"
                  :initText="profile.month"
                  :data="months"
                  @update:modelValue="
                    (value, displayField) => {
                      profile.month = value;
                    }
                  "
                ></base-combobox>
                <base-combobox
                  title="Năm sinh"
                  class="flex1 ml-2"
                  valueField="value"
                  displayField="value"
                  :chosenValue="profile.year"
                  :initText="profile.year"
                  :data="years"
                  @update:modelValue="
                    (value, displayField) => {
                      profile.year = value;
                    }
                  "
                ></base-combobox>
              </div>
            </div>
            <div class="profile-item mt-4">
              <div class="label flex1"></div>
              <div class="flex2 ml-4">
                <base-button text="Lưu" @click="updateProfile()"> </base-button>
              </div>
            </div>
          </div>
          <div class="profile-right">
            <div class="profile-img">
              <img src="~@/assets/images/profile-user.png" alt="" />
            </div>
            <base-button
              type="secondary"
              class="mt-4"
              text="Chọn Ảnh"
            ></base-button>
          </div>
        </div>
      </div>
      <div class="content addresses" v-if="activeTab == 2">
        <div class="address-title">
          <div class="left-title">Địa chỉ của tôi</div>
          <div class="right-title">
            <base-button
              leftIcon="plus-white"
              text="Thêm mới địa chỉ"
              @click="addAddress('Add')"
            ></base-button>
          </div>
        </div>
        <div class="address-list">
          <div class="address-item" v-for="(address, i) in arrAddress" :key="i">
            <div class="item-left">
              <div class="left-title">
                <div class="name">{{ address.name }}</div>
                <div class="phone">{{ address.phone }}</div>
              </div>
              <div class="detail-address">{{ address.address_detail }}</div>
              <div class="address-commune">
                {{ address.address_summary }}
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
                <div class="delete-address ml-2" v-if="!address.is_default">
                  Xóa
                </div>
              </div>
              <div class="flex-end">
                <div
                  class="setting-default"
                  :class="{ disabled: address.is_default }"
                >
                  Thiết lập mặc định
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content reset-password" v-if="activeTab == 3">
        <div class="rs-pw-title">Đổi Mật Khẩu</div>
        <div class="rs-pw-sub-title mt-2">
          Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
        </div>
        <div class="hr mt-4"></div>
        <div class="rs-pw-control mt-4">
          <div class="rs-pw-item mt-4">
            <div class="label flex1">Mật Khẩu Hiện Tại</div>
            <base-input
              type="password"
              class="flex2 ml-4"
              v-model="password.current_password"
            >
            </base-input>
          </div>
          <div class="rs-pw-item mt-4">
            <div class="label flex1">Mật Khẩu Mới</div>
            <base-input
              type="password"
              class="flex2 ml-4"
              v-model="password.new_password"
            >
            </base-input>
          </div>
          <div class="rs-pw-item mt-4">
            <div class="label flex1">Xác Nhận Mật Khẩu</div>
            <base-input
              type="password"
              class="flex2 ml-4"
              v-model="password.confirm_password"
            >
            </base-input>
          </div>
          <div class="rs-pw-item mt-4">
            <div class="label flex1"></div>
            <div class="flex2 ml-4">
              <base-button
                text="Xác nhận"
                @click="resetPassword()"
                disabled
              ></base-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <new-address-popup></new-address-popup>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import {
  ref,
  onMounted,
  getCurrentInstance,
  reactive,
  watch,
  computed,
} from "vue";
import { useRoute } from "vue-router";
import commonFn from "@/commons/commonFunction.js";
import baseInput from "@/components/input/BaseInput.vue";
import BaseButton from "@/components/button/BaseButton.vue";
import BaseRadio from "@/components/radio/BaseRadio.vue";
import { usePersonalPageData } from "./PersonalPageData.js";
import BaseCombobox from "@/components/combobox/BaseCombobox.vue";
import popupUtil from "@/commons/popupUtil";
import NewAddressPopup from "./personalPopup/NewAddressPopup.vue";

export default {
  components: {
    baseInput,
    BaseButton,
    BaseRadio,
    BaseCombobox,
    NewAddressPopup,
  },
  name: "PersonalPage",
  setup() {
    const { proxy } = getCurrentInstance();
    const route = useRoute();
    const expAccount = ref(true);
    const expOrder = ref(true);
    const activeTab = ref(3);
    const showNewAddress = ref(false);
    const password = ref({
      current_password: null,
      new_password: null,
      confirm_password: null,
    });
    const profile = ref({
      first_name: "Đinh Quang",
      last_name: "Đạt",
      email: "dat123456@gmail.com",
      phone: "0868389674",
      gender: 1,
      day: 7,
      month: "Tháng 4",
      year: 1999,
    });
    const { days, months, years, arrAddress } = usePersonalPageData();
    onMounted(() => {
      document.getElementsByClassName(
        "main-container-content"
      )[0].scrollTop = 0;
      window.proxy = proxy;
      getActiveTabFromUrl();
    });
    const getActiveTabFromUrl = () => {
      let url = proxy.$router.currentRoute.value.fullPath;
      let arr = url.split("/");
      if (arr && arr.length >= 3) {
        activeTab.value = parseInt(arr[2]);
      } else {
        activeTab.value = 1;
        history.pushState({ prv: location.href }, "", url + "/1");
      }
    };
    const expandAccount = () => {
      expAccount.value = !expAccount.value;
    };
    const expandOrder = () => {
      expOrder.value = !expOrder.value;
    };
    const changeActiveTab = (value) => {
      activeTab.value = value;
      let url = route.matched[1].path.replace(":key?", value);
      history.pushState({ prv: location.href }, "", url);
    };
    // watch(activeTab.value, (value) => {});
    const addAddress = (mode, data) => {
      //   popupUtil.show("NewAddressPopup");
      proxy.$vfm.show("NewAddressPopup", { mode: mode, data: data });
    };

    return {
      expAccount,
      expOrder,
      expandAccount,
      expandOrder,
      profile,
      days,
      months,
      years,
      activeTab,
      changeActiveTab,
      arrAddress,
      password,
      addAddress,
    };
  },
  // computed: {
  //   ...mapGetters({
  //     searchText: "moduleHomePage/Search",
  //   }),
  //   ...mapState("moduleHomePage", {
  //     searchText: state => state.searchText
  //   })
  // },
};
</script>

<style lang="scss">
@import "./PersonalPage.scss";
</style>