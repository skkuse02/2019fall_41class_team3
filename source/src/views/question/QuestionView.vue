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
                  <div style="margin-bottom:20px;">
                    <div style="font-size:20px;margin:10px;display:inline;">
                      <b>{{question.title}}</b>
                    </div>
                    <div style="display:inline;float:right;">
                      <b-button type="button" variant="warning" v-on:click="star()" :disabled="starDisabled">
                        <i class="fa fa-star" aria-hidden="true"></i> Star {{question.star}}
                      </b-button>
                    </div>
                  </div>
                  <table class="table">
                    <tbody>
                      <tr>
                        <th style="width:200px;"> Author </th >
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
                        <th> Answer Type </th>
                        <td> {{question.type}} </td>
                      </tr>
                      <tr>
                        <th></th>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                  {{question.content}}
                </div>
                <div style="float:right;display:inline;">
                  <div v-if="user.uid==question.uid" style="margin:5px;display:inline;">
                    <b-button type="button" variant="danger" v-on:click="showDeleteModal()" style="margin:5px;">
                      <i class="fa fa-trash-o" aria-hidden="true"></i> Delete
                    </b-button>
                  </div>
                  <div style="margin:5px;display:inline;">
                    <b-button to="/question/list" type="button" variant="secondary">
                      <i class="fa fa-undo" aria-hidden="true"></i> Back
                    </b-button>
                  </div>
                </div>
              </b-card-body>
            </b-card>
            
            <div v-if="isAnswered">
              <b-card>
                  <div v-if="hasPermission">
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
                  </div>
                  <div v-else>
                    This question has answered! See the answer using credit. 
                    <b-button type="button" variant="warning" v-on:click="purchase()">
                      <i class="fa fa-shopping-cart" aria-hidden="true"></i> Purchase {{question.reward/5}}
                    </b-button>
                  </div>
              </b-card>
            </div>
            <div v-else-if="user.type=='Mentor'">
              <b-card>
                This question is not answered yet.
                <b-button type="button" variant="danger" v-on:click="gotoAnswer()">
                  <i class="fa fa-pencil" aria-hidden="true"></i> Add Answer
                </b-button>
              </b-card>
            </div>
          </b-card>
        </transition>
      </b-col>
    </b-row>
    <modal name="confirm-delete">
      <div style="text-align:center;padding:60px;height:80%;font-size:25px;">
        <div style="margin-bottom:30px;">
          <b>Do you really want to delete the question?</b>
        </div>
        <div style="margin:20px;">
          <b-button type="button" variant="danger" v-on:click="deleteQuestion">
            <i class="fa fa-trash-o" aria-hidden="true"></i> Confirm
          </b-button>
        </div>
      </div>
    </modal>
    
    <modal name="not-enough-credit">
      <div>Not enough credits.</div>
      <button type="button" @click="gotoCredit">Go to Credit Page</button>
    </modal>
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
      hasPermission: false,
      isAnswered: false,
      answer: null,
      user: null,
      starDisabled: false
    };
  },
  mounted: async function () {
    this.initView();
    try{
      const session = await this.$http.get('/rest/user/session');
      if(session.data.result == false){
        this.$router.push({'path' : '/'});
      }
      else {
        this.user = session.data.user;
      }
    } catch(e){
      this.$router.push({'path' : '/'});
    }
  },
  methods: {
    async initView() { 
      const result = await this.$http.get(`/rest/question/`+this.$route.params.id);
      this.question = result.data.question;

      try {
        const ansRes = await this.$http.get('/rest/answer/text/'+this.$route.params.id);
        this.hasPermission = ansRes.data.result;
        if(this.hasPermission) this.answer = ansRes.data.answer;
        this.isAnswered = true;
      }
      catch(e) {
        this.isAnswered = false;
      }
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
        this.starDisabled = true;
      }
    },
    async purchase() {
      const res = await this.$http.get("/rest/user/credit");
      const currentCredit = res.data.credit;
      if(currentCredit < (this.question.reward/5)) {
        this.$modal.show('not-enough-credit');
      }
      else {
        try {
          const reqRes = await this.$http.post('/rest/answer/purchase/' + this.$route.params.id);
          if(reqRes.data.result) {
            alert("Purchase success.");
            this.refresh();
          }
        }
        catch(e) {
          alert(e);
          this.$modal.show('not-enough-credit');
        }
      }
    },
    gotoCredit() {
      this.$router.push({ path: '/credit' });
    },
    refresh() {
      this.$router.go({path: '/question/'+this.$route.params.id});
    },
    gotoAnswer() {
      this.$router.push({path: '/answer/text/'+this.$route.params.id});
    },
    showDeleteModal() {
      this.$modal.show('confirm-delete');
    },
    async deleteQuestion() {
      const reqRes = await this.$http.post('/rest/question/delete/' + this.$route.params.id);
      if(reqRes.data.result) {
        alert("Question deleted successfully.");
        this.$router.push({ path: '/question/list' });
      }
    }
  }
}
</script>
