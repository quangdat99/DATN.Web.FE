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
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
}