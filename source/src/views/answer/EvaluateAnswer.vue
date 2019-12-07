<template>
    <div class="evaluateForm" style="margin-top:100px">
        <h2><p style="margin-left:50px; margin-bottom:10px">EvaluateAnswer</p></h2>
        <form class="form-horizontal" id="evalInfo" role="form" @submit.prevent>
            <div class="eaStarGroup center-block">
                <h5><p text-align: center>이 답변이 얼마나 유용했나요?</p></h5>
                <div class="star">
                    <star-rating :border-width="2" v-model="starValue"></star-rating>
                </div>
            </div>
            <div class="eaFormGroup center-block">
                <h5 style="margin-top:20px">멘토에게 피드백을 남겨주세요!</h5>
                <input type="text" id="feedback" v-model="feedback"
                class="form-control" row="5" placeholder="피드백"/>
            </div>
            <div class="eaFormGroup center-block">
                <h5 style="margin-top:20px"><p>답변이 정말로 유용했다면,</p></h5>
                <h5><p>멘토에게 추가로 크레딧을 수여할 수 있습니다!</p></h5>
                <input type="integer" id="reward" v-model="reward"
                class="form-control" placeholder="추가 보상"/>
            </div>
        </form>
        <div id="buttonHolder" style="margin:10px">
            <b-button type="submit" form="evalInfo" variant="success" size="sm"
            @click.prevent="write()">평가 등록하기</b-button>
        </div>
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
    },
    methods: {
        async write () {
            try{
                var star = Number(this.starValue);
                var feedback = this.feedback;
                var reward = Number(this.reward);
                console.log(star);
                console.log(feedback);
                console.log(reward);
                if ((reward % 100) != 0) {
                    alert('수여할 크레딧 : ' + reward + '\n'
                        + 'Reward는 100의 배수여야 합니다!');
                }
                else{
                    const res = await this.$http.post("/rest/answer/evaluate/" + this.$route.params.qid, { star, feedback, reward });
                    if (res.data.result == true) {
                        alert('평가가 등록되었습니다!');
                        this.$router.push({
                            path: '/'
                        });
                    }       
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
