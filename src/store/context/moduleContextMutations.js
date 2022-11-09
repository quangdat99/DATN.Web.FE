export default {
    updateToken(state, payload){
        state.Token = payload.Token;
        state.User = payload.User;
        state.Context = payload.Context;
    },
    updateLogout(state, payload){
        state.Token = null;
        state.User = null;
        state.Context = null;

        // Xóa tất cả storage
        sessionStorage.clear();
        localStorage.clear();
    },
    updateLoading(state, payload){
        state.Loading = payload;
    }
}