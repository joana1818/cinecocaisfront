<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 py-16">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10">

        <!-- Brand -->
        <div class="md:col-span-1">
          <div class="flex items-center gap-2.5 mb-4">
            <div class="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4" />
              </svg>
            </div>
            <span class="font-heading font-bold text-lg">Cine Cocais</span>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed">
            Cinema, cultura e transformação social. Um projeto educacional do IFMA Campus Cocais.
          </p>
          <div class="flex gap-3 mt-5">
            <a href="#" class="w-8 h-8 bg-white/10 hover:bg-primary rounded-lg flex items-center justify-center transition text-sm font-bold">f</a>
            <a href="#" class="w-8 h-8 bg-white/10 hover:bg-primary rounded-lg flex items-center justify-center transition">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="#" class="w-8 h-8 bg-white/10 hover:bg-primary rounded-lg flex items-center justify-center transition">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
            </a>
          </div>
        </div>

        <!-- Nav -->
        <div>
          <h4 class="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">Navegação</h4>
          <ul class="space-y-2.5">
            <li v-for="item in navLinks" :key="item.path">
              <router-link :to="item.path" class="text-gray-300 hover:text-white text-sm transition">{{ item.label }}</router-link>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">Contato</h4>
          <ul class="space-y-3 text-sm text-gray-300">
            <li class="flex items-start gap-2.5">
              <svg class="w-4 h-4 mt-0.5 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              IFMA Campus Cocais, MA
            </li>
            <li class="flex items-center gap-2.5">
              <svg class="w-4 h-4 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              cinecocais@ifma.edu.br
            </li>
            <li class="flex items-center gap-2.5">
              <svg class="w-4 h-4 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Seg–Sex, 08h às 17h
            </li>
          </ul>
        </div>

        <!-- IFMA -->
        <div>
          <h4 class="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">Iniciativa</h4>
          <div class="bg-white/5 rounded-xl p-4 border border-white/10">
            <p class="text-gray-300 text-sm leading-relaxed">
              Um projeto do <span class="text-white font-semibold">Instituto Federal do Maranhão</span>, comprometido com educação pública e transformação social.
            </p>
          </div>
        </div>
      </div>

      <div class="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
        <p class="text-gray-500 text-sm">© {{ year }} Cine Cocais – IFMA. Todos os direitos reservados.</p>
        <p class="text-gray-600 text-xs">Desenvolvido por alunos do IFMA Campus Cocais</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
const navLinks = [
  { label: 'Início', path: '/' },
  { label: 'Sobre o Projeto', path: '/sobre' },
  { label: 'Programação', path: '/programacao' },
  { label: 'Galeria', path: '/galeria' },
  { label: 'Contato', path: '/contato' },
]
</script>