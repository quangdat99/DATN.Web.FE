import BaseAPI from '@/apis/base/baseapi.js'
import Http from '@/apis/base/httpCommon.js'
class OrderAPI extends BaseAPI {
    controllerName = 'FileApi';

    async upload(fileName, formData){
        let res = await Http.post(`${this.controllerName}/Upload/${fileName}`, formData);
        return this.response(res);
    }
}

export default new OrderAPI();