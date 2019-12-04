<template>
    <div class="questionForm" style="margin:100px 40px 40px 40px">
        <h2><p>RegisterQuestion</p></h2>
        <form class="form-horizontal" id="formInfo" @submit.prevent>
            <div class="form-group">
                <b-form-input type="text" id="title" v-model="title" class="form-control" placeholder="제목"/>
            </div>
            <div class="form-group">
                <b-form-textarea id="content" v-model="content" style="width: 100%" placeholder="내용" rows="10" no-resize/>
            </div>
            <div class="form-group">
                <b-form-input type="integer" id="reward" v-model="reward" placeholder="보상"/>
                <label for="reward" class="control-label">
                    주의 : 입력하신 숫자에 100을 곱한 만큼이 reward로 할당됩니다. ex) 1 -> 100 credit
                </label>
            </div>
            <div class="form-group">
                <b-form-select id="type" v-model="selected" class="mb-3">
                    <option v-for="option in types" v-bind:key="option.type">
                        {{ option.type }}
                    </option>
                </b-form-select>
                <span> &nbsp; &nbsp; Selected : {{ this.selected + ' (Minimum Reward : '  + minPoint + ')'}} </span>
            </div>
            <div class="form-group">
                <b-form-input type="text" id="field" v-model="field" class="form-control" placeholder="분야"/>
            </div>
            <div class="form-vif" v-if="answerType">
                <div>
                    <p>Selected Time Range : {{ selectedDay }} / {{ timeStart }} ~ {{ timeEnd }}</p>
                    <div>
                        <b-button-group size="lg">
                            <b-button v-for="(day, idx) in days" :key="idx"
                            :pressed.sync="day.state" variant="success">
                                {{ day.text }}
                            </b-button>
                        </b-button-group>
                    </div>
                    <div style="clear: both"></div>
                    <timeselector displayFormat=" [From] HH : mm" :id="timeStart" :interval="{h:1, m:5}"
                    :displaySeconds="false" style="width:208px; float: left" :placeholder="'[From] HH:MM'"
                    returnFormat="HH:mm" @formatedTime="tStart">
                        <template slot="hours">
                            <span>Hours</span>
                        </template>
                        <template slot="minutes">
                            <span>Minutes</span>
                        </template>
                    </timeselector>
                    <timeselector displayFormat=" [To] HH : mm" :id="timeEnd" :interval="{h:1, m:5}"
                    :displaySeconds="false" style="width:208px; float: left" :placeholder="'[To] HH:MM'"
                    returnFormat="HH:mm" @formatedTime="tEnd">
                        <template slot="hours">
                            <span>Hours</span>
                        </template>
                        <template slot="minutes">
                            <span>Minutes</span>
                        </template>
                    </timeselector>
                    <img src="../../assets/datatables/images/add_circle.png" v-on:click="addTime(timeFormat)" style="cursor:pointer">
                </div>
                <div style="clear: both"></div>
                <div class="timeChip">
                    <vs-chip v-on:click="removeTime(time)" v-for="time in available_times"
                    v-bind:key="time" closable style="width:40%"> {{ time }} </vs-chip>
                </div>
            </div>
            <div style="clear: both"></div>
            <!-- Pressing register button will send form's info to server -->
        </form>
        <div id="buttonHolder" style="margin:10px">
            <b-button type="submit" form="formInfo" variant="success" size="sm"
            @click.prevent="write()">등록하기</b-button>
        </div>
    </div>
</template>
    
<script>
import Timeselector from 'vue-timeselector';

