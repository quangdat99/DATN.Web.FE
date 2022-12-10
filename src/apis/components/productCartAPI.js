import Http from '@/apis/base/httpConfig.js';
import BaseAPI from '@/apis/base/baseapi.js';
class ProductCartAPI extends BaseAPI {
    controllerName = 'ProductCarts';
    
    async addToCart(payload){
        let res = await Http.axios().post(`${this.controllerName}/addToCart`, payload);
        return this.response(res);
    }
    async getProductCard(){
        let res = await Http.axios().get(`${this.controllerName}/products`);
        return this.response(res);
    }
}

export default new ProductCartAPI();