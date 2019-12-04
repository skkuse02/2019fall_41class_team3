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
        <tr :key="index" v-for="(value,index) in list" @click="detail()">
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
      rows: 0,
      list : null
    }
  },
  mounted: async function(){
      const qlist = await this.$http.get('/rest/question/list');
      this.list = qlist.data;
      this.rows = qlist.data.length;
  },
  methods: {

  
  }
}
</script>


<style>

</style>
