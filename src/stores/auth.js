import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
  }),
  actions: {
    async login(credentials) {
      try {
        const response = await axios.post('http://localhost:8000/api/login', credentials)
        this.token = response.data.access_token
        localStorage.setItem('token', this.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        await this.fetchUser()
      } catch (error) {
        throw error
      }
    },

    async fetchUser() {
      try {
        const response = await axios.get('http://localhost:8000/api/me')
        this.user = response.data
      } catch (error) {
        this.logout()
      }
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    },
  },
})
