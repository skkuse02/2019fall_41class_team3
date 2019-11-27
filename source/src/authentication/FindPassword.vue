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
  }
  methods: {
    //methods error
    submit () {
      this.$http.post("http://localhost:3000/rest/findpassword",this.user);
      // fill in url
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
