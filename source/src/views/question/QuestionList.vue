<template>
  <div class="container">
    <h1>Question List</h1>

    <div class="table">
      <b-table
        id="my-table"
        :per-page="perPage"
        :current-page="currentPage"
        small
      >
        <tr>
          <td>Title</td>
          <td>tag</td>
        </tr>
        <tr :key="index"v-for="(value,index) in question" @click="detail()">
          <td>{{index}}. {{value.title}}</td>
          <td>{{value.tag}}</td>
        </tr>
      </b-table>

    </div>

      <p class="mt-3">Current Page: {{ currentPage }}</p>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </div>
  </div>
</template>


<script>
export default {
  name: "QuestionList",
  data () {
    return {
      perPage: 5,
      currentPage: 1,
      title:'',
      tag:''
    }
  },
  methods: {
    submit: async function() {
      const res = await this.$http.get("/rest/questionlist");
      this.title = res.data.questions.title;
      this.tag = res.data.questions.tag;
    },
    computed: {
      rows() {
        return this.items.length
      }
    },
    detail() {
      this.$router.push({
        path: '/questionview'
      })
    }
  }
}
</script>


<style>

</style>
