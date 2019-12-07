<template>
  <div>
    <b-navbar id="header-bar">
      <b-navbar-brand id="header-brand" href="/"><img id="header-logo" src="/assets/img/logo_white_typeC.png"></b-navbar-brand>
      <div style="margin-left:auto;">
        <div v-if="sessionExist">
          <div id="header-link" v-if="rank==1"><img src="/assets/img/rank_1.png" style="width: 50px;"></div>
          <div id="header-link" v-else-if="rank==2"><img src="/assets/img/rank_2.png" style="width: 50px;"></div>
          <div id="header-link" v-else-if="rank==3"><img src="/assets/img/rank_3.png" style="width: 50px;"></div>
          <div id="header-link" v-else-if="rank==4"><img src="/assets/img/rank_4.png" style="width: 50px;"></div>
          <div id="header-link" v-else-if="rank==5"><img src="/assets/img/rank_5.png" style="width: 50px;"></div>
          <div id="header-link" style="margin-right: 20px;">
            {{credit}} P
          </div>
          <div class="btn-group">
            <a class="btn btn-info" style="min-width: 130px;" data-toggle="dropdown" href=""><i class="fa fa-user fa-fw"></i> {{name}}</a>
            <a class="btn btn-info dropdown-toggle" data-toggle="dropdown" href=""></a>
            <ul class="dropdown-menu">
              <li><router-link id="header-dd-text" :to="{ path: '/profile'}"><i id="header-dd-icon" class="fa fa-pencil fa-fw"></i> Profile</router-link></li>
              <li><router-link id="header-dd-text" :to="{ path: '/changepw'}"><i class="fa fa-key" aria-hidden="true"></i> Change Password</router-link></li>
              <li><router-link id="header-dd-text" :to="{ path: '/credit'}"><i id="header-dd-icon" class="fa fa-credit-card"></i> Credit</router-link></li>
              <li><router-link id="header-dd-text" :to="{ path: '/myquestion'}"><i id="header-dd-icon" class="fa fa-history"></i> My Questions</router-link></li>
              <li><a id="header-dd-text" href="" v-on:click="logout" ><i id="header-dd-icon"  class="fa fa-unlock"></i> Log Out</a></li>
            </ul>
          </div>
        </div>
        <div v-else>
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
      name: "",
      rank: 0,
      credit: 0
    };
  },
  created: async function(){
  },
  mounted: async function(){
    this.getSession();
  },
  methods: {
    getSession: async function(){
      try{
        const session = await this.$http.get('/rest/user/session');
        if(session.data.result == true){
          this.name = session.data.user.name;
          this.rank = session.data.user.rank;
          const creditRes = await this.$http.get('/rest/user/credit');
          this.credit = creditRes.data.credit;
          this.sessionExist = true;
        } else{
          this.sessionExist = false;
        }
      } catch(e){
        this.sessionExist = false;
      }
    },
    logout: async function(){
      try{
        const res = await this.$http.post("/rest/logout");
        //if (res.data.result == true)
        //alert('로그아웃 되었습니다.')
        this.sessionExist = false;
        this.$router.go({
          path: '/'
        });
      } catch(e){
        //alert('로그아웃에 실패하였습니다.')
      }
    }
  }
};
</script>