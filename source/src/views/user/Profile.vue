<template>
  <div>

    <!-- Mode: Check Password -->
    <div v-if="mode=='check_pw'" class="loginForm" style="margin:100px 40px 40px 40px">
      <h2><p>Check Password</p></h2>
      <form class="form-horizontal" role="form" @submit.prevent="checkPassword()">
        <div class="form-group" style="width:100%;">
          <label for="inputPW" class="col-xs-4 control-label">PW</label>
          <div class="col-xs-4 center-block">
            <input type="password" v-model="inputPassword" class="form-control" placeholder="Password">
          </div>
        </div>

        <!-- Pressing login button will send form's info to server -->
        <div id="buttonHolder" style="margin:10px">
            <b-button type="submit" variant="success" size="lg">Submit</b-button>
        </div>
      </form>
    </div>

    <!-- Mode: View User Info -->
    <div v-if="mode=='view_info'">
      <!-- Show user info -->
      <div>
        <div>uid: {{user.uid}}</div>
        <div>type: {{user.type}}</div>
        <div>name: {{user.name}}</div>
        <div>nickname: {{user.nickname}}</div>
        <div>email: {{user.email}}</div>
        <div>credit: {{user.credit}}</div>
      </div>

      <!-- Buttons -->
      <div>
        <!-- User info edit button -->
        <button @click="changeMode('edit_info')" class="btn btn-primary" type="button" variant="primary" size="lg">
          Edit
        </button>
        <!-- Purchase credit button -->
        <button @click="changeMode('purchase_credit')" class="btn btn-primary" type="button" variant="primary" size="lg">
          Purchase Credit
        </button>
      </div>
    </div>

    <!-- Mode: Edit User Info -->
    <div v-if="mode=='edit_info'">
      <form class="layout-form" @submit.prevent="confirmInfoEdit()" autocomplete="nope">
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
        <button class="btn btn-primary" type="submit" variant="primary" size="lg">Confirm</button>
      </form>
    </div>

    <!-- Mode: Purchase Credit -->
    <div v-if="mode=='purchase_credit'">
      <form class="layout-form" @submit.prevent="confirmCredit()" autocomplete="nope">
        <div class="form-group">
          <div class="label">Current credit: {{user.credit}}</div>
        </div>
        <div class="form-group">
          <div class="label">Amount</div>
          <div class="content"><input type="number" class="form-control" v-model="credit" min="1000" step="1000"></div>
        </div>
        <button @click="changeMode('view_info')" class="btn btn-primary" type="button" variant="primary" size="lg">
          Cancel
        </button>
        <button class="btn btn-primary" type="submit" variant="primary" size="lg">Confirm</button>
      </form>
    </div>
  
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      user: null,
      inputPassword: '',
      mode: 'check_pw',

      name: '',
      nickname: '',
      email: '',

      credit: 0,

      password: '',
      repeat: ''
    };
  },
  validators: {
    name: function(value) {
      return this.$validator.value(value).required().regex('^[a-zA-Z]+(([ ][a-zA-Z ])?[a-zA-Z]*)*$', 'Must only contain alphabetic characters.');
    },
    nickname: function(value) {
      return this.$validator.value(value);
    },
    email: function (value) {
      return this.$validator.value(value).required().email();
    },
    password: function (value) {
      return this.$validator.value(value).required().minLength(8)
        .regex('(?=.*?[A-Z])', 'Must contain at least one uppercase letter.')
        .regex('(?=.*?[a-z])', 'Must contain at least one lowercase letter.')
        .regex('(?=.*?[0-9])', 'Must contain at least one number.');
      },
    'repeat, password': function (repeat, password) {
      if (this.submitted || this.validation.isTouched('repeat')) {
        return  this.$validator.value(repeat).required().match(password);
      }
    }
  },
  created: async function(){
    if(!this.$session.exists()){
      this.$router.push({
        path: '/'
      });
    }
    else {
      this.user = this.$session.get('user');
    }
  },
  methods: {
    async changeMode(mode) {
      switch(mode) {
        case 'view_info':
          const res = await this.$http.get("/rest/user/credit");
          this.user.credit = res.data.credit;
          //alert(this.user.credit);
          break;
        case 'edit_info': 
          this.name = this.user.name;
          this.nickname = this.user.nickname;
          this.email = this.user.email;
          break;
      }

      this.mode = mode;
    },
    async checkPassword() {
      try {
        const uid = this.user.uid;
        const password = this.inputPassword;
        const res = await this.$http.post("/rest/checkPw", {uid, password});
        if (res.data.result == true) {
          this.changeMode('view_info');
        }
        else {
          this.inputPassword = '';
          alert("비밀번호가 일치하지 않습니다.");
        }
      }
      catch(e) {
        this.inputPassword = '';
        alert("비밀번호가 일치하지 않습니다.");
      }
    },
    async confirmInfoEdit() {
      const formRes = await this.$validate('name', 'nickname', 'email');
      if(formRes) {
        const uid = this.user.uid;
        const password = this.inputPassword;
        const type = this.user.type;
        const fields = [];
        const available_times = [];
        
        const name = this.name;
        const nickname = this.nickname;
        const email = this.email;

        try {
          const reqRes = await this.$http.post("/rest/user", {uid, type, password, name, nickname, email, fields, available_times})
          if (reqRes.data.result == true) {
            const session = await this.$http.get('/rest/user/session');
            if(session.data.result == true){
              this.user = session.data.user;  
              this.changeMode('view_info');
              alert('성공적으로 업데이트 되었습니다.');
            } 
          }
          else {
            alert('안돼 돌아가. 이건 뭐니');
          }
        }
        catch(e) {
          alert('안돼 돌아가. 서버가 안된대.');
        }
      }
      else {
        alert('안돼 돌아가. 잘못 입력했어.');
      }
    },
    async confirmCredit() {
      try {
        const amount = this.credit;
        const reqRes = await this.$http.post("/rest/user/credit", {amount});
        if (reqRes.data.result == true) {
          this.changeMode('view_info');
          alert('성공적으로 구매 되었습니다.');
        } 
        else {
          alert('안돼 돌아가. 이건 뭐니');
        }
      }
      catch(e) {
        alert('안돼 돌아가. 서버가 안된대.');
      }

    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/common/login.css";
</style>