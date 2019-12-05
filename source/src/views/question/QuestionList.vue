<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <b-row>
          <b-col lg="12">
            <b-table class="mb-0 table-outline" style="text-align: center" responsive="lg" hover 
            :items="questions"
            :fields="fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :current-page="currentPage"
            :per-page="perPage" 
            head-variant="light"
            @row-clicked="viewQuestion">
            </b-table>
            <br>
            <div class="notice-layout">
              <b-pagination style="float: left;" size="md" :per-page="perPage" :total-rows="totalRows" v-model="currentPage">
              </b-pagination>
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "QuestionList",
  data () {
    return {
      auth: false,
      questions: [],
      sortBy: 'id',
      sortDesc: true,
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      fields: [ 
        { key: 'id', label: '번호' },
        { key: 'title', label: '제목' },
        { key: 'createdAt', label: '등록 날짜'},
        { key: 'star', label: '추천'}
      ]
    };

  },
  mounted: async function(){
      this.checkSession();
      const qlist = await this.$http.get('/rest/question/list');
      this.questions = qlist.data.questions;
      this.totalRows = this.questions.length;
  },
  methods: {
    viewQuestion: async function(item, index){
        this.$router.push({'path' : '/question/'+item.id});
    },
    checkSession: async function(){
      try{
        const session = await this.$http.get('/rest/user/session');
        if(session.data.result == false){
          this.$router.push({'path' : '/'});
        }
      } catch(e){
        this.$router.push({'path' : '/'});
      }

    }

  
  }
}
</script>


<style lang="scss">
@import "../../assets/scss/style";
</style>
