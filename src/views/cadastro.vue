<template>
  <div class="min-h-screen bg-cocais-dark flex">
    <!-- Left visual -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-hero texture-overlay items-center justify-center">
      <div class="absolute bottom-0 left-0 opacity-25 pointer-events-none">
        <svg viewBox="0 0 300 500" width="280">
          <path d="M150 500 Q145 380 130 300 Q100 200 50 160 Q90 190 125 275 Q135 315 142 390 L150 500Z" fill="#4a9e6b"/>
          <path d="M140 350 Q105 260 45 210 Q20 175 35 145 Q65 180 108 258 Q127 303 137 342Z" fill="#2d6e47"/>
          <path d="M144 330 Q175 240 230 195 Q262 165 255 130 Q220 170 175 228 Q158 268 150 322Z" fill="#4a9e6b"/>
        </svg>
      </div>
      <div class="relative z-10 text-center text-white px-12">
        <div class="w-20 h-20 mx-auto mb-6 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-sm">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
          </svg>
        </div>
        <h2 class="font-heading text-4xl font-bold mb-3">Junte-se a nós!</h2>
        <p class="text-white/50 font-sans leading-relaxed">Cadastre-se para participar dos eventos, se inscrever nas atividades e acompanhar o Cine Cocais.</p>
      </div>
    </div>

    <!-- Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center px-5 py-12 bg-cocais-cream">
      <div class="w-full max-w-md">
        <!-- Mobile logo -->
        <div class="lg:hidden text-center mb-8">
          <router-link to="/" class="inline-flex items-center gap-3">
            <svg viewBox="0 0 40 40" class="w-10 h-10">
              <circle cx="20" cy="20" r="20" fill="#1a4a2e"/>
              <path d="M20 32 Q19 24 18 18 Q17 12 20 8 Q23 12 22 18 Q21 24 20 32Z" fill="#1a4a2e"/>
              <path d="M20 10 Q14 6 10 8 Q13 12 18 12Z" fill="#4a9e6b"/>
              <path d="M20 10 Q26 6 30 8 Q27 12 22 12Z" fill="#2d6e47"/>
              <path d="M20 10 Q16 4 20 2 Q24 4 20 10Z" fill="#4a9e6b"/>
            </svg>
            <span class="font-heading font-bold text-xl text-primary-dark">Cine Cocais</span>
          </router-link>
        </div>

        <div class="section-divider mb-5"></div>
        <h1 class="font-heading text-3xl font-bold text-primary-dark mb-1">Criar Conta</h1>
        <p class="text-gray-500 font-sans mb-8">Preencha os dados abaixo para se cadastrar</p>

        <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 rounded-2xl px-4 py-3 mb-5 text-sm flex items-center gap-2 font-sans">
          <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          {{ error }}
        </div>

        <form @submit.prevent="submit" class="space-y-4">
          <div>
            <label class="block text-xs font-display font-semibold text-gray-400 uppercase tracking-widest mb-2">Nome Completo</label>
            <input v-model="form.nome" type="text" required
              class="w-full px-4 py-3.5 rounded-2xl border border-sand-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-sans bg-white transition"
              placeholder="Seu nome completo">
          </div>
          <div>
            <label class="block text-xs font-display font-semibold text-gray-400 uppercase tracking-widest mb-2">E-mail</label>
            <input v-model="form.email" type="email" required
              class="w-full px-4 py-3.5 rounded-2xl border border-sand-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-sans bg-white transition"
              placeholder="seu@email.com">
          </div>
          <div>
            <label class="block text-xs font-display font-semibold text-gray-400 uppercase tracking-widest mb-2">Senha</label>
            <input v-model="form.senha" type="password" required minlength="6"
              class="w-full px-4 py-3.5 rounded-2xl border border-sand-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-sans bg-white transition"
              placeholder="Mínimo 6 caracteres">
          </div>

          <button type="submit" :disabled="auth.loading"
            class="btn-shine w-full bg-gradient-cocais disabled:opacity-60 text-white font-display font-semibold py-4 rounded-2xl transition flex items-center justify-center gap-2 shadow-earth hover:shadow-xl mt-2">
            <svg v-if="auth.loading" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            {{ auth.loading ? 'Cadastrando...' : 'Criar Conta' }}
          </button>
        </form>

        <p class="text-center text-gray-500 text-sm font-sans mt-6">
          Já tem uma conta?
          <router-link to="/login" class="text-primary font-display font-semibold hover:underline ml-1">Fazer login</router-link>
        </p>
        <p class="text-center mt-3">
          <router-link to="/" class="text-gray-400 text-sm font-sans hover:text-gray-600 transition">← Voltar ao início</router-link>
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
const auth   = useAuthStore()
// Sem CPF e sem telefone
const form   = ref({ nome: '', email: '', senha: '' })
const error  = ref('')

const submit = async () => {
  error.value = ''
  const result = await auth.register(form.value)
  if (result.success) router.push('/usuario')
  else error.value = result.error
}
</script>