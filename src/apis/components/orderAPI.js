import BaseAPI from '@/apis/base/baseapi.js'
import Http from '@/apis/base/httpConfig.js'
import commonF from '@/commons/commonFunction.js';

class OrderAPI extends BaseAPI {
    controllerName = 'Orders';

    async takePayment(payload) {
        await this.postAsync(`${this.controller}/takePayment`, {}, payload);
    }
    async getOrder(status) {
        let res = await Http.axios().get(`${this.controllerName}/orderList/${status}`);
        return this.response(res);
    }
    async cancelOrder(id) {
        let res = await Http.axios().post(`${this.controllerName}/cancelOrder/${id}`);
        return this.response(res);
    }
    async getOrderStatusCount() {
        let res = await Http.axios().get(`${this.controllerName}/orderStatusCount`);
        return this.response(res);
    }
    async getOrderInfo(id) {
        commonF.mask();
        let res = await Http.axios().get(`${this.controllerName}/info/${id}`);
        commonF.unmask();
        return this.response(res);
    }
    async changeStatus(order_id, status) {
        commonF.mask();
        let res = await Http.axios().post(`${this.controllerName}/changeStatus`, {
            order_id,
            status
        });
        commonF.unmask();
        return this.response(res);
    }
    async commentProduct(payload) {
        commonF.mask();
        let res = await Http.axios().post(`${this.controllerName}/commentProduct`, payload);
        commonF.unmask();
        return res;
    }
}

export default new OrderAPI();