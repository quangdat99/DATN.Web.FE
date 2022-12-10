import BaseAPI from '@/apis/base/baseapi.js'
import Http from '@/apis/base/httpConfig.js'
class OrderAPI extends BaseAPI {
    controllerName = 'Orders';

    async takePayment(payload){
        await this.postAsync(`${this.controller}/takePayment`,{},payload);
    }
    async getOrder(status){
        let res = await Http.axios().get(`${this.controllerName}/orderList/${status}`);
        return this.response(res);
    }
}

export default new OrderAPI();