<template>
  <div>
    <header-comp />

    <!-- Hero -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-light">
      <!-- Background pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <!-- Palmeiras decorativas (SVG) -->
      <div class="absolute bottom-0 left-0 opacity-20 pointer-events-none">
        <svg width="220" height="320" viewBox="0 0 220 320" fill="white">
          <path d="M110 320 Q100 200 80 150 Q50 80 20 60 Q60 90 85 160 Q90 180 95 220 L110 320Z"/>
          <path d="M95 220 Q70 140 30 100 Q0 70 10 40 Q40 80 70 130 Q85 160 90 200 L95 220Z"/>
          <path d="M100 200 Q120 120 160 80 Q190 50 200 20 Q170 60 145 110 Q120 155 108 190 L100 200Z"/>
        </svg>
      </div>
      <div class="absolute bottom-0 right-0 opacity-20 pointer-events-none scale-x-[-1]">
        <svg width="220" height="320" viewBox="0 0 220 320" fill="white">
          <path d="M110 320 Q100 200 80 150 Q50 80 20 60 Q60 90 85 160 Q90 180 95 220 L110 320Z"/>
          <path d="M95 220 Q70 140 30 100 Q0 70 10 40 Q40 80 70 130 Q85 160 90 200 L95 220Z"/>
          <path d="M100 200 Q120 120 160 80 Q190 50 200 20 Q170 60 145 110 Q120 155 108 190 L100 200Z"/>
        </svg>
      </div>

      <div class="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div class="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-sm px-4 py-1.5 rounded-full mb-8">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Projeto Cultural · IFMA Campus Cocais
        </div>

        <h1 class="font-heading text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
          Cine Cocais
        </h1>

        <p class="text-2xl md:text-3xl text-white/85 font-light mb-4">
          Cinema, Cultura e Transformação Social
        </p>

        <p class="text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
          Uma iniciativa educacional que utiliza o cinema como ferramenta de reflexão, diálogo e transformação, valorizando a cultura e identidade do território dos Cocais.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <router-link
            to="/programacao"
            class="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white font-semibold px-8 py-4 rounded-xl transition transform hover:-translate-y-0.5 shadow-lg shadow-secondary/30"
          >
            Ver Programação
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </router-link>
          <router-link
            to="/sobre"
            class="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/25 text-white font-semibold px-8 py-4 rounded-xl transition"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Conheça o Projeto
          </router-link>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50">
        <span class="text-xs">Role para ver mais</span>
        <svg class="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="stat in stats" :key="stat.label" class="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
            <div class="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
              <component :is="'div'" v-html="stat.icon" class="text-secondary"></component>
            </div>
            <div class="font-heading text-4xl font-bold text-gray-800 mb-1">{{ stat.value }}</div>
            <div class="text-gray-500 text-sm font-medium">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- O Poder do Cinema -->
    <section class="py-24 bg-white">
      <div class="max-w-6xl mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="font-heading text-4xl md:text-5xl font-bold text-gray-800 mb-4">O Poder do Cinema</h2>
          <p class="text-gray-500 max-w-xl mx-auto">Transformando realidades através da arte cinematográfica e do diálogo comunitário.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="feat in features" :key="feat.title" class="text-center group">
            <div class="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/10 transition">
              <component :is="'div'" v-html="feat.icon" class="text-primary w-8 h-8"></component>
            </div>
            <div class="w-12 h-0.5 bg-secondary mx-auto mb-5"></div>
            <h3 class="font-heading text-xl font-bold text-gray-800 mb-3">{{ feat.title }}</h3>
            <p class="text-gray-500 text-sm leading-relaxed">{{ feat.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4">
        <div class="bg-gradient-to-br from-primary-dark via-primary to-primary-light rounded-3xl p-10 md:p-16 overflow-hidden relative">
          <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div class="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          <div class="relative z-10 max-w-2xl">
            <h2 class="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Participe das Nossas Atividades
            </h2>
            <p class="text-white/80 text-lg mb-8">
              Exibições de filmes, debates, oficinas e muito mais. Junte-se a nós nessa jornada cultural.
            </p>
            <div class="flex flex-wrap gap-4">
              <router-link
                to="/programacao"
                class="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white font-semibold px-7 py-3.5 rounded-xl transition"
              >
                Confira a Programação
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </router-link>
              <router-link
                to="/cadastro"
                class="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/25 text-white font-semibold px-7 py-3.5 rounded-xl transition"
              >
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
import headerComp from '../components/header.vue'
import footerComp from '../components/footer.vue'

const stats = [
  {
    value: '500+',
    label: 'Participantes',
    icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
  },
  {
    value: '24',
    label: 'Exibições Realizadas',
    icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4"/></svg>`,
  },
  {
    value: '12',
    label: 'Eventos Culturais',
    icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`,
  },
]

const features = [
  {
    title: 'Cultura e Identidade',
    desc: 'Valorizando as raízes culturais do território maranhense e a identidade dos Cocais através do cinema.',
    icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  },
  {
    title: 'Transformação Social',
    desc: 'Promovendo reflexão e diálogo sobre questões sociais relevantes para a comunidade local.',
    icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`,
  },
  {
    title: 'Educação Audiovisual',
    desc: 'Formando novos olhares críticos e conscientes através da sétima arte e de oficinas práticas.',
    icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>`,
  },
]
</script>