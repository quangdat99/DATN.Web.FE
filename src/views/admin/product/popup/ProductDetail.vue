<template>
  <dynamic-popup
    :width="960"
    :height="650"
    class="product-detail"
    :title="title"
    @beforeOpen="beforeOpen($event, close)"
  >
    <template v-slot:icon="{ close }">
      <div class="button icon24 close" @click="close()"></div>
    </template>
    <template v-slot:content>
      <div class="flex-column h-100 popup-container">
        <div class="list-tab ml-4 mt-2">
          <div
            class="tab-option"
            :class="{ active: tabActive == 1 }"
            @click="clickTabActive(1)"
          >
            Thông tin chung
          </div>
          <div
            class="tab-option"
            :class="{ active: tabActive == 2 }"
            @click="clickTabActive(2)"
          >
            Mô tả
          </div>
          <div
            class="tab-option"
            :class="{ active: tabActive == 3 }"
            @click="clickTabActive(3)"
          >
            Nhóm thuộc tính
          </div>
          <div
            class="tab-option"
            :class="{ active: tabActive == 4 }"
            @click="clickTabActive(4)"
          >
            Loại sản phẩm
          </div>
        </div>
        <div class="list-tab-content">
          <div class="tab-content" v-show="tabActive == 1">
            <div class="flex3 mt-2">
              <div class="flex-row">
                <div class="flex1">
                  <div class="control-title">
                    <label>Mã sản phẩm</label>
                  </div>
                  <base-input
                    ref="refFocus"
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
                      <div class="detail-text">{{ color.color }}</div>
                      <div
                        class="detail-x"
                        v-if="color.canDelete"
                        @click="deleteColor(color.color)"
                      >
                        x
                      </div>
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
                    <div
                      class="detail-item"
                      v-for="(size, i) in sizes"
                      :key="i"
                    >
                      <div class="detail-text">{{ size.size }}</div>
                      <div
                        class="detail-x"
                        v-if="size.canDelete"
                        @click="deleteSize(size.size)"
                      >
                        x
                      </div>
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
                  v-for="(p, i) in model.productDetails"
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
                      keepZero
                    ></base-number>
                  </div>
                  <div class="detail-item purchase_price">
                    <base-number
                      :min="0"
                      :rules="[{ name: 'required' }]"
                      hideError
                      v-model="p.purchase_price"
                      isNullable
                      keepZero
                    ></base-number>
                  </div>
                  <div class="detail-item product_discount">
                    <base-number
                      :min="0"
                      :rules="[{ name: 'required' }]"
                      hideError
                      v-model="p.product_discount"
                      keepZero
                    ></base-number>
                  </div>
                  <div class="detail-item sale_price_old">
                    <base-number
                      :min="0"
                      :rules="[{ name: 'required' }]"
                      hideError
                      v-model="p.sale_price_old"
                      keepZero
                    ></base-number>
                  </div>
                  <div class="detail-item sale_price">
                    <base-number
                      :min="0"
                      :rules="[{ name: 'required' }]"
                      hideError
                      v-model="p.sale_price"
                      isNullable
                      keepZero
                    ></base-number>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-content" v-show="tabActive == 2">
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
          </div>
          <div class="tab-content" v-show="tabActive == 3">
            <div class="flex-row mt-2">
              <div class="flex2">
                <div class="flexa">
                  <div class="control-title">
                    <label>Thuộc tính</label>
                  </div>

                  <div class="flex1">
                    <div class="flex-row align-center mt-1">
                      <base-combobox
                        title="Thuộc tính"
                        placeholder="Tìm kiếm nhóm thuộc tính"
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
                <div class="hr-line mt-4"></div>
                <div class="list-attribute mt-4">
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
          </div>
          <div class="tab-content" v-show="tabActive == 4">
            <div class="flex-row mt-2">
              <div class="flex2">
                <div class="flexa">
                  <div class="control-title">
                    <label>Loại sản phẩm</label>
                  </div>

                  <div class="flex1">
                    <div class="flex-row align-center mt-1">
                      <base-combobox
                        title="Loại sản phẩm"
                        placeholder="Tìm kiếm loại sản phẩm"
                        class="flex2"
                        valueField="category_id"
                        displayField="category_name"
                        :data="dataCategory"
                        @update:modelValue="
                          (value, displayField) => {
                            selectCategory(value, displayField);
                          }
                        "
                      ></base-combobox>
                      <div class="txt-link ml-2">Thêm nhanh loại sản phẩm</div>
                    </div>
                  </div>
                </div>
                <div class="hr-line mt-4"></div>
                <div class="list-attribute mt-2">
                  <div
                    class="attribute-item"
                    v-for="(attr, i) in categories"
                    :key="i"
                  >
                    <div class="attr-title" :title="attr.category_name">
                      {{ attr.category_name }}
                    </div>
                    <span
                      class="txt-link ml-1"
                      @click="deleteCategory(attr.category_id)"
                      >xóa</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer="{ close }">
      <div class="h-100 d-flex align-center flex1">
        <base-checkbox
          v-if="mode != 'Add'"
          v-model="model.status"
          label="Sử dụng"
        ></base-checkbox>
        <div class="flex1 flex-end">
          <base-button
            v-if="mode != 'Add'"
            class="transparent"
            type="secondary"
            text="Lấy lại dữ liệu"
            @click="getDefault()"
          ></base-button>
          <base-button
            class="transparent ml-4"
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
import categoryAPI from "@/apis/components/categoryAPI";

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
    const tabActive = ref(1);
    const productDetail = ref({});
    const model = ref({
      outstanding: 1,
      color: "",
      size: "",
      productDetails: [],
      product_code: null,
      product_name: null,
      attributes: [],
      categories: [],
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
              let item = model.value.productDetails.find(
                (x) => x.color_name == color.color && x.size_name == size.size
              );
              if (item) {
                item.product_name = model.value.product_name;
                item.color_name = color.color;
                item.size_name = size.size;
                data.push(item);
              } else {
                data.push({
                  product_name: model.value.product_name,
                  color_name: color.color,
                  size_name: size.size,
                  state: 1,
                });
              }
            });
          });
        } else if (proxy.colors.length == 0 && proxy.sizes.length > 0) {
          proxy.sizes.forEach((size) => {
            let item = model.value.productDetails.find(
              (x) => x.size_name == size.size
            );
            if (item) {
              item.product_name = model.value.product_name;
              item.color_name = null;
              item.size_name = size.size;
              data.push(item);
            } else {
              data.push({
                product_name: model.value.product_name,
                color_name: null,
                size_name: size.size,
                state: 1,
              });
            }
          });
        } else if (proxy.colors.length > 0 && proxy.sizes.length == 0) {
          proxy.colors.forEach((color) => {
            let item = model.value.productDetails.find(
              (x) => x.color_name == color.color
            );
            if (item) {
              item.product_name = model.value.product_name;
              item.color_name = color.color;
              item.size_name = null;
              data.push(item);
            } else {
              data.push({
                product_name: model.value.product_name,
                size_name: null,
                color_name: color.color,
                state: 1,
              });
            }
          });
        } else {
          let item = model.value.productDetails[0];
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
              state: 1,
            });
          }
        }
        model.value.productDetails = model.value.productDetails.filter(
          (x) => x.state == 2
        );
        data.forEach((item) => {
          item.state = item.state == 2 ? 2 : 1;
          item.product_detail_id =
            item.product_detail_id || commonFn.generateUUID();
          item.product_id = model.value.product_id;
          item.quantity = item.quantity === undefined ? null : item.quantity;
          item.img_url = item.img_url === undefined ? null : item.img_url;
          item.purchase_price =
            item.purchase_price === undefined ? null : item.purchase_price;
          item.product_discount =
            item.product_discount === undefined ? null : item.product_discount;
          item.sale_price_old =
            item.sale_price_old === undefined ? null : item.sale_price_old;
          item.sale_price =
            item.sale_price === undefined ? null : item.sale_price;
          if (
            !model.value.productDetails.some(
              (x) => x.product_detail_id == item.product_detail_id
            )
          ) {
            model.value.productDetails.push(item);
          }
        });
        model.value.productDetails = model.value.productDetails.sort((a, b) =>
          Comparator(nameProduct(a), nameProduct(b))
        );
      },
      {
        deep: true,
      }
    );
    const dataColor = ref([]);
    const dataSize = ref([]);
    const dataAttribute = ref([]);
    const dataCategory = ref([]);
    const colors = computed(() => {
      if (model.value.color) {
        let arr = model.value.color.split(";").sort();
        let arrColor = [];
        for (let i = 0; i < arr.length; i++) {
          let color = arr[i];
          let obj = {
            color: color,
          };
          if (
            !model.value.productDetails.some(
              (x) => x.color_name == color && x.state == 2
            )
          ) {
            obj.canDelete = true;
          } else {
            obj.canDelete = false;
          }
          arrColor.push(obj);
        }
        return arrColor;
      }
      return [];
    });
    const sizes = computed(() => {
      if (model.value.size) {
        let arr = model.value.size.split(";").sort();
        let arrSize = [];
        for (let i = 0; i < arr.length; i++) {
          let size = arr[i];
          let obj = {
            size: size,
          };
          if (
            !model.value.productDetails.some(
              (x) => x.size_name == size && x.state == 2
            )
          ) {
            obj.canDelete = true;
          } else {
            obj.canDelete = false;
          }
          arrSize.push(obj);
        }
        return arrSize;
      }
      return [];
    });
    onMounted(() => {
      getColors();
      getSizes();
      getAttribute();
      getCategory();
    });

    function Comparator(a, b) {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    }

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
    const getCategory = () => {
      let filter = [
        {
          Field: "status",
          Value: 1,
        },
      ];
      let payload = {
        columns: "category_id,category_name,status",
        sort: "category_name",
        filter: filter,
      };
      categoryAPI.getComboboxPaging(payload).then((res) => {
        dataCategory.value = res;
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
      if (
        !model.value.product_code ||
        !model.value.product_name ||
        model.value.productDetails.some(
          (x) => !x.sale_price || !x.purchase_price || !x.quantity
        )
      ) {
        if (tabActive.value !== 1) {
          tabActive.value = 1;
          setTimeout(() => {
            saveProduct();
          }, 100);
          return;
        }
      } else if (model.value.attributes.some((x) => !x.value)) {
        if (tabActive.value !== 3) {
          tabActive.value = 3;
          setTimeout(() => {
            saveProduct();
          }, 100);
          return;
        }
      }
      me.resetValdiate();
      me.addObserveControl();
      if (!me.validateComponents()) {
        nextTick(() => {
          me.focusFirstError();
        });
        return;
      }
      if (proxy._formParam?.mode == "Add") {
        productAPI.saveProduct(model.value, 1).then((res) => {
          if (res && res.status == 200 && res.data.statusCode == 209) {
            proxy.$confirm.require({
              message: res.data.userMessage,
              header: "Thông báo",
              accept: () => {
                proxy.$refs.refFocus.$el.querySelector("input").focus();
              },
              rejectClass: "d-none",
            });
          } else {
            model.value = res.data.data;
            proxy.$toast.success("Thêm sản phẩm thành công");
            if (proxy._formParam.options) {
              proxy._formParam.options.submit();
            }
            popupUtil.hideAll();
          }
        });
      } else {
        productAPI.saveProduct(model.value, 2).then((res) => {
          if (res && res.status == 200 && res.data.statusCode == 209) {
            proxy.$confirm.require({
              message: res.data.userMessage,
              header: "Thông báo",
              accept: () => {
                proxy.$refs.refFocus.$el.querySelector("input").focus();
              },
              rejectClass: "d-none",
            });
          } else {
            model.value = res.data.data;
            proxy.$toast.success("Cập nhật sản phẩm thành công");
            if (proxy._formParam.options) {
              proxy._formParam.options.submit();
            }
            popupUtil.hideAll();
          }
        });
      }
    };
    const getDefault = async () => {
      model.value = await productAPI.getProductEdit(
        proxy._formParam.data.product_id
      );
    };

    const beforeOpen = async (e, close) => {
      proxy.super("beforeOpen", baseDetail, e, close);
      window.proxy = proxy;
      proxy.mode = proxy._formParam?.mode;

      if (proxy.mode == "Edit") {
        model.value = await productAPI.getProductEdit(
          proxy._formParam.data.product_id
        );
      } else if (proxy.mode == "Add") {
        productAPI.newCode().then((res) => {
          model.value = res;
        });
      }
      changeTitle();
    };

    const changeTitle = () => {
      if (proxy._formParam?.mode == "Add") {
        title.value = "Thêm mới sản phẩm";
        model.value.product_name = "";
        // model.value.product_id = commonFn.generateUUID();
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
      if (!value) {
        return;
      }
      let select = model.value.attributes.find((x) => x.attribute_id === value);
      if (!select) {
        model.value.attributes.push({
          attribute_id: value,
          attribute_name: displayField,
          value: null,
          state: 1,
        });
      } else {
        if (select.state === 3) {
          select.state = 2;
        } else if (select.state === 1) {
          model.value.attributes = model.value.attributes.filter(
            (x) => x.attribute_id !== select.attribute_id
          );
        }
      }
    };

    const selectCategory = (value, displayField) => {
      if (!value) {
        return;
      }
      let select = model.value.categories.find((x) => x.category_id === value);
      if (!select) {
        model.value.categories.push({
          category_id: value,
          category_name: displayField,
          state: 1,
        });
      } else {
        if (select.state === 3) {
          select.state = 2;
        } else if (select.state === 1) {
          model.value.categories = model.value.categories.filter(
            (x) => x.category_id !== select.category_id
          );
        }
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
      return model.value.attributes
        .filter((x) => x.state !== 3)
        .sort((a, b) => Comparator(a.attribute_name, b.attribute_name));
    });

    const categories = computed(() => {
      return model.value.categories
        .filter((x) => x.state !== 3)
        .sort((a, b) => Comparator(a.category_name, b.category_name));
    });

    const deleteAttribute = (attributeId) => {
      let attr = model.value.attributes.find(
        (x) => x.attribute_id == attributeId
      );
      if (attr) {
        if (attr.state === 1) {
          model.value.attributes = model.value.attributes.filter(
            (x) => x.attribute_id !== attributeId
          );
        } else {
          attr.state = 3;
        }
      }
    };

    const deleteCategory = (categoryId) => {
      let attr = model.value.categories.find(
        (x) => x.category_id == categoryId
      );
      if (attr) {
        if (attr.state === 1) {
          model.value.categories = model.value.categories.filter(
            (x) => x.category_id !== categoryId
          );
        } else {
          attr.state = 3;
        }
      }
    };

    const clickTabActive = (tab) => {
      tabActive.value = tab;
    };

    return {
      model,
      title,
      tabActive,
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
      selectCategory,
      dataAttribute,
      dataCategory,
      attributes,
      categories,
      deleteAttribute,
      deleteCategory,
      clickTabActive,
      getDefault,
    };
  },
};
</script>
<style lang="scss">
@import "./ProductDetail.scss";
</style>
