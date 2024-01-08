import { defineStore } from 'pinia'

export const useDatabaseAffiliationStore = defineStore('databaseAffiliationStore', {
  state: () => ({
    cart: {}
  }),
  actions: {
    addToCart(product) {
      Object.prototype.hasOwnProperty.call(this.cart, product.name)
        ? this.cart[product.name].quantity++
        : this.cart[product.name] = { quantity: 1, ...product };
    },
    removeFromCart(productName) {
      delete this.cart[productName];
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