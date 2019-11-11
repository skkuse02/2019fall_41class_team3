<template>
  <div class="header container">
    <div class="topMenu row">
      <div class="top_logo col-md-3 col-sm-5">
      </div>
      <div class="rightTop col-md-4 col-md-offset-5 col-sm-5 col-sm-offset-2">
        <div class="topMenuWrapper">
          <router-link :to="{ path: '/'}">HOME</router-link>
          <span>|</span>
          <router-link :to="{ path: '/login'}">LOGIN</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Header"
};
</script>