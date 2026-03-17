<template>
  <div>
    <header-comp />

    <section class="pt-32 pb-16 bg-gradient-to-br from-primary-dark to-primary">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h1 class="font-heading text-5xl md:text-6xl font-bold text-white mb-4">Contato</h1>
        <p class="text-white/80 text-lg">Entre em contato conosco e faça parte deste projeto</p>
      </div>
    </section>

    <section class="py-16 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-10">

          <!-- Info -->
          <div class="lg:col-span-2">
            <h2 class="font-heading text-3xl font-bold text-gray-800 mb-3">Fale Conosco</h2>
            <p class="text-gray-500 text-sm leading-relaxed mb-8">
              Tem alguma dúvida, sugestão ou deseja participar das nossas atividades? Entre em contato.
            </p>

            <div class="space-y-4">
              <div v-for="info in contactInfo" :key="info.label" class="flex items-start gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div class="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
                  <component :is="'div'" v-html="info.icon" class="text-secondary"></component>
                </div>
                <div>
                  <p class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{{ info.label }}</p>
                  <p class="text-gray-700 text-sm font-medium">{{ info.value }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Form -->
          <div class="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 class="font-heading text-2xl font-bold text-gray-800 mb-6">Envie uma Mensagem</h3>

            <div v-if="success" class="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-6 flex items-center gap-3">
              <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Mensagem enviada com sucesso! Entraremos em contato em breve.
            </div>

            <form @submit.prevent="submit" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Nome</label>
                  <input v-model="form.nome" type="text" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition" placeholder="Seu nome">
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">E-mail</label>
                  <input v-model="form.email" type="email" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition" placeholder="seu@email.com">
                </div>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Assunto</label>
                <input v-model="form.assunto" type="text" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition" placeholder="Assunto da mensagem">
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Mensagem</label>
                <textarea v-model="form.mensagem" required rows="5" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition resize-none" placeholder="Escreva sua mensagem..."></textarea>
              </div>
              <button
                type="submit"
                :disabled="loading"
                class="w-full bg-secondary hover:bg-secondary-dark disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
              >
                <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {{ loading ? 'Enviando...' : 'Enviar Mensagem' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <footer-comp />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { contatoAPI } from '../services/api'
import headerComp from '../components/header.vue'
import footerComp from '../components/footer.vue'

const form = ref({ nome: '', email: '', assunto: '', mensagem: '' })
const loading = ref(false)
const success = ref(false)

const contactInfo = [
  {
    label: 'Endereço',
    value: 'IFMA Campus Cocais, Maranhão, Brasil',
    icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
  },
  {
    label: 'E-mail',
    value: 'projetocinecocais@gmail.com',
    icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`,
  },
  {
    label: 'Telefone',
    value: '(98) 98436-9094',
    icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>`,
  },
  
]

const submit = async () => {
  loading.value = true
  try {
    await contatoAPI.enviar(form.value)
    success.value = true
    form.value = { nome: '', email: '', assunto: '', mensagem: '' }
    setTimeout(() => { success.value = false }, 5000)
  } catch (e) {
    alert(e.response?.data?.error || 'Erro ao enviar mensagem')
  } finally {
    loading.value = false
  }
}
</script>