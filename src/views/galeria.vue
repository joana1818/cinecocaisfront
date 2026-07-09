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

        <div v-if="filtered.length === 0" class="flex flex-col items-center justify-center py-24 text-center">
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
import { ref, computed } from 'vue'
import headerComp from '../components/Header.vue'
import footerComp from '../components/footer.vue'
import galeriaComp from '../components/galeria.vue'

const destaque = ref(null)
const lightboxItem = ref(null)

const items = ref([
  { id: 1, titulo: 'Cine Cocais 2022', imagemUrl: '/galeria-placeholder.svg', descricao: 'Atividades presenciais', destaque: true },
  { id: 2, titulo: 'Cine Cocais 2022', imagemUrl: '/galeria-placeholder.svg', descricao: 'Sessão IFMA', destaque: false },
  { id: 3, titulo: 'Cine Cocais 2022', imagemUrl: '/galeria-placeholder.svg', descricao: 'Sessão IFMA', destaque: false },
  { id: 4, titulo: 'Cine Cocais 2022', imagemUrl: '/galeria-placeholder.svg', descricao: 'Sessão IFMA', destaque: false },
  { id: 5, titulo: 'Cine Cocais 2022', imagemUrl: '/galeria-placeholder.svg', descricao: 'Sessão IFMA', destaque: false },
  { id: 6, titulo: 'Cine Cocais 2019', imagemUrl: '/galeria-placeholder.svg', descricao: 'Registros de 2019', destaque: true },
  { id: 7, titulo: 'Cine Cocais 2019', imagemUrl: '/galeria-placeholder.svg', descricao: 'Registros de 2019', destaque: false },
  { id: 8, titulo: 'Cine Cocais 2019', imagemUrl: '/galeria-placeholder.svg', descricao: 'Registros de 2019', destaque: false },
  { id: 9, titulo: 'Cine Cocais 2019', imagemUrl: '/galeria-placeholder.svg', descricao: 'Registros de 2019', destaque: false },
  { id: 10, titulo: 'Cine Cocais 2018', imagemUrl: '/galeria-placeholder.svg', descricao: 'Início do projeto', destaque: false },
  { id: 11, titulo: 'Cine Cocais 2018', imagemUrl: '/galeria-placeholder.svg', descricao: 'Início do projeto', destaque: false },
  { id: 12, titulo: 'Sessão 2025', imagemUrl: '/galeria-placeholder.svg', descricao: 'Ação Olho D\'Aguinha', destaque: true },
  { id: 13, titulo: 'Sessão 2025', imagemUrl: '/galeria-placeholder.svg', descricao: 'Ação Olho D\'Aguinha', destaque: false },
  { id: 14, titulo: 'Sessão 2025', imagemUrl: '/galeria-placeholder.svg', descricao: 'Ação Olho D\'Aguinha', destaque: false }
])

const filtered = computed(() =>
  destaque.value === null ? items.value : items.value.filter((i) => i.destaque === destaque.value)
)

const openLightbox = (item) => { 
  lightboxItem.value = item 
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>