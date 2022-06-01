import gifts from '../../data/gifts.json'

const state = {
  gifts: gifts
}

const getters = {
  cartProducts: (state, getters) => {
    return state.gifts
  },
  orderStatus: (state, getters) => {
    return state.orderStatus
  },

  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, gift) => {
      return total + gift.price * gift.quantity
    }, 0)
  }
}

const mutations = {
  orderStatus (state, order) {
    state.orderStatus = 'success'
    state.order = order
  },
  incrementGiftQuantity (state, id) {
    const cartItem = state.gifts.find(gift => gift.id === id)
    cartItem.quantity++
  },

  decrementGiftQuantity (state, id) {
    const cartItem = state.gifts.find(gift => gift.id === id)
    if (cartItem.quantity > 0) {
      cartItem.quantity--
    }
  }
}

const actions = {
  orderComplete (state, order) {
    state.commit('orderStatus', 'success')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
