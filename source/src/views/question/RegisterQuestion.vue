<template>
    <div class="questionForm" style="margin-top:30">
        <form class="form-horizontal" id="formInfo" @submit.prevent>
            <div class="qFormGroup center-block">
                <input type="text" id="title" v-model="title" class="form-control" placeholder="Title"/>
            </div>
            <div class="qFormGroup center-block">
                <textarea id="content" v-model="content" class="form-control" style="width: 100%" placeholder="Content" rows="10"/>
            </div>
            <div class="qFormGroup center-block">
                <input type="integer" id="reward" v-model="reward" class="form-control"
                :placeholder='"Reward (Minimum reward : " + this.types[typeIndex].minimum_point + " )"'/>
            </div>
            <div class="qFormGroup center-block">
                <select id="selectType" v-model="typeIndex" class="form-control mb-3">
                    <option v-for="(option,index) in types" v-bind:key="index" v-bind:value="index">
                        {{ option.type }}
                    </option>
                </select>
                <!-- <span> Selected Answer Type : {{ this.types[typeIndex].type +
                    ' (Minimum Reward : '  + this.types[typeIndex].minimum_point + ')'}} </span> -->
            </div>
            <div class="qFormGroup center-block">
                <select id="selectField" v-model="fieldIndex" class="form-control mb-3">
                    <option v-for="(option,index) in flist" v-bind:key="index" v-bind:value="index">
                        {{ option.name }}
                    </option>
                </select>
                <!-- <span> Selected Question Field : {{ this.flist[fieldIndex].name }} </span> -->
                <!-- <input type="text" id="fields" v-model="fields" class="form-control" placeholder="분야"/> -->
            </div>
            <div class="form-vif" v-if="!answerType">
                <!-- <p text-align: center>Selected Time Range : {{ selectedDay }} / {{ timeStart }} ~ {{ timeEnd }}</p> -->
                <p text-align: center>Please select the available times</p>
                <div class="formElement">
                    <b-button-group size="lg" style="margin-bottom: 10px">
                        <b-button v-for="(day, idx) in days" :key="idx"
                        :pressed.sync="day.state" variant="success" @click=selectedDay>
                            {{ day.text }}
                        </b-button>
                    </b-button-group>
                </div>
                <div style="clear: both; margin-top: 10px"></div>
                <div class="formTimePicker" style="float:left">
                    <timeselector class="timePicker form-control" displayFormat=" [From] HH : mm" :id="timeStart" :interval="{h:1, m:5}"
                    :displaySeconds="false" style="width:208px" :placeholder="'[From] HH:MM'"
                    returnFormat="HH:mm" @formatedTime="tStart">
                        <template slot="hours">
                            <span>Hours</span>
                        </template>
                        <template slot="minutes">
                            <span>Minutes</span>
                        </template>
                    </timeselector>
                    <timeselector class="timePicker form-control" displayFormat=" [To] HH : mm" :id="timeEnd" :interval="{h:1, m:5}"
                    :displaySeconds="false" style="width:208px" :placeholder="'[To] HH:MM'"
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
                <div style="clear: both; margin-top: 10px"></div>
                <vs-chips class="center-block" color="rgb(145, 32, 159)" placeholder="Time Schedules"
                style="width:80%; margin-top:20px" v-model="available_times" remove-icon="delete_forever">
                    <vs-chip v-on:click="removeTime(time)" v-for="time in available_times"
                    v-bind:key="time" closable> {{ time }} </vs-chip>
                </vs-chips>  
            </div>
            <div style="clear: both"></div>
            <div id="buttonHolder" style="margin-top:20px;margin-bottom:20px; width:80%;margin-left:auto; margin-right:auto;">
                <b-button type="submit" form="formInfo" variant="success" size="sm"
                @click.prevent="write()">Register Question</b-button>
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
                { text: 'Mon', state: false, value: 'Mon' }, // val = 0
                { text: 'Tue', state: false, value: 'Tue' }, // val = 288
                { text: 'Wed', state: false, value: 'Wed' }, // val = 576
                { text: 'Thu', state: false, value: 'Thu' }, // val = 864
                { text: 'Fri', state: false, value: 'Fri' }, // val = 1152
                { text: 'Sat', state: false, value: 'Sat' }, // val = 1440
                { text: 'Sun', state: false, value: 'Sun' } // val = 1728                
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
        try{
        const session = await this.$http.get('/rest/user/session');
        if(session.data.user.type == 'Mentor'){
            alert("Only mentee users can ask questions");
            this.$router.go(-1);
        }
        } catch(e) {
        this.$router.push({path: '/login'});
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
                    alert('Credit (Reward)  : ' + reward + '\n'
                        + 'Reward must be multiple of 100!');
                }
                else if (betCredit < reward) {
                    alert('Credit (Own)     : ' + betCredit + '\n'
                        + 'Credit (Reward)  : ' + reward + '\n'
                        + 'Credit (Minimum) : ' + minPoint + '\n'
                        + 'Please check the amount of reward again!');
                }
                else if (reward < minPoint) {
                    alert('Credit (Reward)  : ' + reward + '\n'
                        + 'Credit (Minimum) : ' +  minPoint + '\n'
                        + 'Reward must be bigger than minimum reward!');
                }
                else if ((tIdx != 2) && (this.available_times.length == 0)){
                    alert('Please choose your available time schedule!');
                }
                else {
                    if (this.formCheck() == true){
                        const res = await this.$http.post("/rest/question", { title, content, reward, type, fields, available_times});
                        if (res.data.result == true) {
                            alert('Your question is registered!');
                            this.$router.push({
                                path: '/myquestion'
                            });
                            // 추후에 MyQuestion 페이지로 리디렉션하게 수정
                        }
                    }
                }        
            } catch(err) {
                alert(err.toString() + '\nPlease try again in a few seconds!');
            }
        },
        formCheck () {
            if(this.title == '') {
                alert("Title must not be empty!");
                title.focus();
                return false;
            }
            else if(this.content == '') {
                alert("Content must not be empty!");
                content.focus();
                return false;
            }
            else if(this.type == '') {
                alert("Please choose answer type you want!");
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
                alert('Please check your time schedule again!');
            }
            else {
                this.timeFormat = this.selectedDays + '/' + this.timeStart + '~'  + this.timeEnd; 
                console.log(this.timeFormat);
                this.available_times.push(this.timeFormat);
                this.timeFormat = null;
                console.log(this.available_times);
            }
        },
        removeTime (time) {
            this.available_times.splice(this.available_times.indexOf(time), 1)
        },
        resetTime () {
            this.available_times = [];
            console.log(this.available_times);
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
            if (day == "Mon") {
                return 0;
            }
            else if (day == "Tue") {
                return 288;
            }
            else if (day == "Wed") {
                return 576;
            }
            else if (day == "Thu") {
                return 864;
            }
            else if (day == "Fri") {
                return 1152;
            }
            else if (day == "Sat") {
                return 1440;
            }
            else if (day == "Sun") {
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