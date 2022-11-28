import Http from '@/apis/base/httpConfig.js';
import BaseAPI from '@/apis/base/baseapi.js';
class ProductCartAPI extends BaseAPI {
    controllerName = 'ProductCarts';
}

export default new ProductCartAPI();