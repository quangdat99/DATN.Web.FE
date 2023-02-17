import { reactive } from 'vue';
import { getCurrentInstance, onMounted, ref } from 'vue';
import { startOfWeek, endOfWeek, startOfDay, endOfDay, endOfMonth, endOfYear, startOfMonth, startOfYear, subDays, subWeeks, subMonths, subYears } from 'date-fns';

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
  const headers2 = reactive([
    {
      text: "Tên sản phẩm",
      value: "description",
      sortable: true,
    },
    {
      text: "Số lượng",
      value: "quantity",
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
    }
  ]);

  const presetRanges = ref([
    { label: 'Hôm nay', range: [startOfDay(new Date()), endOfDay(new Date())] },
    { label: 'Hôm qua', range: [subDays(startOfDay(new Date()), 1), subDays(endOfDay(new Date()), 1)] },
    { label: 'Tuần này', range: [subDays(startOfWeek(new Date()), -1), subDays(endOfWeek(new Date()), -1)] },
    { label: 'Tuần trước', range: [subDays(startOfWeek(subWeeks(new Date(), 1)), -1), subDays(endOfWeek(subWeeks(new Date(), 1)), -1)] },
    { label: 'Tháng này', range: [startOfMonth(new Date()), endOfMonth(new Date())] },
    {
      label: 'Tháng trước',
      range: [startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1))],
    },
    { label: 'Năm nay', range: [startOfYear(new Date()), endOfYear(new Date())] },
    { label: 'Năm trước', range: [startOfYear(subYears(new Date(), 1)), endOfYear(subYears(new Date(), 1))] },
    { label: 'Quý I', range: [startOfYear(new Date()), endOfMonth(new Date().setMonth(2))] },
    { label: 'Quý II', range: [startOfMonth(new Date().setMonth(3)), endOfMonth(new Date().setMonth(5))] },
    { label: 'Quý III', range: [startOfMonth(new Date().setMonth(6)), endOfMonth(new Date().setMonth(8))] },
    { label: 'Quý IV', range: [startOfMonth(new Date().setMonth(9)), endOfMonth(new Date().setMonth(11))] },
    { label: 'Tháng 1', range: [startOfMonth(new Date().setMonth(0)), endOfMonth(new Date().setMonth(0))] },
    { label: 'Tháng 2', range: [startOfMonth(new Date().setMonth(1)), endOfMonth(new Date().setMonth(1))] },
    { label: 'Tháng 3', range: [startOfMonth(new Date().setMonth(2)), endOfMonth(new Date().setMonth(2))] },
    { label: 'Tháng 4', range: [startOfMonth(new Date().setMonth(3)), endOfMonth(new Date().setMonth(3))] },
    { label: 'Tháng 5', range: [startOfMonth(new Date().setMonth(4)), endOfMonth(new Date().setMonth(4))] },
    { label: 'Tháng 6', range: [startOfMonth(new Date().setMonth(5)), endOfMonth(new Date().setMonth(5))] },
    { label: 'Tháng 7', range: [startOfMonth(new Date().setMonth(6)), endOfMonth(new Date().setMonth(6))] },
    { label: 'Tháng 8', range: [startOfMonth(new Date().setMonth(7)), endOfMonth(new Date().setMonth(7))] },
    { label: 'Tháng 9', range: [startOfMonth(new Date().setMonth(8)), endOfMonth(new Date().setMonth(8))] },
    { label: 'Tháng 10', range: [startOfMonth(new Date().setMonth(9)), endOfMonth(new Date().setMonth(9))] },
    { label: 'Tháng 11', range: [startOfMonth(new Date().setMonth(10)), endOfMonth(new Date().setMonth(10))] },
    { label: 'Tháng 12', range: [startOfMonth(new Date().setMonth(11)), endOfMonth(new Date().setMonth(11))] },
  ]);

  const format = (dateRange) => {
    const fromDate = dateRange[0];
    const toDate = dateRange[1];

    const day = fromDate.getDate();
    const month = fromDate.getMonth() + 1;
    const year = fromDate.getFullYear();
    const hour = fromDate.getHours();
    const minute = fromDate.getMinutes();

    const day2 = toDate.getDate();
    const month2 = toDate.getMonth() + 1;
    const year2 = toDate.getFullYear();
    const hour2 = toDate.getHours();
    const minute2 = toDate.getMinutes();

    return `${day}/${month}/${year} ${hour} giờ ${minute} phút - ${day2}/${month2}/${year2} ${hour2} giờ ${minute2} phút`;
  }

  return {
    headers,
    presetRanges,
    format,
    headers2
  }
}