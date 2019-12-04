<template>
  <div class="container">
    <div class="qnaheader">
      <div class="q-header-icon">
        <img src="">
      </div>
      <div class="q-header-title">
        <h1>{{question.title}}</h1>
      </div>
    </div>
    <div class="qna">
      <div class="question">
        <p>{{question.content}}</p>
        <p>TAG:{{question.tag}}</p>
      </div>
      <div class="answer">
        <div class="a-header">
          <div class="a-header-profile">
            <!--user 정보 넣기-->
          </div>
          <div class="a-header">
            <h3>{{user.nickname}} 님 답변</h3>
          </div>
        </div>
        <div class="a-content">
          <p>{{answer.content}}</p>
        </div>
      </div>
    </div>
  </div>


</template>


<script>
export default {
  name: "questionview",
  data () {
    return {
      question:null,
      answer:null,
      user:null
      }
  },
  created: async function() {
    if(!this.$session.exists()) {
      this.$router.push ({
        path: '/'
      });
    }
    else {
      this.question = this.$session.get('question');
      this.answer = this.$session.get('answer');
      this.user = this.$session.get('user');
    }
  },

  methods: {
  }
};
</script>

<style>
</style>
