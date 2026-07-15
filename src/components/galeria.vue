<template>
  <div class="group relative overflow-hidden rounded-2xl cursor-pointer" @click="$emit('click', item)">
    <img
      :src="item.imagemUrl"
      :alt="item.titulo"
      class="w-full h-[450px] md:h-[550px] object-cover transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
    >
    <!-- Overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 md:p-7">
      <div class="text-right">
        <span v-if="item.destaque" class="inline-block bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full">Destaque</span>
      </div>
      <div>
        <h3 class="text-white font-bold text-xl md:text-2xl leading-tight">{{ item.titulo }}</h3>
        <p v-if="item.descricao" class="text-white/85 text-sm md:text-base mt-2 line-clamp-2">{{ item.descricao }}</p>
        <p class="text-white/60 text-xs mt-3">{{ item.ano }}</p>
      </div>
    </div>
    <!-- Badge ano -->
    <div class="absolute top-4 left-4 bg-black/60 text-white text-sm font-semibold px-3 py-1.5 rounded-full">
      {{ item.ano }}
    </div>
  </div>
</template>

<script setup>
defineProps({ item: { type: Object, required: true } })
defineEmits(['click'])
</script>