<template>
  <div>
    <header-comp />

    <main class="pt-20 min-h-screen bg-gray-50">
      <!-- Top banner -->
      <div class="bg-gradient-to-r from-primary-dark to-primary py-10 px-4">
        <div class="max-w-6xl mx-auto flex items-center gap-5">
          <div class="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white font-heading text-2xl font-bold">
            {{ initials }}
          </div>
          <div>
            <p class="text-white/70 text-sm">Olá,</p>
            <h1 class="font-heading text-3xl font-bold text-white">{{ user?.nome || '...' }}</h1>
          </div>
        </div>
      </div>

      <div class="max-w-6xl mx-auto px-4 py-10">
        <loading-comp v-if="loading" />

        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Perfil -->
          <div class="lg:col-span-1 space-y-5">
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 class="font-heading text-xl font-bold text-gray-800 mb-4">Meus Dados</h2>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between py-2 border-b border-gray-50">
                  <span class="text-gray-400">Nome</span>
                  <span class="font-medium text-gray-700">{{ user?.nome }}</span>
                </div>
                <div class="flex justify-between py-2 border-b border-gray-50">
                  <span class="text-gray-400">E-mail</span>
                  <span class="font-medium text-gray-700 truncate ml-2">{{ user?.email }}</span>
                </div>
                <div v-if="user?.telefone" class="flex justify-between py-2 border-b border-gray-50">
                  <span class="text-gray-400">Telefone</span>
                  <span class="font-medium text-gray-700">{{ user.telefone }}</span>
                </div>
                <div class="flex justify-between py-2">
                  <span class="text-gray-400">Membro desde</span>
                  <span class="font-medium text-gray-700">{{ formatDate(user?.createdAt) }}</span>
                </div>
              </div>
              <button @click="showEdit = true" class="w-full mt-5 bg-primary hover:bg-primary-dark text-white py-2.5 rounded-xl text-sm font-semibold transition">
                Editar Perfil
              </button>
            </div>
          </div>

          <!-- Inscrições -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 class="font-heading text-xl font-bold text-gray-800 mb-6">Minhas Inscrições</h2>

              <div v-if="inscricoes.length === 0" class="flex flex-col items-center justify-center py-16 text-center">
                <svg class="w-16 h-16 text-gray-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p class="text-gray-400 font-medium mb-3">Você ainda não tem inscrições</p>
                <router-link to="/programacao" class="text-primary font-semibold text-sm hover:underline">Ver eventos disponíveis →</router-link>
              </div>

              <div v-else class="space-y-4">
                <div
                  v-for="i in inscricoes"
                  :key="i.id"
                  class="border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition"
                >
                  <div class="flex items-start justify-between gap-4">
                    <div>
                      <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary mb-2 inline-block">{{ i.evento?.tipo }}</span>
                      <h3 class="font-semibold text-gray-800 mb-1">{{ i.evento?.titulo }}</h3>
                      <div class="flex flex-wrap gap-3 text-xs text-gray-400">
                        <span>{{ formatDate(i.evento?.dataEvento) }}</span>
                        <span>{{ i.evento?.horario }}</span>
                        <span>{{ i.evento?.local }}</span>
                      </div>
                    </div>
                    <button
                      @click="cancelar(i.evento?.id)"
                      class="text-red-400 hover:text-red-600 text-xs font-semibold shrink-0 transition"
                    >Cancelar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal editar -->
    <transition name="fade">
      <div v-if="showEdit" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl p-7 w-full max-w-md">
          <h3 class="font-heading text-2xl font-bold mb-5">Editar Perfil</h3>
          <form @submit.prevent="salvarPerfil" class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Nome</label>
              <input v-model="editForm.nome" type="text" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm">
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Telefone</label>
              <input v-model="editForm.telefone" type="text" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm">
            </div>
            <div class="flex gap-3 pt-2">
              <button type="submit" class="flex-1 bg-primary text-white py-3 rounded-xl font-semibold text-sm hover:bg-primary-dark transition">Salvar</button>
              <button type="button" @click="showEdit = false" class="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-semibold text-sm hover:bg-gray-200 transition">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <footer-comp />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usersAPI, eventosAPI } from '../services/api'
import headerComp from '../components/header.vue'
import footerComp from '../components/footer.vue'
import loadingComp from '../components/loading.vue'

const user = ref(null)
const inscricoes = ref([])
const loading = ref(true)
const showEdit = ref(false)
const editForm = ref({ nome: '', telefone: '' })

const initials = computed(() => {
  if (!user.value) return ''
  return user.value.nome.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
})

const formatDate = (d) => d ? new Date(d).toLocaleDateString('pt-BR') : '--'

const fetch = async () => {
  try {
    const [u, i] = await Promise.all([usersAPI.perfil(), eventosAPI.minhasInscricoes()])
    user.value = u.data
    inscricoes.value = i.data
    editForm.value = { nome: u.data.nome, telefone: u.data.telefone || '' }
  } catch (e) { console.error(e) } finally { loading.value = false }
}

const salvarPerfil = async () => {
  try {
    await usersAPI.atualizarPerfil(editForm.value)
    showEdit.value = false
    fetch()
  } catch { alert('Erro ao salvar') }
}

const cancelar = async (id) => {
  if (!confirm('Cancelar inscrição neste evento?')) return
  try {
    await eventosAPI.cancelar(id)
    fetch()
  } catch { alert('Erro ao cancelar') }
}

onMounted(fetch)
</script>