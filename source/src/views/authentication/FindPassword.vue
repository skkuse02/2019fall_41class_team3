<template>
  <div class="findpassword" style = "margin-top: 100px;"> 
    <form class="form-horizontal" role="form" @submit.prevent="findpassword(uid, name, email)">
      <div class ="form-group">
            <label for="inputID" class="col-xs-4 control-label">ID</label>
            <div class="col-xs-4 center-block">
                <input type="text" v-model="uid" class="form-control" placeholder="ID">
            </div>
        </div>
        <div class ="form-group">
            <label for="inputID" class="col-xs-4 control-label">Name</label>
            <div class="col-xs-4 center-block">
                <input type="text" v-model="name" class="form-control" placeholder="Name">
            </div>
        </div>
        <div class="form-group">
            <label for="inputPW" class="col-xs-4 control-label">Email</label>
            <div class="col-xs-4 center-block">
                <input type="text" v-model="email" class="form-control" placeholder="Email">
            </div>
        </div>

        <!-- Pressing login button will send form's info to server -->
        <div id="loginButtonHolder" style="padding-top:10px">
            <b-button type="submit" variant="success" size="lg" style="width: 20%">Find Password</b-button>
        </div>
    </form>
  </div>
</template>


<script>
export default {
  name: "FindPassword",
  data () {
    return {
      uid: '',
      name: '',
      email:''
    }
  },
  methods: {
    findpassword: async function () {
      const res = await this.$http.post("/rest/user/password",{
        uid: this.uid,
        name: this.name,
        email: this.email
      });
      if (res.data.result == true){
        alert('e-mail로 비밀번호가 전송되었습니다.');
      } else if(error){
        alert('정보가 일치하지 않습니다.');
      }
    }
  }
};

</script>

<style lang="scss" scoped>
@import "../../assets/css/common/main.css";
</style>