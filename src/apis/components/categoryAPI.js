import Http from '@/apis/base/httpConfig.js';
import BaseAPI from '@/apis/base/baseapi.js';
class CategoryAPI extends BaseAPI {
    controllerName = 'Categorys';

    async getCategory() {
        let res = await Http.axios().get(`${this.controllerName}/getCategory`);
        return this.response(res);
    }
}



export default new CategoryAPI();