<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Left visual -->
    <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-dark via-primary to-primary-light items-center justify-center relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-1/3 left-1/3 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-1/3 right-1/3 w-48 h-48 bg-secondary rounded-full blur-3xl"></div>
      </div>
      <div class="relative z-10 text-center text-white px-12">
        <div class="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
          <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4" />
          </svg>
        </div>
        <h2 class="font-heading text-4xl font-bold mb-4">Cine Cocais</h2>
        <p class="text-white/75 leading-relaxed">Cinema, cultura e transformação social. Acesse sua conta para participar dos nossos eventos.</p>
      </div>
    </div>

    <!-- Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center px-4 py-12">
      <div class="w-full max-w-md">
        <div class="lg:hidden text-center mb-8">
          <router-link to="/" class="inline-flex items-center gap-2">
            <div class="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4" />
              </svg>
            </div>
            <span class="font-heading font-bold text-lg text-primary">Cine Cocais</span>
          </router-link>
        </div>

        <h1 class="font-heading text-3xl font-bold text-gray-800 mb-2">Bem-vindo de volta!</h1>
        <p class="text-gray-500 mb-8">Entre na sua conta para acessar o sistema</p>

        <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 mb-5 text-sm flex items-center gap-2">
          <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ error }}
        </div>

        <form @submit.prevent="submit" class="space-y-5">
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">E-mail</label>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition"
              placeholder="seu@email.com"
            >
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Senha</label>
            <div class="relative">
              <input
                v-model="form.senha"
                :type="showPass ? 'text' : 'password'"
                required
                class="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition pr-12"
                placeholder="Sua senha"
              >
              <button type="button" @click="showPass = !showPass" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="!showPass" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path v-if="!showPass" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>
          <button
            type="submit"
            :disabled="auth.loading"
            class="w-full bg-primary hover:bg-primary-dark disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
          >
            <svg v-if="auth.loading" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {{ auth.loading ? 'Entrando...' : 'Entrar' }}
          </button>
        </form>

        <p class="text-center text-gray-500 text-sm mt-6">
          Não tem uma conta?
          <router-link to="/cadastro" class="text-primary font-semibold hover:underline">Cadastre-se</router-link>
        </p>
        <p class="text-center mt-3">
          <router-link to="/" class="text-gray-400 text-sm hover:text-gray-600 transition">← Voltar ao início</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()
const form = ref({ email: '', senha: '' })
const error = ref('')
const showPass = ref(false)

const submit = async () => {
  error.value = ''
  const result = await auth.login(form.value)
  if (result.success) {
    router.push(auth.isAdmin ? '/admin' : '/usuario')
  } else {
    error.value = result.error
  }
}
</script>