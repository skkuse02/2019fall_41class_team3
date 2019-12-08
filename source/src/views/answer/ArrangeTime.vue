<template>
    <div class="arrangeTime" style="margin-top:100px">
        <div class="menteeSchedule center-block text-center">
            <b-table class="scheduleTable text-center mb-0 table-outline" style="text-align: center"
            hover :items="schedules" head-variant="light"></b-table>
        </div>
        <div class="formTime">
            <h5><p text-align: center>You can arrange time, based on mentee's schedule. </p></h5>
            <h5><p text-align: center>Choose time schedule you want to answer. </p></h5>
            <h5><p text-align: center>Notice : You must press "+" button to set your time schedule! </p></h5>
            <h5><p text-align: center>Selected Time : [ {{ selectedDay }} / {{ selectedTime }} ] </p></h5>
            <div class="daySelect">
                <b-form-group style="margin-bottom: 10px">
                    <b-form-radio-group v-model="selectedDay" :options="days"
                    size="lg" buttons button-variant="outline-success">
                    </b-form-radio-group>
                </b-form-group>
            </div>
            <div style="clear: both; margin-top: 10px"></div>
            <div class="formTimePicker">
                <timeselector class="timeSelect form-control" displayFormat="  HH : mm  " :id="selectedTime" :interval="{h:1, m:5}"
                :displaySeconds="false" style="width:408px" :placeholder="'Choose your schedule : HH:MM'"
                returnFormat="HH:mm" @formatedTime="tSelected">
                    <template slot="hours">
                        <span>Hours</span>
                    </template>
                    <template slot="minutes">
                        <span>Minutes</span>
                    </template>
                </timeselector>
                <img src="../../assets/datatables/images/add_circle.png" v-on:click="setTime(timeFormat)" style="cursor:pointer">
            </div>
        </div>
        <div style="clear: both"></div>
        <div id="buttonHolder" style="margin:10px">
            <b-button type="submit" variant="success" size="sm" @click.prevent="submitTime()">Submit Time Schedule</b-button>
        </div>
    </div>
</template>

<script>
import Timeselector from 'vue-timeselector';

