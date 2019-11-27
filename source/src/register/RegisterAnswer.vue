<template>
    <div class="answerForm" style="margin:100px 40px 40px 40px">
        <h2><p>RegisterAnswer</p></h2>
        <form class="form-horizontal" role="form" @submit.prevent="write()">
            <div class="form-group">
                <b-form-textarea v-model="content" placeholder="답변 내용" rows="10" no-resize/>
            </div>
            <!-- Pressing register button will send form's info to server -->
            <div id="buttonholder" style="margin:10px">
                <b-button type="submit" variant="success" size="sm">등록하기</b-button>
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
            qid: '',
            content: '',
        }
    },
    created: async function () {
        if (!this.$session.exists()){
            alert('접근 권한이 없습니다!\n' + '먼저 로그인해 주세요!')
            this.$router.push({
                path: '/'
            });
        }
    },
    methods: {
        async write () {
            try{
                const content = this.content
                const res = await this.$http.post("http://localhost:3000/rest/answer:/qid", {content})
                if (res.data.result == true) {
                    alert('답변이 등록되었습니다!')
                    this.$router.push({
                        path: '/'
                    });
                    // 추후에 QuestionList 페이지로 리디렉션하게 수정
                }
            } catch(err) {
                alert(err.toString() + '\n잠시 후 다시 시도해주세요!')
            }
        }
    }
}
</script>

<style scoped>
    h2 {
        font-weight: normal;
    }
    a {
        color: #42b983;
    }
    #buttonHolder {
        text-align: center;
        align-items: center;
        justify-content: flex-end;
    }
</style>