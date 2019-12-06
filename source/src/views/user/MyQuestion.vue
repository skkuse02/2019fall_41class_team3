<template>
    <div>
        <div class="container">
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
                        <b-pagination style="float: left;" size="md" :per-page="questionTable.perPage" :total-rows="questionTable.totalRows" v-model="questionTable.currentPage">
                        </b-pagination>
                        </div>
                    </b-col>
                    </b-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MyQuestion",
    data() {
        return {
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
                perPage: 10,
                totalRows: 0,
                filter: null,
                filterOn: ['title'],
                filterText: 'Title'
            }
        };
    },
    mounted: async function(){
        // TO-DO: Re-routing needed
        const session = await this.$http.get('/rest/user/session');
        if(session.data.result == true){
            var isMentor = (session.data.user.type == "Mentor");
            if(isMentor) {
                const res = await this.$http.get('/rest/user/myAnswers');
                this.questionTable.questions = res.data.questions;
            }
            else {
                const res = await this.$http.get('/rest/user/myQuestions');
                this.questionTable.questions = res.data.questions;
            }
        }
    },
    methods: {
        viewQuestion: async function(item, index){
            this.$router.push({'path' : '/question/'+item.id});
        },
        onFiltered(filteredItems) {
            this.questionTable.totalRows = filteredItems.length;
            this.questionTable.currentPage = 1;
        }
    }
}
</script>