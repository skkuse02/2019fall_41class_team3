<template>
  <div>
    <b-navbar id="header-bar">
      <b-navbar-brand id="header-brand" href="/"><img id="header-logo" src="assets/img/logo_white_typeC.png"></b-navbar-brand>
      <div>
          <div id="header-right-bar" v-if="sessionExist">
            <div id="header-link">Welcome {{name}} | </div>
            <a v-on:click="logout" id="header-link">Log out</a>
            <span id="header-link"> | </span>
            <router-link id="header-link" :to="{ path: '/profile'}">Profile</router-link>
          </div>
          <div id="header-right-bar" v-else>
            <router-link id="header-link" :to="{ path: '/login'}">Log In</router-link>
            <span id="header-link"> | </span>
            <router-link id="header-link" :to="{ path: '/register'}">Sign Up</router-link>
          </div>
      </div>
    </b-navbar>
  </div>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {
      sessionExist: false,
      name: ""
    };
  },
  created: async function(){
    this.getSession();
  },
  mounted: async function(){

  },
  methods: {
    getSession: async function(){
      try{
        const session = await this.$http.get('/rest/user/session');
        if(session.data.result == true){
          this.name = session.data.user.name;
          this.$session.set('user',session.data.user);
          this.sessionExist = true;
        } else{
          this.sessionExist = false;
        }
      } catch(e){
        this.sessionExist = false;
      }
    },
    async logout (){
      try{
        const res = await this.$http.post("http://localhost:3000/rest/logout")
        //if (res.data.result == true)
        //alert('로그아웃 되었습니다.')
        this.sessionExist = false;
        this.$session.destroy();
        this.$router.push({
          path: '/'
        });
      } catch(e){
        //alert('로그아웃에 실패하였습니다.')
      }
    }
  }
};
</script>