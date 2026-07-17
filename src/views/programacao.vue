<template>
  <div>
    <header-comp />

    <!-- Header -->
    <section class="pt-32 pb-20 relative overflow-hidden" style="background-image: url('/cocal-bg.png'); background-size: cover; background-position: center;">
      <div class="absolute inset-0 bg-gradient-to-r from-green-900/85 via-green-800/80 to-green-900/85"></div>
      <div class="absolute bottom-0 right-0 opacity-15 pointer-events-none">
        <svg viewBox="0 0 300 400" width="260">
          <path d="M150 400 Q145 300 135 240 Q110 160 60 120 Q100 150 130 220 Q138 260 143 310 L150 400Z" fill="#4a9e6b"/>
          <path d="M145 260 Q170 180 220 140 Q250 110 240 80 Q210 120 170 175 Q155 215 148 255Z" fill="#2d6e47"/>
        </svg>
      </div>
      <div class="max-w-4xl mx-auto px-5 text-center relative z-10">
        <div class="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/80 text-xs font-display px-4 py-2 rounded-full mb-6 tracking-widest uppercase">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          Agenda Cultural
        </div>
        <h1 class="font-heading text-5xl md:text-6xl font-bold text-white mb-4">Programação</h1>
        <p class="text-white/75 font-sans max-w-xl mx-auto">Confira nossa agenda de eventos, exibições e atividades</p>
      </div>
    </section>

    <!-- Conteúdo -->
    <section class="py-16 bg-sand min-h-[60vh]">
      <div class="max-w-7xl mx-auto px-5">

        <!-- Filtros -->
        <div v-if="eventos.length > 0" class="flex flex-col md:flex-row gap-3 mb-10">
          <div class="relative flex-1">
            <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input v-model="search" type="text" placeholder="Buscar eventos..."
              class="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-sand-dark bg-white focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary text-sm font-sans transition">
          </div>
          <select v-model="filterTipo"
            class="px-5 py-3.5 rounded-2xl border border-sand-dark bg-white focus:outline-none focus:ring-2 focus:ring-secondary/20 text-sm font-sans text-gray-600 transition">
            <option value="">Todos os tipos</option>
            <option value="EXIBICAO">Exibição</option>
            <option value="DEBATE">Debate</option>
            <option value="OFICINA">Oficina</option>
            <option value="WORKSHOP">Workshop</option>
          </select>
        </div>

        <!-- Loading -->
        <loading-comp v-if="loading" />

        <!-- Nenhum evento cadastrado -->
        <div v-else-if="!loading && eventos.length === 0" class="py-20">
          <div class="max-w-3xl mx-auto">
            <div class="card-rect p-10 border-primary-light/20 bg-white/95 mx-4">
              <div class="text-xs uppercase tracking-[0.35em] text-primary-light font-semibold mb-4">Sem programação</div>
              <h2 class="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">A programação está sendo montada</h2>
              <p class="text-gray-600 leading-relaxed mb-8">
                No momento não há eventos cadastrados, mas estamos preparando sessões, debates e oficinas especiais para a comunidade. Volte em breve ou fique por dentro das novidades.
              </p>
              <div class="grid gap-4 sm:grid-cols-2">
                <router-link to="/sobre" class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-primary text-white font-semibold shadow-earth hover:bg-primary-light transition">
                  Ver mais sobre o projeto
                </router-link>
                <router-link to="/cadastro" class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-primary-light text-primary-light bg-white hover:bg-green-50 transition">
                  Cadastre-se para avisos
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Sem resultados na busca -->
        <div v-else-if="filtered.length === 0" class="flex flex-col items-center justify-center py-20 text-center">
          <svg class="w-16 h-16 text-gray-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <p class="font-heading text-xl text-gray-400 mb-2">Nenhum evento encontrado</p>
          <p class="text-gray-300 text-sm font-sans">Tente outros termos ou remova os filtros</p>
          <button @click="search=''; filterTipo=''" class="mt-4 text-primary text-sm font-display font-semibold hover:underline">Limpar filtros</button>
        </div>

        <!-- Grid de eventos -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <evento-comp v-for="evento in filtered" :key="evento.id" :evento="evento" @inscrever="handleInscrever" />
        </div>
      </div>
    </section>

    <footer-comp />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { eventosAPI } from '../services/api'
import headerComp from '../components/header.vue'
import footerComp from '../components/footer.vue'
import eventoComp from '../components/evento.vue'
import loadingComp from '../components/loading.vue'
import { useReveal } from '../composables/useReveal'

useReveal()
const router     = useRouter()
const eventos    = ref([])
const loading    = ref(true)
const search     = ref('')
const filterTipo = ref('')

const filtered = computed(() =>
  eventos.value.filter(e => {
    const matchSearch = e.titulo.toLowerCase().includes(search.value.toLowerCase()) ||
                        e.descricao?.toLowerCase().includes(search.value.toLowerCase())
    const matchTipo   = !filterTipo.value || e.tipo === filterTipo.value
    return matchSearch && matchTipo
  })
)

const fetchEventos = async () => {
  try {
    const res = await eventosAPI.listar({ ativo: true })
    eventos.value = res.data
  } catch (e) { console.error(e) }
  finally { loading.value = false }
}

const handleInscrever = async (id) => {
  if (!localStorage.getItem('token')) return router.push('/login')
  try {
    await eventosAPI.inscrever(id)
    alert('Inscrição realizada com sucesso!')
    fetchEventos()
  } catch (e) { alert(e.response?.data?.error || 'Erro ao realizar inscrição') }
}

onMounted(fetchEventos)
</script>