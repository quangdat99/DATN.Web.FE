<template>
  <div
    class="base-input"
    :class="[width ? '' : 'w-100']"
    :style="{ width: `${width}px` }"
  >
    <label class="label" v-if="label">{{ label }}</label>
    <div
      class="flex-row"
      :class="[
        { error: errorMessage, disabled: disabled },
        hasBorder ? 'border' : '',
      ]"
    >
      <input
        class="base-input-item flex"
        :placeholder="placeholder"
        :disabled="disabled"
        ref="input"
        :class="{
          disabled: disabled,
          'has-border': hasBorder,
          'w-100': !width,
        }"
        v-on="listeners"
        :tabindex="0"
        @keydown="upDownValue"
        @blur="onActionBlur"
      />
      <div class="ms-number-spin flex-column" v-if="spin">
        <div class="flex spin up" @click="plus()"></div>
        <div class="flex spin down" @click="less()"></div>
      </div>
      <div class="error-text" v-if="errorMessage">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  nextTick,
  ref,
  onMounted,
  onUnmounted,
  onBeforeUnmount,
  watch,
  getCurrentInstance,
  computed,
} from "vue";
import AutoNumeric from "autonumeric";
import baseComponent from "@/components/base/BaseComponent.vue";
import { useValidateControl } from "@/setup/validateControl.js";

