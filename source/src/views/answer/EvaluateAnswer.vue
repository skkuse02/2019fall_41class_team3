<template>
    <div class="evaluateForm" style="margin:100px 40px 40px 40px">
        <h2><p>EvaluateAnswer</p></h2>
        <div>
            <b-button v-b-modal.modal-1>Launch demo modal</b-button>

            <b-modal id="modal-1" title="BootstrapVue">
                <p class="my-4">Hello from modal!</p>
            </b-modal>
        </div>
        <!-- <div class="answerContent">
            <label for="answerContent"> Answer Content </label><br>
            {{ aContent }}
            </div> 
        <b-button v-b-modal.modal-prevent-closing>Open Modal</b-button>
        <div class="mt-3">
            <b-modal id="modal-prevent-closing" ref="modal" title="Submit Your Feedback"
            @show="resetModal" @hidden="resetModal" @ok="handleOk">
                <form ref="form" @submit.stop.prevent="handleSubmit">
                    <b-form-group :state="feedbackState" label="feedback"
                    label-for="feedback-input" invalid-feedback="Feedback is required">
                        <b-form-input id="feedback-input" v-model="feedback"
                            :state="feedbackState" required></b-form-input>
                    </b-form-group>
                </form>
            </b-modal>
        </div> -->
    </div>
</template>

<script>
import StarRating from 'vue-star-rating'

export default {
    name: 'EvaluaterAnswer',
    components: {
        StarRating
    },
    data () {
        return {
            qid: 0,
            aContent: '',
            starValue: 0,
            feedback: '',
            feedbackState: '',
            reward: '',
        }
    },
    created: async function () {
        if (!this.$session.exists()){
            alert('접근 권한이 없습니다!\n' + '먼저 로그인해 주세요!')
            this.$router.push({
                path: '/login'
            });
        }
        this.qid = this.$route.params.qid;
        // const answerInfo = await this.$http.get("/rest/answer/text/" + this.$route.params.qid);
        // console.log(answerInfo.data.question);
        // this.aContent = answerInfo.data.question.content;
    },
    methods: {
        async write () {
            try{
                var starValue = this.starValue;
                var feedback = this.feedback;
                var reward = this.reward;
                const res = await this.$http.post("/rest/answer/evaluate/" + this.$route.params.qid, { starValue, feedback, reward });
                if (res.data.result == true) {
                    alert('평가가 등록되었습니다!');
                    this.$router.push({
                        path: '/'
                    });
                }        
            } catch(err) {
                alert(err.toString() + '\n잠시 후 다시 시도해주세요!');
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/common/evaluateanswer.css";
</style>
