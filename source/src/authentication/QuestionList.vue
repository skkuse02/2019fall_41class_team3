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
  name: "QuestionListBased",
  data () {
    return {
      perPage: 5,
      currentPage: 1,
      question:null
    }
  },
  created: async function() {
    if(!this.$session.exists()) {
      this.$router.push ({
        path: '/'
      });
    }
    else {
      this.question = this.$session.get('question');
    }
  },
  methods: {
    computed: {
      rows() {
        return this.items.length
      }
    },
    detail() {
      this.$router.push({
        path: '/qna'
      })
    }
  }
}
</script>


<style>

</style>
