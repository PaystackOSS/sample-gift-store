<template>
  <div class="layout">
    <div class="layout__left">
      <Cart />
    </div>
    <div class="layout__right">
      <Receipt />
    </div>
  </div>
</template>

<script>
import Cart from './Cart.vue'
import Receipt from './Receipt.vue'

export default {
  name: 'Layout',
  components: {
    Cart,
    Receipt
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
