import { db } from '@/firebaseConfig';
import { defineStore } from 'pinia'

export const useDatabaseAffiliationStore = defineStore('databaseAffiliationStore', {
  state: () => ({
    products: [],
    cart: {}
  }),
  actions: {
    async fetchData() {
      try {
        const res = await fetch('api.json')
        this.products = await res.json()
      } catch (error) {
        console.log(error)
      }
    },
    addToCart(product) {
      console.log(product);
      Object.prototype.hasOwnProperty.call(this.cart, product.id)
        ? product.quantity = this.cart[product.id].quantity++
        : product.quantity = 1;
      this.carrito[product.id] = { ...product }
      console.log(this.cart);
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