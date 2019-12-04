<template>
  <div class="container">
    <div class="qnaheader">
      <div class="q-header-icon">
        <img src="">
      </div>
      <div class="q-header-title">
        <h1>{{questiontitle}}</h1>
      </div>
    </div>
    <div class="qna">
      <div class="question">
        <p>{{questioncontent}}</p>
        <p>TAG:{{questiontag}}</p>
      </div>
      <div class="answer">
        <div class="a-header">
          <div class="a-header-profile">
            <!--user 정보 넣기-->
          </div>
          <div class="a-header">
            <h3>{{usernickname}} 님 답변</h3>
          </div>
        </div>
        <div class="a-content">
          <p>{{answercontent}}</p>
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
      questiontitle:'',
      questioncontent:'',
      questiontag:'',
      usernickname:'',
      answercontent:''
      }
  },
  methods: {
    submit: async function() {
      const res = await this.$http.get("/rest/questionview");
      this.questiontitle = res.data.questions.title;
      this.questioncontent = res.data.questions.content;
      this.questiontag = res.data.questions.tag;
      this.usernickname = res.data.user.nickname;
      this.answercontent = res.data.answer.content;
    }
  }
};
</script>

<style>
</style>
