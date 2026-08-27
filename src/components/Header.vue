<template>
  <nav
    translate="no"
    class="fixed w-full top-0 z-50 transition-all duration-500"
    :class="(scrolled || !isHeroPage)
      ? 'bg-cocais-dark/90 backdrop-blur-md border-b border-white/10 shadow-2xl shadow-black/40 py-3.5'
      : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-5'"
  >
    <div class="max-w-7xl mx-auto px-5 lg:px-8">
      <div class="flex justify-between items-center">

        <!-- Logo/Name - Elegante e Estilizado -->
        <router-link to="/" class="flex-shrink-0 group">
          <div class="leading-none">
            <span class="text-3xl font-black text-white tracking-tight drop-shadow-md transition-colors group-hover:text-white/90" style="font-family: 'Playfair Display', serif;">
              Cine
            </span>
            <span class="text-3xl font-black text-secondary tracking-tight drop-shadow-md ml-1" style="font-family: 'Playfair Display', serif;">
              Cocais
            </span>
          </div>
        </router-link>

        <!-- Desktop Menu - Estilo Pílula Moderna -->
        <div class="hidden lg:flex items-center gap-1 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15 shadow-inner">
          <router-link
            v-for="item in menu"
            :key="item.path"
            :to="item.path"
            class="relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 text-white/80 hover:text-white hover:bg-white/10"
            active-class="!text-white bg-secondary/90 shadow-md shadow-secondary/30 font-bold"
            style="font-family: 'Inter', sans-serif;"
          >
            {{ item.label }}
          </router-link>
        </div>

        <!-- Auth Desktop - Direita -->
        <div class="hidden lg:flex items-center gap-3">
          <template v-if="!token">
            <router-link
              to="/login"
              class="text-sm font-semibold text-white/90 hover:text-white px-4 py-2 rounded-xl hover:bg-white/10 transition duration-300"
            >Entrar</router-link>
            <router-link
              to="/cadastro"
              class="bg-gradient-to-r from-secondary to-gold hover:from-secondary-dark hover:to-secondary text-white text-sm font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-secondary/25 hover:shadow-secondary/40 hover:scale-[1.02] transition-all duration-300"
            >Cadastrar</router-link>
          </template>

          <template v-else>
            <div class="relative">
              <button @click="dropdownOpen = !dropdownOpen"
                class="flex items-center gap-2.5 bg-white/10 hover:bg-white/15 border border-white/15 px-4 py-2 rounded-xl text-white text-sm font-semibold transition duration-300">
                <div class="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-white">
                  {{ auth.userName?.charAt(0)?.toUpperCase() || 'U' }}
                </div>
                {{ auth.userName }}
                <svg class="w-3.5 h-3.5 text-white/70 transition-transform duration-300" :class="dropdownOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              <transition name="fade">
                <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-52 bg-cocais-dark/95 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl py-2 overflow-hidden z-50">
                  <div class="px-4 py-2.5 border-b border-white/10 mb-1">
                    <p class="text-xs text-white/50">Conectado como</p>
                    <p class="text-sm font-bold text-white truncate">{{ auth.userName }}</p>
                  </div>
                  <router-link to="/usuario" @click="dropdownOpen=false"
                    class="flex items-center gap-2 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/10 transition">
                    <svg class="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                    Meu Perfil
                  </router-link>
                  <router-link v-if="isAdmin" to="/admin" @click="dropdownOpen=false"
                    class="flex items-center gap-2 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/10 transition">
                    <svg class="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    Painel Admin
                  </router-link>
                  <div class="border-t border-white/10 mt-1 pt-1">
                    <button @click="logout"
                      class="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition font-medium">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                      Sair
                    </button>
                  </div>
                </div>
              </transition>
            </div>
          </template>
        </div>

        <!-- Mobile toggle -->
        <button @click="mobileOpen = !mobileOpen" class="lg:hidden p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 transition">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition name="slide-up">
      <div v-if="mobileOpen" class="lg:hidden bg-cocais-dark/95 backdrop-blur-xl border-t border-white/15 shadow-2xl mt-3">
        <div class="px-5 py-6 space-y-2">
          <router-link v-for="item in menu" :key="item.path" :to="item.path"
            @click="mobileOpen=false"
            class="block px-4 py-3 rounded-xl text-base font-medium text-white/80 hover:text-white hover:bg-white/10 transition"
            active-class="!text-white bg-secondary/90 font-bold shadow-md">
            {{ item.label }}
          </router-link>
          <div class="border-t border-white/15 pt-4 mt-4 space-y-3">
            <template v-if="!token">
              <router-link to="/login" @click="mobileOpen=false"
                class="block px-4 py-3 text-center text-base font-semibold text-white/90 hover:text-white bg-white/10 rounded-xl transition">Entrar</router-link>
              <router-link to="/cadastro" @click="mobileOpen=false"
                class="block px-4 py-3.5 bg-gradient-to-r from-secondary to-gold text-white rounded-xl text-base font-bold text-center shadow-lg shadow-secondary/30">Cadastrar</router-link>
            </template>
            <template v-else>
              <router-link to="/usuario" @click="mobileOpen=false" class="flex items-center gap-2 px-4 py-3 text-base text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition">Meu Perfil</router-link>
              <router-link v-if="isAdmin" to="/admin" @click="mobileOpen=false" class="flex items-center gap-2 px-4 py-3 text-base text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition">Painel Admin</router-link>
              <button @click="logout" class="w-full text-left px-4 py-3 text-base text-red-400 hover:bg-red-500/10 rounded-xl font-semibold">Sair</button>
            </template>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const mobileOpen = ref(false)
const dropdownOpen = ref(false)
const scrolled = ref(false)

const menu = [
  { label: 'Início', path: '/' },
  { label: 'Sobre', path: '/sobre' },
  { label: 'Programação', path: '/programacao' },
  { label: 'Galeria', path: '/galeria' },
  { label: 'Contato', path: '/contato' },
]

const isHeroPage = computed(() => router.currentRoute.value.path === '/')
const token = computed(() => auth.token)
const isAdmin = computed(() => auth.isAdmin)

const onScroll = () => { scrolled.value = window.scrollY > 30 }
const logout = () => { auth.logout(); dropdownOpen.value=false; mobileOpen.value=false; router.push('/') }

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
