<template>
  <div>

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
        <button @click="changeMode('view_credit')" class="btn btn-primary" type="button" variant="primary" size="lg">
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
        <button @click="changeMode('view_credit')" class="btn btn-primary" type="button" variant="primary" size="lg">
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
      amount: 0
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
          alert('성공적으로 구매 되었습니다.');
          this.$router.go('/credit');
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
      if (this.currentCredit < this.amount) {
        alert('인출 금액이 보유한 크레딧을 초과합니다.');
      }
      else {
        try {
            const amount = this.amount;
            const reqRes = await this.$http.post("/rest/user/withdraw", {amount});
            if (reqRes.data.result == true) {
              this.$session.get('user').credit =  reqRes.data.total;
                alert('성공적으로 인출 되었습니다.');
                this.$router.go('/credit');
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