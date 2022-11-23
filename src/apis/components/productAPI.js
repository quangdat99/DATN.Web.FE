import Http from '@/apis/base/httpConfig.js';
import BaseAPI from '@/apis/base/baseapi.js';
class ProductAPI extends BaseAPI {
    controllerName = 'Products';

    async getProductInfo(id){
        let res = await Http.axios().get(`${this.controllerName}/info/${id}`);
        return this.response(res);
    }
    async getProductHomePage(model){
        let res = await Http.axios().post(`${this.controllerName}/homepage`, model);
        return this.response(res);
    }
}



export default new ProductAPI();