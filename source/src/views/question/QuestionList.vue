<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <div style="width:200px;">
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Type to Search"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </div>
        <b-row>
          <b-col lg="12">
            <b-table class="mb-0 table-outline" style="text-align: center" responsive="lg" hover 
            :items="questions"
            :fields="fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :current-page="currentPage"
            :per-page="perPage" 
            :filter="filter"
            :filterIncludedFields="filterOn"
            head-variant="light"
            @row-clicked="viewQuestion"
            @filtered="onFiltered">
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
      filter: null,
      filterOn: ['title'],
      fields: [ 
        { key: 'id', label: '번호', sortable: true},
        { key: 'title', label: '제목', sortable: true },
        { key: 'uid', label: '등록자', sortable: true},
        { key: 'createdAt', label: '등록 날짜', sortable: true},
        { key: 'star', label: '추천', sortable: true}
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

    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>


<style lang="scss">
@import "../../assets/scss/style";
</style>
