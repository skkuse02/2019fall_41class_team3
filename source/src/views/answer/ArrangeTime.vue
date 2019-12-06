<template>
    <div class="arrangeTime" style="margin:100px 40px 40px 40px">
        <h2><p>ArrangeTime</p></h2>
        <div class="timeSelect">
            <p text-align: center>Selected Time : {{ selectedDay }} / {{ selectedTime }} </p>
            <div>
                <b-form-group style="margin-bottom: 10px">
                    <b-form-radio-group v-model="selectedDay" :options="days"
                    size="lg" buttons button-variant="outline-success">
                    </b-form-radio-group>
                </b-form-group>
            </div>
            <div style="clear: both; margin-top: 10px"></div>
            <timeselector class="form-control" displayFormat="  HH : mm  " :id="selectedTime" :interval="{h:1, m:5}"
            :displaySeconds="false" style="width:408px; float: left" :placeholder="'[From] HH:MM'"
            returnFormat="HH:mm" @formatedTime="tSelected">
                <template slot="hours">
                    <span>Hours</span>
                </template>
                <template slot="minutes">
                    <span>Minutes</span>
                </template>
            </timeselector>
            <img src="../../assets/datatables/images/add_circle.png" v-on:click="setTime(timeFormat)" style="cursor:pointer">
            <div style="clear: both; margin-top: 10px"></div>
        </div>
        <div style="clear: both"></div>
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
            qid: '',
            available_times: [],
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
    // created: async function () {
    //     const questionInfo = await this.$http.get('rest/question/'+this.$route.params.id);
        
    // },
    // mounted: async function () {

    // },
    methods: {
        tSelected (e) {
            this.selectedTime = e;
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
            return (day + time);
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