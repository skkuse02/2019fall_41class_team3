<template>
  <div>
    <b-row>
      <b-col lg="12">
        <transition>
          <b-card>
            <div slot="header">
              Question {{question.id}}
              <small>View Question</small>
              <div class="card-header-actions">
              </div>
            </div>
            <b-card>
              <b-card-body>
                <div>
                  <div>
                    <b-button type="button" variant="success" v-on:click="gomodify()">수정하기</b-button>
                    &nbsp;&nbsp;
                    <b-button type="button" variant="danger" v-on:click="deleteModal = true">삭제하기</b-button>
                    &nbsp;&nbsp;
                    <b-button to="/question/list" type="button" variant="secondary">돌아가기</b-button>
                  </div>
                  <table class="table">
                    <tbody>
                      <tr>
                        <th style="width:200px;"> Title </th>
                        <td> {{question.title}} </td>
                      </tr>
                      <tr>
                        <th> Author </th >
                        <td> {{question.uid}} </td>
                      </tr>
                      <tr>
                        <th> Date </th>
                        <td> {{question.createdAt}} </td>
                      </tr>
                      <tr>
                        <th> Reward </th>
                        <td> {{question.reward}} </td>
                      </tr>
                      <tr>
                        <th></th>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                  {{question.content}}
                </div>
                <p>
                  <b-button type="button" variant="warning" v-on:click="star()">
                    <i class="fa fa-star" aria-hidden="true"></i> Star {{question.star}}
                  </b-button>
                </p>
              </b-card-body>
            </b-card>
            
            <div v-if="answer">
              <b-card>
                <b-card-body>
                  <div>
                    <table class="table">
                      <tbody>
                        <tr>
                          <th> Author </th >
                          <td> {{answer.mentorId}} </td>
                        </tr>
                        <tr>
                          <th> Date </th>
                          <td> {{answer.createdAt}} </td>
                        </tr>
                        <tr>
                          <th></th>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                    {{answer.content}}
                  </div>
                </b-card-body>
              </b-card>
            </div>
          </b-card>
        </transition>
      </b-col>
    </b-row>
    <b-modal v-model="deleteModal" centered hide-header @ok="deleteQuestion()">
      정말로 삭제하시겠습니까?
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "QuestionView",
  data() {
    return {
      deleteModal: false,
      question: {
        id: 0,
        title: '',
        uid: '',
        createdAt: '',
        content: '',
        star: 0
      },
      answer: null
    };
  },
  mounted: function () {
    this.initView();
  },
  methods: {
    async initView() { 
      const result = await this.$http.get(`/rest/question/`+this.$route.params.id);
      this.question = result.data.question;
      const ansRes = await this.$http.get('/rest/answer/text/'+this.$route.params.id);
      this.answer = ansRes.data.answer;
      //TODO: 답변 구매 등
    },
    async deleteQuiz() {
      const result = await this.$http.post(`/rest/question/`+this.$route.params.id);
      this.$router.go(-1)
    },
    gomodify() {
      this.$router.push({ path: '/rest/question/modify/'+this.$route.params.id });
    },
    async star() {
      const reqRes = await this.$http.post('/rest/question/star/' + this.$route.params.id);
      if(reqRes.data.result) {
        this.question.star = reqRes.data.stars;
      }
    }
  }
}
</script>
