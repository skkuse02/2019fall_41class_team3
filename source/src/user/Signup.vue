<template>
  <div>
  <div>
    <form class="layout-form" @submit.prevent="register()" autocomplete="nope">
      <h1>Sign Up</h1>

      <!-- Step 1: Select user type -->
      <div class="form-group" v-show="currentStep==0">
        <div class="label">* Type</div>
        <div class="content">
          <label>
            <input type="radio" v-model="type" value="Mentor"/>Mentor
          </label>
          <label>
            <input type="radio" v-model="type" value="Mentee"/>Mentee
          </label>
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
      </div>

      <!--  -->
      <div class="form-group" v-show="currentStep==3">
          <div class="label">Field</div>
      </div>

      <div>
        <div style="float:left;">
            <button class="btn btn-primary" v-if="isPrevBtnShow" type="button" @click="setStepDiff(-1)">&lt; Prev</button>
        </div>

        <div style="text-align:center;margin-top:40px;">
            <span class="step"></span>
            <span class="step"></span>
            <span class="step"></span>
            <span class="step"></span>
        </div>

        <div style="float:right;">
            <button class="btn btn-primary" v-if="isNextBtnShow" type="button" @click="setStepDiff(1)">Next &gt;</button>
            <button class="btn btn-primary" v-if="isSubmitBtnShow" type="submit">Submit</button>
        </div>
      </div>
    </form>
    <modal name="welcome-user">
      <div>Welcome, {{ uid }} !</div>
      <button type="button" @click="gotoLogin">Go to Login</button>
    </modal>
  </div>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data () {
    return {
        currentStep: 0,
        isPrevBtnShow: false,
        isNextBtnShow: true,
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
    };
  },
  validators: {
    uid: function (value) {
      return  this.$validator.value(value).required().minLength(5).regex('^[A-Za-z0-9]*$', 'Must only contain alphabet letters or numbers.');
    },
    password: function (value) {
      return  this.$validator.value(value).required().minLength(8).regex('^[A-Za-z0-9]*$', 'Must only contain alphabet letters or numbers.');
    },
    'repeat, password': function (repeat, password) {
      if (this.submitted || this.validation.isTouched('repeat')) {
        return  this.$validator.value(repeat).required().match(password);
      }
    },
    name: function(value) {
      return this.$validator.value(value).required().regex('^[A-Za-z]*$', 'Must only contain alphabetic characters.');
    },
    nickname: function(value) {
      return this.$validator.value(value);
    },
    email: function (value) {
      return this.$validator.value(value).required().email();
    }
  },
  methods: {
    setStepDiff(diff) {
      this.setStep(this.currentStep + diff);
    },
    setStep(step) {
      // 범위 밖 값에 대한 예외처리
      if(step < 0) {
        step = 0;
      }
      else if(step > 3) {
        step = 3;
      }
      this.currentStep = step;

      // 버튼 표시 변수 계산
      if(step == 0) {
        this.isPrevBtnShow = false;
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
    showWelcomeModal: function() {
    },
    register: function(){
      const _modal = this.$modal;
      this.$validate()
        .then(function(success) {
          if (success) {
            try
            {
              _modal.show('welcome-user');
            }
            catch(e) {
              alert(e);
            }
          }
          else {
            alert('안돼 돌아가');
          }
        });
    },
    gotoLogin() {
      this.$router.push({
        path: '/login'
      });
    }
  }
};
</script>