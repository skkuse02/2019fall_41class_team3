<template lang="v-html">
  <div id="procedure">
  <div class="search-field">
    <div class="search-bar-container">
      <form @submit.prevent="search()" style="margin:10px;">
        <b-input-group size="lg">
          <div style="float:left;margin-right:30px;font-weight:bold;font-size:20px;line-height:40px;">
            Search
          </div>
          <b-dropdown variant="info" size="lg" :text="ddText" style="width:100px;">
            <b-dropdown-item @click="ddText='Title';searchType='title'">Title</b-dropdown-item>
            <b-dropdown-item @click="ddText='Author';searchType='uid'">Author</b-dropdown-item>
          </b-dropdown>
          <b-form-input v-model="searchText" type="search" id="filterInput"
            placeholder="Search..." style="width:300px"
          ></b-form-input>
          <b-input-group-append>
            <b-button :disabled="!searchText" @click="searchText = ''">Clear</b-button>
          </b-input-group-append>
        </b-input-group>
      </form>
      <router-link class="add-question" :to="{ path: '/question/register'}"><i class="fa fa-plus-square" aria-hidden="true"></i> Add new question</router-link>
    </div>
  </div>
    <div style="margin:30px; float:left;">
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
            v-on:click="moveAllSubject()" style="cursor:pointer"/>
            <ul class="science-ss">
              <li class="sub-subject">
                    <a style="text-align:center"><h5>All Subject</h5></a>
              </li>
            </ul>
          </li>
          <li class="col-xs-3 text-center">
            <img src="../../assets/datatables/images/flask.png"
            v-on:click="moveScience()" style="cursor:pointer"/>
            <ul class="science-ss text-center">
              <li class="sub-subject">
                    <a style="text-align:center"> <h5>Science</h5></a>
              </li>
            </ul>
          </li>
          <li class="col-xs-3 text-center">
            <img src="../../assets/datatables/images/square-root.png" 
            v-on:click="moveMath()" style="cursor:pointer"/>
            <ul class="science-ss">
              <li class="sub-subject">
                    <a style="text-align:center" ><h5>Math</h5></a>
              </li>
            </ul>
          </li>
          <li class="col-xs-3 text-center">
            <img src="../../assets/datatables/images/laptop-code.png"
            v-on:click="moveComputerScience()" style="cursor:pointer"/>
            <ul class="science-ss">
              <li class="sub-subject">
                    <a style="text-align:center"><h5>Computer Science</h5></a>
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
        searchType: 'title',
        searchText: '',
        ddText: 'Title'
      }
    },
    mounted: async function() {
        try{
        const session = await this.$http.get('/rest/user/session');
        this.uid = session.data.user.uid;
      } catch(e) {
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
      },
      moveAllSubject() {
        alert('Search field: all subject...');
      },
      moveScience() {
        alert('Search field: science...');
      },
      moveMath() {
        alert('Search field: math...');
      },
      moveComputerScience() {
        alert('Search field: computer science...');
      },
      search() {
        this.$router.push({
            path: '/question/list?type='+this.searchType+"&search="+this.searchText
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
@import "../../assets/css/common/main.css";
</style>