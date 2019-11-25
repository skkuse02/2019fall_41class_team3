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
    methods: {
        checkCredit () {

        },
        async write () {
            try{
                const title = this.title
                const content = this.content
                const reward = this.reward * 100
                if (checkCredit() == FALSE){
                    alert('크레딧 필드를 다시 한 번 확인해주세요!')
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