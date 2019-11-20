<template>
  <div class="loginForm">
    <h2>Login</h2><br>
    <form @submit.prevent="login()">
        <div>
            <b-form-group label="아이디">
              <b-form-input type="text" v-model="uid"
              placeholder="ID"></b-form-input>
            </b-form-group>
        </div>
        <div>
            <b-form-group label="비밀번호">
              <b-form-input type="password" v-model="password"
              placeholder="Password"></b-form-input>
            </b-form-group>
        </div>

        <!-- Pressing login button will send form's info to server -->
        <b-button type="submit" variant="success" size="lg">로그인</b-button>

        <!-- Pressing findid button will redirect user to findid page -->
        <router-link to='../findid'>
          <b-button variant="success" size="lg">ID 찾기</b-button>
        </router-link>

        <!-- Pressing findpw button will redirect user to findpw page -->
        <router-link to='../findpassword'>
          <b-button variant="success" size="lg">PW 찾기</b-button>
        </router-link>
      </form>
      <!-- Sustain login feature is not implemented yet -->
      <div>
          <input type="checkbox" id="loginSustain" name="loginSustain">
          <label for="loginSustain"><span>로그인 상태 유지</span></label>
      </div>
  </div>
</template>

<script>

export default {
  name: "Login",
  data () {
    return {
      uid: '',
      password: '',
    }
  },
  methods: {
    login () {
      const uid = this.uid;
      const password = this.password;

      if (!uid || !password) {
        alert('아이디와 비밀번호를 입력해주세요!')
      }

      axios.post("http://localhost:3000/rest/login", {uid, password})
        .then(res => {
          if (res.status == 200){
            alert('환영합니다!' + this.uid + '!')
          }
        })
        .catch(err => {
          alert('아이디나 비밀번호를 다시 한 번 확인해주세요!')
        })
    }
  },
};
</script>

<!-- Local style for login page -->
<style scoped>
    h2 {
        font-weight: normal;
    }
    a {
        color: #42b983;
    }
    .btn-lg {
        width: 33.3%;
    }
</style>