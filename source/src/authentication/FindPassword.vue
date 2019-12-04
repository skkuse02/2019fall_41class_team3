<template>
  <div class="findpassword">
    <form id="infoSubmit" @submit.prevent="findpassword(uid, name, email)">
      <div class="input">
        <b-form-group label="ID">
        <b-form-input type="text" v-model="uid" placeholder="Fill in blank."></b-form-input>
        </b-form-group>
        <b-form-group label="Name">
        <b-form-input type="text" v-model="name" placeholder="Fill in blank"></b-form-input>
        </b-form-group>
        <b-form-group label="E-mail">
        <b-form-input type="text" v-model="email" placeholder="Fill in blank"></b-form-input>
        </b-form-group>
      </div>
      <div class="find">
        <b-button type="submit" variant="success" size="lg">Find Password</b-button>
      </div>
    </form>
  </div>
</template>


<script>
export default {
  name: "FindPassword",
  data () {
    return {
      user:{
        uid: '',
        name: '',
        email:''
      }
    }
  },
  methods: {
    findpassword: async function () {
      const res = await this.$http.post("/rest/password",this.user);
      if (res.data.result == true){
        alert('e-mail로 임시 비밀번호가 전송되었습니다.');
      } else if(error){
        alert('정보가 일치하지 않습니다.');
      }
    }
  }
};

</script>

<style>
</style>
