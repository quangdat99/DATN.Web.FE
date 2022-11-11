const state = {
  /**
   * Đang tìm kiếm
   */
  search: true,
};
const getters = {
  Search(state){
    return state.search;
  }
};
const actions = {
  search(context){
    context.commit('updateSearch', true);
  }
};
const mutations = {
  updateSearch(state, res){
    state.search = res;
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
}