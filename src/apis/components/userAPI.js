import Http from '@/apis/base/httpConfig.js';
import BaseAPI from '@/apis/base/baseapi.js';
// import Http from '@/apis/base/httpConfig.js'
class UserAPI extends BaseAPI {
    controllerName = 'Users';

    async login(model){
        let res = await Http.axios().post(`${this.controllerName}/login`, model);
        return this.response(res);
    }
}

export default new UserAPI();