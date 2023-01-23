import { reactive } from 'vue';
import { getCurrentInstance, onMounted, ref } from 'vue';

export const useProductManage = () => {
  const { proxy } = getCurrentInstance();

  const headers = reactive([
    {
      text: "Mã sản phẩm", value: "product_code",
      sortable: true, width: 180
    },
    {
      text: "Tên sản phẩm",
      value: "product_name",
      sortable: true,
    },
    {
      text: "Giá sản phẩm",
      value: "sale_price",
      sortable: true,
      width: 200,
    },
    {
      text: "Số lượng",
      value: "quantity",
      sortable: true,
      width: 120,
    },
    {
      text: "Trạng thái",
      value: "status_name",
      sortable: true,
      width: 120,
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