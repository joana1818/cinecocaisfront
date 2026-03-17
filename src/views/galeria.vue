<template>
  <div>
    <header-comp />

    <section class="pt-32 pb-16 bg-gradient-to-br from-primary-dark to-primary">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h1 class="font-heading text-5xl md:text-6xl font-bold text-white mb-4">Galeria</h1>
        <p class="text-white/80 text-lg">Momentos especiais das nossas atividades e eventos</p>
      </div>
    </section>

    <section class="py-12 bg-gray-50 min-h-[60vh]">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Filtros -->
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

        <loading-comp v-if="loading" />

        <div v-else-if="filtered.length === 0" class="flex flex-col items-center justify-center py-24 text-center">
          <svg class="w-20 h-20 text-gray-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p class="text-gray-400 text-lg font-medium">Nenhuma foto encontrada</p>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <galeria-comp
            v-for="item in filtered"
            :key="item.id"
            :item="item"
            @click="openLightbox"
          />
        </div>
      </div>
    </section>

    <!-- Lightbox -->
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
import { galeriaAPI } from '../services/api'
import headerComp from '../components/header.vue'
import footerComp from '../components/footer.vue'
import galeriaComp from '../components/galeria.vue'
import loadingComp from '../components/loading.vue'

const items = ref([])
const loading = ref(true)
const destaque = ref(null)
const lightboxItem = ref(null)

const filtered = computed(() =>
  destaque.value === null ? items.value : items.value.filter((i) => i.destaque === destaque.value)
)

const openLightbox = (item) => { lightboxItem.value = item }

onMounted(async () => {
  try {
    const res = await galeriaAPI.listar({ ativo: true })
    items.value = res.data
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>