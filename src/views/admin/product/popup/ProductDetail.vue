<template>
  <dynamic-popup
    :width="1100"
    :height="700"
    class="product-detail"
    :title="title"
    @beforeOpen="beforeOpen($event, close)"
  >
    <template v-slot:icon="{ close }">
      <div class="button icon24 close" @click="close()"></div>
    </template>
    <template v-slot:content>
      <div class="flex-column h-100 popup-container">
        <div class="flex-row">
          <div class="flex3 pr-4 border-right">
            <div class="flex-row">
              <div class="flex1">
                <div class="control-title">
                  <label>Mã sản phẩm</label>
                </div>
                <base-input
                  title="Mã sản phẩm"
                  class="mt-1"
                  v-model="model.product_code"
                  :maxLength="20"
                  :rules="[{ name: 'required' }]"
                ></base-input>
              </div>
              <div class="flex3 ml-2">
                <div class="control-title">
                  <label>Tên sản phẩm</label>
                </div>
                <base-input
                  title="Tên sản phẩm"
                  class="mt-1"
                  v-model="model.product_name"
                  :maxLength="255"
                  :rules="[{ name: 'required' }]"
                ></base-input>
              </div>
            </div>
            <div class="flex-row align-center mt-2">
              <div>
                <div class="control-title">
                  <label>Mức độ nổi bật:</label>
                </div>
              </div>
              <div class="flex1 flex-row align-center ml-2">
                <star-rating
                  :rating="model.outstanding"
                  @update:rating="
                    (rate) => {
                      model.outstanding = rate;
                    }
                  "
                  :increment="1"
                  :star-size="20"
                  :show-rating="true"
                  :max-rating="10"
                ></star-rating>
                <span>/10</span>
              </div>
            </div>
            <div class="flex-row mt-2">
              <div class="flex1">
                <div class="control-title mb-2">
                  <label>Mô tả chi tiết sản phẩm</label>
                </div>
                <ckeditor
                  :editor="editor"
                  v-model="model.description"
                ></ckeditor>
              </div>
            </div>
            <div class="flex-row align-center mt-4">
              <div class="flexa">
                <div class="control-title">
                  <label>Màu sắc</label>
                </div>
              </div>
              <div class="flex1 ml-2">
                <div class="list-detail">
                  <div
                    class="detail-item"
                    v-for="(color, i) in colors"
                    :key="i"
                  >
                    <div class="detail-text">{{ color }}</div>
                    <div class="detail-x" @click="deleteColor(color)">x</div>
                  </div>
                </div>
                <div class="flex-row align-center mt-2">
                  <base-combobox
                    title="Màu sắc"
                    placeholder="Tìm kiếm màu sắc"
                    class="flex2"
                    valueField="color_id"
                    displayField="color_name"
                    :data="dataColor"
                    @update:modelValue="
                      (value, displayField) => {
                        selectColor(value, displayField);
                      }
                    "
                  ></base-combobox>
                  <div class="txt-link ml-2">Thêm nhanh màu sắc</div>
                  <div class="flex3"></div>
                </div>
              </div>
            </div>
            <div class="flex-row align-center mt-4">
              <div class="flexa">
                <div class="control-title">
                  <label>Kích cỡ</label>
                </div>
              </div>
              <div class="flex1 ml-2">
                <div class="list-detail">
                  <div class="detail-item" v-for="(size, i) in sizes" :key="i">
                    <div class="detail-text">{{ size }}</div>
                    <div class="detail-x" @click="deleteSize(size)">x</div>
                  </div>
                </div>
                <div class="flex-row align-center mt-2">
                  <base-combobox
                    title="Kích cỡ"
                    placeholder="Tìm kiếm kích cỡ"
                    class="flex2"
                    valueField="size_id"
                    displayField="size_name"
                    :data="dataSize"
                    @update:modelValue="
                      (value, displayField) => {
                        selectSize(value, displayField);
                      }
                    "
                  ></base-combobox>
                  <div class="txt-link ml-2">Thêm nhanh kích cỡ</div>
                  <div class="flex3"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex2 ml-4">
            <div class="flexa">
              <div class="control-title">
                <label>Thuộc tính</label>
              </div>

              <div class="flex1">
                <div class="flex-row align-center mt-1">
                  <base-combobox
                    title="Thuộc tính"
                    placeholder="Tìm kiếm"
                    class="flex2"
                    valueField="attribute_id"
                    displayField="attribute_name"
                    :data="dataAttribute"
                    @update:modelValue="
                      (value, displayField) => {
                        selectAttribute(value, displayField);
                      }
                    "
                  ></base-combobox>
                  <div class="txt-link ml-2">Thêm nhanh thuộc tính</div>
                </div>
              </div>
            </div>
            <div class="list-attribute mt-2">
              <div
                class="attribute-item"
                v-for="(attr, i) in attributes"
                :key="i"
              >
                <div class="attr-title" :title="attr.attribute_name">
                  {{ attr.attribute_name }}
                </div>
                <div class="attr-value" :title="attr.value">
                  <base-input
                    hideError
                    v-model="attr.value"
                    isNullable
                    :maxLength="255"
                    :rules="[{ name: 'required' }]"
                  ></base-input>
                </div>
                <span
                  class="txt-link ml-1"
                  @click="deleteAttribute(attr.attribute_id)"
                  >xóa</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="flex-row mt-4">
          <div class="table-product">
            <div class="table-header">
              <div class="header-item img_url">Ảnh</div>
              <div class="header-item name">Tên sản phẩm</div>
              <div class="header-item quantity">Số lượng</div>
              <div class="header-item purchase_price">Giá nhập</div>
              <div class="header-item product_discount">Giảm giá (%)</div>
              <div class="header-item sale_price_old">Giá bán gốc</div>
              <div class="header-item sale_price">Giá bán</div>
            </div>
            <div
              class="product-detail"
              v-for="(p, i) in model.ProductDetails"
              :key="i"
            >
              <div class="detail-item img_url">
                <label
                  :htmlFor="'upload-avatar' + i"
                  class="image"
                  v-if="!p.img_url"
                >
                  <img src="~@/assets/images/no-comment.png" alt="" />
                </label>
                <label
                  :htmlFor="'upload-avatar' + i"
                  class="image"
                  v-if="p.img_url"
                >
                  <img :src="p.img_url" alt="" />
                </label>
                <input
                  type="file"
                  class="d-none"
                  name=""
                  :id="'upload-avatar' + i"
                  @change="uploadPhotoHandler($event, p)"
                  accept="image/gif, image/jpeg"
                />
              </div>
              <div class="detail-item name">{{ nameProduct(p) }}</div>
              <div class="detail-item quantity">
                <base-number
                  :min="0"
                  :rules="[{ name: 'required' }]"
                  :hideError="true"
                  v-model="p.quantity"
                  isNullable
                ></base-number>
              </div>
              <div class="detail-item purchase_price">
                <base-number
                  :min="0"
                  :rules="[{ name: 'required' }]"
                  hideError
                  v-model="p.purchase_price"
                  isNullable
                ></base-number>
              </div>
              <div class="detail-item product_discount">
                <base-number
                  :min="0"
                  :rules="[{ name: 'required' }]"
                  hideError
                  v-model="p.product_discount"
                ></base-number>
              </div>
              <div class="detail-item sale_price_old">
                <base-number
                  :min="0"
                  :rules="[{ name: 'required' }]"
                  hideError
                  v-model="p.sale_price_old"
                ></base-number>
              </div>
              <div class="detail-item sale_price">
                <base-number
                  :min="0"
                  :rules="[{ name: 'required' }]"
                  hideError
                  v-model="p.sale_price"
                  isNullable
                ></base-number>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer="{ close }">
      <div class="h-100 flex-end align-center flex1">
        <base-button
          class="transparent"
          type="secondary"
          text="Trở lại"
          @click="close()"
        ></base-button>
        <base-button
          class="ml-4"
          @click="saveProduct"
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
import commonFn from "@/commons/commonFunction.js";
import axios from "axios";
import baseDetail from "@/views/baseDetail.js";
import productAPI from "@/apis/components/productAPI";
import popupUtil from "@/commons/popupUtil";
import StarRating from "vue-star-rating";
import BaseCombobox from "@/components/combobox/BaseCombobox.vue";
import colorAPI from "@/apis/components/colorAPI";
import sizeAPI from "@/apis/components/sizeAPI";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import fileAPI from "@/apis/components/fileAPI";
import attributeAPI from "@/apis/components/attributeAPI";

