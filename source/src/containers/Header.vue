<template>
  <div>
    <b-navbar id="header-bar">
      <b-navbar-brand id="header-brand" href="#"><img id="header-logo" src="assets/img/logo_white_typeC.png"></b-navbar-brand>
      <div id="header-right-bar">
          <router-link :to="{ path: '/'}">Log In</router-link>
          <span> | </span>
          <router-link :to="{ path: '/'}">Sign Up</router-link>
      </div>
    </b-navbar>
  </div>
</template>
<script>
export default {
  name: "Header"
};
</script>