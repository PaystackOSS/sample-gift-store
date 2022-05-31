<template>
  <div class="receipt">
    <div class="receipt__form">
      <div class="header">
        <h2>Customer details</h2>
      </div>
      <div class="form-item">
        <label>Email</label>
        <input type="email" v-model="email">
      </div>
      <div class="form-item">
        <label>Address</label>
        <textarea type="email" v-model="address" />
      </div>
    </div>
    <div class="receipt__items">
      <div class="receipt-item">
        <span>Items subtotal</span>
        <span>{{ parseCurrency(subtotal) }}</span>
      </div>
      <div class="receipt-item">
        <span>Delivery fees</span>
        <span>{{ parseCurrency(deliveryFee) }}</span>
      </div>
      <div class="receipt-item">
        <span>VAT (7.5%)</span>
        <span>{{ parseCurrency(vat) }}</span>
      </div>
      <div class="receipt-total">
        <span>Total</span>
        <span>{{ parseCurrency(total) }}</span>
      </div>
    </div>
    <div class="receipt__checkout">
      <paystack
      :disabled="!isEmailValid"
        :amount="nairaToKobo(total)"
        :email="email"
        :paystackkey="paystackkey"
        :reference="reference"
        :callback="callback"
        :close="close"
        :metadata="giftsMetadata"
        :split="splitConfig"
        :embed="false"
    >
       <i class="fas fa-money-bill-alt"></i>
       Checkout
    </paystack>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import paystack from 'vue-paystack'
import uniqid from 'uniqid'
export default {
  name: 'Receipt',
  components: {
    paystack
  },
  data () {
    return {
      email: '',
      address: '',
      deliveryFee: 1000,
      orderComplete: false,
      paystackkey: 'pk_test_7f6411a75841f54d5499e6199bac8e29e03033f9',
      loading: false,
      split_Config: {
        type: 'flat',
        bearer_type: 'account',
        subaccounts: [
          {
            subaccount: 'ACCT_ekzhljz1lm6qmu1',
            share: 6000
          },
          {
            subaccount: 'ACCT_sv6roe394nkpu6j',
            share: 4000
          }
        ]
      }
    }
  },
  computed: {
    giftsMetadata () {
      const metadata = { cart: this.gifts }
      metadata.custom_fields = this.gifts.map(gift => {
        return {
          value: gift.quantity,
          display_name: gift.name,
          variable_name: gift.id
        }
      })
      return metadata
    },
    splitConfig () {
      const config = {
        type: 'flat',
        bearer_type: 'account',
        subaccounts: []
      }
      const groupGiftsByVendor = {}
      this.gifts.forEach(gift => {
        if (groupGiftsByVendor[gift.vendor]) {
          groupGiftsByVendor[gift.vendor].push(gift)
        } else {
          groupGiftsByVendor[gift.vendor] = [gift]
        }
      })
      console.log(groupGiftsByVendor)
      Object.keys(groupGiftsByVendor).forEach(vendor => {
        const subaccount = {
          subaccount: vendor,
          share: 0
        }
        groupGiftsByVendor[vendor].forEach(gift => {
          subaccount.share += this.nairaToKobo(0.9 * (gift.quantity * gift.price))
        })
        config.subaccounts.push(subaccount)
      })
      console.log(config)
      return config
    },

    reference () {
      return uniqid('ref-')
    },
    ...mapGetters('cart', {
      subtotal: 'cartTotalPrice',
      gifts: 'cartProducts'
    }),
    isEmailValid () {
      const regex = /\S+@\S+\.\S+/ // this is just a simple check

      return this.email && this.email.length > 0 && regex.test(this.email)
    },
    vat () {
      return 0.075 * this.subtotal
    },
    total () {
      return this.subtotal + this.deliveryFee + this.vat
    }
  },
  methods: {
    callback (response) {
      this.verifyTransaction(response.reference)
    },
    close () {
      this.loading = false
    },
    resetForm () {
      this.email = ''
      this.address = ''
    },
    verifyTransaction (reference) {
      this.loading = true
      const url = `https://api-middleware.paystackintegrations.com/transaction/verify/${reference}`
      fetch(url, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(res => {
          console.log(res.data)
          if (res.data.status === 'success') {
            this.$store.dispatch('cart/orderComplete', { email: this.email, address: this.address, cart: this.gifts })
            this.$emit('ordercomplete', this.gifts)
            this.resetForm()
          }
        })
        .catch(() => {
          // handle error here
        })
    },
    nairaToKobo (amount) {
      return Number((amount * 100).toFixed(0))
    },
    parseCurrency (amount) {
      return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount)
    }
  }
}
</script>

<style lang="scss" scoped>
$gray: #F2F5F7;

.receipt {
  display: flex;
  flex-direction: column;

  &__form {
    width: 100%;
    margin-bottom: 48px;
  }

  .header {
    margin-bottom: 50px;
  }

  &__items {
    border-top: 1px dashed #ececec;
    padding-top: 30px;
    margin-bottom: 30px;
  }

  &__checkout {
    button {
      width: 100%;
      background: #3bb75e;
      color: white;
      border-radius: 5px;
      border: none;
      font-size: 14px;
      font-weight: 500;
      text-transform: uppercase;
      height: 36px;
      padding-left: 10px;
      padding-right: 10px;
      cursor: pointer;

      &:disabled {
        background-color: rgba(59,183,94, 0.65);
        cursor: default;
      }

      &:focus {
        outline: none;
      }
    }
  }
}

.receipt-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

  span:first-child {
    margin-right: 24px;
  }
}

.form-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;

  label {
    margin-bottom: 8px;
    font-weight: 500;
  }

  input, textarea {
    font-size: 14px;
    color: #737575;
    padding: 10px;
    border: 1px solid $gray;
    box-sizing: border-box;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.03);
    border-radius: 6px;

    &:focus {
      border: 1px solid rgba(130, 130, 130, 0.2);
      outline: none;
    }
  }

  textarea {
    height: 80px;
    resize: none;
  }
}

.receipt-total {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  font-size: 16px;
  font-weight: 600;

  span:first-child {
    margin-right: 24px;
  }
}
</style>
