import userAPI from "@/apis/components/userAPI"

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
  }
}