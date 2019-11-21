<template>
  <div class="app">
    <!-- Header, Navigation, Footer 사이트 전체 공용 부분임. -->
    <div class="contents">
      <Header/>      
      <!-- 이 부분 내용이 바뀜 -->
      <router-view/>
    </div>

    <Footer/>
  </div>
</template>

<script>
import Footer from "./Footer";
import Header from "./Header";
export default {
  name: "DefaultContainer",
  //Test
  head: {
    title: function() {
      return {
        inner: "QAHub"
      };
    },
    meta: [{ description: "qahub@vue", author: "Software Engineering Team 3" }]
  },
  components: {
    Footer,
    Header
  }
};
</script>
