<template>
    <div class="questionForm" style="margin:100px 40px 40px 40px">
        <h2><p>RegisterQuestion</p></h2>
        <form class="form-horizontal" role="form" @submit.prevent="write()">
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
                <b-form-select id="type" v-model="type" class="mb-3">
                    <option disabled value="">원하는 답변의 방식을 선택해주세요.</option>
                    <option> Normal Text </option>
                    <option> Live Chatting </option>
                    <option> Screen Sharing </option>
                </b-form-select>
                <span> &nbsp; &nbsp; Selected: {{type}}</span>
            </div>
            <div class="form-group">
                <b-form-input type="text" id="tag" v-model="tag" class="form-control" placeholder="분야"/>
            </div>
            <div class="form-vif" v-if="answerType">
                <div id="timeStart">
                    <p>Time (start) : {{ dayStart }} , {{ timeStart }}</p>
                    <b-form-radio-group id="dayStart" v-model="dayStart" :options="option" 
                    buttons button-variant="success"></b-form-radio-group>
                    <timeselector displayFormat=" [From] HH : mm" :id="timeStart" :interval="{h:1, m:5}"
                    :displaySeconds="false" style="width:434px" :placeholder="'Select available time (start)'"
                    returnFormat="HH:mm" @formatedTime="tStart">
                        <template slot="hours">
                            <span>Hours</span>
                        </template>
                        <template slot="minutes">
                            <span>Minutes</span>
                        </template>
                    </timeselector>
                </div>
                <div id="timeEnd">
                    <p>Time (end) : {{ dayEnd }} , {{ timeEnd }}</p>
                    <b-form-radio-group id="dayEnd" v-model="dayEnd" :options="option" 
                    buttons button-variant="success"></b-form-radio-group>
                    <timeselector displayFormat=" [To]     HH : mm" :id="timeEnd" :interval="{h:1, m:5}"
                    :displaySeconds="false" style="width:434px" :placeholder="'Select available time (end)'"
                    returnFormat="HH:mm" @formatedTime="tEnd">
                        <template slot="hours">
                            <span>Hours</span>
                        </template>
                        <template slot="minutes">
                            <span>Minutes</span>
                        </template>
                    </timeselector>
                </div>
                <div>
                    <b-button variant="success" size="sm" v-on:click="addTime(timeFormat)">시간대 추가하기</b-button>
                </div>
                <div id="timeChip">
                    <ul>
                         <li class="list-group-item" v-for="time in times" v-bind:key="time"> {{ time.timeFormat }}</li>
                    </ul>
                </div>
            </div>
            <div style="clear: both"></div>
            <!-- Pressing register button will send form's info to server -->
            <div id="buttonHolder" style="margin:10px">
                <b-button type="submit" variant="success" size="sm">등록하기</b-button>
            </div>
        </form>
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
            type: '',
            tag: '',
            times: [],
            timeFormat: '',
            timeStart: '',
            timeEnd: '',
            dayStart: '',
            dayEnd: '',
            option: [
                { text: 'Mon', value: 'Monday' }, // val = 0
                { text: 'Tue', value: 'Tuesday' }, // val = 288
                { text: 'Wed', value: 'Wednesday' }, // val = 576
                { text: 'Thu', value: 'Thursday' }, // val = 864
                { text: 'Fri', value: 'Friday' }, // val = 1152
                { text: 'Sat', value: 'Saturday' }, // val = 1440
                { text: 'Sun', value: 'Sunday' } // val = 1728                
            ]
        }
    },
    computed: {
        answerType: function () {
            if (this.type == 'Live Chatting' ||
            this.type == 'Screen Sharing') {
                return true;
            }
            else return false;
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
                    if (this.formCheck() == true){
                        const res = await this.$http.post("/rest/question", { title, content, reward, type, tag });
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
            else if(this.tag == '') {
                alert("질문의 분야를 입력해 주세요.");
                tag.focus();
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
            this.timeFormat = this.dayStart + ' ' + this.timeStart + ' ~ ' + this.dayEnd + ' ' + this.timeEnd; 
            console.log(this.timeFormat);
            this.times.push ({timeFormat:this.timeFormat})
            this.time = null;
            this.timeFormat = null;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/common/registerquestion.css";
</style>