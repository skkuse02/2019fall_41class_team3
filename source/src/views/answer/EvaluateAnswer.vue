<template>
    <div class="evaluateForm" style="margin-top:30px">
        <form class="form-horizontal" id="evalInfo" role="form" @submit.prevent>
            <div class="eaStarGroup center-block">
                <h5><p text-align: center>How helpful was this answer?</p></h5>
                <div class="star">
                    <star-rating :border-width="2" v-model="starValue"></star-rating>
                </div>
            </div>
            <br>
            <div class="eaFormGroup center-block">
                <h5 style="margin-top:20px">Please provide some feedback for the mentor!</h5>
                <input type="text" id="feedback" v-model="feedback"
                class="form-control" row="5" placeholder="Feedback"/>
            </div>
            <br>
            <div class="eaFormGroup center-block">
                <h5><p>If you liked the answer, you can award the mentor with more credits</p></h5>
                <input type="integer" id="reward" v-model="reward"
                class="form-control" placeholder="Extra reward"/>
                <div id="buttonHolder" style="margin-top:20px">
                    <b-button type="submit" form="evalInfo" variant="success" size="sm"
                    @click.prevent="write()">Submit Evaluation</b-button>
                </div>
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
