<template>
  <div class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
    <div class="h-44 bg-gradient-to-br from-primary to-primary-light flex items-center justify-center relative overflow-hidden">
      <svg class="w-16 h-16 text-white/30 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      <span class="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold" :class="badgeClass">
        {{ tipoLabel }}
      </span>
    </div>

    <div class="p-5">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs text-gray-500 font-medium">{{ formatDate(evento.dataEvento) }}</span>
        <span v-if="evento.vagasTotal" class="text-xs font-medium" :class="vagasClass">
          {{ vagasLivre }} vagas
        </span>
      </div>

      <h3 class="font-heading font-bold text-gray-800 text-lg mb-2 line-clamp-2">{{ evento.titulo }}</h3>
      <p class="text-gray-500 text-sm mb-4 line-clamp-2">{{ evento.descricao }}</p>

      <div class="space-y-1.5 mb-5">
        <div class="flex items-center gap-2 text-sm text-gray-500">
          <svg class="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ evento.horario }}
        </div>
        <div class="flex items-center gap-2 text-sm text-gray-500">
          <svg class="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          {{ evento.local }}
        </div>
      </div>

      <button
        @click="$emit('inscrever', evento.id)"
        :disabled="vagasLivre === 0"
        class="w-full py-2.5 rounded-xl text-sm font-semibold transition"
        :class="vagasLivre === 0
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-secondary hover:bg-secondary-dark text-white'"
      >
        {{ vagasLivre === 0 ? 'Esgotado' : 'Inscrever-se' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ evento: { type: Object, required: true } })
defineEmits(['inscrever'])

const tipoLabel = computed(() => ({
  EXIBICAO: 'Exibição', DEBATE: 'Debate', OFICINA: 'Oficina', WORKSHOP: 'Workshop',
}[props.evento.tipo] || props.evento.tipo))

const badgeClass = computed(() => ({
  EXIBICAO: 'bg-blue-100 text-blue-700',
  DEBATE: 'bg-green-100 text-green-700',
  OFICINA: 'bg-primary-light/15 text-primary-dark',
  WORKSHOP: 'bg-primary-light/15 text-primary-dark',
}[props.evento.tipo] || 'bg-gray-100 text-gray-700'))

const vagasLivre = computed(() =>
  props.evento.vagasTotal ? props.evento.vagasTotal - (props.evento.vagasOcupadas || 0) : 99
)

const vagasClass = computed(() => vagasLivre.value <= 5 ? 'text-red-500' : 'text-green-600')

const formatDate = (date) =>
  new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
</script>