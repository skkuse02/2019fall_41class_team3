<template>
  <div class="loginForm" style="padding-top:100px">
    <form class="form-horizontal" role="form" @submit.prevent="login()">
        <div class ="form-group">
            <label for="inputID" class="col-xs-4 control-label">ID</label>
            <div class="col-xs-4 center-block">
                <input type="text" v-model="uid" class="form-control" placeholder="ID">
            </div>
        </div>
        <div class="form-group">
            <label for="inputPW" class="col-xs-4 control-label">PW</label>
            <div class="col-xs-4 center-block">
                <input type="password" v-model="password" class="form-control" placeholder="Password">
            </div>
        </div>

        <!-- Pressing login button will send form's info to server -->
        <div id="loginButtonHolder" style="padding-top:10px">
            <b-button type="submit" variant="success" size="lg" style="width: 20%">로그인</b-button>
        </div>
    </form>

    <div class="text-center" style="margin:10px 5px 5px 5px">
        <!-- Pressing Sign In will redirect user to signin page -->
        <router-link to='../signup'> Sign Up </router-link>
        <span>  |  </span>
        <!-- Pressing Find ID will redirect user to findid page -->
        <router-link to='../find/id'> Find ID </router-link>
        <span>  |  </span>
        <!-- Pressing Find PW will redirect user to findpw page -->
        <router-link to='../find/password'> Find PW </router-link>
    </div><p></p>

    <div class="text-center">
        <input type="checkbox" id="loginSustain" name="loginSustain">
        <label for="loginSustain"><span>로그인 상태 유지</span></label>
    </div><p></p>

  </div>
</template>

<script>

export default {
  name: "Login",
  data () {
    return {
      uid: '',
      password: '',
      msg: ''
    }
  },
  created: async function(){
    if(this.$session.has('user')){
      this.$router.push({
        path: '/'
      });

    }
  },
  methods: {
    login: async function() {
      try{
        const uid = this.uid;
        const password = this.password;
        if (!uid || !password) {
          alert('아이디와 비밀번호를 입력해주세요!')
        }
        const res = await this.$http.post("/rest/login", {uid, password})
        if (res.data.result == true) {
          const session = await this.$http.get('/rest/user/session');
          if(session.data.result == true){
            this.$session.set('user',session.data.user);
          } else{
            this.$session.remove('user');
          }
        } 
        this.$router.go(-1);
      } catch(err) {
        alert(err.toString() + '\n아이디나 비밀번호를 다시 한 번 확인해주세요!')
      }
    },
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/common/main.css";
</style>