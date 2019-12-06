<template>
  <div class="container">
    <div class="card" v-if="isMentor&&(recomendedTable.totalRows>0)">
      <div class="card-body">
        <b-row>
          <b-col lg="12">
            <b-table class="mb-0 table-outline" style="text-align: center" responsive="lg" hover 
            :items="recomendedTable.questions"
            :fields="recomendedTable.fields"
            :sort-by.sync="recomendedTable.sortBy"
            :sort-desc.sync="recomendedTable.sortDesc"
            :current-page="recomendedTable.currentPage"
            :per-page="recomendedTable.perPage" 
            :filter="recomendedTable.filter"
            :filterIncludedFields="recomendedTable.filterOn"
            head-variant="light"
            @row-clicked="viewQuestion"
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

    <div style="margin:30px;">
      <b-input-group size="lg">
        <div style="float:left;margin-right:30px;font-weight:bold;font-size:20px;line-height:40px;">
          Search
        </div>
        <b-dropdown variant="info" size="lg" :text="questionTable.filterText" style="width:100px;">
          <b-dropdown-item @click="questionTable.filterOn = ['title']; questionTable.filterText='Title'">Title</b-dropdown-item>
          <b-dropdown-item @click="questionTable.filterOn = ['uid']; questionTable.filterText='Author'">Author</b-dropdown-item>
        </b-dropdown>
        <b-form-input
          v-model="questionTable.filter"
          type="search"
          id="filterInput"
          placeholder="Search..."
        ></b-form-input>
        <b-input-group-append>
          <b-button :disabled="!questionTable.filter" @click="questionTable.filter = ''">Clear</b-button>
        </b-input-group-append>
      </b-input-group>
    </div>

    <div class="card">
      <div class="card-body">
        <b-row>
          <b-col lg="12">
            <b-table class="mb-0 table-outline" style="text-align: center" responsive="lg" hover 
            :items="questionTable.questions"
            :fields="questionTable.fields"
            :sort-by.sync="questionTable.sortBy"
            :sort-desc.sync="questionTable.sortDesc"
            :current-page="questionTable.currentPage"
            :per-page="questionTable.perPage" 
            :filter="questionTable.filter"
            :filterIncludedFields="questionTable.filterOn"
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
      isMentor: false,
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
        perPage: 5,
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
        filter: null,
        filterOn: ['title'],
      }
    };

  },
  mounted: async function(){
      this.checkSession();
      const qlist = await this.$http.get('/rest/question/list');
      this.questionTable.questions = qlist.data.questions;
      this.questionTable.totalRows = this.questionTable.questions.length;
      if(isMentor)
      {
        const rlist = await this.$http.get('/rest/question/listByTime');
        this.recomendedTable.questions = rlist.data.questions;
        this.recomendedTable.totalRows = this.recomendedTable.questions.length;
      }
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
        else {
          this.isMentor = (session.data.user.type == "Mentor");
        }
      } catch(e){
        alert(e);
        this.$router.push({'path' : '/'});
      }

    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.questionTable.totalRows = filteredItems.length
      this.questionTable.currentPage = 1
    }
  }
}
</script>


<style lang="scss">
@import "../../assets/scss/style";
</style>
