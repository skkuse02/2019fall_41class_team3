<template>
  <div>
  <div>
    <div class="layout-form" autocomplete="nope">
      <div v-show="currentStep>0">
      <h1>Sign Up</h1>
      </div>

      <!-- Step 1: Select user type -->
      <div class="form-group" v-show="currentStep==0">
        <div style="margin:auto;text-align:center;display:inherit;">
          <div class="signup-card">
            <a><img src="/assets/img/mentor.png" @click="selectType('Mentor')" style="width:200px;margin-left:50px;margin-top:20px;"></a>
            <div class="signup-container">
              <h4><b>Mentor</b></h4>
              <p>...</p>
            </div>
          </div>
          <div class="signup-card">
            <a><img src="/assets/img/mentee.png" @click="selectType('Mentee')" style="width:200px;margin-left:50px;margin-top:20px;"></a>
            <div class="signup-container">
              <h4><b>Mentee</b></h4>
              <p>...</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 2: Input ID & Password -->
      <div v-show="currentStep==1">
        <div class="form-group" :class="{error: validation.hasError('uid')}">
          <div class="label">* ID</div>
          <div class="content"><input type="id" class="form-control" v-model="uid" autocomplete="nope"/></div>
          <div class="message">{{ validation.firstError('uid') }}</div>
        </div>
        <div class="form-group" :class="{error: validation.hasError('password')}">
          <div class="label">* Password</div>
          <div class="content"><input type="password" class="form-control" v-model="password" autocomplete="new-password"/></div>
          <div class="message">{{ validation.firstError('password') }}</div>
        </div>
        <div class="form-group" :class="{error: validation.hasError('repeat')}">
          <div class="label">* Confirm password</div>
          <div class="content"><input type="password" class="form-control" v-model="repeat"/></div>
          <div class="message">{{ validation.firstError('repeat') }}</div>
        </div>
      </div>

      <!-- Step 3:  -->
      <div v-show="currentStep==2">
          <div class="form-group" :class="{error: validation.hasError('name')}">
            <div class="label">* Name</div>
            <div class="content"><input type="text" class="form-control" v-model="name"/></div>
            <div class="message">{{ validation.firstError('name') }}</div>
          </div>
          <div class="form-group" :class="{error: validation.hasError('nicknname')}">
            <div class="label">Nickname</div>
            <div class="content"><input type="text" class="form-control" v-model="nickname"/></div>
            <div class="message">{{ validation.firstError('nickname') }}</div>
          </div>
          <div class="form-group" :class="{error: validation.hasError('email')}">
            <div class="label">* Email</div>
            <div class="content"><input type="text" class="form-control" v-model="email"/></div>
            <div class="message">{{ validation.firstError('email') }}</div>
          </div>
          
          <div class="form-vif" v-if="type=='Mentor'">
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
      </div>

      <!--  -->
      <div class="form-group" v-show="currentStep==3">
        <div class="label">Field</div>
        <div>
          <input type="checkbox" id="math" value="Math" v-model="fields" />
          <label for="math">Math</label>
          <input type="checkbox" id="cs" value="Computer Science" v-model="fields" />
          <label for="cs">Computer Science</label>
          <input type="checkbox" id="science" value="Science" v-model="fields" />
          <label for="science">Science</label>
        </div>
      </div>

      <div style="height:30px;margin:50px;" v-if="isPrevBtnShow||isNextBtnShow||isSubmitBtnShow">
        <div style="float:left;">
            <button class="btn btn-primary" v-if="isPrevBtnShow" type="button" @click="setStepDiff(-1)">&lt; Prev</button>
        </div>

        <div style="float:right;">
            <button class="btn btn-primary" v-if="isNextBtnShow" type="button" @click="setStepDiff(1)">Next &gt;</button>
            <button class="btn btn-primary" v-if="isSubmitBtnShow" type="button" @click="register()">Submit</button>
        </div>
      </div>
    </div>
    <modal name="welcome-user">
      <div>Welcome, {{ uid }} !</div>
      <button type="button" @click="gotoLogin">Go to Login</button>
    </modal>
  </div>
  </div>
