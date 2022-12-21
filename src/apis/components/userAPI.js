import Http from '@/apis/base/httpConfig.js';
import BaseAPI from '@/apis/base/baseapi.js';
// import Http from '@/apis/base/httpConfig.js'
class UserAPI extends BaseAPI {
    controllerName = 'Users';

    async login(model){
        let res = await Http.axios().post(`${this.controllerName}/login`, model);
        return res;
    }
    async token(){
        let res = await Http.axios().get(`${this.controllerName}/token`);
        return res;
    }
    async signup(model){
        let res = await Http.axios().post(`${this.controllerName}/signup`, model);
        return res;
    }
    async getUserInfo(){
        let res = await Http.axios().get(`${this.controllerName}/info`);
        return this.response(res);
    }
    async updateUserInfo(payload){
        let res = await Http.axios().put(`${this.controllerName}/update`, payload);
        return this.response(res);
    }
    async resetPassword(payload){
        let res = await Http.axios().put(`${this.controllerName}/resetPassword`, payload);
        return res;
    }
}

export default new UserAPI();