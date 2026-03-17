<template>
  <div class="flex flex-col items-center justify-center py-20 gap-3">
    <div class="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
    <p class="text-sm text-gray-500">{{ message }}</p>
  </div>
</template>

<script setup>
defineProps({ message: { type: String, default: 'Carregando...' } })
</script>