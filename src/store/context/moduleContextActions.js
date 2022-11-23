import userAPI from "@/apis/components/userAPI";
import { BASE_URL } from '@/utils/envConst.js';

export default {
  /**
   * Đăng nhập
   */
  async login(context, payload) {
    context.commit('updateLoading', true);
    var res = await userAPI.login(payload);

    context.commit('updateLoading', false);
    if (res && res.data && res.data.statusCode == 200) {
      if (res.data.data.Token) {
        context.commit('updateToken', res.data.data);
      }
    }
    return res.data;
  },

  /**
   * Đăng xuất
   */
  logout(context) {
    context.commit('updateLogout');
    location.href = "login";
  },

  /**
   * Đăng ký
   */
  async signup(context, payload) {
    context.commit('updateLoading', true);
    context.commit('updateLogout');
    var res = await userAPI.signup(payload);

    context.commit('updateLoading', false);
    if (res && res.data && res.data.statusCode == 200) {
      if (res.data.data.Token) {
        context.commit('updateToken', res.data.data);
      }
    }
    return res.data;
  },
}