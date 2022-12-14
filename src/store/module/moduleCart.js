import productCartAPI from "@/apis/components/productCartAPI";

const state = {
  /**
   * Danh sách sản phẩm trong giỏ hàng
   */
  products: [],
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
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
}