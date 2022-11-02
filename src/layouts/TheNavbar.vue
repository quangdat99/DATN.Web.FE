<template>
  <div class="navbar">
    <div class="logo-box"></div>
    <div class="navbar-content">
      <router-link
        to="/"
        class="navbar-item"
        :class="{ active: $route.name == 'overview' }"
        content="Tổng quan"
      >
        <div class="navbar-item-icon">
          <div class="icon-navbar icon-navbar-overview"></div>
        </div>
        <div class="navbar-item-text">Tổng quan</div>
      </router-link>
      <router-link
        to="/inventory"
        class="navbar-item"
        :class="{ active: $route.name == 'inventory' }"
      >
        <div class="navbar-item-icon">
          <div class="icon-navbar icon-navbar-inventory"></div>
        </div>
        <div class="navbar-item-text">Hàng hóa</div>
      </router-link>
    </div>
  </div>
</template>
