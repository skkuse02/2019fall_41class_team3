<template>
    <div id="procedure">
      <strong><h1>Welcome!</h1></strong>
      <h2><p>What is QAHub?</p></h2>
      <p>QAHub is web-based online flatform that mediates mentee and mentor.</p>
      <p>If you need some answers for certain question</p>
      <p>or you want to share your knowledge, sign up and join us!</p><br>
      <div id="scriptMentee">
        <h3>For Mentee</h3>
        <ol id="processMentee" type="1">
          <li>Prepare your question.</li>
          <li>Choose your preferred option about answers. You can choose...</li>
            <ul id="answerOption">
              <li>Text only</li>
              <li>Live chatting</li>
              <li>Live chatting with screen sharing</li>
            </ul>
          <li>Register your question and wait for answers.</li>
          <li>Check mentor's answer and evaluate how much it is useful,
            before give credit to mentor!</li>
        </ol>
      </div><br>
      <div id="scriptMentor">
        <h3>For Mentor</h3>
        <ol id="processMentor" type="1">
          <li>Find some questions that you want to answer, based on your interest.</li>
          <li>Check answer option and give your answer in specified method.</li>
          <li>Wait for mentee's evaluation and take your credit!</li>
       </ol>
      </div>
      <div v-if="this.$session.exists()">
        <div id="buttonholder" style="margin:10px">
          <b-button type="submit" @click="moveRegisterQuestion()"
          variant="success" size="sm">질문 등록하기</b-button>
        </div>
      </div>
    </div>
</template>
<script>


export default {
  name: "Main",
  components: {

  },
  data() {
    return {
      uid: ''
    };
  },
  created: async function() {
    if (await this.$session.exists()){
      const session = await this.$http.get('/rest/user/session')
      this.uid = session.data.user.uid
    }
  },
  methods: {
    moveRegisterQuestion () {
      this.$router.push({
          path: '/registerquestion'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/style.css";
</style>