<template>
  <div class="admin-container">
    <div class="nav-bar" :class="{ 'toggle-navbar': !toggleNavbarValue }">
      <div class="information">
        <div class="avatar">
          <img src="@/assets/images/logo.png" alt="" />
        </div>
        <div class="main-information" v-if="toggleNavbarValue">
          <div class="name">Eshop</div>
          <div class="email">We bring you all</div>
        </div>
      </div>
      <div class="main-menu">
        <main-menu-item
          v-for="menuItem in menuList"
          :key="menuItem.key"
          :menuItemObject="menuItem"
          :toggleNavbarValue="toggleNavbarValue"
          @click="menuItemClick"
        >
        </main-menu-item>
      </div>
    </div>
    <div
      class="main-content-admin"
      :class="{ 'toggle-navbar': !toggleNavbarValue }"
    >
      <div class="header-admin">
        <div class="header-left">
          <div
            class="icon24 menu-black cursor-pointer"
            @click="toggleNavbar"
          ></div>
          <div class="title-admin">Quản lý bán hàng eShop</div>
        </div>
        <div class="header-right">
          <v-menu>
            <div class="information-admin">
              <div class="avatar">
                <img :src="context.avatar" alt="" />
              </div>
              <div class="main-information">
                <div class="name">
                  {{ context.firstName + " " + context.lastName }}
                </div>
                <div class="email">
                  {{ context.email }}
                </div>
              </div>
            </div>
            <template #popper>
              <div class="option cursor p-2" @click="updateRelation()">
                Cập nhật sản phẩm mua kèm
              </div>
              <div class="option cursor p-2" @click="logout()">Đăng Xuất</div>
            </template>
          </v-menu>
        </div>
      </div>
      <div class="container-page">
        <router-view />
      </div>
    </div>

    <confirm-dialog></confirm-dialog>
  </div>
</template>

<script>
import MainMenuItem from "@/components/mainMenuItem/MainMenuItem.vue";
import { useAdminPage } from "./AdminPage.js";
import { getCurrentInstance, onMounted, ref, watch } from "vue";
import { mapGetters } from "vuex";
import { useRoute } from "vue-router";
import ConfirmDialog from "primevue/confirmdialog";
import { usePrimeVue } from "primevue/config";
import popupUtil from "@/commons/popupUtil";
export default {
  components: {
    MainMenuItem,
    ConfirmDialog,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const { menuList } = useAdminPage();
    const changeToVietnamese = () => {
      const primevue = usePrimeVue();
      primevue.config.locale.accept = "Đồng ý";
      primevue.config.locale.reject = "Không";
    };
    const toggleNavbarValue = ref(true);
    onMounted(() => {
      changeToVietnamese();
      window.admin = proxy;
      let path = history.state.current;
      if (path.includes("productmanage")) {
        menuItemClick("productmanage");
      } else if (path.includes("order")) {
        menuItemClick("order");
      } else if (path.includes("category")) {
        menuItemClick("category");
      } else if (path.includes("color")) {
        menuItemClick("color");
      } else if (path.includes("size")) {
        menuItemClick("size");
      } else if (path.includes("attribute")) {
        menuItemClick("attribute");
      } else if (path.includes("user")) {
        menuItemClick("user");
      } else {
        menuItemClick("dashboard");
      }
    });

    const menuItemClick = async (key) => {
      let url = "";
      menuList.forEach((item) => {
        if (item.key == key) {
          item.isSelected = true;
          url = item.route;
        } else {
          item.isSelected = false;
        }
      });
      // await proxy.$store.dispatch("updateMenuItems", menuList);
      proxy.$router.push(url);
    };

    const toggleNavbar = () => {
      proxy.toggleNavbarValue = !proxy.toggleNavbarValue;
    };

    const logout = () => {
      proxy.$store.dispatch("moduleContext/logout");
      proxy.$router.push("/login");
    };

    const updateRelation = () => {
      popupUtil.show("UpdateRelationDetail", {});
    };

    return {
      menuList,
      menuItemClick,
      toggleNavbar,
      toggleNavbarValue,
      logout,
      updateRelation,
    };
  },

  computed: {
    ...mapGetters({
      context: "moduleContext/Context",
    }),
  },
};
</script>

<style lang="scss">
@import "./AdminPage.scss";
</style>