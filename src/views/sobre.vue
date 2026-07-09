<template>
  <div>
    <header-comp />

    <!-- Page Hero -->
    <section class="pt-32 pb-20 bg-gradient-hero texture-overlay relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none opacity-15">
        <div class="absolute left-0 bottom-0 w-72 lg:w-96">
          <svg viewBox="0 0 300 400" class="w-full">
            <path d="M150 400 Q145 300 135 240 Q110 160 60 120 Q100 150 130 220 Q138 260 143 310 L150 400Z" fill="#4a9e6b"/>
            <path d="M145 260 Q170 180 220 140 Q250 110 240 80 Q210 120 170 175 Q155 215 148 255Z" fill="#2d6e47"/>
          </svg>
        </div>
        <div class="absolute right-0 top-10 w-64 lg:w-80 scale-x-[-1] opacity-20">
          <svg viewBox="0 0 300 400" class="w-full">
            <path d="M150 400 Q145 300 135 240 Q110 160 60 120 Q100 150 130 220 Q138 260 143 310 L150 400Z" fill="#4a9e6b"/>
            <path d="M145 260 Q170 180 220 140 Q250 110 240 80 Q210 120 170 175 Q155 215 148 255Z" fill="#2d6e47"/>
          </svg>
        </div>
      </div>
      <div class="max-w-4xl mx-auto px-5 text-center relative z-10">
        <div class="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/80 text-xs font-display px-4 py-2 rounded-full mb-6 tracking-widest uppercase">
          Sobre o Projeto
        </div>
        <h1 class="font-heading text-5xl md:text-6xl font-bold text-white mb-4">O que é o<br><span class="text-primary-light">Cine Cocais?</span></h1>
        <p class="text-white/50 font-sans max-w-xl mx-auto">Conheça a história, missão e o impacto social do projeto</p>
      </div>
    </section>

    <!-- Descrição -->
    <section class="py-20 bg-sand">
      <div class="max-w-4xl mx-auto px-5">
        <div class="reveal card-rect p-8 md:p-12 mb-10">
          <div class="section-divider mb-6"></div>
          <div class="space-y-5 text-gray-600 leading-relaxed font-sans">
            <p>O <strong class="text-primary font-semibold">Cine Cocais</strong> é uma iniciativa educacional e cultural do Instituto Federal do Maranhão (IFMA) que utiliza o cinema como ferramenta pedagógica para promover reflexão, diálogo e transformação social na comunidade dos Cocais.</p>
            <p>Nascido da necessidade de criar espaços de discussão e valorização da cultura local, o projeto leva a sétima arte para além das telas — transformando cada exibição em uma oportunidade de aprendizado e crescimento coletivo.</p>
            <p>Por meio de exibições de filmes, debates mediados, oficinas e outras atividades, buscamos formar cidadãos mais críticos, conscientes de sua identidade cultural e engajados com as questões sociais do seu território.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div v-for="(card, i) in cards" :key="card.title"
            class="reveal card-hover card-rect p-7"
            :class="`reveal-delay-${i+1}`">
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 shadow-earth"
              :style="{ background: card.bg }">
              <div v-html="card.icon" class="text-white w-6 h-6"></div>
            </div>
            <h3 class="font-heading text-xl font-bold text-primary-dark mb-2">{{ card.title }}</h3>
            <p class="text-gray-500 text-sm leading-relaxed font-sans">{{ card.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Metodologia -->
    <section class="py-24 bg-sand relative overflow-hidden">
      <div class="absolute inset-0 opacity-5 pointer-events-none">
        <div class="absolute top-10 right-10 w-56 h-56 rounded-full bg-primary-light/20 blur-3xl"></div>
      </div>
      <div class="max-w-6xl mx-auto px-5 relative z-10">
        <div class="text-center mb-12 reveal">
          <div class="section-divider mx-auto mb-5"></div>
          <h2 class="font-heading text-4xl md:text-5xl font-bold text-primary-dark mb-4">Como atuamos</h2>
          <p class="text-gray-500 max-w-2xl mx-auto font-sans">Nossa metodologia combina cinema, debate e formação para fortalecer identidade cultural e participação social.</p>
        </div>

        <div class="grid gap-6 md:grid-cols-3">
          <div v-for="(item, i) in metodologia" :key="item.title" class="reveal card-rect p-8" :class="`reveal-delay-${i+1}`">
            <div class="w-14 h-14 rounded-3xl flex items-center justify-center mb-6 text-white" :style="{ background: item.color }">
              <div v-html="item.icon" class="w-7 h-7"></div>
            </div>
            <h3 class="font-heading text-xl font-bold text-primary-dark mb-3">{{ item.title }}</h3>
            <p class="text-gray-600 text-sm leading-relaxed font-sans">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- IFMA -->
    <section class="py-20 bg-sand">
      <div class="max-w-3xl mx-auto px-5 text-center reveal">
        <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
          </svg>
        </div>
        <div class="section-divider mx-auto mb-5"></div>
        <h2 class="font-heading text-3xl font-bold text-primary-dark mb-4">Uma Iniciativa IFMA</h2>
        <p class="text-gray-500 font-sans leading-relaxed">
          O Cine Cocais é um projeto desenvolvido pelo <strong class="text-primary font-semibold">Instituto Federal do Maranhão (IFMA)</strong>, instituição comprometida com a educação pública, gratuita e de qualidade, e com o desenvolvimento social e cultural das comunidades onde está inserida.
        </p>
        <router-link to="/contato"
          class="btn-shine inline-flex items-center gap-2 mt-8 bg-primary text-white font-display font-semibold px-7 py-3.5 rounded-xl transition shadow-earth hover:shadow-xl">
          Fale Conosco
        </router-link>
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

const cards = [
  { title: 'Missão', desc: 'Utilizar o cinema como instrumento de educação, reflexão e transformação social na região dos Cocais.', bg: 'linear-gradient(135deg,#1a4a2e,#2d6e47)', icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>` },
  { title: 'Valores',  desc: 'Respeito à diversidade, valorização cultural, inclusão social e compromisso com a educação de qualidade.', bg: 'linear-gradient(135deg,#1a4a2e,#4a9e6b)', icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>` },
  { title: 'Visão',    desc: 'Ser referência em projetos culturais educacionais, expandindo o alcance do cinema como ferramenta de transformação social.', bg: 'linear-gradient(135deg,#0f2d1c,#1a4a2e)', icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>` },
  { title: 'Impacto',  desc: 'Levando arte, cultura e educação para comunidades com acesso limitado a experiências cinematográficas de qualidade.', bg: 'linear-gradient(135deg,#1a4a2e,#4a9e6b)', icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>` },
]

const metodologia = [
  { title: 'Curadoria consciente', desc: 'Selecionamos filmes e atividades que refletem a cultura local e as temáticas sociais dos Cocais.', color: 'linear-gradient(135deg,#1a4a2e,#4a9e6b)', icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7"/></svg>` },
  { title: 'Debate e diálogo', desc: 'Estimular conversas críticas e acolhedoras após as sessões para fortalecer o pensamento coletivo.', color: 'linear-gradient(135deg,#1a4a2e,#4a9e6b)', icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 8h10M7 12h6m-6 4h4"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 21h8a2 2 0 002-2V7a2 2 0 00-2-2H8a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>` },
  { title: 'Oficinas transformadoras', desc: 'Promovemos formação audiovisual para inspirar jovens e multiplicar saberes na comunidade.', color: 'linear-gradient(135deg,#1a4a2e,#4a9e6b)', icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 1.343-3 3v5h6v-5c0-1.657-1.343-3-3-3z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 8V7a7 7 0 0114 0v1"/></svg>` },
]
</script>