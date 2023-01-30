import { reactive } from 'vue';
import { getCurrentInstance, onMounted, ref } from 'vue';

export const useOrderManage = () => {
  const { proxy } = getCurrentInstance();
  
  const headers = reactive([
    {
      text: "Mã đơn hàng",
      value: "order_code",
      sortable: true, fixed: true,
      width: 120,
    },
    {
      text: "Mô tả",
      value: "description",
      sortable: true, fixed: true,
      width: 300,
    },
    {
      text: "Tổng tiền",
      value: "totalAmount",
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
      text: "Ngày tạo",
      value: "str_created_date",
      sortable: true,
      width: 90,
    },
    {
      text: "Ngày hủy",
      value: "str_cancel_date",
      sortable: true,
      width: 90,
    },
    {
      text: "Bắt đầu giao",
      value: "str_statrt_delivery_date",
      sortable: true,
      width: 90,
    },
    {
      text: "Ngày giao hàng",
      value: "str_delivery_date",
      sortable: true,
      width: 90,
    },
    {
      text: "Giao thành công",
      value: "str_success_date",
      sortable: true,
      width: 90,
    },
    {
      text: "Giao thất bại",
      value: "str_delivery_failed_date",
      sortable: true,
      width: 90,
    },
    {
      text: "Hoàn trở lại",
      value: "str_refund_date",
      sortable: true,
      width: 90,
    },
    {
      text: "Tùy chọn", value: "operation", fixed: true,
      width: 120,
    }
  ]);

  return {
    headers,
  }
}
