<template>
  <div>

    <!-- Mode: View Credit Info -->
    <div class="credit-card">
      <!-- Show user info -->
      <div class="credit-top">
        <div class="credit-top-text">
          <b>{{currentCredit}} P</b>
          <div class="credit-bottom-text">
            <i class="fa fa-krw" aria-hidden="true"></i> {{currentCredit * 0.9}}
              <i class="fa fa-info-circle" aria-hidden="true" style="color:#dddddd;font-size:30px;"
              data-toggle="tooltip" title="Fee applied"></i>
          </div>
        </div>
        <!-- Buttons -->
        <div class="credit-button-container">
          <!-- Credit purchase -->
          <button @click="changeMode('purchase_credit')" class="btn btn-primary" type="button" variant="primary" size="lg">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i> Purchase Credit
          </button>
          <!-- Credit withdraw -->
          <button @click="changeMode('withdraw_credit')" class="btn btn-primary" type="button" variant="primary" size="lg">
            <i class="fa fa-money" aria-hidden="true"></i> Withdraw Credit
          </button>
        </div>

        <!-- Mode: Purchase Credit -->
        <div v-if="mode=='purchase_credit'">
          <form class="layout-form" @submit.prevent="confirmPurchase()" autocomplete="nope">
            <h2>
              <i class="fa fa-shopping-cart" aria-hidden="true"></i> Purchase Credit
            </h2>
            <div class="form-group">
              <div class="label">Amount</div>
              <div class="content"><input type="number" class="form-control" v-model="amount" min="1000" step="1000"></div>
            </div>
            <div class="credit-form-button-container">
              <button @click="changeMode('view_credit')" class="btn btn-danger" type="button" size="lg">
                <i class="fa fa-ban" aria-hidden="true"></i> Cancel
              </button>
              <button class="btn btn-success" type="submit" variant="primary" size="lg">
                <i class="fa fa-check" aria-hidden="true"></i></i>Confirm
              </button>
            </div>
          </form>
        </div>

        <!-- Mode: Withdraw Credit -->
        <div v-if="mode=='withdraw_credit'">
          <form class="layout-form" @submit.prevent="confirmWithdraw()" autocomplete="nope">
            <h2>
              <i class="fa fa-money" aria-hidden="true"></i> Withdraw credit
            </h2>
            <div class="form-group">
              <div class="label">Amount</div>
              <div class="content"><input type="number" class="form-control" v-model="amount" min="1000" step="1000"></div>
            </div>
            <div class="credit-form-button-container">
              <button @click="changeMode('view_credit')" class="btn btn-danger" type="button" size="lg">
                <i class="fa fa-ban" aria-hidden="true"></i> Cancel
              </button>
              <button class="btn btn-success" type="submit" variant="primary" size="lg">
                <i class="fa fa-check" aria-hidden="true"></i></i>Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
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
    try{
      const session = await this.$http.get('/rest/user/session');
      this.user = session.data.user;
    } catch(e) {
      this.$router.push({path: '/login'});
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