import productAPI from "@/apis/components/productAPI";
import categoryAPI from "@/apis/components/categoryAPI";

const state = {
  /**
   * Đang tìm kiếm
   */
  searchText: '',
  /**
   * Danh sách sản phẩm trang home page
   */
  productHomePage: [],
  /**
   * Danh sách nhóm sản phẩm
   */
  categorys: []
};
const getters = {
  Search(state){
    return state.search;
  }
};
const actions = {
  search(context, searchText){
    context.commit('updateSearch', searchText);
  },
  async fetchHomePage(context, model){
    var res = await productAPI.getProductHomePage(model);
    context.commit('updateHomePage', res);
    return res;
  },
  async fetchCategory(context){
    var res = await categoryAPI.getCategory();
    // context.commit('updateCategory', res);
    if (res && res.length > 0) {
      res.forEach(x => x.selected = false);
    }
    return res;
  }
};
const mutations = {
  updateSearch(state, res){
    state.searchText = res;
  },
  updateHomePage(state, res){
    state.productHomePage = res;
  },
  updateCategory(state, res){
    state.Categorys = res;
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
}