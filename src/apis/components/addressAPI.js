import BaseAPI from '@/apis/base/baseapi.js'
import Http from '@/apis/base/httpConfig.js'
class AddressAPI extends BaseAPI {
    controllerName = 'Addresses';

    async getAddresses(){
        let res = await Http.axios().get(`${this.controllerName}/list`);
        return this.response(res);
    }
    
    async settingDefault(address_id){
        let res = await Http.axios().put(`${this.controllerName}/setDefault/${address_id}`);
        return this.response(res);
    }
    
    async createAddress(payload){
        let res = await Http.axios().post(`${this.controllerName}/create`, payload);
        return this.response(res);
    }
    async updateAddress(payload){
        let res = await Http.axios().put(`${this.controllerName}/update`, payload);
        return this.response(res);
    }
    async deleteAddress(address_id){
        let res = await Http.axios().delete(`${this.controllerName}/delete/${address_id}`);
        return this.response(res);
    }
}

export default new AddressAPI();