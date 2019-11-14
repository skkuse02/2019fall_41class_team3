<template>
  <div>
    <router-view :key="$route.fullPath" style="height:100%;"/>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss">
/* Import Font Awesome Icons Set */
$fa-font-path: "~font-awesome/fonts/";
@import "~font-awesome/scss/font-awesome.scss";
/* Import Bootstrap Vue Styles */
@import "~bootstrap-vue/dist/bootstrap-vue.css";

/* Custom CSS */
@import "assets/css/bootstrap.min.css";
@import "assets/css/style.css";
@import "assets/css/common/header.css";
@import "assets/css/sticky_footer.css";
@import "assets/css/jquery.nav.css";
@import "assets/datatables/dataTables.bootstrap.css";
</style>
