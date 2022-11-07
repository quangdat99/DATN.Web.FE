import api from '@/apis/components/productAPI.js';
import Crud from '../crudBase.js';

var crud = new Crud('productPage', api);

const state = {
  ...crud.state,
  _config: {
    field: {
      key: 'id',
      code: 'code',
    }
  },
  productId: '',
  product: {}
};
const getters = {
  ...crud.getters,
};
const actions = {
  ...crud.actions,
  updateProductId(context, id){
    context.commit('updateProductId', id);
  },
  async updateProduct(context, id){
    let product = await api.getProductInfo(id);
    context.commit('updateProduct', product);
    return product;
  }
};
const mutations = {
  ...crud.mutations,
  updateProductId(state, id){
    state.productId = id;
  },
  updateProduct(state, product){
    state.product = product;
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
}