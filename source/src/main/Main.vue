<!--When session is detected, show this page -->
<template v-if="sessionExist">
  <strong><h1> Welcome, {{ uid }} !</h1><strong>
</template>

<!-- When session is not detected, show this page -->
<template v-else>
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
    </div>
</template>
<script>


export default {
  name: "Main",
  components: {

  },
  data() {
    return {
      sessionExist: false,
      uid: 'Anonymous'
    };
  },
  created: async function() {
    this.getSession();
  },
  methods: {
    async getSession () {
      try{
        const session = await this.$http.get('/rest/user/session');
        if(session.data.result == true) {
          this.sessionExist = true;
          this.uid = session.data.user.uid
        } else{
          this.sessionExist = false;
        }
      } catch(err) {
        this.sessionExist = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/style.css";
</style>