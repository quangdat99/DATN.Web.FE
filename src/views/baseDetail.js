
export default {
  name: 'BaseDetail',
  data() {
    return {
      mode: null,
    }
  },
  mounted() {
    const me = this;
    window.detail = me;
    me.addObserveControl();
  },
  methods: {
    addObserveControl() {
      if (!this._observeControl) {

      }
      this._observeControl = [];
      const $el = this.$el;
      const $controls = $el.querySelectorAll('.ms-validate');
      if ($controls && $controls.length > 0) {
        $controls.forEach(item => {
          if (typeof item.getVueInstance === 'function') {
            this._observeControl.push(item.getVueInstance());
          }
        });
      }
    },
    /**
     * Validate các control input
     * Hàm này xử lý component ms-validate
     * để bao ngoài được valdiate
     * @returns 
     */
    validateComponents() {
      const me = this;
      let controls = me._observeControl.filter(
        (x) =>
          x.$el.offsetWidth ||
          x.$el.offsetHeight ||
          x.$el.getClientRects().length ||
          x.rules.some((x) => x.hide)
      );
      if (controls.length > 0) {
        const errors = controls.map(x => {
          if (typeof x.validate === 'function') {
            return x.validate();
          }
          return '';
        });
        return !errors.some(x => x);
      }
      return true;
    },
    /**
     * Hàm dùng để focus vào ô lỗi đầu tiên
     */
    focusFirstError() {
      const me = this;
      const $el = me.$el;
      const firstErrorEl = $el.querySelector(
        '.ms-editor input.error,.ms-editor .error input,textarea'
      );
      if (firstErrorEl) {
        firstErrorEl.focus();
      }
    },

    resetValdiate() {
      const me = this;
      if (Array.isArray(me._observeControl)) {
        me._observeControl.forEach((control) => {
          if (typeof control.clearValidate === 'function') {
            control.clearValidate();
          }
        })
      }
    },
    beforeOpen(e, close) {
      const me = this;
      me._formParam = e.ref.params._rawValue;
    },

    /**
     * Gọi lên lớp cha
     */
    super(methodName, target) {
      const me = this;

      let pa = target;

      for (let k = 0; k < 5; k++) {
        let fn = pa.methods[methodName];
        if (typeof fn === 'function') {
          let args = [];
          for (var i = 2; i < arguments.length; i++) {
            args.push(arguments[i]);
          }
          return fn.apply(me, args);
        }
        if (!pa.extends) {
          break;
        }
        pa = pa.extends;
      }

      return null;
    },

    hide() {
      const me = this;
      me._popup.value = false;

      me.$nextTick(() => {
        delete me._popup;
      })
    }
  },
}