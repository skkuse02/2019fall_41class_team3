<template>
    <div class="questionForm" style="margin:100px 40px 40px 40px">
        <h2><p>RegisterQuestion</p></h2>
        <form class="form-horizontal" id="formInfo" @submit.prevent>
            <div class="form-group">
                <input type="text" id="title" v-model="title" class="form-control" placeholder="제목"/>
            </div>
            <div class="form-group">
                <textarea id="content" v-model="content" class="form-control" style="width: 100%" placeholder="내용" rows="10"/>
            </div>
            <div class="form-group">
                <input type="integer" id="reward" v-model="reward" class="form-control" placeholder="보상"/>
            </div>
            <div class="form-group">
                <select id="selectType" v-model="typeIndex" class="form-control mb-3">
                    <option v-for="(option,index) in types" v-bind:key="index" v-bind:value="index">
                        {{ option.type }}
                    </option>
                </select>
                <span> Selected Answer Type : {{ this.types[typeIndex].type +
                    ' (Minimum Reward : '  + this.types[typeIndex].minimum_point + ')'}} </span>
            </div>
            <div class="form-group">
                <select id="selectField" v-model="fieldIndex" class="form-control mb-3">
                    <option v-for="(option,index) in flist" v-bind:key="index" v-bind:value="index">
                        {{ option.name }}
                    </option>
                </select>
                <span> Selected Question Field : {{ this.flist[fieldIndex].name }} </span>
                <!-- <input type="text" id="fields" v-model="fields" class="form-control" placeholder="분야"/> -->
            </div>
            <div class="form-vif" v-if="!answerType">
                <p text-align: center>Selected Time Range : {{ selectedDay }} / {{ timeStart }} ~ {{ timeEnd }}</p>
                <div>
                    <b-button-group size="lg" style="margin-bottom: 10px">
                        <b-button v-for="(day, idx) in days" :key="idx"
                        :pressed.sync="day.state" variant="success">
                            {{ day.text }}
                        </b-button>
                    </b-button-group>
                </div>
                <div style="clear: both; margin-top: 10px"></div>
                <timeselector class="form-control" displayFormat=" [From] HH : mm" :id="timeStart" :interval="{h:1, m:5}"
                :displaySeconds="false" style="width:208px; float: left" :placeholder="'[From] HH:MM'"
                returnFormat="HH:mm" @formatedTime="tStart">
                    <template slot="hours">
                        <span>Hours</span>
                    </template>
                    <template slot="minutes">
                        <span>Minutes</span>
                    </template>
                </timeselector>
                <timeselector class="form-control" displayFormat=" [To] HH : mm" :id="timeEnd" :interval="{h:1, m:5}"
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
                <div style="clear: both; margin-top: 10px"></div>
                <div class="timeChip">
                    <vs-chip v-on:click="removeTime(time)" v-for="time in available_times"
                    v-bind:key="time" style="width:40%; float:left" closable> {{ time }} </vs-chip>
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
            fields: '',
            fieldIndex: 0,
            flist: [],
            typeIndex: 2,
            types: [],
            tag: '',
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
            if (this.typeIndex == 0) {
                return false;
            }
            else if (this.typeIndex == 1) {
                return false;
            }
            else return true;
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
    },
    created: async function () {
        if (!this.$session.exists()){
            alert('접근 권한이 없습니다!\n' + '먼저 로그인해 주세요!');
            this.$router.push({
                path: '/login'
            });
        }
    },
    mounted: async function () {
        const typeInfo = await this.$http.get("/rest/response_type");
        this.types = typeInfo.data.response_types;
        const fieldInfo = await this.$http.get("/rest/field/list");
        this.flist = fieldInfo.data;
        console.log(this.types);
        console.log(this.types[0].type);
        console.log(this.types[0].minimum_point);
        console.log(this.flist[0].name);
        console.log(this.flist[1].name);
    },
    methods: {
        async write () {
            try{
                var title = this.title;
                var content = this.content;
                var reward = this.reward;
                var tIdx = this.typeIndex;
                var type = this.types[tIdx].type;
                var fIdx = this.fieldIndex;
                var fields = [];
                fields.push(this.flist[fIdx].name);
                var available_times = this.available_times;
                var creditInfo = await this.$http.get("/rest/user/credit");
                var betCredit = creditInfo.data.credit;
                var minPoint = this.types[tIdx].minimum_point;
                console.log(minPoint);
                available_times = this.timeFormatTransform();
                console.log(available_times);
                if ((reward % 100) != 0) {
                    alert('수여할 크레딧 : ' + reward + '\n'
                        + 'Reward는 100의 배수여야 합니다!');
                }
                else if (betCredit < reward) {
                    alert('소유한 크레딧 : ' + betCredit + '\n'
                        + '수여할 크레딧 : ' + reward + '\n'
                        + '최소 크레딧 : ' +  minPoint + '\n'
                        + '보상 크레딧의 양을 확인해 주세요!');
                }
                else if (reward < minPoint) {
                    alert('수여할 크레딧 : ' + reward + '\n'
                        + '최소 크레딧 : ' +  minPoint + '\n'
                        + '보상 크레딧의 양을 확인해 주세요!');
                }
                else {
                    if (this.formCheck() == true){
                        const res = await this.$http.post("/rest/question", { title, content, reward, type, fields, available_times});
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
            else if(this.type == '') {
                alert("원하는 답변 방식을 선택해 주세요.");
                type.focus();
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
                this.timeFormat = this.selectedDays + '/' + this.timeStart + '~'  + this.timeEnd; 
                console.log(this.timeFormat);
                this.available_times.push(this.timeFormat)
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
            else if (this.timeStart >= this.timeEnd) {
                return false;
            }
            else return true;
        },
        timeFormatTransform () {
            const timeArr = this.available_times;
            var spArr = [];
            var daArr = [];
            var tiArr = [];
            var stime = 0;
            var etime = 0;
            var resultArr = [];
            for (var i = 0; i < timeArr.length; i++) {
                spArr = timeArr[i].split("/");  // s[0] = "days", s[1] = "times"
                daArr = spArr[0].split(",");    // d[0] = "day1", d[2] = "day2", ...
                tiArr = spArr[1].split("~");    // t[0] = "h:m(s)", t[1] = "h:m(e)"
                stime = this.timeToNum(tiArr[0]);
                etime = this.timeToNum(tiArr[1]);
                for (var j = 0; j < daArr.length; j++){
                    daArr[j] = this.dayToNum(daArr[j]);  // d[0] = Num(day1), ...
                    for (var k = stime; k < etime; k++){
                        resultArr.push(daArr[j] + k + 1);
                    }
                }   // Transform daArr's content into number type
                console.log(spArr);
                console.log(daArr);
                console.log(tiArr);
                console.log(stime, etime);
            }
            return resultArr.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
        },
        dayToNum (day) {
            if (day == "Monday") {
                return 0;
            }
            else if (day == "Tuesday") {
                return 288;
            }
            else if (day == "Wednesday") {
                return 576;
            }
            else if (day == "Thursday") {
                return 864;
            }
            else if (day == "Friday") {
                return 1152;
            }
            else if (day == "Saturday") {
                return 1440;
            }
            else if (day == "Sunday") {
                return 1728;
            }
            else return -1;
        },
        timeToNum(time){
            var hmArr = time.split(":");
            hmArr[0] = Number(hmArr[0]);
            hmArr[1] = Number(hmArr[1]);
            return ((hmArr[0] * 12) + (hmArr[1] / 5));
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/common/registerquestion.css";
</style>