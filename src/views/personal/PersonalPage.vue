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
            <div class="order-count" v-if="orderStatusCount.all">
              ({{ orderStatusCount.all }})
            </div>
          </div>
          <div
            class="menu-item"
            :class="{ active: activeTab == 5 }"
            @click="changeActiveTab(5)"
          >
            <div class="icon24 order-await mr-2"></div>
            <div class="text-item">Chờ xác nhận</div>
            <div class="order-count" v-if="orderStatusCount.acceipt">
              ({{ orderStatusCount.acceipt }})
            </div>
          </div>
          <div
            class="menu-item"
            :class="{ active: activeTab == 6 }"
            @click="changeActiveTab(6)"
          >
            <div class="icon24 order-await-2 mr-2"></div>
            <div class="text-item">Chờ lấy hàng</div>
            <div class="order-count" v-if="orderStatusCount.pending">
              ({{ orderStatusCount.pending }})
            </div>
          </div>
          <div
            class="menu-item"
            :class="{ active: activeTab == 7 }"
            @click="changeActiveTab(7)"
          >
            <div class="icon24 order-delivery mr-2"></div>
            <div class="text-item">Đang giao</div>
            <div class="order-count" v-if="orderStatusCount.delivering">
              ({{ orderStatusCount.delivering }})
            </div>
          </div>
          <div
            class="menu-item"
            :class="{ active: activeTab == 8 }"
            @click="changeActiveTab(8)"
          >
            <div class="icon24 order-delivery-2 mr-2"></div>
            <div class="text-item">Đã giao</div>
            <div class="order-count" v-if="orderStatusCount.delivered">
              ({{ orderStatusCount.delivered }})
            </div>
          </div>
          <div
            class="menu-item"
            :class="{ active: activeTab == 9 }"
            @click="changeActiveTab(9)"
          >
            <div class="icon24 order-cancel mr-2"></div>
            <div class="text-item">Đã Hủy</div>
            <div class="order-count" v-if="orderStatusCount.cancelled">
              ({{ orderStatusCount.cancelled }})
            </div>
          </div>
          <div
            class="menu-item"
            :class="{ active: activeTab == 10 }"
            @click="changeActiveTab(10)"
          >
            <div class="icon24 order-return mr-2"></div>
            <div class="text-item">Trả hàng/Hoàn tiền</div>
            <div class="order-count" v-if="orderStatusCount.undelivered">
              ({{ orderStatusCount.undelivered }})
            </div>
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
              <base-input
                ref="refFirstName"
                class="flex2 ml-4"
                v-model="userInfo.first_name"
              >
              </base-input>
            </div>
            <div class="profile-item mt-4">
              <div class="label flex1">Tên</div>
              <base-input
                ref="refLastName"
                class="flex2 ml-4"
                v-model="userInfo.last_name"
              >
              </base-input>
            </div>
            <div class="profile-item mt-4">
              <div class="label flex1">Địa chỉ Email</div>
              <base-input class="flex2 ml-4" v-model="userInfo.email" disabled>
              </base-input>
            </div>
            <div class="profile-item mt-4">
              <div class="label flex1">Số điện thoại</div>
              <base-input class="flex2 ml-4" v-model="userInfo.phone" disabled>
              </base-input>
            </div>

            <div class="profile-item mt-4">
              <div class="label flex1">Giới tính</div>
              <div class="group-gender ml-4 flex2 flex-row">
                <base-radio
                  name="genderX"
                  label="Nam"
                  :keyValue="1"
                  v-model="userInfo.gender"
                >
                </base-radio>
                <base-radio
                  name="genderX"
                  class="ml-4"
                  label="Nữ"
                  :keyValue="2"
                  v-model="userInfo.gender"
                >
                </base-radio>
                <base-radio
                  name="genderX"
                  class="ml-4"
                  label="Khác"
                  :keyValue="3"
                  v-model="userInfo.gender"
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
                  :chosenValue="userInfo.day"
                  :initText="userInfo.day"
                  :data="days"
                  @update:modelValue="
                    (value, displayField) => {
                      userInfo.day = value;
                    }
                  "
                ></base-combobox>
                <base-combobox
                  title="Tháng sinh"
                  class="flex1 ml-2"
                  valueField="value"
                  displayField="value"
                  :chosenValue="userInfo.month"
                  :initText="userInfo.month"
                  :data="months"
                  @update:modelValue="
                    (value, displayField) => {
                      userInfo.month = value;
                    }
                  "
                ></base-combobox>
                <base-combobox
                  title="Năm sinh"
                  class="flex1 ml-2"
                  valueField="value"
                  displayField="value"
                  :chosenValue="userInfo.year"
                  :initText="userInfo.year"
                  :data="years"
                  @update:modelValue="
                    (value, displayField) => {
                      userInfo.year = value;
                    }
                  "
                ></base-combobox>
              </div>
            </div>
            <div class="profile-item mt-4">
              <div class="label flex1"></div>
              <div class="flex2 ml-4">
                <base-button text="Lưu" @click="updateUserInfo()">
                </base-button>
              </div>
            </div>
          </div>
          <div class="profile-right">
            <div class="profile-img">
              <img
                v-if="!userInfo.avatar"
                src="~@/assets/images/profile-user.png"
                alt=""
              />
              <img
                v-if="userInfo.avatar"
                class="avatar"
                :src="userInfo.avatar"
                alt=""
              />
            </div>
            <label htmlFor="upload-avatar" class="mt-4">
              <span>Chọn ảnh</span>
            </label>
            <input
              type="file"
              name=""
              id="upload-avatar"
              @change="uploadPhotoHandler"
              accept="image/gif, image/jpeg"
            />
            <!-- <base-button
              type="secondary"
              class="mt-4"
              text="Chọn Ảnh"
            ></base-button> -->
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
          <div class="address-item" v-for="(address, i) in addresses" :key="i">
            <div class="item-left">
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
                <div
                  class="delete-address ml-2"
                  v-if="!address.is_default"
                  @click="deleteRow(address)"
                >
                  Xóa
                </div>
              </div>
              <div class="flex-end">
                <div
                  class="setting-default"
                  :class="{ disabled: address.is_default }"
                  @click="settingDefault(address)"
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
              title="Mật Khẩu Hiện Tại"
              type="password"
              class="flex2 ml-4"
              v-model="password.password"
              :rules="[{ name: 'required' }]"
            >
            </base-input>
          </div>
          <div class="rs-pw-item mt-4">
            <div class="label flex1">Mật Khẩu Mới</div>
            <base-input
              title="Mật Khẩu Mới"
              type="password"
              class="flex2 ml-4"
              v-model="password.new_password"
              :rules="[{ name: 'required' }, { name: 'password' }]"
            >
            </base-input>
          </div>
          <div class="rs-pw-item mt-4">
            <div class="label flex1">Xác Nhận Mật Khẩu</div>
            <base-input
              title="Xác Nhận Mật Khẩu"
              type="password"
              class="flex2 ml-4"
              v-model="password.confirm_password"
              :rules="[
                { name: 'required' },
                { name: 'password' },
                {
                  name: 'comparePassword',
                  compareValue: password.new_password,
                },
              ]"
            >
            </base-input>
          </div>
          <div class="rs-pw-item mt-4">
            <div class="label flex1"></div>
            <div class="flex2 ml-4">
              <base-button
                text="Xác nhận"
                @click="resetPassword()"
                :disabled="
                  !password.password ||
                  !password.new_password ||
                  !password.confirm_password ||
                  password.new_password != password.confirm_password
                "
              ></base-button>
            </div>
          </div>
        </div>
      </div>
      <div class="content order-container" v-if="activeTab > 3">
        <!-- <div class="order-search">
          <base-input
            class="input-filter-order"
            placeholder="Tìm kiếm theo mã đơn hàng, tên sản phẩm"
            leftIcon="search-input"
            @baseKeyup="enterSearch"
            :hasBorder="false"
            v-model="filterOrder"
            :modelValue="filterOrder"
          ></base-input>
        </div> -->
        <div class="order-list" v-if="countOrder > 0">
          <div class="order-item" v-for="(order, o) in listOrder" :key="o">
            <div class="order-title flex-between">
              <div class="left-title">
                Mã Đơn Hàng:
                <span class="order-code">{{ order.order_code }}</span>
              </div>
              <div class="right-title">
                <div class="order-status">
                  <div class="status-1">
                    <div class="icon24 status-order mr-2"></div>
                    <div class="status-text">
                      {{ statusName(order.status) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="order-body">
              <div class="order-product">
                <div
                  class="product-item"
                  v-for="(product, p) in order.products"
                  :key="p"
                >
                  <div class="product-left">
                    <img
                      :src="product.url_img"
                      alt=""
                      @click="clickToProduct(product.product_id)"
                    />
                  </div>
                  <div class="product-content">
                    <div
                      class="product-name"
                      @click="clickToProduct(product.product_id)"
                    >
                      {{ product.product_name }}
                    </div>
                    <div class="product-classify">
                      {{
                        productClassify(product.color_name, product.size_name)
                      }}
                    </div>
                    <div class="product-quantity">x{{ product.quantity }}</div>
                  </div>
                  <div class="product-right">
                    <div class="sale-price-old mr-2">
                      {{
                        product.product_amount_old
                          ? formatVND(product.product_amount_old)
                          : ""
                      }}
                    </div>
                    <div class="sale-price">
                      {{ formatVND(product.product_amount) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="order-footer mt-4">
              <div class="order-footer-left">
                <div class="address-order">
                  <span class="color-primary">Địa chỉ: </span
                  >{{ order.address }}
                </div>
                <div class="phone-order">
                  <span class="color-primary">Số điện thoại: </span
                  >{{ order.phone }}
                </div>
              </div>
              <div class="order-footer-right">
                <div class="total-amount flex-end">
                  <div class="icon24 shield-yellow mr-2"></div>
                  <div class="amount fs-14">
                    Tổng số tiền:
                    <span class="color-primary fs-20">{{
                      formatVND(order.product_amount)
                    }}</span>
                  </div>
                </div>

                <div class="list-button flex-end mt-8">
                  <base-button
                    text="Đánh Giá"
                    class="mr-2 pl-6 pr-6"
                    v-if="order.status == 1 && !order.is_comment"
                    @click="commentProduct(order)"
                  ></base-button>
                  <base-button
                    text="Mua Lại"
                    :type="'white'"
                    :hasBorder="true"
                    class="pl-6 pr-6"
                    v-if="
                      order.status == 1 ||
                      order.status == 4 ||
                      order.status == 7
                    "
                    @click="clickBuy(order)"
                  ></base-button>
                  <base-button
                    text="Hủy đơn"
                    class="pl-6 pr-6"
                    v-if="order.status == 5 || order.status == 2"
                    @click="cancelOrder(order.order_id)"
                  ></base-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="order-empty" v-if="countOrder == 0">
          <img
            src="~@/assets/images/order_empty.png"
            width="70"
            height="70"
            alt=""
          />
          <div class="empty-text mt-4">Chưa có đơn hàng</div>
        </div>
      </div>
    </div>

    <confirm-dialog></confirm-dialog>
    <!-- <new-address-popup></new-address-popup> -->
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
import { useFormat } from "@/commons/format.js";
import orderAPI from "@/apis/components/orderAPI";
import userAPI from "@/apis/components/userAPI";
import addressAPI from "@/apis/components/addressAPI";
import baseDetail from "@/views/baseDetail.js";
import fileAPI from "@/apis/components/fileAPI";
import ConfirmDialog from "primevue/confirmdialog";
import { usePrimeVue } from "primevue/config";

export default {
  components: {
    baseInput,
    BaseButton,
    BaseRadio,
    BaseCombobox,
    NewAddressPopup,
    ConfirmDialog,
  },
  name: "PersonalPage",
  extends: baseDetail,
  setup() {
    const { proxy } = getCurrentInstance();
    const route = useRoute();
    const { formatVND } = useFormat();
    const expAccount = ref(true);
    const expOrder = ref(true);
    const activeTab = ref(null);
    const userInfo = ref({});
    const addresses = ref([]);
    const showNewAddress = ref(false);
    const password = ref({
      password: null,
      new_password: null,
      confirm_password: null,
    });
    const changeToVietnamese = () => {
      const primevue = usePrimeVue();
      primevue.config.locale.accept = "Đồng ý";
      primevue.config.locale.reject = "Không";
    };
    const orderStatusCount = ref({});
    const listOrder = ref([]);
    const filterOrder = ref(null);
    const countOrder = ref([]);
    const {
      days,
      months,
      years,
      arrAddress,
      // listOrder
    } = usePersonalPageData();
    onMounted(() => {
      changeToVietnamese();
      document.getElementsByClassName(
        "main-container-content"
      )[0].scrollTop = 0;
      window.proxy = proxy;
      getActiveTabFromUrl();
      getOrderStatusCount();
    });

    const getOrderStatusCount = () => {
      orderAPI.getOrderStatusCount().then((res) => {
        orderStatusCount.value = res;
      });
    };
    const getActiveTabFromUrl = () => {
      let url = proxy.$router.currentRoute.value.fullPath;
      let arr = url.split("/");
      if (arr && arr.length >= 3) {
        activeTab.value = parseInt(arr[2]);
      } else {
        activeTab.value = 1;
        // proxy.$router.push(url + "/1");
        // history.pushState({ prv: location.href }, "", url + "/1");
      }
    };

    watch(
      () => proxy.$router.currentRoute.value.fullPath,
      (value) => {
        getActiveTabFromUrl();
      }
    );
    const expandAccount = () => {
      expAccount.value = !expAccount.value;
    };
    const expandOrder = () => {
      expOrder.value = !expOrder.value;
    };
    const changeActiveTab = (value) => {
      activeTab.value = value;
      let url = route.matched[1].path.replace(":key?", value);
      proxy.$router.push(url);
      // history.pushState({ prv: location.href }, "", url);
    };
    // watch(activeTab.value, (value) => {});
    const addAddress = (mode, data) => {
      popupUtil.show("NewAddressPopup", {
        mode: mode,
        data: data,
        options: {
          submit: () => {
            getAddress();
          },
        },
      });
    };

    const statusName = (status) => {
      switch (status) {
        case 1:
          return "Giao hàng thành công";
        case 5:
          return "Chờ xác nhận";
        case 2:
          return "Chờ lấy hàng";
        case 3:
          return "Đang giao";
        case 4:
          return "Đã hủy đơn";
        case 7:
          return "Trả hàng/Hoàn tiền";
        default:
          return "";
      }
    };

    function productClassify(color, size) {
      if (color) {
        if (size) {
          return `Phân loại hàng: ${color}/${size}`;
        } else {
          return `Phân loại hàng: ${color}`;
        }
      } else {
        if (size) {
          return `Phân loại hàng: ${size}`;
        } else {
          return null;
        }
      }
    }

    watch(
      () => activeTab.value,
      async (value) => {
        let orders = [];
        commonFn.mask();
        switch (value) {
          case 1:
            userInfo.value = await userAPI.getUserInfo();
            break;
          case 2:
            await getAddress();
            break;
          case 4:
            orders = await orderAPI.getOrder(0);
            listOrder.value = orders;
            break;
          case 5:
            orders = await orderAPI.getOrder(5);
            listOrder.value = orders;
            break;
          case 6:
            orders = await orderAPI.getOrder(2);
            listOrder.value = orders;
            break;
          case 7:
            orders = await orderAPI.getOrder(3);
            listOrder.value = orders;
            break;
          case 8:
            orders = await orderAPI.getOrder(1);
            listOrder.value = orders;
            break;
          case 9:
            orders = await orderAPI.getOrder(4);
            listOrder.value = orders;
            break;
          case 10:
            orders = await orderAPI.getOrder(7);
            listOrder.value = orders;
            break;

          default:
            break;
        }
        countOrder.value = orders.length;
        commonFn.unmask();
      }
    );

    const getAddress = async () => {
      addresses.value = await addressAPI.getAddresses();
    };

    const updateUserInfo = async () => {
      if (userInfo.value.day && userInfo.value.month && userInfo.value.year) {
        let stringDate = `${userInfo.value.month.split(" ")[1]}-${
          userInfo.value.day
        }-${userInfo.value.year}`;
        userInfo.value.date_of_birth = new Date(stringDate);
      } else {
        userInfo.value.date_of_birth = null;
      }

      if (!userInfo.value.first_name) {
        proxy.$confirm.require({
          message: "Thông tin <Họ> không được để trống",
          header: "Thông báo",
          accept: () => {
            proxy.$refs.refFirstName.$el.querySelector("input").focus();
          },
          rejectClass: "d-none",
        });
        return;
      }
      if (!userInfo.value.last_name) {
        proxy.$confirm.require({
          message: "Thông tin <Tên> không được để trống",
          header: "Thông báo",
          accept: () => {
            proxy.$refs.refLastName.$el.querySelector("input").focus();
          },
          rejectClass: "d-none",
        });
        return;
      }
      let user = Object.assign({}, userInfo.value);
      commonFn.mask();
      let data = await userAPI.updateUserInfo(user);
      if (data) {
        userInfo.value = data;
        proxy.$toast.success("Cập nhật hồ sơ thành công");
        userAPI.token().then((res) => {
          if (res && res.data && res.data.statusCode == 200) {
            proxy.$store.commit("moduleContext/updateToken", res.data.data);
            proxy.$router.go();
          }
        });
      }
      commonFn.unmask();
    };

    const settingDefault = async (address) => {
      if (address.is_default) {
        return;
      }
      commonFn.mask();
      addressAPI
        .settingDefault(address.address_id)
        .then(async (res) => {
          addresses.value = await addressAPI.getAddresses();
          proxy.$toast.success("Thiết lập địa chỉ mặc định thành công");
        })
        .finally(() => {
          commonFn.unmask();
        });
    };

    const deleteAddress = (address_id) => {
      commonFn.mask();
      addressAPI
        .deleteAddress(address_id)
        .then(async (res) => {
          addresses.value = await addressAPI.getAddresses();
          proxy.$toast.success("Xóa địa chỉ thành công");
        })
        .finally(() => {
          commonFn.unmask();
        });
    };

    const deleteRow = (address) => {
      proxy.$confirm.require({
        message: `Bạn có chắc chắn muốn xóa địa chỉ < ${address.name} - ${address.phone} > không?`,
        header: "Xóa",
        accept: () => {
          deleteAddress(address.address_id);
        },
        reject: () => {},
      });
    };

    const resetPassword = () => {
      const me = proxy;
      if (!me.validateComponents()) {
        nextTick(() => {
          me.focusFirstError();
        });
        return;
      }
      commonFn.mask();
      userAPI
        .resetPassword(password.value)
        .then((res) => {
          if (res && res.data && res.data.data) {
            proxy.$toast.success("Thay đổi mật khẩu thành công");
            proxy.$store.dispatch("moduleContext/logout");
            proxy.$router.push({ path: "/login" });
          } else {
            proxy.$toast.error(
              "Mật khẩu không chính xác, vui lòng kiểm tra lại"
            );
          }
        })
        .finally(() => {
          commonFn.unmask();
        });
    };

    const uploadPhotoHandler = async (e) => {
      const file = e.target.files[0];
      try {
        userInfo.value.avatar = "./images/loading-image.gif";
        var formdata = new FormData();
        formdata.append("file", file);

        let res = await fileAPI.upload(
          "avatar_" + commonFn.generateUUID(),
          formdata
        );
        if (res) {
          userInfo.value.avatar = res.url;
        }
      } catch (error) {
        console.log(error);
      }
    };

    const clickToProduct = (productId) => {
      proxy.$router.push({
        path: "/product",
        query: { id: productId },
      });
      proxy.$store.dispatch("moduleProductPage/updateProductId", productId);
    };

    const cancelOrder = (id) => {
      orderAPI.cancelOrder(id).then((res) => {
        activeTab.value = 9;
        getOrderStatusCount();
      });
    };

    const clickBuy = (order) => {
      let data = proxy.$store.state["moduleContext"];
      if (!data.Token || data.Context.role != 1) {
        proxy.$router.push("/login");
        return;
      }
      let products = [];
      order.products.forEach((item) => {
        products.push({
          quantity: item.quantity,
          product_detail_id: item.product_detail_id,
          product_id: item.product_id,
          product_name: item.product_name,
          size_name: item.size_name,
          color_name: item.color_name,
          img_url: item.url_img,
          sale_price: item.product_amount,
          sale_price_old: item.product_amount_old,
        });
      });
      proxy.$store.commit("moduleCart/updateCheckout", products);
      proxy.$router.push("/checkout");
    };

    const commentProduct = (order) => {
      popupUtil.show("CommentProductDetail", {
        data: order,
        options: {
          submit: async () => {
            listOrder.value = await orderAPI.getOrder(1);
          },
        },
      });
    };

    return {
      expAccount,
      expOrder,
      expandAccount,
      expandOrder,
      orderStatusCount,
      days,
      months,
      years,
      activeTab,
      changeActiveTab,
      arrAddress,
      password,
      addAddress,
      formatVND,
      listOrder,
      statusName,
      productClassify,
      filterOrder,
      countOrder,
      userInfo,
      updateUserInfo,
      addresses,
      settingDefault,
      deleteAddress,
      deleteRow,
      resetPassword,
      uploadPhotoHandler,
      clickToProduct,
      cancelOrder,
      clickBuy,
      commentProduct,
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