export default {
    name: 'RegisterQuestion',
    components: {
        Timeselector
    },
    data () {
        return {
            title: '',
            content: '',
            reward: '',
            selected: '',
            types: [],
            field: '',
            available_times: [],
            timeFormat: '',
            timeStart: '',
            timeEnd: '',
            selectedDays: [],
            days: [
                { text: 'Mon', state: false, value: 'Monday' }, // val = 0
                { text: 'Tue', state: false, value: 'Tuesday' }, // val = 288
                { text: 'Wed', state: false, value: 'Wednesday' }, // val = 576
                { text: 'Thu', state: false, value: 'Thursday' }, // val = 864
                { text: 'Fri', state: false, value: 'Friday' }, // val = 1152
                { text: 'Sat', state: false, value: 'Saturday' }, // val = 1440
                { text: 'Sun', state: false, value: 'Sunday' } // val = 1728                
            ]
        }
    },
    computed: {
        answerType: function () {
            if (this.selected == 'Live Chatting' || this.selected == 'Screen Sharing') {
                return true;
            }
            else return false;
        },
        selectedDay: function () {
            this.selectedDays = [];
            for (var i = 0; i < 7; i++){
                if (this.days[i].state == true){
                    this.selectedDays.push(this.days[i].value);
                }
            }
            return this.selectedDays;
        },
        minPoint: function () {
            for (var i = 0; i < 3; i++){
                if (this.types[i].type == this.selected){
                    return this.types[i].minimum_point;
                }
            }
        }
    },
    created: async function () {
        if (!this.$session.exists()){
            alert('접근 권한이 없습니다!\n' + '먼저 로그인해 주세요!');
            this.$router.push({
                path: '/login'
            });
        }
        else {
            const typeInfo = await this.$http.get("/rest/response_type");
            this.types = typeInfo.data.response_types;
            this.selected = this.types[2].type;            
        }
    },
    methods: {
        async write () {
            try{
                const title = this.title;
                const content = this.content;
                const reward = this.reward * 100;
                const type = this.type;
                const field = this.field;
                const available_times = this.available_times;
                const creditInfo = await this.$http.get("/rest/user/credit");
                const betCredit = creditInfo.data.credit;
                

                if ((betCredit < reward) || (betCredit < this.minPoint)) {
                    alert('소유한 크레딧 : ' + betCredit + '\n'
                        + '수여할 크레딧 : ' + reward + '\n'
                        + '최소 크레딧 : ' +  this.minPoint + '\n'
                        + '보상 크레딧의 양을 확인해 주세요!');
                }
                else {
                    if (this.formCheck() == true){
                        const res = await this.$http.post("/rest/question", { title, content, reward, type, field, available_times});
                        if (res.data.result == true) {
                            alert('질문이 등록되었습니다!');
                            this.$router.push({
                                path: '/'
                            });
                            // 추후에 MyQuestion 페이지로 리디렉션하게 수정
                        }
                    }
                }        
            } catch(err) {
                alert(err.toString() + '\n잠시 후 다시 시도해주세요!');
            }
        },
        formCheck () {
            if(this.title == '') {
                alert("제목을 입력해 주세요.");
                title.focus();
                return false;
            }
            else if(this.content == '') {
                alert("내용을 입력해 주세요.");
                content.focus();
                return false;
            }
            else if(this.reward == '') {
                alert("보상을 입력해 주세요.");
                reward.focus();
                return false;
            }
            else if(this.type == '') {
                alert("원하는 답변 방식을 선택해 주세요.");
                type.focus();
                return false;
            }
            else if(this.field == '') {
                alert("질문의 분야를 입력해 주세요.");
                field.focus();
                return false;
            }
            else return true;
        },
        tStart (e) {
            this.timeStart = e;
        },
        tEnd (e) {
            this.timeEnd = e;
        },
        addTime (timeFormat) {
            if (this.timeCheck() == false) {
                alert('요일과 시간을 다시 한 번 확인해 주세요!');
            }
            else {
                this.timeFormat = this.selectedDays + ' / ' + this.timeStart + ' ~ '  + this.timeEnd; 
                console.log(this.timeFormat);
                this.available_times.push(this.timeFormat)
                this.time = null;
                this.timeFormat = null;
            }
        },
        removeTime (time) {
            this.available_times.splice(this.available_times.indexOf(time), 1)
        },
        timeCheck () {
            if ((this.selectedDays.length == 0) || (this.timeStart == '') || (this.timeEnd == '')){
                return false;
            }
            else if (this.timeStart > this.timeEnd) {
                return false;
            }
            else return true;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/common/registerquestion.css";
</style>