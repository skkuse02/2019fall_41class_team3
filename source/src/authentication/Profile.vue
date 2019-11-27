<template>
  <div>
    <div>uid: {{user.uid}}</div>
    <div>name: {{user.name}}</div>
    <div>nickname: {{user.nickname}}</div>
    <div>email: {{user.email}}</div>
    <div>type: {{user.type}}</div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
      return {
          user: null
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

  }
};
</script>