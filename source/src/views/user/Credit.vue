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

    <!-- Mode: View Credit Info -->
    <div v-if="mode=='view_credit'">
      <!-- Show user info -->
      <div>
        <div>Current credit: {{currentCredit}}</div>
      </div>

      <!-- Buttons -->
      <div>
        <!-- Credit purchase -->
        <button @click="changeMode('purchase_credit')" class="btn btn-primary" type="button" variant="primary" size="lg">
          Purchase Credit
        </button>
        <!-- Credit withdraw -->
        <button @click="changeMode('withdraw_credit')" class="btn btn-primary" type="button" variant="primary" size="lg">
          Withdraw Credit
        </button>
      </div>
    </div>

    <!-- Mode: Purchase Credit -->
    <div v-if="mode=='purchase_credit'">
      <form class="layout-form" @submit.prevent="confirmPurchase()" autocomplete="nope">
        <div class="form-group">
          <div class="label">Current credit: {{currentCredit}}</div>
        </div>
        <div class="form-group">
          <div class="label">Amount</div>
          <div class="content"><input type="number" class="form-control" v-model="amount" min="1000" step="1000"></div>
        </div>
        <button @click="changeMode('view_info')" class="btn btn-primary" type="button" variant="primary" size="lg">
          Cancel
        </button>
        <button class="btn btn-primary" type="submit" variant="primary" size="lg">Confirm</button>
      </form>
    </div>

    <!-- Mode: Withdraw Credit -->
    <div v-if="mode=='withdraw_credit'">
      <form class="layout-form" @submit.prevent="confirmWithdraw()" autocomplete="nope">
        <div class="form-group">
          <div class="label">Current credit: {{currentCredit}}</div>
        </div>
        <div class="form-group">
          <div class="label">Amount</div>
          <div class="content"><input type="number" class="form-control" v-model="amount" min="1000" step="1000"></div>
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
  name: "Credit",
  data() {
    return {
      mode: 'view_credit',

      currentCredit: 0,
      amonut: 0
    };
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
    
    const res = await this.$http.get("/rest/user/credit");
    this.currentCredit = res.data.credit;
  },
  methods: {
    async changeMode(mode) {
      switch(mode) {
        case 'view_credit':
          const res = await this.$http.get("/rest/user/credit");
          this.currentCredit = res.data.credit;
          break;
        default:
          this.amount = null;
          break;
      }

      this.mode = mode;
    },
    async confirmPurchase() {
      try {
        const amount = this.amount;
        const reqRes = await this.$http.post("/rest/user/credit", {amount});
        if (reqRes.data.result == true) {
          this.changeMode('view_credit');
          alert('성공적으로 구매 되었습니다.');
        } 
        else {
          alert('안돼 돌아가. 이건 뭐니');
        }
      }
      catch(e) {
        alert('안돼 돌아가. 서버가 안된대.');
      }
    },
    async confirmWithdraw() {
      if (this.currentCredit < this.amonut) {
        alert('인출 금액이 보유한 크레딧을 초과합니다.');
      }
      else {
        try {
            const amount = this.amount;
            const reqRes = await this.$http.post("/rest/user/withdraw", {amount});
            if (reqRes.data.result == true) {
                this.changeMode('view_credit');
                alert('성공적으로 인출 되었습니다.');
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
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/common/login.css";
</style>