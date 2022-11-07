import BaseAPI from '@/apis/base/baseapi.js'
import Http from '@/apis/base/httpConfig.js'
class OrderAPI extends BaseAPI {
    constructor(){
        super();
        this.Http = Http;
        this.controller = 'Order';
    }

    async takePayment(payload){
        await this.postAsync(`${this.controller}/takePayment`,{},payload);
    }
}

export default new OrderAPI();