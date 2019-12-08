<template>
    <div class="answerForm" style="margin:20px 40px 40px 40px">
        <form class="qForm">
            <div class="qFormGroup center-block">
                <label for="questionTitle"><h5> Question Title </h5></label><br>
                <input type="text" id="qTitle" class="form-control"
                :value="this.qTitle" readonly="true"/>
            </div>
            <div class="qFormGroup center-block">
                <label for="questionContent"><h5> Question Content </h5></label><br>
                <input type="text" id="qContent" class="form-control"
                :value="this.qContent" readonly="true"/>
            </div>
        </form>
        <form class="form-horizontal" role="form" @submit.prevent="write()">
            <div class="aFormGroup center-block">
                <label for="answerContent"><h5> My Answer </h5></label>
                <textarea id="content" v-model="content" class="form-control"
                style="width: 100%" placeholder="Contents of your answer" rows="20"/>
                <div id="buttonHolder" style="margin-top:20px">
                    <b-button type="submit" variant="success" size="sm">Register Answer</b-button>
                </div>
            </div>
            <!-- Pressing register button will send form's info to server -->
        </form>
    </div>
</template>    
<script>
export default {
    name: 'RegisterAnswer',
    components: {

    },
    data () {
        return {
            qid: 0,
            content: '',
            qTitle: '',
            qContent: ''
        }
    },
    created: async function () {
        try{
            const session = await this.$http.get('/rest/user/session');
            this.user = session.data.user;
        } catch(e) {
            this.$router.push({path: '/login'});
        }
        this.qid = this.$route.params.qid;
        const questionInfo = await this.$http.get("/rest/question/" + this.$route.params.qid);
        console.log(questionInfo.data.question);
        this.qTitle = questionInfo.data.question.title;
        this.qContent = questionInfo.data.question.content;
    },
    methods: {
        async write () {
            try{
                var content = this.content;
                const res = await this.$http.post("/rest/answer/text/" + this.$route.params.qid, { content });
                if (res.data.result == true) {
                    alert('Your answer is registered!');
                    this.$router.push({
                        path: '/'
                    });
                }        
            } catch(err) {
                alert(err.toString() + '\nPlease try again in a few seconds!');
            }
        },
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/common/registeranswer.css";
</style>