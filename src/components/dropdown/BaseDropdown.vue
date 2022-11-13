<template>
  <div class="base-dropdown" :class="[fontSize ? 'font-size-' + fontSize : '']">
    <label class="label" v-if="label">{{ label }}</label>
    <dropdown
      v-model="model"
      :options="options"
      :optionLabel="optionLabel"
      :optionValue="optionValue"
      :placeholder="placeholder"
      v-on="listeners"
      :style="{ width: width ? width + 'px' : '' }"
    />
    <div class="error-text" v-if="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  onMounted,
  computed,
  watch,
  nextTick,
  getCurrentInstance,
} from "vue";
import baseComponent from "@/components/base/BaseComponent.vue";
import { useValidateControl } from "@/setup/validateControl.js";
export default defineComponent({
  name: "baseDropdown",
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
    options: {
      type: Array,
      default: [],
    },
    label: {
      type: String,
      default: null,
    },
    optionLabel: {
      type: String,
      default: null,
    },
    optionValue: {
      type: String,
      default: null,
    },
    width: {
      type: Number,
      default: null,
    },
    fontSize: {
      type: Number,
      default: null,
    },
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const model = ref();
    const { errorMessage, validate, isValidate } = useValidateControl({
      props,
    });
    const cancelBubbleEvent = (e) => {
      if (e) {
        if (typeof e.preventDefault === "function") {
          e.preventDefault();
        }
        if (typeof e.stopPropagation === "function") {
          e.stopPropagation();
        }
        if (typeof e.stopImmediatePropagation === "function") {
          e.stopImmediatePropagation();
        }
      }
    };
    const listeners = computed(() => {
      return {
        change: (e) => {
          cancelBubbleEvent(e);
          emit("change", e, e.value);
        },
      };
    });

    onMounted(() => {
      model.value = props.modelValue;
    });

    watch(
      () => model.value,
      (value) => {
        if (value !== props.modelValue) {
          emit("update:modelValue", value, model.value);
          //scrollWidth = input.value.scrollWidth;
        }
      }
    );

    return {
      errorMessage,
      isValidate,
      listeners,
      model,
    };
  },
});
</script>

<style lang="scss">
@import "@/assets/scss/_variables.scss";
.p-dropdown {
  height: $height-control;
  .p-dropdown-label {
    font-size: 12px;
    color: $black !important;
    line-height: 32px;
    padding: 0px 15px;
    display: flex;
    align-items: center;
    font-family: Roboto, sans-serif;
  }
  .p-dropdown-trigger {
    .pi-chevron-down {
      height: 24px;
      width: 24px;
      top: 3px;
      left: 8px;
      position: absolute;
      content: "";
      background: transparent url($image-sprite) no-repeat;
      background-position: -24px -48px;
      &::before {
        display: none;
      }
      transform: rotate(0deg);
      transition: all 0.3s ease;
    }
  }
  &.p-overlay-open {
    .p-dropdown-trigger {
      // position: relative;
      .pi-chevron-down {
        // height: 24px;
        // width: 24px;
        // top: 4px;
        // left: 8px;
        // position: absolute;
        // content: "";
        // background: transparent url($image-sprite) no-repeat;
        // background-position: -24px -48px;
        // &::before {
        //   display: none;
        // }
        transform: rotate(180deg);
        transition: all 0.3s ease;
      }
    }
  }
  &:not(.p-disabled):hover {
    border-color: $primary !important;
  }
  &:not(.p-disabled).p-focus {
    border-color: $primary !important;
    box-shadow: none !important;
  }
}
.p-dropdown-items-wrapper {
  font-size: 12px;
}
.base-dropdown {
  &.font-size-14 {
    .p-dropdown-label {
      font-size: 14px;
    }
  }
}
</style>