export default {
    name: 'ArrangeTime',
    components: {
        Timeselector
    },
    data () {
        return {
            qid: 0,
            available_times: [],
            parsedAD: [],
            parsedAT: [],
            timeFormat: '',
            selectedDay: '',
            selectedTime: '',
            arrangedTime: '',
            days: [
                { text: 'Mon', value: 'Monday' },     // val = 0
                { text: 'Tue', value: 'Tuesday' },    // val = 288
                { text: 'Wed', value: 'Wednesday' },  // val = 576
                { text: 'Thu', value: 'Thursday' },   // val = 864
                { text: 'Fri', value: 'Friday' },     // val = 1152
                { text: 'Sat', value: 'Saturday' },   // val = 1440
                { text: 'Sun', value: 'Sunday' }      // val = 1728                
            ],
            schedules: [
                { days_of_week: 'Monday', available_time_schedule_of_mentee: [] },
                { days_of_week: 'Tuesday', available_time_schedule_of_mentee: [] },
                { days_of_week: 'Wednesday', available_time_schedule_of_mentee: [] },
                { days_of_week: 'Thursday', available_time_schedule_of_mentee: [] },
                { days_of_week: 'Friday', available_time_schedule_of_mentee: [] },
                { days_of_week: 'Saturday', available_time_schedule_of_mentee: [] },
                { days_of_week: 'Sunday', available_time_schedule_of_mentee: [] }
            ]
        }
    },
    created: async function () {
        try{
            const session = await this.$http.get('/rest/user/session');
            const scheduleInfo = await this.$http.get('/rest/question/availableTime/'+this.$route.params.qid);
            console.log(scheduleInfo);
            console.log(scheduleInfo.data.available_times);
            this.available_times = scheduleInfo.data.available_times;
            this.parsedAD = this.dayParse(this.available_times);
            this.parsedAT = this.timeParse(this.parsedAD);
            console.log(this.parsedAD);
            console.log(this.parsedAT);
            var list = [];
            for(var i = 0; i < 7; i++){
                list = this.parsedAT[i];
                if (list.length == 0){
                    this.schedules[i].available_time_schedule_of_mentee = "None";
                    continue;
                }
                else{
                    for (var j = 0; j < list.length; j++){
                        this.schedules[i].available_time_schedule_of_mentee.push(list[j]);
                    }
                }
            }
        } catch(e) {
            this.$router.push({path: '/login'});
        }
    },
    methods: {
        async submitTime () {
            try{
                var time = this.timeFormatTransform();
                if (this.timeCheck() == false){
                    alert('Please check your time schedule again!');
                }
                else if (this.available_times.indexOf(time) == -1) {
                    console.log(this.available_times);
                    console.log(time);
                    alert('Please select time schedule in schedule of mentee!');
                }
                else{
                    const res = await this.$http.post("/rest/answer/arrange/" + this.$route.params.qid, { time });
                    if (res.data.result == true) {
                        alert('Your time schedule is submitted!');
                        this.$router.push({
                            path: '/'
                        });
                    }  
                }          
            } catch(err) {
                alert(err.toString() + '\nPlease try again in a few seconds!');
            }
        },
        tSelected (e) {
            this.selectedTime = e;
        },
        setTime (timeFormat) {
            if (this.timeCheck() == false) {
                alert('Please check your day and time again!');
            }
            else {
                this.timeFormat = this.selectedDay + '/' + this.selectedTime; 
                console.log(this.timeFormat);
                this.arrangedTime = this.timeFormat;
                this.timeFormat = null;
                console.log(this.timeFormatTransform());
            }
        },
        timeCheck () {
            if ((this.selectedDay == '') || (this.selectedTime == '')) {
                return false;
            }
            else return true;
        },
        timeFormatTransform () {
            const timeArr = this.arrangedTime;
            var spArr = [];
            var result = 0;

            spArr = timeArr.split("/");  // s[0] = "day", s[1] = "time"
            var day = this.dayToNum(spArr[0]);
            var time = this.timeToNum(spArr[1]);
            console.log(spArr);
            console.log(day, time);
            return (day + time + 1);
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
        timeToNum(time) {
            var hmArr = time.split(":");
            hmArr[0] = Number(hmArr[0]);
            hmArr[1] = Number(hmArr[1]);
            return ((hmArr[0] * 12) + (hmArr[1] / 5) + 1);
        },
        numToTime(num) {
            num--;
            var hour = parseInt((num % 288) / 12);
            var min = (parseInt((num % 288) % 12)) * 5 ;
            return (("00" + hour).slice(-2) + ":" + ("00" + min).slice(-2));
        },
        dayParse (numArr) {
            const arr = numArr;
            var day = new Array();
            for (var i = 0; i < 7; i++){
                day[i] = new Array();
            }
            for (var i = 0; i < arr.length; i++){
                switch (parseInt(arr[i] / 288)){
                    case 0: 
                        day[0].push(arr[i]);
                        break;
                    case 1:
                        day[1].push(arr[i]);
                        break;
                    case 2:
                        day[2].push(arr[i]);
                        break;
                    case 3:
                        day[3].push(arr[i]);
                        break;
                    case 4:
                        day[4].push(arr[i]);
                        break;
                    case 5:
                        day[5].push(arr[i]);
                        break;
                    default:
                        day[6].push(arr[i]);
                        break;
                }        
            }
            return day;
        },
        timeParse (numArr) {
            const arr = numArr;
            var day = new Array();
            var timeStart = 0;
            var next = 0;
            var count = 0;
            for (var i = 0; i < 7; i++){
                day[i] = new Array();
            }
            for (var i = 0; i < 7; i++){
                for (var j = 0; j < arr[i].length; j++){
                    if ((count == 0) && (timeStart == 0)){
                        timeStart = arr[i][j];
                        next = timeStart + 1;
                        count++;
                    }
                    else if (j == (arr[i].length - 1)) {
                        day[i].push(this.numToTime(timeStart) + " ~ " + this.numToTime(arr[i][j]));
                        console.log(this.numToTime(timeStart));
                        console.log(this.numToTime(arr[i][j]));
                        timeStart = 0;
                        count = 0;
                    }
                    else if (next != arr[i][j]){
                        day[i].push(this.numToTime(timeStart) + " ~ " + this.numToTime(timeStart + count));
                        timeStart = arr[i][j];
                        count = 0;
                    }
                    else {
                        next++;
                        count++;
                    }
                }
            }
            return day;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/common/arrangetime.css";
</style>