<template>
  <dynamic-popup
    :width="900"
    :height="600"
    class="dashboard-order-detail"
    title="Thông tin đơn hàng"
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
                  <label>Tiền vốn:</label>
                </div>
              </div>
              <div class="flexa ml-2">{{ model.purchaseAmount }}</div>
              <div class="flexa ml-8">
                <div class="control-title">
                  <label>Tổng tiền:</label>
                </div>
              </div>
              <div class="flexa ml-2 color-primary">
                {{ model.totalAmount }} đ
              </div>
              <div class="flexa ml-8">
                <div class="control-title">
                  <label>Lợi nhuận:</label>
                </div>
              </div>
              <div class="flexa ml-2 color-primary bold">
                {{ model.profitAmount }}
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
        <div class="flex-column mt-2">
          <div class="order-product">
            <div class="product-item">
              <div class="product-left" style="width: 60px"></div>
              <div class="product-content"></div>
              <div class="product-right">
                <div class="purchase-amount">Giá vốn</div>
                <div class="sale-price">Giá bán</div>
                <div class="profit-price">Lợi nhuận</div>
              </div>
            </div>
          </div>
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
                <div class="purchase-amount">
                  {{
                    product.purchase_amount
                      ? formatVND(product.purchase_amount)
                      : ""
                  }}
                </div>
                <div class="sale-price">
                  {{ formatVND(product.product_amount) }}
                </div>
                <div class="profit-price">
                  {{
                    formatVND(product.product_amount - product.purchase_amount)
                  }}
                </div>
              </div>
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
import baseDetail from "@/views/baseDetail.js";
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
      let amountPurchase = 0;
      let amountProfit = 0;
      model.value.productOrders.forEach((item) => {
        amountPurchase += item.purchase_amount * item.quantity;
        amountProfit +=
          (item.product_amount - item.purchase_amount) * item.quantity;
      });
      model.value.purchaseAmount = formatVND(amountPurchase);
      model.value.profitAmount = formatVND(amountProfit);
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

    return {
      model,
      beforeOpen,
      formatVND,
      productClassify,
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
        flex: 2;
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
        flex: 1;
        align-items: center;

        .purchase-amount {
          flex: 1;
          color: #82869e;
          font-size: 12px;
        }

        .sale-price {
          flex: 1;
          color: $primary;
          font-size: 12px;
        }

        .profit-price {
          flex: 1;
          color: $primary;
          font-size: 12px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>