<template>
  <div class="findid">
    <form @submit.prevent="findid(name, email)">
      <div class="input">
        <b-form-group label="Name">
        <b-form-input type="text" v-model="name" placeholder="name"></b-form-input>
        </b-form-group>
        <b-form-group label="E-mail">
        <b-form-input type="text" v-model="email" placeholder="email"></b-form-input>
      </b-form-group>
      </div>
      <div class="find">
        <b-button type="submit" variant="success" size="lg">Find ID</b-button>
      </div>
    </form>
  </div>
</template>


<script>
export default {
  name: "FindId",
  data () {
    return {
      user:{
        name: '',
        email:''
      }
    }
  },
  methods: {
    findid: async function () {
      const res = await this.$http.post("/rest/findid",this.user);
      if (res.data.result == true){
        alert(res.data.user.nickname + 'id : ' + res.data.user.uid);
      } else if(error){
        alert('ID가 일치하지 않습니다.');
      }
    }
  }
};

</script>

<style>

</style>
