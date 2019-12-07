<template>
  <div>
    <!-- Mode: Check Password -->
    <div v-if="mode=='check_pw'" class="loginForm" style="margin:100px 40px 40px 40px">
      <h2><p>Check Password</p></h2>
      <form class="form-horizontal" role="form" @submit.prevent="checkPassword()">
        <div class="form-group" style="width:100%;">
          <label for="inputPW" class="col-xs-4 control-label">PW</label>
          <div class="col-xs-4 center-block">
            <input type="password" v-model="inputPassword" class="form-control" placeholder="Password">
          </div>
        </div>

        <!-- Pressing login button will send form's info to server -->
        <div id="buttonHolder" style="margin:10px">
            <b-button type="submit" variant="success" size="lg">Submit</b-button>
        </div>
      </form>
    </div>

    <!-- Mode: Edit User Info -->
    <div v-if="mode=='edit_pw'">
      <form class="layout-form" @submit.prevent="changePassword()" autocomplete="nope">
        <div class="form-group" :class="{error: validation.hasError('password')}">
          <div class="label">* Password</div>
          <div class="content"><input type="password" class="form-control" v-model="password" autocomplete="new-password"/></div>
          <div class="message">{{ validation.firstError('password') }}</div>
        </div>
        <div class="form-group" :class="{error: validation.hasError('repeat')}">
          <div class="label">* Confirm password</div>
          <div class="content"><input type="password" class="form-control" v-model="repeat"/></div>
          <div class="message">{{ validation.firstError('repeat') }}</div>
        </div>
        <button @click="changeMode('check_pw')" class="btn btn-primary" type="reset" style="margin-right: 10px;" variant="warning" size="lg">Cancel</button>
        <button class="btn btn-primary" type="submit" variant="primary" size="lg">Confirm</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangePw",
  data() {
    return {
      user: null,
      inputPassword: '',
      mode: 'check_pw',

      password: '',
      repeat: ''
    };
  },
  validators: {
    password: function (value) {
      return this.$validator.value(value).required().minLength(8)
        .regex('(?=.*?[A-Z])', 'Must contain at least one uppercase letter.')
        .regex('(?=.*?[a-z])', 'Must contain at least one lowercase letter.')
        .regex('(?=.*?[0-9])', 'Must contain at least one number.');
      },
    'repeat, password': function (repeat, password) {
      if (this.submitted || this.validation.isTouched('repeat')) {
        return  this.$validator.value(repeat).required().match(password);
      }
    }
  },
  created: async function(){
    try{
      const session = await this.$http.get('/rest/user/session');
      this.user = session.data.user;
    } catch(e) {
      this.$router.push({path: '/login'});
    }
  },
  methods: {
    async changeMode(mode) {
      switch(mode) {
        case 'edit_info': 
          this.name = this.user.name;
          this.nickname = this.user.nickname;
          this.email = this.user.email;
          break;
      }

      this.mode = mode;
    },
    async checkPassword() {
      try {
        const uid = this.user.uid;
        const password = this.inputPassword;
        const res = await this.$http.post("/rest/checkPw", {uid, password});
        if (res.data.result == true) {
          this.changeMode('edit_pw');
        }
        else {
          this.inputPassword = '';
          alert("비밀번호가 일치하지 않습니다.");
        }
      }
      catch(e) {
        this.inputPassword = '';
        alert("비밀번호가 일치하지 않습니다.");
      }
    },
    async changePassword() {
      const current_pw = this.inputPassword;
      const new_pw = this.password;
      const res = await this.$http.post("/rest/user/password/change", {current_pw, new_pw});
      if (res.data.result == true) {
        this.changeMode('check_pw');
        alert("Password changed successfully.");
      }
      else {
        this.inputPassword = '';
        alert("Fail to change password.");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/common/login.css";
</style>