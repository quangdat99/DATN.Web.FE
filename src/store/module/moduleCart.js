import productCartAPI from "@/apis/components/productCartAPI";

const state = {
  /**
   * Danh sách sản phẩm trong giỏ hàng
   */
  products: [],  
  /**
  * Danh sách sản phẩm cần thanh toán
  */
  productCheckouts: [],
  /**
   * mode = 1-mua từ giỏ hầng, =0- mua nhanh
   */
  mode: 0,
};
const getters = {
  countProduct(state) {
    return state.products.length;
  }
};
const actions = {
  async updateCart(context) {
    let products = await productCartAPI.getProductCard();
    if (products) {

      context.commit('updateCart', products);
      return products;
    }
    return [];
  },
};
const mutations = {
  updateCart(state, products) {
    state.products = products;
  },
  updateCheckout(state, products) {
    state.productCheckouts = products;
  },
  updateMode(state, mode) {
    state.mode = mode;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
}