<template>
  <div class="cart">
    <div class="header">
      <h2>Shopping cart</h2>
    </div>
    <div class="itemlist">
      <div class="itemlist__header">
        <div>Product</div>
        <div>Unit Price</div>
        <div>Quantity</div>
        <div>Sub total</div>
      </div>
      <div class="itemlist__body" v-for="(gift, index) in gifts" :key="index">
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
        <div class="item__price">
          <span>{{ parseCurrency(gift.price) }}</span>
        </div>
        <div class="item__quantity">
          <div class="qty-wrapper">
            <span class="qty-wrapper__button" @click="reduceQuantity(gift.id)">&ndash;</span>
            <span class="qty-wrapper__value">{{ gift.quantity }}</span>
            <span class="qty-wrapper__button" @click="increaseQuantity(gift.id)">+</span>
          </div>
        </div>
        <div>
          {{ calculateUnitTotal(index) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  computed: {
    ...mapGetters('cart', {
      gifts: 'cartProducts'
    })
  },
  methods: {
    increaseQuantity (id) {
      this.$store.commit('cart/incrementGiftQuantity', id)
    },
    reduceQuantity (id) {
      this.$store.commit('cart/decrementGiftQuantity', id)
    },
    calculateUnitTotal (index) {
      return this.parseCurrency(this.gifts[index].price * this.gifts[index].quantity)
    },
    parseCurrency (amount) {
      return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount)
    }
  }
}
</script>

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
