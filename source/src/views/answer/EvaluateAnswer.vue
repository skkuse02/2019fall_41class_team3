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
                <h5><p>If you liked the answer,
                    you can give more credits to mentor!</p></h5>
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
        try{
            const session = await this.$http.get('/rest/user/session');
            this.user = session.data.user;
            this.qid = this.$route.params.qid;
        } catch(e) {
            this.$router.push({path: '/login'});
        }
    
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
                    alert('Credit (Reward)  : ' + reward + '\n'
                        + 'Reward must be multiple of 100!');
                }
                else{
                    const res = await this.$http.post("/rest/answer/evaluate/" + this.$route.params.qid, { star, feedback, reward });
                    if (res.data.result == true) {
                        alert('Your evaluation is registered!');
                        this.$router.push({
                            path: '/'
                        });
                    }       
                } 
            } catch(err) {
                alert(err.toString() + '\nPlease try again in a few seconds!');
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/common/evaluateanswer.css";
</style>
