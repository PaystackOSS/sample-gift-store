import gifts from '../../data/gifts.json'

const state = {
  gifts: gifts
}

const getters = {
  cartProducts: (state, getters) => {
    return state.gifts
  },

  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, gift) => {
      return total + gift.price * gift.quantity
    }, 0)
  }
}

const mutations = {

  incrementGiftQuantity (state, id) {
    const cartItem = state.gifts.find(gift => gift.id === id)
    cartItem.quantity++
  },

  decrementGiftQuantity (state, id) {
    const cartItem = state.gifts.find(gift => gift.id === id)
    if (cartItem.quantity > 1) {
      cartItem.quantity--
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