export default {
  name: "ProductDetail",
  extends: baseDetail,
  components: {
    DynamicPopup,
    StarRating,
    BaseCombobox,
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const title = ref("");
    let editor = reactive(ClassicEditor);
    const productDetail = ref({});
    const model = ref({
      outstanding: 1,
      color: "",
      size: "",
      ProductDetails: [],
      product_code: null,
      product_name: null,
      Attributes: [],
      description: "",
      summary: null,
      status: 1,
    });

    watch(
      () =>
        model.value.color + model.value.size + (model.value.product_name || ""),
      (value) => {
        let data = [];
        model.value.product_name = model.value.product_name || "";
        if (proxy.colors.length > 0 && proxy.sizes.length > 0) {
          proxy.colors.forEach((color) => {
            proxy.sizes.forEach((size) => {
              let item = model.value.ProductDetails.find(
                (x) => x.color_name == color && x.size_name == size
              );
              if (item) {
                item.product_name = model.value.product_name;
                data.push(item);
              } else {
                data.push({
                  product_name: model.value.product_name,
                  color_name: color,
                  size_name: size,
                });
              }
            });
          });
        } else if (proxy.colors.length == 0 && proxy.sizes.length > 0) {
          proxy.sizes.forEach((size) => {
            let item = model.value.ProductDetails.find(
              (x) => x.size_name == size
            );
            if (item) {
              item.product_name = model.value.product_name;
              data.push(item);
            } else {
              data.push({
                product_name: model.value.product_name,
                color_name: null,
                size_name: size,
              });
            }
          });
        } else if (proxy.colors.length > 0 && proxy.sizes.length == 0) {
          proxy.colors.forEach((color) => {
            let item = model.value.ProductDetails.find(
              (x) => x.color_name == color
            );
            if (item) {
              item.product_name = model.value.product_name;
              data.push(item);
            } else {
              data.push({
                product_name: model.value.product_name,
                size_name: null,
                color_name: color,
              });
            }
          });
        } else {
          let item = model.value.ProductDetails[0];
          if (item) {
            item.product_name = model.value.product_name;
            item.color_name = model.value.color_name;
            item.size_name = model.value.size_name;
            data.push(item);
          } else {
            data.push({
              product_name: model.value.product_name,
              size_name: null,
              color_name: null,
            });
          }
        }

        data.forEach((item) => {
          (item.product_detail_id =
            item.product_detail_id || commonFn.generateUUID()),
            (item.product_id = model.value.product_id);
          item.quantity = item.quantity || null;
          item.img_url = item.img_url || null;
          item.purchase_price = item.purchase_price || null;
          item.product_discount = item.product_discount || null;
          item.sale_price_old = item.sale_price_old || null;
          item.sale_price = item.sale_price || null;
        });

        model.value.ProductDetails = data;
      },
      {
        deep: true,
      }
    );
    const dataColor = ref([]);
    const dataSize = ref([]);
    const dataAttribute = ref([]);
    const colors = computed(() => {
      if (model.value.color) {
        return model.value.color.split(";");
      }
      return [];
    });
    const sizes = computed(() => {
      if (model.value.size) {
        return model.value.size.split(";");
      }
      return [];
    });
    onMounted(() => {
      getColors();
      getSizes();
      getAttribute();
      model.value.Attributes = [];
    });

    const getColors = () => {
      let filter = [
        {
          Field: "status",
          Value: 1,
        },
      ];
      let payload = {
        columns: "color_id,color_name,status",
        sort: "color_name",
        filter: filter,
      };
      colorAPI.getComboboxPaging(payload).then((res) => {
        if (res) {
          dataColor.value = res;
        }
      });
    };

    const getAttribute = () => {
      let filter = [
        {
          Field: "status",
          Value: 1,
        },
      ];
      let payload = {
        columns: "attribute_id,attribute_name,status",
        sort: "attribute_name",
        filter: filter,
      };
      attributeAPI.getComboboxPaging(payload).then((res) => {
        dataAttribute.value = res;
      });
    };

    const getSizes = () => {
      let filter = [
        {
          Field: "status",
          Value: 1,
        },
      ];
      let payload = {
        columns: "size_id,size_name,status",
        sort: "size_name",
        filter: filter,
      };
      sizeAPI.getComboboxPaging(payload).then((res) => {
        if (res) {
          dataSize.value = res;
        }
      });
    };

    const saveProduct = () => {
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
        productAPI.saveProduct(model.value).then((res) => {
          proxy.$toast.success("Thêm sản phẩm thành công");
          popupUtil.hideAll();
        });
      } else {
      }
    };

    const beforeOpen = async (e, close) => {
      proxy.super("beforeOpen", baseDetail, e, close);
      window.proxy = proxy;

      if (proxy._formParam.data) {
      }
      changeTitle();
    };

    const changeTitle = () => {
      if (proxy._formParam?.mode == "Add") {
        title.value = "Thêm mới sản phẩm";
        model.value.product_name = "";
        model.value.product_id = commonFn.generateUUID();
      } else {
        title.value = "Sửa sản phẩm";
      }
    };
    const selectColor = (value, displayField) => {
      if (!displayField) {
        return;
      }
      if (model.value.color) {
        if (!model.value.color.split(";").some((x) => x == displayField)) {
          model.value.color += ";" + displayField;
        }
      } else {
        model.value.color = displayField;
      }
    };
    const selectSize = (value, displayField) => {
      if (!displayField) {
        return;
      }
      if (model.value.size) {
        if (!model.value.size.split(";").some((x) => x == displayField)) {
          model.value.size += ";" + displayField;
        }
      } else {
        model.value.size = displayField;
      }
    };

    const selectAttribute = (value, displayField) => {
      if (
        !model.value.Attributes.some((x) => x.attribute_id === value) &&
        value
      ) {
        model.value.Attributes.push({
          attribute_id: value,
          attribute_name: displayField,
          value: null,
          state: "insert",
        });
      }
    };

    const deleteColor = (color) => {
      model.value.color = model.value.color
        .split(";")
        .filter((x) => x != color)
        .join(";");
    };

    const deleteSize = (size) => {
      model.value.size = model.value.size
        .split(";")
        .filter((x) => x != size)
        .join(";");
    };
    const nameProduct = (p) => {
      if (p.color_name && p.size_name) {
        return `${p.product_name || ""} (${p.color_name}/${p.size_name})`;
      } else if (p.color_name && !p.size_name) {
        return `${p.product_name || ""} (${p.color_name})`;
      } else if (!p.color_name && p.size_name) {
        return `${p.product_name || ""} (${p.size_name})`;
      } else {
        return p.product_name;
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

    const attributes = computed(() => {
      return model.value.Attributes.filter((x) => x.state !== "delete");
    });

    const deleteAttribute = (attributeId) => {
      let attr = model.value.Attributes.find(
        (x) => (x.attribute_id == attributeId)
      );
      if (attr) {
        if (attr.state === "insert") {
          model.value.Attributes = model.value.Attributes.filter(
            (x) => x.attribute_id !== attributeId
          );
        } else {
          attr.state = "delete";
        }
      }
    };

    return {
      model,
      title,
      saveProduct,
      beforeOpen,
      colors,
      sizes,
      dataColor,
      selectColor,
      deleteColor,
      deleteSize,
      selectSize,
      dataSize,
      nameProduct,
      editor,
      uploadPhotoHandler,
      selectAttribute,
      dataAttribute,
      attributes,
      deleteAttribute,
    };
  },
};
</script>
<style lang="scss">
@import "./ProductDetail.scss";
</style>
