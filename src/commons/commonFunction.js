import i18nGlocal from '@/i18ns/i18n.js';
const i18n = i18nGlocal.global;
import {MSConstant} from '@/commons/wildcards/index.js';

class CommonFunction {
  getMainLoading() {
    let el = document.body.querySelector('#mloading');
    return el;
  }
  mask() {
    let el = this.getMainLoading();
    if (el) {
      el.style.display = 'flex';
    }
  }
  unmask() {
    let el = this.getMainLoading();
    if (el) {
      el.style.display = 'none';
    }
  }
  /**
   * Tạo uuid
   */
  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let d = new Date().getTime();
      d += performance.now();
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    })
  }
  /**
   * Tự động focus vào control nhập liệu đầu tiên theo scope truyền vào
   * @param {*} scope 
   */
  focusFirstControl(scope) {
    if (scope) {
      const me = this;

      let input;
      if (scope.type === 'text' ||
        (scope.hasAttribute &&
          scope.hasAttribute('type') &&
          scope.getAttribute('type') === 'text')
      ) {
        input = scope;
      } else {
        input = me.findFirstControlFocus(scope);
      }

      if (input) {
        input.focus();
      }
    }
  }

  /**
   * Tìm ra control đầu tiên trong scope truyền vào và cho phép sửa
   * @param {Parent} scope Parent cần tìm input
   */
  findFirstControlFocus(scope){
    if (scope && scope.querySelector) {
      let input = scope.querySelector(
        'input:not([readonly]):not([disabled]).button:not([disabled]),a,textarea'
      );
      return input;
    }
    return;
  }

  /**
   * Kiểm tra 2 đối tượng có kahcs nhau không
   */
  checkDiff(newVal, oldVal){
    let newStr = JSON.stringify(newVal).replace(/:null,/g, ":'',");
    let oldStr = JSON.stringify(oldVal).replace(/:null,/g, ":'',");
    return newStr !== oldStr;
  }

  getEnumValue(enumName, text){
    let source = this.getEnumText()
  }

  getEnumText(value, enumName){

  }
  /**
   * Lấy enumresource với tên enum truyền vào
   * @param {*} value 
   * @param {*} enumName 
   */
  getEnumSource(enumName){
    let e = MSConstant[enumName],
      arr = [];
    if (e) {
      for (const key in e) {
        if (e.hasOwnProperty(key)) {
          let v = e[key];
          let enumText = i18n.t('i18nEnum.' + enumName + '.' + key);
          let item = {
            enumValue: v,
            enumKey: key,
            enumText: enumText
          }
          arr.push(item);
        }
      }
    }
    return arr;
  }
}
export default new CommonFunction();