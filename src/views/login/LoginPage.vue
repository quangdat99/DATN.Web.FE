<template>
  <div class="login-page">
    <div class="login-container flex flex-row">
      <div class="login-content-left  w-50">
        <div class="login-content-left-title">
          Đăng nhập
        </div>
        <div class="login-field-container flex flex-column">
          <div class="login-field-label">
            Tài khoản
          </div>
          <div class="login-field-input">
            <base-input placeholder="Nhập email hoặc số điện thoại" v-model="model.account"
              field="account"></base-input>
          </div>
        </div>
        <div class="login-field-container flex flex-column">
          <div class="login-field-label">
            Mật khẩu
          </div>
          <div class="login-field-input">
            <base-input placeholder="Mật khẩu" type="password" v-model="model.password"
              field="password"></base-input>
          </div>
        </div>
        <div class="login-button">
          <base-button text="ĐĂNG NHẬP" customClass="white btn-padding w-100" @click="login">
          </base-button>
        </div>
        <div class="forgot-password flex flex-end color-red">
          Quên mật khẩu?
        </div>
      </div>
      <div class="login-content-right  w-50 flex flex-center flex-column">
        <div class="logo-container flex-column flex-center">

          <a href="/">
            <div class="logo">

            </div>
          </a>
          <div class="welcome-text">
            Chào mừng bạn đến mới Eshop Shop
          </div>
        </div>
        <div class="ask">
          Bạn chưa có tài khoản ?
        </div>
        <div class="signup-button">
          <base-button text="ĐĂNG KÝ" customClass="primary btn-padding" @click="goToSignup">
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/button/BaseButton.vue';
import BaseInput from '@/components/input/BaseInput.vue';
import { ref, getCurrentInstance, reactive } from 'vue';
import userAPI from '@/apis/components/userAPI.js';
import jwt_decode from "jwt-decode";
export default {
  name: 'LoginPage',
  components: {
    BaseButton,
    BaseInput
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const model = reactive({

    });

    const goToSignup = () => {
      proxy.$router.push("/signup");
    }
    const login = async () => {
      if(proxy.model){
        let res = await proxy.$store.dispatch("moduleContext/login", model)
        if(res){
          proxy.$router.push('homepage');
        } else {
          proxy.$toast.error(`Tài khoản hoặc mật khẩu không đúng`);
        }
      }
    }
    return {
      model,
      goToSignup,
      login
    }
  }
}
</script>

<style lang="scss">
@import './LoginPage.scss';
</style>