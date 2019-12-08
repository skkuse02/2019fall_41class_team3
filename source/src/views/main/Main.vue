<template lang="v-html">
<div>
  <!-- Search bar -->
  <div class="search-field">
    <div class="search-bar-container">
      <form @submit.prevent="search()" style="margin:10px;">
        <h1>Welcome!</h1>
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

  <div style="margin:50px;">
  
    <!-- Fields -->
    <div class="max-width-container" style="width:100%">
      <div class="subject-container" style="height:120px;">
        <div class="arrow left icon-chevron"></div>
        <div class="arrow right icon-chevron"></div>  
        <ul class="subjects text-center" style="transform: translateX(0px);">
          <li class="col-xs-3 text-center">
            <img src="../../assets/datatables/images/list-all.png"
            v-on:click="moveAllSubject()" style="cursor:pointer"/>
            <ul class="science-ss">
              <li class="sub-subject">
                    <a style="text-align:center;margin:10px;"><h5>All Fields</h5></a>
              </li>
            </ul>
          </li>
          <li class="col-xs-3 text-center">
            <img src="../../assets/datatables/images/flask.png"
            v-on:click="moveScience()" style="cursor:pointer"/>
            <ul class="science-ss text-center">
              <li class="sub-subject">
                    <a style="text-align:center;margin:10px;"> <h5>Science</h5></a>
              </li>
            </ul>
          </li>
          <li class="col-xs-3 text-center">
            <img src="../../assets/datatables/images/square-root.png" 
            v-on:click="moveMath()" style="cursor:pointer"/>
            <ul class="science-ss">
              <li class="sub-subject">
                    <a style="text-align:center;margin:10px;" ><h5>Math</h5></a>
              </li>
            </ul>
          </li>
          <li class="col-xs-3 text-center">
            <img src="../../assets/datatables/images/laptop-code.png"
            v-on:click="moveComputerScience()" style="cursor:pointer"/>
            <ul class="science-ss">
              <li class="sub-subject">
                    <a style="text-align:center;margin:10px;"><h5>Computer Science</h5></a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <!-- Cards -->
    <div style="margin-top:50px;">
      <div class="card border-dark mb-3">
        <div class="card-header">What is QAHub?</div>
        <div class="card-body text-dark">
          <p class="card-text">
            QAHub is web-based online flatform that mediates mentee and mentor.<br>
            If you need some answers for certain question<br>
            or you want to share your knowledge, sign up and join us!
          </p>
        </div>
      </div>
      
      <div class="card border-dark mb-3">
        <div class="card-header">For Mentee</div>
        <div class="card-body text-dark">
          <p class="card-text">
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
          </p>
        </div>
      </div>
      
      <div class="card border-dark mb-3">
        <div class="card-header">For Mentor</div>
        <div class="card-body text-dark">
          <p class="card-text">
            <li>Find some questions that you want to answer, based on your interest.</li>
            <li>Check answer option and give your answer in specified method.</li>
            <li>Wait for mentee's evaluation and take your credit!</li>
          </p>
        </div>
      </div>
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
        this.$router.push({
            path: '/question/list'
        });
      },
      moveScience() {
        this.$router.push({
            path: '/question/list?field=Science'
        });
      },
      moveMath() {
        this.$router.push({
            path: '/question/list?field=Math'
        });
      },
      moveComputerScience() {
        this.$router.push({
            path: '/question/list?field=Computer Science'
        });
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