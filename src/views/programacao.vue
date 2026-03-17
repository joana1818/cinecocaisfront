<template>
  <div>
    <header-comp />

    <!-- Header -->
    <section class="pt-32 pb-16 bg-gradient-to-br from-primary-dark to-primary">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h1 class="font-heading text-5xl md:text-6xl font-bold text-white mb-4">Programação</h1>
        <p class="text-white/80 text-lg">Confira nossa agenda de eventos, exibições e atividades</p>
      </div>
    </section>

    <!-- Filters + List -->
    <section class="py-12 bg-gray-50 min-h-[60vh]">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Filters -->
        <div class="flex flex-col md:flex-row gap-3 mb-8">
          <div class="relative flex-1">
            <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              v-model="search"
              type="text"
              placeholder="Buscar eventos..."
              class="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
            >
          </div>
          <select
            v-model="filterTipo"
            class="px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm text-gray-600"
          >
            <option value="">Todos os tipos</option>
            <option value="EXIBICAO">Exibição</option>
            <option value="DEBATE">Debate</option>
            <option value="OFICINA">Oficina</option>
            <option value="WORKSHOP">Workshop</option>
          </select>
        </div>

        <!-- Loading -->
        <loading-comp v-if="loading" />

        <!-- Empty -->
        <div v-else-if="filtered.length === 0" class="flex flex-col items-center justify-center py-24 text-center">
          <svg class="w-20 h-20 text-gray-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p class="text-gray-400 text-lg font-medium">Nenhum evento encontrado</p>
          <p class="text-gray-300 text-sm mt-1">Tente outro filtro ou aguarde novos eventos</p>
        </div>

        <!-- Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <evento-comp
            v-for="evento in filtered"
            :key="evento.id"
            :evento="evento"
            @inscrever="handleInscrever"
          />
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

const router = useRouter()
const eventos = ref([])
const loading = ref(true)
const search = ref('')
const filterTipo = ref('')

const filtered = computed(() =>
  eventos.value.filter((e) => {
    const matchSearch = e.titulo.toLowerCase().includes(search.value.toLowerCase()) ||
                       e.descricao?.toLowerCase().includes(search.value.toLowerCase())
    const matchTipo = !filterTipo.value || e.tipo === filterTipo.value
    return matchSearch && matchTipo
  })
)

const fetchEventos = async () => {
  try {
    const res = await eventosAPI.listar({ ativo: true })
    eventos.value = res.data
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

const handleInscrever = async (id) => {
  if (!localStorage.getItem('token')) return router.push('/login')
  try {
    await eventosAPI.inscrever(id)
    alert('Inscrição realizada com sucesso!')
  } catch (e) {
    alert(e.response?.data?.error || 'Erro ao realizar inscrição')
  }
}

onMounted(fetchEventos)
</script>