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
    //methods error
    submit () {
      this.$http.post("/rest/findid",this.user);
      //fill in url
      if (res.status == 200){
        console.log(response);
      } else if(error){
        console.log(error);
      }
    }
  }
};


</script>

<style scoped>
    .find {
        text-align: center;
    }
    .label {
        color: #495057;
        font-weight: bold;

    }
    .btn-lg {
        width: 33.3%;
    }
</style>
