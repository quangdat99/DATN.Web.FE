import { reactive } from 'vue';
import { getCurrentInstance, onMounted, ref } from 'vue';

export const useDashboard = () => {
  const { proxy } = getCurrentInstance();

  const headers = reactive([
    {
      text: "Mã đơn hàng",
      value: "order_code",
      sortable: true,
      width: 90,
    },
    {
      text: "Chi tiết sản phẩm",
      value: "description",
      sortable: true,
    },
    {
      text: "Người mua",
      value: "buy_name",
      sortable: true,
      width: 120,
    },
    {
      text: "Ngày tạo đơn",
      value: "created_date",
      sortable: true,
      width: 120,
    },
    {
      text: "Giao thành công",
      value: "success_date",
      sortable: true,
      width: 120,
    },
    {
      text: "Tổng tiền",
      value: "totalAmount",
      sortable: true,
      width: 100,
    },
    {
      text: "Tiền vốn",
      value: "purchasePrice",
      sortable: true,
      width: 100,
    },
    {
      text: "Lợi nhuận",
      value: "profitAmount",
      sortable: true,
      width: 100,
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