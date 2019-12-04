<template>
  <div>
    <b-navbar id="header-bar">
      <b-navbar-brand id="header-brand" href="/"><img id="header-logo" src="/assets/img/logo_white_typeC.png"></b-navbar-brand>
      <div>
        <div class="btn-group" v-if="sessionExist" right>
          <a class="btn btn-info" style="min-width: 130px;"  data-toggle="dropdown" href=""><i class="fa fa-user fa-fw"></i> {{name}}</a>
          <a class="btn btn-info dropdown-toggle" data-toggle="dropdown" href="">
            
          </a>
          <ul class="dropdown-menu">
            <li><router-link id="header-dd-text" :to="{ path: '/profile'}"><i id="header-dd-icon" class="fa fa-pencil fa-fw"></i> Profile</router-link></li>
            <li><router-link id="header-dd-text" :to="{ path: '/credit'}"><i id="header-dd-icon" class="fa fa-credit-card"></i> Credit</router-link></li>
            <li><a id="header-dd-text" href="" v-on:click="logout" ><i id="header-dd-icon"  class="fa fa-unlock"></i> Log Out</a></li>
          </ul>
        </div>
        <div v-else right>
          <router-link id="header-link" :to="{ path: '/login'}">Log In</router-link>
          <span id="header-link"> | </span>
          <router-link id="header-link" :to="{ path: '/signup'}">Sign Up</router-link>
        </div>
      </div>
    </b-navbar>
  </div>
</template>
<script>
import {
  Header as AppHeader,
  SidebarToggler,
  Sidebar as AppSidebar,
  SidebarFooter,
  SidebarForm,
  SidebarHeader,
  SidebarMinimizer,
  SidebarNav,
  Aside as AppAside,
  AsideToggler,
  Breadcrumb
} from "@coreui/vue"

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
          await this.$session.remove('user');
          this.sessionExist = false;
        }
      } catch(e){
        await this.$session.remove('user');
        this.sessionExist = false;
      }
    },
    logout: async function(){
      try{
        const res = await this.$http.post("/rest/logout");
        //if (res.data.result == true)
        //alert('로그아웃 되었습니다.')
        this.sessionExist = false;
        await this.$session.remove('user');
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