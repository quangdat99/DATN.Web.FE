import { reactive } from 'vue';
import { getCurrentInstance, onMounted, ref } from 'vue';

export const useCategoryManage = () => {
  const { proxy } = getCurrentInstance();

  const headers = reactive([
    {
      text: "Tên loại sản phẩm",
      value: "category_name",
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