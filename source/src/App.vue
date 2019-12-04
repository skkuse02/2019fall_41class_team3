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
@import '~@coreui/icons/css/coreui-icons.min.css';
/* Import Font Awesome Icons Set */
$fa-font-path: "~font-awesome/fonts/";
@import "~font-awesome/scss/font-awesome.scss";
/* Import Bootstrap Vue Styles */
@import "~bootstrap-vue/dist/bootstrap-vue.css";
/* Custom CSS */
@import "assets/css/bootstrap.min.css";
@import "assets/css/style.css";
@import "assets/css/common/header.css";
@import "assets/css/common/signup.css";
@import "assets/css/sticky_footer.css";
@import "assets/css/jquery.nav.css";
@import "assets/datatables/dataTables.bootstrap.css";


/* Import Simple Line Icons Set */
$simple-line-font-path: '~simple-line-icons/fonts/';
@import '~simple-line-icons/scss/simple-line-icons.scss';
/* Import Flag Icons Set */
@import '~flag-icon-css/css/flag-icon.min.css';
@import "assets/scss/style";
</style>