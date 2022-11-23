import Http from '@/apis/base/httpConfig.js';
import APIConfig from '@/apis/config/apiconfig.js';
import store from '@/store/store.js';
export default class BaseApi {
    controllerName = '';
    baseUrl = '';
    apiName = '';

    initAPI(){
        if (this.apiName) {
            this.baseUrl = APIConfig + this.controllerName;
        }
    }

    getAPIUrl(){
        if (this.baseUrl == '') {
            this.initAPI();
        }
        return this.baseUrl;
    }

    /**
     * Xửu lý Dữ liệu trả về
     */
    response(res) {
        if (res && res.data && typeof res.data.data === 'object' && (res.data.statusCode == 200 || res.data.statusCode == 204)) {
            return res.data.data;
        }
        return null;
    }
    /**
     * Phương thức lấy tất cả dữ liệu
     */
    async getAll() {
        let res = await Http.axios().get(`${this.controllerName}`);
        return this.response(res);
    }
    /**
     * Phương thức cập nhật dữ liệu lên database
     * @param {Guid} id id của đối tượng
     * @param {Object} param object truyền lên
     */
    async update(id, param) {
        let res = await Http.axios().put(`${this.controllerName}${id}`, param)
        return response(res);
    }
    /**
     * Phương thức xóa dữ liệu
     * @param {Guid} id  id của đối tượng
     * @returns 
     */
    async delete(id) {
        let res = await Http.axios().delete(`${this.controllerName}${id}`);
        return response(res);
    }
    /**
     * Phương thức lấy dữ liệu theo mã định danh
     * @param {Guid} id id của đối tượng
     */
    async getById(id) {
        let res = await Http.axios().get(`${this.controllerName}/${id}`);
        return this.response(res);
    }
    /**
     * Phương thức xóa nhiều dữ liệu
     * @param {Object} payload object truyền vào request
     */
    async deleteMultiple(payload) {
        let res = await Http.axios().post(`${this.controllerName}Delete_List`, payload);
        return response(res);
    }
    /**
     * Phương thức thêm mới dữ liệu
     * @param {Object} payload 
     */
    async insert(payload) {
        let res = await Http.axios().post(`${this.controllerName}`, payload);
        return response(res);
    }
    /**
     * Phương thức lấy dữ liệu theo mã code
     * @param {String} code mã code của đối tượng
     */
    async getByCode(code) {
        let res = await Http.axios().get(`${this.controllerName}code/${code}`)
        return response(res);
    }

    getAsync(url, headers) {
        let res = Http.axios().get(url, {
            headers
        });
        return response(res);
    }

    async postAsync(url, headers, data) {
        console.log(headers)
        if (headers == null || Object.keys(headers).length === 0) {
            headers = { "Authorization": `Bearer ${store.state.token}` };
        }

        return await Http.axios().post(url, data, {
            headers
        });
    }
}