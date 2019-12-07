<template>
    <div class="arrangeTime" style="margin-top:100px">
        <h2><p style="margin-left:50px; margin-bottom:10px">ArrangeTime</p></h2>
        <div class="menteeSchedule">
        </div>
        <div class="formTime">
            <h5><p text-align: center>You can arrange time, based on mentee's schedule </p></h5>
            <h5><p text-align: center>Choose time schedule you want to answer </p></h5>
            <h5><p text-align: center>Selected Time : {{ selectedDay }} / {{ selectedTime }} </p></h5>
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
        <div id="buttonHolder" style="margin:10px">
            <b-button type="submit" variant="success" size="sm" @click.prevent="getTime()">Get Schedule</b-button>
        </div>
        <div style="clear: both"></div>
        <div id="buttonHolder" style="margin:10px">
            <b-button type="submit" variant="success" size="sm" @click.prevent="submitTime()">Submit Schedule</b-button>
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
        }
    },
    created: async function () {
        const scheduleInfo = await this.$http.get('/rest/question/availableTime/'+this.$route.params.qid);
        console.log(scheduleInfo);
        console.log(scheduleInfo.data.available_times);
        this.available_times = scheduleInfo.data.available_times;
    },
    methods: {
        async submitTime () {
            try{
                var time = this.timeFormatTransform();
                const res = await this.$http.post("/rest/answer/arrange/" + this.$route.params.qid, { time });
                if (res.data.result == true) {
                    alert('시간이 제출되었습니다!');
                    this.$router.push({
                        path: '/'
                    });
                }        
            } catch(err) {
                alert(err.toString() + '\n잠시 후 다시 시도해주세요!');
            }
        },
        tSelected (e) {
            this.selectedTime = e;
        },
        getTime () {
            this.parsedAD = this.dayParse(this.available_times);
            this.parsedAT = this.timeParse(this.parsedAD);
            console.log(this.parsedAD);
            console.log(this.parsedAT);
        },
        setTime (timeFormat) {
            if (this.timeCheck() == false) {
                alert('요일과 시간을 다시 한 번 확인해 주세요!');
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
            if ((this.selectedDay == '') || (this.selectedTime == '') || (this.timeEnd == '')){
                return false;
            }
            else if (this.timeStart >= this.timeEnd) {
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
            return ((hmArr[0] * 12) + (hmArr[1] / 5));
        },
        numToTime(num) {
            var hour = parseInt(((num % 288) - 1) / 12);
            var min = parseInt(((num % 288) - 1) / 24);
            return (hour + ":" + min);
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
                    if (count == 0){
                        timeStart = arr[i][j];
                        next = timeStart + 1;
                        count++;
                    }
                    else if ((next != arr[i][j]) || (j == arr[i].length - 1)) {
                        day[i].push(this.numToTime(timeStart) + " : " + this.numToTime(timeStart + count));
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