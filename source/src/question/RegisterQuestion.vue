<template>
    <div class="questionForm" style="margin:100px 40px 40px 40px">
        <h2><p>RegisterQuestion</p></h2>
        <form class="form-horizontal" role="form" @submit.prevent="write()">
            <div class="form-group">
                <b-form-input type="text" v-model="title" class="form-control" placeholder="제목"/>
            </div>
            <div class="form-group">
                <b-form-textarea v-model="content" placeholder="내용" rows="10" no-resize/>
            </div>
            <div class="form-group">
                <b-form-input type="integer" id="reward" v-model="reward" placeholder="보상"/>
                <label for="reward" class="control-label">
                    주의 : 입력하신 숫자에 100을 곱한 만큼이 reward로 할당됩니다. ex) 1 -> 100 credit
                </label>
            </div>
            <div class="form-group">
                <b-form-select v-model="type" class="mb-3">
                    <option disabled value="">원하는 답변의 방식을 선택해주세요.</option>
                    <option> Normal Text </option>
                    <option> Live Chatting </option>
                    <option> Screen Sharing </option>
                </b-form-select>
                <span> &nbsp; &nbsp; Selected: {{type}}</span>
            </div>
            <div class="form-group">
                <b-form-input type="text" v-model="field" class="form-control" placeholder="분야"/>
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
    name: 'RegisterQuestion',
    components: {

    },
    data () {
        return {
            title: '',
            content: '',
            reward: '',
            type: '',
            tag: '',
        }
    },
    created: async function () {
        if (!this.$session.exists()){
            alert('접근 권한이 없습니다!\n' + '먼저 로그인해 주세요!');
            this.$router.push({
                path: '/login'
            });
        }
    },
    methods: {
        async write () {
            try{
                const title = this.title;
                const content = this.content;
                const reward = this.reward * 100;
                const type = this.type;
                const tag = this.tag;
                const creditInfo = await this.$http.get("/rest/user/credit");
                const betCredit = creditInfo.data.credit;
                if (betCredit < reward) {
                    alert('소유한 크레딧 : ' + betCredit + '\n'
                        + '수여할 크레딧 : ' + reward + '\n'
                        + '보상 크레딧의 양을 확인해 주세요!');
                }
                else {
                    const res = await this.$http.post("/rest/question",
                            { title, content, reward, type, tag });
                    if (res.data.result == true) {
                        alert('질문이 등록되었습니다!');
                        this.$router.push({
                            path: '/'
                        });
                        // 추후에 MyQuestion 페이지로 리디렉션하게 수정
                    }
                }        
            } catch(err) {
                alert(err.toString() + '\n잠시 후 다시 시도해주세요!');
            }
        },
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/common/login.css";
</style>