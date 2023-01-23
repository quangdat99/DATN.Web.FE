import { reactive } from 'vue';
import { getCurrentInstance, onMounted, ref } from 'vue';

export const useOrderManage = () => {
  const { proxy } = getCurrentInstance();

  const headers = reactive([
    {
      text: "Mã đơn hàng",
      value: "order_code",
      sortable: true,
    },
    {
      text: "Trạng thái",
      value: "status_name",
      sortable: true,
      width: 200,
    },
    {
      text: "Tùy chọn", value: "operation",
      width: 80,
    }
  ]);

  return {
    headers,
  }
}