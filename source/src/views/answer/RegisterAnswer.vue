<template>
    <div class="answerForm" style="margin:100px 40px 40px 40px">
        <h2><p>RegisterAnswer</p></h2>
        <form class="form-horizontal" role="form" @submit.prevent="write()">
            <div class="form-group">
                <textarea id="content" v-model="content" class="form-control"
                style="width: 100%" placeholder="답변 내용" rows="20"/>
            </div>
            <!-- Pressing register button will send form's info to server -->
            <div id="buttonHolder" style="margin:10px">
                <b-button type="submit" variant="success" size="sm">답변 등록하기</b-button>
            </div>
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
        }
    },
    created: async function () {
        if (!this.$session.exists()){
            alert('접근 권한이 없습니다!\n' + '먼저 로그인해 주세요!')
            this.$router.push({
                path: '/login'
            });
        }
    },
    methods: {
        async write () {
            try{
                var content = this.content;
                const res = await this.$http.post("/rest/answer/text/" + this.$route.params.qid, { content });
                if (res.data.result == true) {
                    alert('답변이 등록되었습니다!');
                    this.$router.push({
                        path: '/'
                    });
                }        
            } catch(err) {
                alert(err.toString() + '\n잠시 후 다시 시도해주세요!');
            }
        },
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/common/registeranswer.css";
</style>