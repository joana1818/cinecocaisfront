<template>
  <div class="group relative overflow-hidden rounded-2xl cursor-pointer" @click="$emit('click', item)">
    <img
      :src="item.imagemUrl"
      :alt="item.titulo"
      class="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
      loading="lazy"
    >
    <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
      <h3 class="text-white font-heading font-bold text-lg">{{ item.titulo }}</h3>
      <p v-if="item.descricao" class="text-white/75 text-sm mt-1 line-clamp-2">{{ item.descricao }}</p>
    </div>
    <div v-if="item.destaque" class="absolute top-3 right-3 bg-secondary text-white text-xs font-semibold px-2.5 py-1 rounded-full">
      Destaque
    </div>
  </div>
</template>

<script setup>
defineProps({ item: { type: Object, required: true } })
defineEmits(['click'])
</script>