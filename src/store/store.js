import {
  createStore
} from 'vuex'
import createPersistedState from "vuex-persistedstate";
import state from './state.js';
import getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';

import moduleContext from './context/moduleContext.js';
import moduleProduct from './module/moduleProduct.js';
import moduleProductPage from './module/moduleProductPage.js';
import moduleHomePage from './module/moduleHomePage.js';
import moduleCart from './module/moduleCart.js';

// Create a new store instance.
const store = createStore({
  state,
  mutations,
  actions,
  getters,
  modules: {
    moduleContext,
    moduleProduct,
    moduleProductPage,
    moduleHomePage,
    moduleCart,
  },
  strict: true,
  plugins: [createPersistedState()]
})

export default store;