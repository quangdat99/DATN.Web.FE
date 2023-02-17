import Http from '@/apis/base/httpConfig.js';
import BaseAPI from '@/apis/base/baseapi.js';
class DashboardProductAPI {
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
    let res = await Http.axios().post(`${this.controllerName}/dashboardProduct`, payload);
    return res;
  }
}



export default new DashboardProductAPI();