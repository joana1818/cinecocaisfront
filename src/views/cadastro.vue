<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Left visual -->
    <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-dark via-primary to-primary-light items-center justify-center relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-1/3 left-1/3 w-64 h-64 bg-white rounded-full blur-3xl"></div>
      </div>
      <div class="relative z-10 text-center text-white px-12">
        <div class="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
          <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h2 class="font-heading text-4xl font-bold mb-4">Junte-se a nós!</h2>
        <p class="text-white/75 leading-relaxed">Cadastre-se para participar dos eventos, se inscrever nas atividades e acompanhar o Cine Cocais.</p>
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

        <h1 class="font-heading text-3xl font-bold text-gray-800 mb-2">Criar Conta</h1>
        <p class="text-gray-500 mb-8">Preencha os dados abaixo para se cadastrar</p>

        <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 mb-5 text-sm flex items-center gap-2">
          <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ error }}
        </div>

        <form @submit.prevent="submit" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Nome Completo</label>
            <input v-model="form.nome" type="text" required class="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition" placeholder="Seu nome completo">
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">E-mail</label>
            <input v-model="form.email" type="email" required class="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition" placeholder="seu@email.com">
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">CPF <span class="normal-case font-normal text-gray-400">(opcional)</span></label>
              <input v-model="form.cpf" type="text" class="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition" placeholder="000.000.000-00">
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Telefone <span class="normal-case font-normal text-gray-400">(opcional)</span></label>
              <input v-model="form.telefone" type="text" class="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition" placeholder="(99) 99999-9999">
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Senha</label>
            <input v-model="form.senha" type="password" required minlength="6" class="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition" placeholder="Mínimo 6 caracteres">
          </div>
          <button
            type="submit"
            :disabled="auth.loading"
            class="w-full bg-secondary hover:bg-secondary-dark disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition flex items-center justify-center gap-2 mt-2"
          >
            <svg v-if="auth.loading" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {{ auth.loading ? 'Cadastrando...' : 'Criar Conta' }}
          </button>
        </form>

        <p class="text-center text-gray-500 text-sm mt-6">
          Já tem uma conta?
          <router-link to="/login" class="text-primary font-semibold hover:underline">Fazer login</router-link>
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
const form = ref({ nome: '', email: '', cpf: '', telefone: '', senha: '' })
const error = ref('')

const submit = async () => {
  error.value = ''
  const result = await auth.register(form.value)
  if (result.success) {
    router.push('/usuario')
  } else {
    error.value = result.error
  }
}
</script>