</template>

<script>
import Timeselector from 'vue-timeselector';

export default {
  name: "Signup",
  components: {
      Timeselector
  },
  data () {
    return {
        currentStep: 0,
        isPrevBtnShow: false,
        isNextBtnShow: false,
        isSubmitBtnShow: false,

        // uid, type, password, name, nickname, email, fields, available_times
        uid: '',
        type: '',
        password: '',
        name: '',
        nickname: '',
        email: '',
        fields: [],
        available_times: [],
        repeat: '',
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
    };
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
  validators: {
    uid: function (value) {
      return  this.$validator.value(value).required().minLength(5).regex('^[A-Za-z0-9]*$', 'Must only contain alphabet letters or numbers.');
    },
    password: function (value) {
      return this.$validator.value(value).required().minLength(8)
        .regex('(?=.*?[A-Z])', 'Must contain at least one uppercase letter.')
        .regex('(?=.*?[a-z])', 'Must contain at least one lowercase letter.')
        .regex('(?=.*?[0-9])', 'Must contain at least one number.');
      //return this.$validator.value(value).required().minLength(8).regex('(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])', 'Must contain at least one uppercase letter, one lowercase letter, one number.');
    },
    'repeat, password': function (repeat, password) {
      if (this.submitted || this.validation.isTouched('repeat')) {
        return  this.$validator.value(repeat).required().match(password);
      }
    },
    type: function(value) {
      return this.$validator.value(value).required();
    },
    name: function(value) {
      return this.$validator.value(value).required().regex('^[a-zA-Z]+(([ ][a-zA-Z ])?[a-zA-Z]*)*$', 'Must only contain alphabetic characters.');
    },
    nickname: function(value) {
      return this.$validator.value(value);
    },
    email: function (value) {
      return this.$validator.value(value).required().email();
    }
  },
  methods: {
    async setStepDiff(diff) {

      if(diff<0) {
        this.setStep(this.currentStep + diff);
      }
      else {
        // 스텝별 validation 확인
        var res;
        switch(this.currentStep) {
          case 0:
            res = await this.$validate('type');
            break;
          case 1:
            res = await this.$validate('uid', 'password');
            break;
          case 2:
            res = await this.$validate('name', 'nickname', 'email');
            break;
          case 3:
            break;
        }

        // 유효한 입력이면 다음 스텝으로
        if(res) {
          this.setStep(this.currentStep + diff);
        }
        else {
          alert('안돼 돌아가');
        }
      }
    },
    selectType(type) {
      this.type = type;
      this.setStepDiff(1);
    },
    setStep(step) {
      this.currentStep = step;
      this.setButtons(step);
    },
    setButtons(step) {
      // 버튼 표시 변수 계산
      if(step == 0) {
        this.isPrevBtnShow = false;
        this.isNextBtnShow = false;
      }
      else if(step == 3) {
        this.isNextBtnShow = false;
        this.isSubmitBtnShow = true;
      }
      else {
        this.isPrevBtnShow = true;
        this.isNextBtnShow = true;
        this.isSubmitBtnShow = false;
      }
    },
    reset: function() {
      this.name = '';
      this.validation.reset();
    },
    removeField(item) {
      this.fields.splice(this.fields.indexOf(item), 1)
    },
    async register(){
      const formRes = await this.$validate();
      if(formRes) {
        try {
          const uid = this.uid;
          const password = this.password;
          const type = this.type;
          const name = this.name;
          const nickname = this.nickname;
          const email = this.email;
          const fields = this.fields;
          const available_times = this.timeFormatTransform();
          const reqRes = await this.$http.post("/rest/user", {uid, type, password, name, nickname, email, fields, available_times})
          if (reqRes.data.result == true) {
            this.$modal.show('welcome-user');
          }
        }
        catch(e) {
          //Unable to sign up
          alert('안돼 돌아가');
        }
      }
      else {
        alert('안돼 돌아가');
      }
    },
    
    gotoLogin() {
      this.$router.push({
        path: '/login'
      });
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
                    resultArr.push(daArr[j] + k);
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
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/common/registerquestion.css";
</style>