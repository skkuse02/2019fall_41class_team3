<template>
  <div>
    <b-navbar id="header-bar">
      <b-navbar-brand id="header-brand" href="#"><img id="header-logo" src="assets/img/logo_white_typeC.png"></b-navbar-brand>
      <div>
          <div  id="header-right-bar" v-if="sessionExist">
          Welcome {{name}}
          </div>
          <div  id="header-right-bar" v-else>
          <router-link :to="{ path: '/login'}">Log In</router-link>
          <span> | </span>
          <router-link :to="{ path: '/'}">Sign Up</router-link>
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
          this.sessionExist = true;
        } else{
          this.sessionExist = false;
        }
      } catch(e){
        this.sessionExist = false;
      }
    }
  }
};
</script>