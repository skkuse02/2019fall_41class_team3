<template>
  <div class = "questionlist">
    <h1>Question List</h1>
    <question-list : list-array="pageArray" />
  </div>
  <div class="questiontable">
    <table>
      <tr>
        <th>No</th>
        <th>Title</th>
        <th>Uid</th>
        <th>Tag</th>
      </tr>
      <tr v-for="q in questionData" :key="q.no">
        <td>{{q.no}}</td>
        <td>{{q.title}}</td>
        <td>{{q.uid}}</td>
        <td>{{q.tag}}</td>
      </tr>
      <!-- v-for 사용 -->
    </table>
    <div class="btn">
      <button type="button" disabled="pageNum ====0" @click="prevPage" class ="page-btn">이전</button>
      <span class="page-count">{{pageNum+1}} / {{pageCount}} 페이지</span>
      <button type="button" disabled="pageNum >= pageCount-1" @click="nextPage" class ="page-btn">다음</button>
    </div>
  </div>
</template>



<script>
import QuestionList from './QuestionList'

export default {
  name: "QuestionList",
  components: {
    QuestionList
  },
  data () {
    return {
      pageArray: [],
      pageNum: 0
    }
  },
  props:{
    listArray:{
      type:Array,
      required:true
    },
    pageSize: {
      type:Number,
      required:false,
      default:10
    }
  },
  created () {
    this.$http.get("http://localhost:3000/rest/questionlist",this.pageArray);
    // fill in url
    if (res.status == 200){
      console.log(response);
    } else if(error){
      console.log(error);
    }
  },
  methods: {
    nextPage(){
      this.pageNum +=1;
    },
    prevPage(){
      this.pageNum -=1;
    }
  },
  computed:{
    pageCount (){
      let listLeng = this.listArray.length,
        listSize = this.pageSize,
        page = Math.floor(listLeng/listSize);
      if (listLeng%listSize>0)page +=1;
      return page;
    },
    paginatedData () {
      const start = this.pageNum*this.pageSize,
        end = start+this.pageSize;
      return this.listArray.slice(start,end);
    }
  }
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}
table th {
  font-size: 1.2rem;
}
table tr {
  height: 2rem;
  text-align: center;
  border-bottom: 1px solid #505050;
}
table tr:first-of-type {
  border-top: 2px solid #404040;
}
table tr td {
  padding: 1rem 0;
  font-size: 1.1rem;
}
.btn {
  margin-top: 1.5rem;
  text-align: center;
}
.btn .page-btn {
  width: 5rem;
  height: 2rem;
  letter-spacing: 0.5px;
}
.btn .page-count {
  padding: 0 1rem;
}
</style>
