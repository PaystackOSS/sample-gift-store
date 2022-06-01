<template>
<div class=content>
  <div class="wrapper-1">
    <div class="wrapper-2">
      <h1>Thank you !</h1>
      <p>Your order was successful! </p>
      <p>We'll let you know once it's out for delivery.</p>

        <div class="cart">
    <div class="header">
      <h2>Order details</h2>
    </div>
    <div class="itemlist">
      <div class="itemlist__header">
        <div>Product</div>
        <div>Quantity</div>
        <div>Sub total</div>
      </div>
      <div class="itemlist__body" v-for="(gift, index) in filterGifts" :key="index">
        <div class="item__content">
          <div class="item__image">
            <img :src="gift.image" />
          </div>
          <div class="item__description">
            <h4>{{ gift.name }}</h4>
            <span>Boxes: {{ gift.size }}</span>
            <span>Color: {{ gift.color }}</span>
          </div>
        </div>
        <div class="item__quantity">
          <div class="qty-wrapper">
            <span class="qty-wrapper__value">{{ gift.quantity }}</span>
          </div>
        </div>
        <div>
          {{ calculateUnitTotal(index) }}
        </div>
      </div>
    </div>
  </div>
      <button @click="resetOrder" class="go-home">
      go home
      </button>
    </div>
</div>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ThankYou',
  props: {
    gifts: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    ...mapGetters('cart', {
      orderStatus: 'orderStatus'
    }),
    filterGifts () {
      return this.gifts.filter(gift => gift.quantity > 0)
    }
  },
  methods: {
    calculateUnitTotal (index) {
      return this.parseCurrency(this.gifts[index].price * this.gifts[index].quantity)
    },
    resetOrder () {
      this.$emit('orderreset')
    },
    parseCurrency (amount) {
      return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount)
    }
  }
}
</script>
<style scoped>
*{
  box-sizing:border-box;
 /* outline:1px solid ;*/
}
body{
background: #ffffff;
background: linear-gradient(to bottom, #ffffff 0%,#e1e8ed 100%);
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#e1e8ed',GradientType=0 );
    height: 100%;
        margin: 0;
        background-repeat: no-repeat;
        background-attachment: fixed;
}

.wrapper-1{
  width:100%;
  height:100vh;
  display: flex;
flex-direction: column;
}
.wrapper-2{
  padding :30px;
  text-align:center;
}
h1{
    font-family: 'Kaushan Script', cursive;
  font-size:4em;
  letter-spacing:3px;
  color:#3bb75e ;
  margin:0;
  margin-bottom:20px;
}
.wrapper-2 p{
  margin:0;
  font-size:1.3em;
  color:#aaa;
  font-family: 'Source Sans Pro', sans-serif;
  letter-spacing:1px;
}
.go-home{
  color:#fff;
  background:#3bb75e;
  border:none;
  padding:10px 50px;
  margin:30px 0;
  border-radius:30px;
  text-transform:capitalize;
  box-shadow: 0 10px 16px 1px rgb(174, 251, 232);
}
.footer-like{
  margin-top: auto;
  background:#D7E6FE;
  padding:6px;
  text-align:center;
}
.footer-like p{
  margin:0;
  padding:4px;
  color:#3bb75e;
  font-family: 'Source Sans Pro', sans-serif;
  letter-spacing:1px;
}
.footer-like p a{
  text-decoration:none;
  color:#3bb75e;
  font-weight:600;
}

@media (min-width:360px){
  h1{
    font-size:4.5em;
  }
  .go-home{
    margin-bottom:20px;
  }
}

@media (min-width:600px){
  .content{
  max-width:1000px;
  margin:0 auto;
}
  .wrapper-1{
  height: initial;
  max-width:620px;
  margin:0 auto;
  margin-top:50px;
  box-shadow: 4px 8px 40px 8px rgba(88, 146, 255, 0.2);
}
}

</style>
<style lang="scss" scoped>
.cart {
  .header {
    margin-bottom: 50px;
  }
}

.itemlist {
  &__header, &__body {
    display: grid;
    grid-template-columns: 300px repeat(3, 1fr);
    grid-gap: 12px;
  }

  &__header {
    margin-bottom: 36px;
    font-size: 18px;
    font-weight: 500;
  }

  &__body {
    margin-bottom: 32px;
  }

  button {
    border: none;
    font-size: 16px;
    padding: 8px;
    font-weight: 400;
    cursor: pointer;
  }
}

.item {

  &__content {
    display: flex;
  }

  &__image {
    flex: 0 1 120px;
    img {
      width: 100px;
      border-radius: 8px;
    }
  }

  &__description {
    flex: 1 1 auto;
    h4 {
      margin: 0;
      line-height: 1;
    }
    span {
      display: block;
    }
  }

  &__quantity {
    display: flex;
  }

  &__price {
    flex: 0 1 auto;
  }
}

.qty-wrapper {
  border: 1px solid #efefef;
  height: fit-content;

  &__value{
    width: 70px;
    height: 20px;
    margin: 0 auto;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    cursor: default;
  }

  &__button {
    width:20px;
    height:20px;
    background:#f2f2f2;
    border-radius:4px;
    font-weight: 600;
    padding:8px 5px 8px 5px;
    border:1px solid #f5f3f3;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    cursor: pointer;
  }
}
</style>
