import Http from '@/apis/base/httpConfig.js';
import BaseAPI from '@/apis/base/baseapi.js';
class DashboardOrderAPI {
  controllerName = 'Orders';

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
   * Lấy dữ liệu bảng
   */
  async getDataTable(payload) {
    let res = await Http.axios().post(`${this.controllerName}/dashboardOrder`, payload);
    return res;
  }
  async dashboardOrderTotal(filter) {
    let res = await Http.axios().post(`${this.controllerName}/dashboardOrderTotal`, filter);
    return this.response(res);
  }
}



export default new DashboardOrderAPI();