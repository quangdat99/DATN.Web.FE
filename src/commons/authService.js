import EventEmiter from 'events';
import store from "@/store/store.js";

class AuthService extends EventEmiter {
  /**
   * Kiểm tra xem còn session đăng nhập không
   */
  isAuthenticated() {
    const context = store.state["moduleContext"];
    if (context.Token) {
      let expired = context.Context.tokenExpired;
      if (expired && Date.parse(expired) > Date.parse(new Date())) {
        return true;
      }
    }
    return false;
  }
  login(path) {
    store.commit("moduleContext/updateLogout");
    store.commit("moduleContext/updatePath", path);
    location.href = location.origin + "/login";
  }
}

export default new AuthService();