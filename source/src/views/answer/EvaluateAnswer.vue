<template>
    <div class="evaluateForm" style="margin:100px 40px 40px 40px">
        <h2><p>EvaluateAnswer</p></h2>
        <div class="answerContent">
            <label for="answerContent"> Answer Content </label><br>
            {{ aContent }}
        </div>
        <form class="form-horizontal" role="form" @submit.prevent="write()">
            <div style="margin-top: 20px">
                <h5><p>이 답변이 얼마나 유용했나요?</p></h5>
                <star-rating :border-width="3" v-model="starValue"></star-rating>
            </div>
            <div style="margin-top: 20px">
                <h5>멘토에게 피드백을 남겨주세요!</h5>
                <input type="text" id="feedback" v-model="feedback" class="form-control" placeholder="피드백"/>
            </div>
            <div style="margin-top: 20px">
                <h5>답변이 정말로 유용했다면, 멘토에게 추가로 크레딧을 줄 수 있습니다!</h5>
                <input type="integer" id="reward" v-model="reward" class="form-control" placeholder="추가 보상"/>
            </div>
            <div id="buttonHolder" style="margin:10px">
                <b-button type="submit" variant="success" size="sm">평가 등록하기</b-button>
            </div>
        </form>
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
        const answerInfo = await this.$http.get("/rest/answer/text/" + this.$route.params.qid);
        console.log(answerInfo.data.answer);
        this.aContent = answerInfo.data.answer.content;
    },
    methods: {
        async write () {
            try{
                var star = Number(this.starValue);
                var feedback = this.feedback;
                var reward = this.reward;
                console.log(star);
                console.log(feedback);
                console.log(reward);
                const res = await this.$http.post("/rest/answer/evaluate/" + this.$route.params.qid, { star, feedback, reward });
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
