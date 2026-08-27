<template>
  <div>
    <header-comp />

    <!-- ===== HERO ===== -->
    <section class="hero-bg relative min-h-[600px] flex items-center overflow-hidden pt-40 pb-32" style="background-image: url('/cocal-bg.png'); background-size: cover; background-position: center;">
      <div class="absolute inset-0 bg-gradient-to-r from-green-800/75 via-green-700/70 to-green-900/75"></div>
      <div class="max-w-5xl mx-auto px-5 text-center relative z-10">
        <span class="inline-block mb-8 px-4 py-2 rounded-full border border-white/20 bg-white/10 text-white text-xs uppercase tracking-widest font-semibold">
          Cine Cocais · Cultura, cinema e juventude
        </span>

        <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          Cine Cocais: uma plataforma cultural que conecta
          <span class="text-white">cinema e comunidade.</span>
        </h1>

        <p class="mx-auto max-w-2xl text-white/80 text-lg leading-relaxed mb-10">
          Um projeto do IFMA Campus Coelho Neto que traz exibições, debates e oficinas para fortalecer a identidade dos Cocais com arte, educação e participação social.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <router-link to="/programacao"
            class="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark text-white font-semibold px-8 py-4 rounded-full transition">
            Ver Programação
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
          </router-link>
          <router-link to="/sobre"
            class="inline-flex items-center justify-center gap-2 border border-white/25 text-white font-semibold px-8 py-4 rounded-full transition hover:bg-white/10">
            Conheça o Projeto
          </router-link>
        </div>
      </div>
    </section>

    <!-- ===== O QUE FAZEMOS ===== -->
    <section class="py-16 bg-cocais-dark">
      <div class="max-w-6xl mx-auto px-5">
        <div class="text-center mb-12 reveal">
          <div class="section-divider mx-auto mb-4"></div>
          <h2 class="text-3xl md:text-4xl font-bold text-primary mb-3">O que fazemos</h2>
          <p class="text-white/50 max-w-lg mx-auto">Atividades que transformam a comunidade através da cultura cinematográfica</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div v-for="(ativ, i) in atividades" :key="ativ.title"
            class="reveal card-hover card-rect p-6"
            :class="`reveal-delay-${i+1}`">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              :style="{ background: ativ.bg }">
              <div v-html="ativ.icon" class="w-6 h-6 text-white"></div>
            </div>
            <h3 class="text-lg font-bold text-primary mb-2">{{ ativ.title }}</h3>
            <p class="text-gray-600 text-sm leading-relaxed">{{ ativ.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== O PODER DO CINEMA ===== -->
    <section class="py-20 bg-sand">
      <div class="max-w-6xl mx-auto px-5">
        <div class="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <div class="section-divider mb-4"></div>
            <h2 class="text-3xl md:text-4xl font-bold text-primary mb-5">O Poder do Cinema</h2>
            <p class="text-gray-600 leading-relaxed mb-6">
              Uma narrativa viva do território para a tela: o cinema como ferramenta de reflexão, diálogo e transformação social, valorizando a cultura e a identidade dos Cocais.
            </p>
            <div class="grid gap-4 sm:grid-cols-2">
              <div class="card-rect p-5">
                <h3 class="font-bold text-primary mb-2">Cocais em pé</h3>
                <p class="text-gray-500 text-sm leading-relaxed">Uma imagem forte do território que respira cinema, educação e cultura.</p>
              </div>
              <div class="card-rect p-5">
                <h3 class="font-bold text-primary mb-2">Impacto real</h3>
                <p class="text-gray-500 text-sm leading-relaxed">A força do cinema como eixo cultural, educativo e social nos Cocais.</p>
              </div>
            </div>
          </div>

          <div class="card-rect overflow-hidden">
            <div class="bg-primary text-white p-8">
              <span class="text-xs uppercase tracking-widest text-white/70">Território em Movimento</span>
              <h3 class="mt-3 text-2xl font-bold">Cocais em pé</h3>
              <p class="mt-3 text-sm text-white/80 leading-relaxed">Uma narrativa visual alinhada com a cultura, o cinema e a ação social dos Cocais.</p>
            </div>
            <div class="p-6 grid gap-4">
              <div class="border border-sand-dark rounded-xl p-5">
                <h4 class="font-semibold text-primary mb-1">Oficinas criativas</h4>
                <p class="text-gray-500 text-sm">Espaços de formação prática e produção audiovisual para jovens.</p>
              </div>
              <div class="border border-sand-dark rounded-xl p-5">
                <h4 class="font-semibold text-primary mb-1">Exibições transformadoras</h4>
                <p class="text-gray-500 text-sm">Sessões que fomentam identidade, memória e conversa comunitária.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== CTA ===== -->
    <section class="py-16 bg-sand">
      <div class="max-w-6xl mx-auto px-5">
        <div class="reveal bg-primary rounded-3xl p-10 md:p-14">
          <div class="max-w-2xl">
            <div class="section-divider mb-5" style="background:#fff;"></div>
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Participe das Nossas Atividades</h2>
            <p class="text-white/70 text-lg mb-8">Exibições, debates, oficinas e muito mais. Junte-se a nós nessa jornada cultural pelos Cocais.</p>
            <div class="flex flex-wrap gap-4">
              <router-link to="/programacao"
                class="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white font-semibold px-7 py-3.5 rounded-xl transition">
                Confira a Programação
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
              </router-link>
              <router-link to="/cadastro"
                class="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold px-7 py-3.5 rounded-xl transition">
                Cadastrar-se
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer-comp />
  </div>
</template>

<script setup>
import headerComp from '../components/Header.vue'
import footerComp from '../components/footer.vue'
import { useReveal } from '../composables/useReveal'

useReveal()

const atividades = [
  { title: 'Exibições', desc: 'Sessões de filmes nacionais e internacionais com discussão mediada.', bg: '#2d5f4f', icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>` },
  { title: 'Debates',   desc: 'Rodas de conversa sobre temas sociais, culturais e cinematográficos.', bg: '#ff8c42', icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>` },
  { title: 'Oficinas',  desc: 'Atividades práticas de produção audiovisual e linguagem cinematográfica.', bg: '#1e4038', icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>` },
  { title: 'Festivais', desc: 'Eventos anuais com mostras, premiações e celebração da produção local.', bg: '#e6702a', icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>` },
]
</script>