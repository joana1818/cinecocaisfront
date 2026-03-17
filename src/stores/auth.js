import { defineStore } from 'pinia'
import { authAPI, usersAPI } from '../services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
  }),

  getters: {
    isAuthenticated: (s) => !!s.token,
    isAdmin: (s) => s.user?.tipo === 'ADMIN' || localStorage.getItem('userTipo') === 'ADMIN',
    userName: (s) => s.user?.nome || localStorage.getItem('userName') || 'Usuário',
  },

  actions: {
    async register(data) {
      this.loading = true
      try {
        const res = await authAPI.register(data)
        this._saveSession(res.data)
        return { success: true }
      } catch (e) {
        return { success: false, error: e.response?.data?.error || 'Erro ao cadastrar' }
      } finally {
        this.loading = false
      }
    },

    async login(credentials) {
      this.loading = true
      try {
        const res = await authAPI.login(credentials)
        this._saveSession(res.data)
        return { success: true }
      } catch (e) {
        return { success: false, error: e.response?.data?.error || 'Email ou senha incorretos' }
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('userName')
      localStorage.removeItem('userTipo')
    },

    async fetchUser() {
      if (!this.token) return
      try {
        const res = await usersAPI.perfil()
        this.user = res.data
        localStorage.setItem('userName', res.data.nome)
        localStorage.setItem('userTipo', res.data.tipo)
      } catch {}
    },

    _saveSession({ token, user }) {
      this.token = token
      this.user = user
      localStorage.setItem('token', token)
      localStorage.setItem('userName', user.nome)
      localStorage.setItem('userTipo', user.tipo)
    },
  },
})