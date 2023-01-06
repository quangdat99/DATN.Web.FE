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
    async getProductRelation(id, mode){
        let res = await Http.axios().get(`${this.controllerName}/relation/${id}/${mode}`);
        return this.response(res);
    }
    async getRateOption(id){
        let res = await Http.axios().get(`${this.controllerName}/rateOption/${id}`);
        return this.response(res);
    }
    async getCommentProduct(payload){
        let res = await Http.axios().post(`${this.controllerName}/commentProduct`, payload);
        return this.response(res);
    }
    async saveProduct(payload){
        let res = await Http.axios().post(`${this.controllerName}/saveProduct`, payload);
        return this.response(res);
    }
}

export default new ProductAPI();