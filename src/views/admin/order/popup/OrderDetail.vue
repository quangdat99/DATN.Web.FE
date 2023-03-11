<template>
  <dynamic-popup
    :width="900"
    :height="600"
    class="color-detail"
    title="Đơn hàng"
    @beforeOpen="beforeOpen($event, close)"
  >
    <template v-slot:icon="{ close }">
      <div class="button icon24 close" @click="close()"></div>
    </template>
    <template v-slot:content>
      <div class="flex-column h-100 popup-container">
        <div class="flex-row">
          <div class="flex5">
            <div class="flex-row align-center">
              <div class="flex flex-row">
                <div class="control-title">
                  <label>Mã đơn hàng:</label>
                </div>
                <div class="ml-2">
                  {{ model.order_code }}
                </div>
              </div>
              <div class="flex flex-row">
                <div class="control-title">
                  <label>Trạng thái:</label>
                </div>
                <div class="ml-2 color-primary">
                  {{ model.status_name }}
                </div>
              </div>
            </div>
            <div class="flex-row align-center mt-2">
              <div class="flexa">
                <div class="control-title">
                  <label>Người mua:</label>
                </div>
              </div>
              <div class="flex ml-2">
                {{ model.buyer_name }}
              </div>
            </div>
            <div class="flex-row align-center mt-2">
              <div class="flexa">
                <div class="control-title">
                  <label>Người nhận hàng:</label>
                </div>
              </div>
              <div class="flex ml-2">
                {{ model.user_name }}
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
            <div class="flex-row align-center mt-2">
              <div class="flexa">
                <div class="control-title">
                  <label>Địa chỉ nhận hàng:</label>
                </div>
              </div>
              <div class="flex ml-2">
                {{ model.address }}
              </div>
            </div>
            <div class="flex-row align-center mt-2">
              <div class="flexa">
                <div class="control-title">
                  <label>Tổng tiền:</label>
                </div>
              </div>
              <div class="flex ml-2 color-primary">
                {{ model.totalAmount }} đ
              </div>
            </div>
          </div>
          <div class="hr-line-left ml-2"></div>
          <div class="flex3 ml-2">
            <div class="flex-row align-center mt-2">
              <div class="flexa">
                <div class="control-title">
                  <label>Ngày tạo đơn:</label>
                </div>
              </div>
              <div class="flex ml-2">{{ model.str_created_date }}</div>
            </div>
            <div
              class="flex-row align-center mt-2"
              v-if="model.str_cancel_date"
            >
              <div class="flexa">
                <div class="control-title">
                  <label>Ngày hủy đơn:</label>
                </div>
              </div>
              <div class="flex ml-2">{{ model.str_cancel_date }}</div>
            </div>
            <div
              class="flex-row align-center mt-2"
              v-if="model.str_statrt_delivery_date"
            >
              <div class="flexa">
                <div class="control-title">
                  <label>Ngày xác nhận:</label>
                </div>
              </div>
              <div class="flex ml-2">{{ model.str_statrt_delivery_date }}</div>
            </div>
            <div
              class="flex-row align-center mt-2"
              v-if="model.str_delivery_date"
            >
              <div class="flexa">
                <div class="control-title">
                  <label>Ngày bắt đầu giao:</label>
                </div>
              </div>
              <div class="flex ml-2">{{ model.str_delivery_date }}</div>
            </div>
            <div
              class="flex-row align-center mt-2"
              v-if="model.str_success_date"
            >
              <div class="flexa">
                <div class="control-title">
                  <label>Ngày giao thành công:</label>
                </div>
              </div>
              <div class="flex ml-2">{{ model.str_success_date }}</div>
            </div>
            <div
              class="flex-row align-center mt-2"
              v-if="model.str_delivery_failed_date"
            >
              <div class="flexa">
                <div class="control-title">
                  <label>Ngày giao hàng thất bại:</label>
                </div>
              </div>
              <div class="flex ml-2">{{ model.str_delivery_failed_date }}</div>
            </div>
            <div
              class="flex-row align-center mt-2"
              v-if="model.str_refund_date"
            >
              <div class="flexa">
                <div class="control-title">
                  <label>Ngày hoàn hàng trở lại:</label>
                </div>
              </div>
              <div class="flex ml-2">{{ model.str_refund_date }}</div>
            </div>
          </div>
        </div>
        <div class="hr-line-bottom mt-2"></div>
        <div class="flex-row mt-2">
          <div class="order-product">
            <div
              class="product-item"
              v-for="(product, p) in model.productOrders"
              :key="p"
            >
              <div class="product-left">
                <img :src="product.url_img" alt="" />
              </div>
              <div class="product-content">
                <div class="product-name">
                  {{ product.product_name }}
                </div>
                <div class="product-classify">
                  {{ productClassify(product.color_name, product.size_name) }}
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
      </div>
    </template>
    <template v-slot:footer="{ close }">
      <div class="h-100 d-flex align-center flex1">
        <base-button
          v-if="model.status == 5 || model.status == 2"
          class="transparent"
          type="secondary"
          text="Xóa đơn hàng"
          @click="deleteOrder(model)"
        >
        </base-button>
        <div class="flex1 flex-end">
          <base-button
            class="transparent mr-4"
            type="secondary"
            text="Trở lại"
            @click="close()"
          ></base-button>
          <base-button
            v-if="model.status == 5"
            class="ml-4"
            @click="changeStatus(2)"
            text="Xác nhận đơn hàng"
          ></base-button>
          <base-button
            v-if="model.status == 2"
            class="ml-4"
            @click="changeStatus(3)"
            text="Bắt đầu giao hàng"
          ></base-button>
          <base-button
            v-if="model.status == 3"
            class="ml-4"
            @click="changeStatus(1)"
            text="Giao hàng thành công"
          ></base-button>
          <base-button
            v-if="model.status == 3"
            class="ml-4"
            @click="changeStatus(6)"
            text="Giao hàng thất bại"
          ></base-button>
          <base-button
            v-if="model.status == 6"
            class="ml-4"
            @click="changeStatus(7)"
            text="Hoàn lại đơn"
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
import orderAPI from "@/apis/components/orderAPI";
import { useFormat } from "@/commons/format.js";

