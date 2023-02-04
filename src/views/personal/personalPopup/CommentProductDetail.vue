<template>
  <dynamic-popup
    :width="700"
    :height="600"
    class="size-detail"
    title="Đánh giá sản phẩm"
    @beforeOpen="beforeOpen($event, close)"
  >
    <template v-slot:icon="{ close }">
      <div class="button icon24 close" @click="close()"></div>
    </template>
    <template v-slot:content>
      <div class="flex-column h-100 popup-container">
        <div
          class="comment-item"
          v-for="(item, i) in model.commentProducts"
          :key="i"
        >
          <div class="product-info">
            <div class="p-image">
              <img :src="item.product_image" alt="" />
            </div>
            <div class="p-content">
              <div class="p-name">{{ item.product_name }}</div>
              <div class="p-classify">
                {{ productClassify(item.color_name, item.size_name) }}
              </div>
            </div>
          </div>
          <div class="flex-row">
            <div class="flex3">
              <div class="rate d-flex align-center">
                <div class="rate-title">Chất lượng sản phẩm</div>
                <star-rating
                  class="ml-4"
                  :rating="item.rate"
                  @update:rating="
                    (rate) => {
                      item.rate = rate;
                    }
                  "
                  border-color="#000000"
                  :border-width="1"
                  :increment="1"
                  :star-size="20"
                  :show-rating="false"
                  active-color="#ffb71e"
                  :max-rating="5"
                ></star-rating>
                <div class="rate-description ml-4">
                  {{ rateDescription(item.rate) }}
                </div>
              </div>

              <base-textarea
                placeholder="Chia sẻ những điều bạn thích hay chưa hài lòng về sản phẩm cho người mua khác nhé."
                v-model="item.content"
                :maxLength="255"
                class="mt-2 flex3"
              ></base-textarea>
            </div>
            <div class="flex1 ml-2">
              <div class="content">
                <div class="content-right">
                  <div class="profile-img">
                    <img
                      v-if="!item.img_url"
                      src="~@/assets/images/product_empty.png"
                      alt=""
                    />
                    <img
                      v-if="item.img_url"
                      class="avatar"
                      :src="item.img_url"
                      alt=""
                    />
                  </div>
                  <label
                    :htmlFor="'upload-avatar' + i"
                    style="width: 80px"
                    class="mt-2"
                  >
                    <span>Chọn ảnh</span>
                  </label>
                  <input
                    type="file"
                    name=""
                    :id="'upload-avatar' + i"
                    @change="uploadPhotoHandler($event, item)"
                    accept="image/gif, image/jpeg"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="hr-line-bottom mt-8 mb-8"></div>
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
import sizeAPI from "@/apis/components/sizeAPI";
import orderAPI from "@/apis/components/orderAPI";
import popupUtil from "@/commons/popupUtil";
import StarRating from "vue-star-rating";
import fileAPI from "@/apis/components/fileAPI";

export default {
  name: "CommentProductDetail",
  extends: baseDetail,
  components: {
    DynamicPopup,
    StarRating,
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const model = ref({
      order_id: null,
      commentProducts: [],
    });

    onMounted(() => {});

    const saveForm = () => {
      const me = proxy;
      orderAPI.commentProduct(model.value).then((res) => {
        if (res && res.status == 200 && res.data.statusCode == 200) {
          proxy.$toast.success("Đánh giá sản phẩm thành công");
          if (proxy._formParam.options) {
            proxy._formParam.options.submit();
          }
          proxy.hide();
        }
      });
    };

    const beforeOpen = async (e, close) => {
      proxy.super("beforeOpen", baseDetail, e, close);
      proxy._popup =
        proxy.$vfm.dynamicModals[proxy.$vfm.dynamicModals.length - 1];
      window.proxy = proxy;
      let data = proxy._formParam?.data;
      proxy.model.order_id = data.order_id;
      data.products.forEach((item) => {
        model.value.commentProducts.push({
          comment_id: commonFn.generateUUID(),
          product_id: item.product_id,
          rate: 5,
          content: null,
          img_url: null,
          color_name: item.color_name,
          size_name: item.size_name,
          product_image: item.url_img,
          product_name: item.product_name,
        });
      });
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

    const rateDescription = (rate) => {
      switch (rate) {
        case 1:
          return "Tệ";
        case 2:
          return "Không hài lòng";
        case 3:
          return "Bình thường";
        case 4:
          return "Hài lòng";
        case 5:
          return "Tuyệt vời";

        default:
          return "";
      }
    };
    const uploadPhotoHandler = async (e, p) => {
      const file = e.target.files[0];
      try {
        var formdata = new FormData();
        formdata.append("file", file);

        let res = await fileAPI.upload(
          "img_url_" + commonFn.generateUUID(),
          formdata
        );
        if (res) {
          p.img_url = res.url;
        }
      } catch (error) {
        console.log(error);
      }
    };
    return {
      model,
      saveForm,
      beforeOpen,
      productClassify,
      rateDescription,
      uploadPhotoHandler,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
.popup-container {
  padding: 16px;
  overflow: auto;

  .comment-item {
    .product-info {
      font-size: 14px;
      padding: 8px 0;
      display: flex;

      .p-image {
        img {
          width: 60px;
          height: 60px;
        }
      }

      .p-content {
        flex: 1;
        margin-left: 8px;

        .p-name {
          font-size: 16px;
          color: rgba(0, 0, 0, 0.87);
          cursor: default;
        }

        .p-classify {
          margin-top: 4px;
          color: rgba(0, 0, 0, 0.54);
        }
      }
    }
    .rate {
      .rate-title {
        font-size: 13px;
      }
      .rate-description {
        font-size: 16px;
        color: rgb(237, 165, 0);
      }
    }
    .content {
      display: flex;
      align-items: center;
      justify-content: center;
      .content-right {
        display: flex;
        flex-direction: column;
        align-items: center;
        .profile-img {
          background-size: contain;
          background-repeat: no-repeat;

          img {
            width: 120px;
            height: 80px;

            &.comment-image {
              width: 120px;
              height: 80px;
              box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px,
                rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px,
                rgba(0, 0, 0, 0.07) 0px 8px 16px,
                rgba(0, 0, 0, 0.07) 0px 16px 32px,
                rgba(0, 0, 0, 0.07) 0px 32px 64px;
            }
          }
        }
        input {
          display: none;
        }

        label {
          border: 1px solid var(--main-black-color);
          border-radius: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          color: $black;
          background-color: $secondary;
          padding: 5px 10px;

          &:hover {
            cursor: pointer;
            font-weight: 600;
            box-shadow: 0px 3px 5px -2px var(--secondary-black-color);
          }
        }

        svg {
          transform: translateY(1px);
        }
      }
    }
  }
}
</style>