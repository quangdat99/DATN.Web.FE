import BaseAPIConfig from '@/apis/base/baseapiconfig.js';
import BaseAPI from '@/apis/base/baseapi.js';
// import BaseAPIConfig from '@/apis/base/baseapiconfig.js'
class ProductAPI extends BaseAPI {
    controllerName = 'Products';

    async GetProductInfo(id){
        let res = await BaseAPIConfig.get(`${this.controllerName}/info/${id}`);
        return this.response(res);
    }
}



export default new ProductAPI();