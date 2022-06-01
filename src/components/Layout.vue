<template>
  <div class="layout">
    <div class="layout__left">
      <ThankYouVue :gifts="cart" v-if="orderStatus === 'success'" @orderreset="resetOrder"/>
      <Cart v-else />
    </div>
    <div  v-if="orderStatus != 'success'" class="layout__right">
      <Receipt @ordercomplete="orderComplete" />
    </div>
  </div>
</template>

<script>
import Cart from './Cart.vue'
import Receipt from './Receipt.vue'
import ThankYouVue from './ThankYou.vue'
export default {
  name: 'Layout',
  components: {
    Cart,
    Receipt,
    ThankYouVue
  },
  data () {
    return {
      orderStatus: 'pending',
      cart: []
    }
  },
  methods: {
    orderComplete (data) {
      this.orderStatus = 'success'
      this.cart = data
    },
    resetOrder () {
      this.orderStatus = 'pending'
    }
  }
}
</script>

<style lang="scss" scoped>
$light-gray: #fbfbfb;

.layout {
  display: flex;

  &__left {
    width: 70vw;
    padding: 32px;
    background: $light-gray;
  }

  &__right {
    width: 30vw;
    height: 100vh;
    padding: 32px;
  }
}
</style>
