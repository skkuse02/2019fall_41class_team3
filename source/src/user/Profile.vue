<template>
  <div>
    <div v-if="isChecked">
      <div v-if="isEditMode">
        <button @click="setEditMode(false)" class="btn btn-primary" type="button" variant="primary" size="lg">Confirm</button>
      </div>
      <div v-else>
        <div>uid: {{user.uid}}</div>
        <div>name: {{user.name}}</div>
        <div>nickname: {{user.nickname}}</div>
        <div>email: {{user.email}}</div>
        <div>type: {{user.type}}</div>
        <button  @click="setEditMode(true)" class="btn btn-primary" type="button" variant="primary" size="lg">Edit</button>
      </div>
    </div>

    <div class="loginForm" style="margin:100px 40px 40px 40px" v-else>
      <h2><p>Check Password</p></h2>
      <form class="form-horizontal" role="form" @submit.prevent="checkPassword()">
        <div class="form-group">
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

  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
      return {
          user: null,
          inputPassword: '',
          isChecked: false,
          isEditMode: false
      };
  },
  created: async function(){
    if(!this.$session.exists()){
      this.$router.push({
        path: '/'
      });
    }
    else {
      this.user = this.$session.get('user');
    }
  },
  methods: {
    async checkPassword() {
      try {
        const uid = this.user.uid;
        const password = this.inputPassword;
        const res = await this.$http.post("/rest/checkPw", {uid, password});
        if (res.data.result == true) {
          this.isChecked = true;
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
    setEditMode(flag) {
      this.isEditMode = flag;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/common/login.css";
</style>