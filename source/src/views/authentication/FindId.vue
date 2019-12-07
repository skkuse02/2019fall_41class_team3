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
      name: '',
      email:''
    }
  },
  methods: {
    findid: async function () {
      try{
        const res = await this.$http.post("/rest/user/id", {
          name: this.name,
          email: this.email
        });
        if (res.data.result == true){
          alert('Your id is ' + res.data.user.uid);
        } 
      } catch(err){
        alert("Not found");
      }
    }
  }
};

</script>

<style>

</style>