export default defineComponent({
  name: "BaseNumber",
  extends: baseComponent,

  props: {
    /**
     * modelValue đẩy ra ngoài để binding 2 chiều
     */
    modelValue: {
      default: null,
    },
    placeholder: {
      fault: null,
      type: [Number, String],
    },
    width: {
      type: [Number, String],
      default: null,
    },
    hasBorder: {
      default: true,
      type: Boolean,
    },
    label: {
      type: String,
      default: null,
    },
    min: {
      type: [Number, String],
      default: -99999999999999,
    },
    max: {
      type: [Number, String],
      default: 99999999999999,
    },
    autofocus: {
      default: false,
      type: [Boolean, String],
    },
    /**
     * Bước nhảy giá trị
     */
    step: {
      type: [Number, String],
      default: 1,
    },
    /**
     * Cho phép hiển thị số 0 ở đầu
     * ['allow', 'deny', 'keep']
     * MẶc định là allow: Cho phép nhập nhưng sẽ mất khi focus ra bên ngoài
     */
    leadingZero: {
      type: String,
      default: "allow",
    },
    /**
     * Hiển thị = khi dữ liệu = 0
     */
    keepZero: {
      type: Boolean,
      default: false,
    },
    /**
     * Cờ bật tắt icon khi tăng giảm giá trị của number
     */
    spin: {
      type: Boolean,
      default: false,
    },
    /**
     * Cờ bật tắt icon khi tăng giảm giá trị của number
     */
    spin: {
      type: Boolean,
      default: false,
    },
    /**
     * Cho phép hiển thị đầy đủ phần thập phân
     */
    allowDecimalPadding: {
      type: Boolean,
      default: false,
    },
    /**
     * Cho phép phân tách các giá trị nguyên với nhau
     */
    allowDigitGroupSeparator: {
      type: Boolean,
      default: false,
    },
    /**
     * Cho phép giá trị là null/undefined mà không phải set mặc đinh là 0
     */
    isNullable: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    decimalPlaces: {
      type: Number,
      default: 0,
    },
  },
  emits: ["update:modelValue", "baseKeyDown", "onActionBlur", "focus"],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const focused = ref(false);
    const me = proxy;
    me.typing = false;
    me.valid = false;
    me.autoNumneric = null;

    const { errorMessage, validate, isValidate } = useValidateControl({
      props,
    });
    const listeners = computed(() => {
      return {
        input: (e) => {
          updateVModel(e);
          onInput();
        },
        keydown: (e) => {
          emit("baseKeyDown", e);
        },
        focus: (e) => {
          proxy.selectOnClick = true;
          e.target.select();
          focused.value = true;
          emit("focus", e);
        },
        blur: (e) => {
          onBlur(e);
        },
      };
    });

    watch(
      () => proxy.modelValue,
      (newValue, oldValue) => {
        let me = proxy;
        if (getValue() != newValue && newValue != oldValue) {
          if ((!newValue || newValue === 0) && !me.keepZero) {
            me.autoNumneric.clear();
          } else {
            me.autoNumneric.set(newValue);
          }
        }
      }
    );

    onMounted(() => {
      let me = proxy,
        options = initOptions();

      options.selectOnClick = false;
      me.autoNumneric = new AutoNumeric(me.$refs.input, options);
      if (
        proxy.modelValue !== null &&
        proxy.modelValue !== "" &&
        typeof proxy.modelValue !== "undefined"
      ) {
        if (proxy.modelValue > max || proxy.modelValue < min) {
          me.autoNumneric.set(max);
        } else {
          me.autoNumneric.set(proxy.modelValue);
        }
        updateVModel();
      }
    });

    /**
     * Sự kiện Blur
     */
    function onActionBlur() {
      emit("onActionBlur", proxy.modelValue);
    }
    /**
     * thay đổi trạng thái focus
     */
    function changeFocus(booleanx) {
      focused.value = booleanx;
    }

    function initOptions() {
      let me = proxy;
      let options = {
        allowDecimalPadding: props.allowDecimalPadding, // Cho phép hiển thi đầy đủ phần thập phân
        decimalCharacter: ",",
        decimalPlaces: props.decimalPlaces,
        digitGroupSeparator: ".",
        decimalCharaterAlternative: ".",
        negativePositiveSignPlacement: "p",
        modifyValueOnWheel: "false", // hỗ trợ có lăn chuột thay đổi giá trị
        currencySymbolPlacement: "s",
        maximumValue: props.max,
        minximumValue: props.min,
        leadingZero: props.leadingZero, // cho phép giữ số 0 ở đầu
      };
      return options;
    }

    function updateVModel(event) {
      let me = proxy;
      if (me.autoNumneric != null) {
        let value = getValue();
        // Nhập mỗi dấu âm mà chưa nhập value thì force luôn
        if (me.autoNumneric.eventKey === "-" && !value) {
          return;
        }
        emit("update:modelValue", value, event);
      }
    }

    function upDownValue(e) {
      let me = proxy;
      if (me.spin) {
        if (e.keyCode === 38) {
          e.preventDefault();
          plus();
        }
        if (e.keyCode === 40) {
          e.preventDefault();
          less();
        }
      }
    }

    function plus() {
      // disable thì không làm gì
      if (disabled) {
        return;
      }

      changeFocus(true);
      let me = proxy;
      let value = getValue();
      if (!value) {
        value = 0;
      }

      value = parseInt(value);
      if (value < me.max) {
        value += me.step;
        me.autoNumneric.set(value);
        updateVModel();
        nextTick(() => {
          emit("change", value);
        });
      }
    }
    function less() {
      // disable thì không làm gì
      if (disabled) {
        return;
      }

      changeFocus(true);
      let me = proxy;
      let value = getValue();
      if (!value) {
        value = 0;
      }

      value = parseInt(value);
      if (value > me.min) {
        value -= me.step;
        me.autoNumneric.set(value);
        updateVModel();
        nextTick(() => {
          emit("change", value);
        });
      }
    }

    /**
     * Lấy giá trị của control
     */
    function getValue() {
      const me = proxy;
      if (!me.isNullable || me.autoNumneric.rawValue) {
        return me.autoNumneric.getNumber();
      }
    }

    /**
     * Sự kiện người dùng gõ vào ô input
     */
    function onInput() {
      proxy.type = false;
    }

    function onBlur() {
      const me = proxy;
      proxy.type = false;
      proxy.validate();
    }

    // function setValue(value) {
    //   const me = proxy;
    //   if (me.$refs.input) {
    //     me.$refs.input.value = null;
    //   }

    //   if (me.autoNumneric && typeof value != "undefined" && value != null) {
    //     setInternalValue(value);
    //   } else {
    //     emit("update:modelValue", value);
    //     me.autoNumneric.rawValue = value || null;
    //   }
    // }

    return {
      listeners,
      errorMessage,
      validate,
      isValidate,
      onActionBlur,
      upDownValue,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
.base-input {
  align-items: center;
  padding: 0px;
  input {
    background: $white;
  }
  .ms-number-item {
    border: none;
    padding: 9px 12px;
    text-align: left;
    &:focus {
      outline: none;
    }
  }
  .ms-number-spin {
    width: 28px;
    min-width: 28px;
    height: $input-height;
    border-left: 1px solid $secondary;
  }
  .spin {
    position: relative;
    &::before {
      content: "";
      position: absolute;
      background: transparent url($image-sprite) no-repeat -96px -48px;
      width: 28px;
      height: 10px;
      left: 0px;
    }
    &.up::before {
      transform: rotate(180deg);
      top: 4px;
    }
    &.down::before {
      top: 2px;
    }
    &:hover {
      cursor: pointer;
    }
  }
}

input {
  &.has-border {
    border: 1px solid #c9c9c9 !important;
    border-radius: 3px;
  }
}
</style>