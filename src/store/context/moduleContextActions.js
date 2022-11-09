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
    if (res) {
      if (res.Token) {
        context.commit('updateToken', res);
      }
      return res;
    }
  },

  /**
   * Đăng xuất
   */
  async logout(context, payload){
    context.commit('updateLoading', true);
    var res = await userAPI.logout(payload);

    context.commit('updateLoading', false);
    context.commit('updateLogout', res);

    location.href = BASE_URL + "login";
  }
}