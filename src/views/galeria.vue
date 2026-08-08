<template>
  <div>
    <header-comp />

    <section class="pt-32 pb-16 relative overflow-hidden" style="background-image: url('/cocal-bg.png'); background-size: cover; background-position: center;">
      <div class="absolute inset-0 bg-gradient-to-r from-green-900/85 via-green-800/80 to-green-900/85"></div>
      <div class="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h1 class="font-heading text-5xl md:text-6xl font-bold text-white mb-4">Galeria Cine Cocais</h1>
        <p class="text-white/85 text-lg">Memórias que contam nossa história: do início do projeto ao Festival 2025</p>
      </div>
    </section>

    <section class="py-12 bg-gray-50 min-h-[60vh]">
      <div class="max-w-7xl mx-auto px-4">
        
        <div class="flex gap-3 mb-8">
          <button
            @click="destaque = null"
            :class="destaque === null ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50'"
            class="px-5 py-2 rounded-xl text-sm font-semibold transition border border-gray-200"
          >Todas</button>
          <button
            @click="destaque = true"
            :class="destaque === true ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50'"
            class="px-5 py-2 rounded-xl text-sm font-semibold transition border border-gray-200"
          >Destaques</button>
        </div>

        <div v-if="loading" class="flex flex-col items-center justify-center py-24 text-center">
          <p class="text-gray-400 text-lg font-medium">Carregando galeria...</p>
        </div>

        <div v-else-if="error" class="flex flex-col items-center justify-center py-24 text-center">
          <p class="text-red-500 text-lg font-medium mb-2">Não foi possível abrir a galeria</p>
          <p class="text-gray-400 text-sm">{{ error }}</p>
          <button @click="fetchGaleria" class="mt-4 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition">Tentar novamente</button>
        </div>

        <div v-else-if="filtered.length === 0" class="flex flex-col items-center justify-center py-24 text-center">
          <svg class="w-20 h-20 text-gray-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p class="text-gray-400 text-lg font-medium">Nenhuma foto cadastrada no momento</p>
        </div>

        <div v-else class="space-y-12">
          <section class="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
            <div class="mb-6">
              <h2 class="font-heading text-3xl md:text-4xl font-bold text-primary-dark">Raízes do Cine Cocais</h2>
              <p class="text-gray-500 mt-2">Início do projeto: os primeiros passos que transformaram ideia em movimento cultural.</p>
            </div>

            <div v-if="fotosAntigas.length === 0" class="text-gray-400 text-sm">Nenhuma foto antiga encontrada com os filtros atuais.</div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              <galeria-comp
                v-for="item in fotosAntigas"
                :key="item.id"
                :item="item"
                @click="openLightbox"
              />
            </div>
          </section>

          <section class="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
            <div class="mb-6">
              <h2 class="font-heading text-3xl md:text-4xl font-bold text-primary-dark">Cine Cocais 2025</h2>
              <p class="text-gray-500 mt-2">Festival 2025: encontros, protagonismo estudantil e celebração do cinema no IFMA.</p>
            </div>

            <div v-if="fotosAtuais.length === 0" class="text-gray-400 text-sm">Nenhuma foto de 2025 encontrada com os filtros atuais.</div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              <galeria-comp
                v-for="item in fotosAtuais"
                :key="item.id"
                :item="item"
                @click="openLightbox"
              />
            </div>
          </section>
        </div>
      </div>
    </section>

    <transition name="fade">
      <div
        v-if="lightboxItem"
        @click="lightboxItem = null"
        class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      >
        <button @click="lightboxItem = null" class="absolute top-4 right-4 text-white/70 hover:text-white">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div class="max-w-4xl w-full" @click.stop>
          <img :src="lightboxItem.imagemUrl" :alt="lightboxItem.titulo" class="w-full rounded-2xl shadow-2xl max-h-[80vh] object-contain">
          <div class="text-white mt-4 text-center">
            <h3 class="font-heading text-2xl font-bold">{{ lightboxItem.titulo }}</h3>
            <p v-if="lightboxItem.descricao" class="text-white/60 mt-1 text-sm">{{ lightboxItem.descricao }}</p>
          </div>
        </div>
      </div>
    </transition>

    <footer-comp />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { galeriaAPI, resolveAssetUrl } from '../services/api'
import headerComp from '../components/header.vue'
import footerComp from '../components/footer.vue'
import galeriaComp from '../components/galeria.vue'

const destaque = ref(null)
const lightboxItem = ref(null)
const loading = ref(true)
const error = ref('')

const items = ref([])

const filtered = computed(() =>
  destaque.value === null ? items.value : items.value.filter((i) => i.destaque === destaque.value)
)

const isFotoAntiga = (item) => {
  const url = item?.imagemUrl || ''
  return /\/uploads\/(2018|2019|2022)/i.test(url)
}

const fotosAntigas = computed(() => filtered.value.filter(isFotoAntiga))
const fotosAtuais = computed(() => filtered.value.filter((item) => !isFotoAntiga(item)))

const openLightbox = (item) => { 
  lightboxItem.value = item 
}

const fetchGaleria = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await galeriaAPI.listar({ ativo: true })
    items.value = (res.data || []).map((item) => ({
      ...item,
      imagemUrl: resolveAssetUrl(item.imagemUrl),
    }))
  } catch (e) {
    error.value = e.response?.data?.error || 'Não foi possível carregar a galeria agora.'
    items.value = []
  } finally {
    loading.value = false
  }
}

onMounted(fetchGaleria)
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>