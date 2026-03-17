<script setup>
import headerComp from '../components/header.vue'
import footerComp from '../components/footer.vue'
</script>

<template>
  <div>
    <header-comp />
    
    <main class="pt-16">
      <section class="bg-gradient-to-br from-primary to-accent min-h-screen flex items-center justify-center relative overflow-hidden">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-20 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div class="absolute bottom-20 right-10 w-60 h-60 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div class="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div class="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span class="text-white text-sm font-medium">Projeto Cultural IFMA</span>
          </div>
          
          <h1 class="text-5xl md:text-7xl font-bold text-white mb-6">Cine Cocais</h1>
          
          <p class="text-2xl md:text-3xl text-white/90 mb-4 font-light">
            Cinema, Cultura e Transformação Social
          </p>
          
          <p class="text-lg text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
            Uma iniciativa educacional que utiliza o cinema como ferramenta de reflexão, 
            diálogo e transformação, valorizando a cultura, identidade e o território dos Cocais.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link 
              to="/programacao" 
              class="bg-secondary text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition transform hover:-translate-y-1 inline-flex items-center justify-center space-x-2"
            >
              <span>Ver Programação</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </router-link>
            <router-link 
              to="/sobre" 
              class="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/30 transition transform hover:-translate-y-1 inline-flex items-center justify-center space-x-2 border border-white/30"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Conheça o Projeto</span>
            </router-link>
          </div>
        </div>
      </section>
      
      <section class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition">
              <div class="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div class="text-4xl font-bold text-gray-800 mb-2">500+</div>
              <div class="text-gray-600">Participantes</div>
            </div>
            
            <div class="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition">
              <div class="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="text-4xl font-bold text-gray-800 mb-2">24</div>
              <div class="text-gray-600">Exibições</div>
            </div>
            
            <div class="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition">
              <div class="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div class="text-4xl font-bold text-gray-800 mb-2">12</div>
              <div class="text-gray-600">Eventos</div>
            </div>
          </div>
        </div>
      </section>
      
      <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-800 mb-4">O Poder do Cinema</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">
              Transformando realidades através da arte cinematográfica e do diálogo comunitário.
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center p-6">
              <div class="w-20 h-1 bg-secondary mx-auto mb-6"></div>
              <h3 class="text-2xl font-bold text-gray-800 mb-4">Cultura e Identidade</h3>
              <p class="text-gray-600">
                Valorizando as raízes culturais do território maranhense através do cinema.
              </p>
            </div>
            
            <div class="text-center p-6">
              <div class="w-20 h-1 bg-secondary mx-auto mb-6"></div>
              <h3 class="text-2xl font-bold text-gray-800 mb-4">Transformação Social</h3>
              <p class="text-gray-600">
                Promovendo reflexão e diálogo sobre questões sociais relevantes.
              </p>
            </div>
            
            <div class="text-center p-6">
              <div class="w-20 h-1 bg-secondary mx-auto mb-6"></div>
              <h3 class="text-2xl font-bold text-gray-800 mb-4">Educação Audiovisual</h3>
              <p class="text-gray-600">
                Formando novos olhares críticos através da sétima arte.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section class="py-20 bg-gray-50">
        <div class="max-w-6xl mx-auto px-4">
          <div class="bg-gradient-to-br from-primary to-accent rounded-3xl p-12 md:p-16">
            <div class="max-w-3xl">
              <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
                Participe das Nossas Atividades
              </h2>
              <p class="text-white/90 mb-8 text-lg">
                Exibições de filmes, debates, oficinas e muito mais. Junte-se a nós nessa jornada cultural.
              </p>
              <router-link 
                to="/programacao" 
                class="inline-flex items-center space-x-2 bg-secondary text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition transform hover:-translate-y-1"
              >
                <span>Confira a Programação</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <footer-comp />
  </div>
</template