export default {
  name: "ColorDetail",
  extends: baseDetail,
  components: {
    DynamicPopup,
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const { formatVND } = useFormat();
    const model = ref({});

    onMounted(() => {});

    const beforeOpen = async (e, close) => {
      proxy.super("beforeOpen", baseDetail, e, close);
      proxy._popup =
        proxy.$vfm.dynamicModals[proxy.$vfm.dynamicModals.length - 1];
      window.proxy = proxy;
      model.value = await orderAPI.getOrderInfo(proxy._formParam.data.order_id);
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
    const changeStatus = (status) => {
      orderAPI.changeStatus(model.value.order_id, status).then((res) => {
        if (res) {
          model.value = res;
          switch (res.status) {
            case 2:
              proxy.$toast.success("Xác nhận đơn hàng");
              break;
            case 3:
              proxy.$toast.success("Bắt đầu giao hàng");
              break;
            case 1:
              proxy.$toast.success("Giao hàng thành công");
              break;
            case 6:
              proxy.$toast.success("Giao hàng thất bại");
              break;
            case 7:
              proxy.$toast.success("Hoàn trả lại đơn hàng");
              break;
          }
          if (proxy._formParam.options) {
            proxy._formParam.options.submit();
          }
        }
      });
    };

    const deleteOrder = (item) => {
      proxy.$confirm.require({
        message: `Bạn có chắc chắn muốn xóa đơn hàng < ${item.order_code} > không?`,
        header: "Xóa",
        accept: () => {
          orderAPI.delete(item, item.order_id).then((res) => {
            if (res && res.status == 200) {
              if (res.data.statusCode == 200) {
                proxy.$toast.success(
                  `Xóa đơn hàng < ${item.order_code} > thành công`
                );
              } else if (res.data.statusCode == 210) {
                proxy.$confirm.require({
                  message: res.data.userMessage,
                  header: "Thông báo",
                  rejectClass: "d-none",
                });
              }

              if (proxy._formParam.options) {
                proxy._formParam.options.submit();
              }
              proxy.hide();
            }
          });
        },
        reject: () => {},
      });
    };

    return {
      model,
      beforeOpen,
      formatVND,
      productClassify,
      changeStatus,
      deleteOrder,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.popup-container {
  font-size: 13px;
  padding: 16px;
  overflow: auto;

  .order-product {
    width: 100%;
    .product-item {
      font-size: 12px;
      padding: 8px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.09);
      display: flex;

      .product-left {
        img {
          width: 60px;
          height: 60px;
          cursor: pointer;
        }
      }

      .product-content {
        flex: 1;
        margin-left: 8px;

        .product-name {
          font-size: 13px;
          color: rgba(0, 0, 0, 0.87);
          cursor: pointer;
        }

        .product-classify {
          margin-top: 4px;
          color: rgba(0, 0, 0, 0.54);
        }

        .product-quantity {
          margin-top: 4px;
          color: rgba(0, 0, 0, 0.87);
        }
      }

      .product-right {
        display: flex;
        align-items: center;

        .sale-price-old {
          text-decoration: line-through;
          color: #82869e;
          font-size: 12px;
        }

        .sale-price {
          color: $primary;
          font-size: 12px;
        }
      }
    }
  }
}
</style>