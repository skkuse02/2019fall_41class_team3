<template>
  <div>
    <form id="register-form" @submit.prevent="register()">
        <h1>Sign Up</h1>

        <div v-show="currentStep==0">
            <p><input type="text" v-model="type" placeholder="Type"></p>
        </div>

        <div v-show="currentStep==1">
            <p><input type="ID" v-model="uid" placeholder="ID"></p>
            <p><input type="password" v-model="password" placeholder="Password"></p>
        </div>

        <div v-show="currentStep==2">
            <p><input type="text" v-model="name" placeholder="Name"></p>
            <p><input type="text" v-model="nickname" placeholder="Nickname"></p>
            <p><input type="text" v-model="email" placeholder="Email"></p>
        </div>

        <div v-show="currentStep==3">
            <p><input type="text" v-model="field" placeholder="Field"></p>
        </div>

        <div style="overflow:auto;">
            <div style="float:right;">
                <button v-if="isPrevBtnShow" type="button" @click="setStepDiff(-1)">Previous</button>
                <button v-if="isNextBtnShow" type="button" @click="setStepDiff(1)">Next</button>
                <button v-if="isSubmitBtnShow" type="button" @click="showConfirmModal()">OK</button>
            </div>
        </div>

        <div style="text-align:center;margin-top:40px;">
            <span class="step"></span>
            <span class="step"></span>
            <span class="step"></span>
            <span class="step"></span>
        </div>

        <modal name="hello-world">
          <div>uid: {{ uid }}</div>
          <div>name: {{ name }}</div>
          <div>password: {{ password }}</div>
          <div>nickname: {{ nickname }}</div>
          <div>email: {{ email }}</div>
          <div>type: {{ type }}</div>
          <div>field: {{ field }}</div>
          <button v-if="isSubmitBtnShow" type="submit">Confirm</button>
        </modal>
    </form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data () {
    return {
        currentStep: 0,
        isPrevBtnShow: false,
        isNextBtnShow: true,
        isSubmitBtnShow: false,

        uid: '',
        name: '',
        password: '',
        nickname: '',
        email: '',
        type: '',
        field: ''
    };
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
    showConfirmModal() {
      this.$modal.show('hello-world');
    },
    register() {
      //TODO: Backend에 가입 요청
      alert("가입 요청이 제출되었습니다.");
      this.$router.push({
        path: '/login'
      });
    }
  }
};
</script>