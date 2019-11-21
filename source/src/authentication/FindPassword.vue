<template>
  <div class="findpassword">
    <form @submit.prevent="findpassword(id, name, email)">
      <div class="input">
        <b-form-group label="ID">
        <b-form-input type="text" v-model="uid" placeholder="id"></b-form-input>
        </b-form-group>
        <b-form-group label="Name">
        <b-form-input type="text" v-model="name" placeholder="name"></b-form-input>
        </b-form-group>
        <b-form-group label="E-mail">
        <b-form-input type="text" v-model="email" placeholder="email"></b-form-input>
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
      id: '',
      name: '',
      email:'',
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
