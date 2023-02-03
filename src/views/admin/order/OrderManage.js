import { reactive } from 'vue';
import { getCurrentInstance, onMounted, ref } from 'vue';

export const useOrderManage = () => {
  const { proxy } = getCurrentInstance();
  
  const headers = reactive([
    {
      text: "Mã đơn hàng",
      value: "order_code",
      sortable: true,
      width: 120,
    },
    {
      text: "Mô tả",
      value: "description",
      sortable: true,
      width: 300,
    },
    {
      text: "Người mua",
      value: "buyer_name",
      sortable: true,
      width: 150,
    },
    {
      text: "Ngày tạo",
      value: "str_created_date",
      sortable: true,
      width: 90,
    },
    {
      text: "Trạng thái",
      value: "status_name",
      sortable: true,
      width: 120,
    },
    {
      text: "Tổng tiền",
      value: "totalAmount",
      sortable: true,
      width: 120,
    },
    // {
    //   text: "Ngày hủy",
    //   value: "str_cancel_date",
    //   sortable: true,
    //   width: 90,
    // },
    // {
    //   text: "Bắt đầu giao",
    //   value: "str_statrt_delivery_date",
    //   sortable: true,
    //   width: 90,
    // },
    // {
    //   text: "Ngày giao hàng",
    //   value: "str_delivery_date",
    //   sortable: true,
    //   width: 90,
    // },
    // {
    //   text: "Giao thành công",
    //   value: "str_success_date",
    //   sortable: true,
    //   width: 90,
    // },
    // {
    //   text: "Giao thất bại",
    //   value: "str_delivery_failed_date",
    //   sortable: true,
    //   width: 90,
    // },
    // {
    //   text: "Hoàn trở lại",
    //   value: "str_refund_date",
    //   sortable: true,
    //   width: 90,
    // },
    {
      text: "Tùy chọn", value: "operation",
      width: 80,
    }
  ]);

  return {
    headers,
  }
}
