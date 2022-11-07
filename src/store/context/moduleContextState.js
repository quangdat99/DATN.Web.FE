export const defaultConfigState = {
  /**
   * Token đăng nhập
   */
  Token: null,
  /**
   * Cờ đang xử lý
   */
  Loading: false,
  /**
   * Thông tin tài khoản
   */
  User: {
    UserId: null,
    Email: null,
    FullName: null,
    UserName: null,
    FirstName: null,
    LastName: null,
  },
  Context: {
  }
}
export default {
  ...defaultConfigState
}