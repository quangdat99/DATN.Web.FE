import EventEmiter from 'events';
import store from "@/store/store.js"

class AuthService extends EventEmiter {
  /**
   * Kiểm tra xem còn session đăng nhập không
   */
  isAuthenticated() {
    const context = store.state["moduleContext"];
    if (context.Token) {
      let expired = context.TokenExpired;
      if (expired && expired > new Date()) {
        return true;
      }
    }
    return false;
  }
}

export default new AuthService();