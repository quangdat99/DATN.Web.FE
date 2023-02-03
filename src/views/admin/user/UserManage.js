import { reactive } from 'vue';
import { getCurrentInstance, onMounted, ref } from 'vue';

export const useUserManage = () => {
  const { proxy } = getCurrentInstance();

  const headers = reactive([
    {
      text: "Tên người dùng",
      value: "user_name",
      sortable: true,
    },
    {
      text: "Email",
      value: "email",
      sortable: true,
      width: 250,
    },
    {
      text: "Số điện thoại",
      value: "phone",
      sortable: true,
      width: 120,
    },
    {
      text: "Giới tính",
      value: "gender_name",
      sortable: true,
      width: 100,
    },
    {
      text: "Trạng thái",
      value: "active",
      sortable: true,
      width: 150,
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