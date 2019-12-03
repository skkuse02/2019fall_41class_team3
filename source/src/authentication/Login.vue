<template>
  <div class="loginForm" style="margin:100px 40px 40px 40px">
    <h2><p>Login</p></h2>
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
        <div id="buttonHolder" style="margin:10px">
            <b-button type="submit" variant="success" size="lg">로그인</b-button>
        </div>
    </form>

    <div class="text-center" style="margin:10px 5px 5px 5px">
        <!-- Pressing Sign In will redirect user to signin page -->
        <router-link to='../register'> Sign Up </router-link>
        <span>  |  </span>
        <!-- Pressing Find ID will redirect user to findid page -->
        <router-link to='../findid'> Find ID </router-link>
        <span>  |  </span>
        <!-- Pressing Find PW will redirect user to findpw page -->
        <router-link to='../findpassword'> Find PW </router-link>
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
      console.log(this.$session.get('user'));
            alert(this.$session.get('user'));
      this.$router.push({
        path: '/'
      });

    }
  },
  methods: {
    async login () {
      try{
        const uid = this.uid;
        const password = this.password;
        if (!uid || !password) {
          alert('아이디와 비밀번호를 입력해주세요!')
        }
        const res = await this.$http.post("/rest/login", {uid, password})
        if (res.data.result == true) {
          this.$router.push({
            path: '/'
          });
        }
      } catch(err) {
        alert(err.toString() + '\n아이디나 비밀번호를 다시 한 번 확인해주세요!')
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/common/login.css";
</style>