<template>
  <div>
    <header-comp />

    <!-- Page Header -->
    <section class="pt-32 pb-20 bg-gray-50">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <span class="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">Sobre o Projeto</span>
        <h1 class="font-heading text-5xl md:text-6xl font-bold text-gray-800 mb-4">O que é o Cine Cocais?</h1>
        <p class="text-gray-500 text-lg max-w-2xl mx-auto">Conheça a história, missão e o impacto social do projeto</p>
      </div>
    </section>

    <!-- Descrição -->
    <section class="py-16 bg-white">
      <div class="max-w-4xl mx-auto px-4">
        <div class="bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-8 md:p-12 mb-12 border border-primary/10">
          <div class="space-y-4 text-gray-600 leading-relaxed text-base">
            <p>
              O <strong class="text-primary">Cine Cocais</strong> é uma iniciativa educacional e cultural do Instituto Federal do Maranhão (IFMA) que utiliza o cinema como ferramenta pedagógica para promover reflexão, diálogo e transformação social na comunidade dos Cocais.
            </p>
            <p>
              Nascido da necessidade de criar espaços de discussão e valorização da cultura local, o projeto leva a sétima arte para além das telas — transformando cada exibição em uma oportunidade de aprendizado e crescimento coletivo.
            </p>
            <p>
              Por meio de exibições de filmes, debates mediados, oficinas e outras atividades, buscamos formar cidadãos mais críticos, conscientes de sua identidade cultural e engajados com as questões sociais do seu território.
            </p>
          </div>
        </div>

        <!-- Cards Missão / Valores -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div v-for="card in cards" :key="card.title" class="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-md transition">
            <div class="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
              <component :is="'div'" v-html="card.icon" class="text-secondary"></component>
            </div>
            <h3 class="font-heading text-xl font-bold text-gray-800 mb-2">{{ card.title }}</h3>
            <p class="text-gray-500 text-sm leading-relaxed">{{ card.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Impacto -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-5xl mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="font-heading text-4xl font-bold text-gray-800 mb-2">Nosso Impacto</h2>
          <p class="text-gray-500">Números que refletem a força do cinema na comunidade</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="stat in impact" :key="stat.label" class="text-center">
            <div class="font-heading text-5xl font-bold text-secondary mb-1">{{ stat.value }}</div>
            <div class="text-gray-500 text-sm">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- IFMA -->
    <section class="py-20 bg-white">
      <div class="max-w-3xl mx-auto px-4 text-center">
        <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h2 class="font-heading text-3xl font-bold text-gray-800 mb-4">Uma Iniciativa IFMA</h2>
        <p class="text-gray-500 leading-relaxed">
          O Cine Cocais é um projeto desenvolvido pelo <strong class="text-gray-700">Instituto Federal do Maranhão (IFMA)</strong>, instituição comprometida com a educação pública, gratuita e de qualidade, e com o desenvolvimento social e cultural das comunidades onde está inserida.
        </p>
        <router-link to="/contato" class="inline-flex items-center gap-2 mt-8 bg-primary hover:bg-primary-dark text-white font-semibold px-7 py-3.5 rounded-xl transition">
          Fale Conosco
        </router-link>
      </div>
    </section>

    <footer-comp />
  </div>
</template>

<script setup>
import headerComp from '../components/header.vue'
import footerComp from '../components/footer.vue'

const cards = [
  {
    title: 'Missão',
    desc: 'Utilizar o cinema como instrumento de educação, reflexão e transformação social na região dos Cocais.',
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  },
  {
    title: 'Valores',
    desc: 'Respeito à diversidade, valorização cultural, inclusão social e compromisso com a educação de qualidade.',
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>`,
  },
  {
    title: 'Visão',
    desc: 'Ser referência em projetos culturais educacionais, expandindo o alcance do cinema como ferramenta de transformação social.',
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>`,
  },
  {
    title: 'Impacto',
    desc: 'Levando arte, cultura e educação para comunidades com acesso limitado a experiências cinematográficas de qualidade.',
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`,
  },
]

const impact = [
  { value: '500+', label: 'Pessoas impactadas' },
  { value: '24', label: 'Filmes exibidos' },
  { value: '12', label: 'Debates realizados' },
  { value: '8', label: 'Oficinas oferecidas' },
]
</script>