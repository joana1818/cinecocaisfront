<template>
  <div class="group relative overflow-hidden rounded-[28px] border border-gray-200/80 bg-white shadow-sm cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1" @click="$emit('click', item)">
    <div class="overflow-hidden">
      <img
        :src="item.imagemUrl || '/galeria-placeholder.svg'"
        :alt="item.titulo || 'Foto da galeria'"
        class="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        loading="lazy"
        @error="handleImageError"
      >
    </div>

    <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-90"></div>

    <div class="absolute inset-x-0 bottom-0 p-5 md:p-6">
      <div class="flex items-center justify-between gap-3 mb-3">
        <span v-if="item.destaque" class="inline-flex items-center rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">Destaque</span>
        <span v-if="item.ano" class="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/80 backdrop-blur-sm">{{ item.ano }}</span>
      </div>

      <h3 class="text-white font-bold text-xl md:text-2xl leading-tight">{{ item.titulo }}</h3>
      <p v-if="item.descricao" class="mt-2 text-sm text-white/80 line-clamp-2">{{ item.descricao }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({ item: { type: Object, required: true } })
defineEmits(['click'])
</script>