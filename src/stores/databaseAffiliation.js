import { defineStore } from 'pinia'

export const useDatabaseAffiliationStore = defineStore('databaseAffiliationStore', {
  state: () => ({
    cart: {}
  }),
  actions: {
    addToCart(product) {
      Object.prototype.hasOwnProperty.call(this.cart, product.id)
        ? this.cart[product.id].quantity++
        : this.cart[product.id] = { quantity: 1, ...product };
    }
  },
  getters: {
    totalQuantity() {
      return Object.values(this.cart).reduce((acc, { quantity }) => acc + quantity, 0)
    },
    totalPrice() {
      return Object.values(this.cart).reduce((acc, { quantity, price }) => acc + quantity * price, 0)
    }
  }
})