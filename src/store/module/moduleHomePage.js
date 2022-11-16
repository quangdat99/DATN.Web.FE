const state = {
  /**
   * Đang tìm kiếm
   */
  searchText: '',
};
const getters = {
  Search(state){
    return state.search;
  }
};
const actions = {
  search(context, searchText){
    context.commit('updateSearch', searchText);
  }
};
const mutations = {
  updateSearch(state, res){
    state.searchText = res;
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
}