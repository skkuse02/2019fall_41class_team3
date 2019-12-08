<template>
  <div class="findid" style = "margin-top: 100px;"> 
    <form class="form-horizontal" role="form" @submit.prevent="findid(name, email)">
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
            <b-button type="submit" variant="success" size="lg" style="width: 20%">Find ID</b-button>
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

<style lang="scss" scoped>
@import "../../assets/css/common/main.css";
</style>
