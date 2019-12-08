<template lang="v-html">
  <div id="procedure">
    <div style="margin:30px; float:left;">
      <b-input-group size="lg">
        <div style="float:left;margin-right:30px;font-weight:bold;font-size:20px;line-height:40px;">
          Search
        </div>
        <b-dropdown variant="info" size="lg" :text="questionTable.filterText" style="width:100px;">
          <b-dropdown-item @click="questionTable.filterOn = ['title']; questionTable.filterText='Title'">Title</b-dropdown-item>
          <b-dropdown-item @click="questionTable.filterOn = ['uid']; questionTable.filterText='Author'">Author</b-dropdown-item>
          <b-dropdown-item @click="questionTable.filterOn = ['fields']; questionTable.filterText='Field'">Field</b-dropdown-item>
        </b-dropdown>
        <b-form-input v-model="questionTable.filter" type="search" id="filterInput"
          placeholder="Search..." style="width:300px"
        ></b-form-input>
        <b-input-group-append>
          <b-button :disabled="!questionTable.filter" @click="questionTable.filter = ''">Clear</b-button>
        </b-input-group-append>
      </b-input-group>

      <strong><h1>Welcome!</h1></strong>
      <h2><p>What is QAHub?</p></h2>
      QAHub is web-based online flatform that mediates mentee and mentor.<br>
      If you need some answers for certain question<br>
      or you want to share your knowledge, sign up and join us!<br><br>
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
    <div style="clear: both"></div>
    <div class="max-width-container" style="width:100%">
      <div v-if="this.uid">
        <div id="buttonholder" style="margin:10px; margin-right:65px; float:right">
          <b-button type="button" @click="moveQuestionList()"
          variant="success" size="sm">전체 게시물</b-button>
        </div>
        <div id="buttonholder" style="margin:10px; float:right">
          <b-button type="submit" @click="moveRegisterQuestion()"
          variant="success" size="sm">질문 등록하기</b-button>
        </div>
      </div>
    </div>  
    <div style="clear: both"></div>
    <div class="max-width-container" style="width:100%">
      <div class="subject-container">
        <div class="arrow left icon-chevron"></div>
        <div class="arrow right icon-chevron"></div>  
        <ul class="subjects text-center" style="transform: translateX(0px);">
          <li class="col-xs-3 text-center">
            <img src="../../assets/datatables/images/list-all.png"
            v-on:click="moveQuestionList()" style="cursor:pointer"/>
            <ul class="science-ss">
              <li class="sub-subject">
                    <a style="text-align:center cursor:pointer"
                    @click="moveQuestionList()"><h5>All Subject</h5></a>
              </li>
            </ul>
          </li>
          <li class="col-xs-3 text-center">
            <img src="../../assets/datatables/images/flask.png"
            v-on:click="moveQuestionList()" style="cursor:pointer"/>
            <ul class="science-ss text-center">
              <li class="sub-subject">
                    <a style="text-align:center cursor:pointer"
                    @click="moveQuestionList()"> <h5>Science</h5></a>
              </li>
            </ul>
          </li>
          <li class="col-xs-3 text-center">
            <img src="../../assets/datatables/images/square-root.png" 
            v-on:click="moveQuestionList()" style="cursor:pointer"/>
            <ul class="science-ss">
              <li class="sub-subject">
                    <a style="text-align:center cursor:pointer"
                    @click="moveQuestionList()" ><h5>Math</h5></a>
              </li>
            </ul>
          </li>
          <li class="col-xs-3 text-center">
            <img src="../../assets/datatables/images/laptop-code.png"
            v-on:click="moveQuestionList()" style="cursor:pointer"/>
            <ul class="science-ss">
              <li class="sub-subject">
                    <a style="text-align:center cursor:pointer"
                    @click="moveQuestionList()"><h5>Computer Science</h5></a>
              </li>
            </ul>
          </li>
        </ul>
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
        uid: '',
        questionTable: {
          questions: [],
          fields: [ 
            { key: 'id', label: '번호', sortable: true},
            { key: 'title', label: '제목', sortable: true },
            { key: 'uid', label: '등록자', sortable: true},
            { key: 'createdAt', label: '등록 날짜', sortable: true},
            { key: 'star', label: '추천', sortable: true}
          ],
          sortBy: 'id',
          sortDesc: true,
          currentPage: 1,
          perPage: 10,
          totalRows: 0,
          filter: null,
          filterOn: ['title'],
          filterText: 'Title'
        },
        recomendedTable: {
          questions: [],
          fields: [ 
            { key: 'id', label: '번호', sortable: true},
            { key: 'title', label: '제목', sortable: true },
            { key: 'uid', label: '등록자', sortable: true},
            { key: 'createdAt', label: '등록 날짜', sortable: true},
            { key: 'star', label: '추천', sortable: true}
          ],
          sortBy: 'id',
          sortDesc: true,
          currentPage: 1,
          perPage: 5,
          totalRows: 0,
        }
      }
    },
    mounted: async function() {
      
        try{
        const session = await this.$http.get('/rest/user/session');
        this.uid = session.data.user.uid;
      } catch(e) {
      }
      
      const qlist = await this.$http.get('/rest/question/list');
      this.questionTable.questions = qlist.data.questions;
      this.questionTable.totalRows = this.questionTable.questions.length;
      if(this.isMentor)
      {
        try {
          const rlist = await this.$http.get('/rest/question/listByTime');
          this.recomendedTable.questions = rlist.data.questions;
          this.recomendedTable.totalRows = this.recomendedTable.questions.length;
        }
        catch(e) {
          alert(e);
        }
      }
       // alert(this.$route.query.search);
      if(this.$route.query.search) {
        this.questionTable.filter = this.$route.query.search;
        //alert(this.$route.query.search);
      }

      if(this.route.query.field) {

      }
    },
    methods: {
      moveRegisterQuestion () {
        this.$router.push({
            path: '/question/register'
        });
      },
      moveQuestionList() {
        this.$router.push({
            path: '/question/list'
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
@import "../../assets/css/common/main.css";
</style>