<template>
  <nav
    class="fixed w-full top-0 z-50 transition-all duration-500"
    :class="(scrolled || !isHeroPage)
      ? 'bg-cocais-dark/95 backdrop-blur-md shadow-xl shadow-black/20'
      : 'bg-transparent'"
  >
    <div class="max-w-7xl mx-auto px-5 lg:px-8">
      <div class="flex justify-between items-center h-18 py-3">

        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-3 group">
          <img
            src="/logocinecocais.png"
            alt="Cine Cocais"
            class="h-10 w-auto transition-transform duration-500 group-hover:scale-110"
          />
          <div>
            <span class="font-bold text-lg leading-none block text-white">
              Cine Cocais
            </span>
            <span class="text-xs leading-none"
              :class="(scrolled || !isHeroPage) ? 'text-primary-light' : 'text-white/50'">
              IFMA Campus Coelho Neto
            </span>
          </div>
        </router-link>

        <!-- Desktop Menu -->
        <div class="hidden lg:flex items-center gap-1">
          <router-link
            v-for="item in menu"
            :key="item.path"
            :to="item.path"
            class="relative px-4 py-2 text-sm font-medium transition-colors rounded-lg group"
            :class="(scrolled || !isHeroPage)
              ? 'text-white/70 hover:text-white hover:bg-white/5'
              : 'text-white/80 hover:text-white hover:bg-white/10'"
            active-class="!text-secondary"
          >
            {{ item.label }}
            <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-4/5 rounded-full"></span>
          </router-link>
        </div>

        <!-- Auth Desktop -->
        <div class="hidden lg:flex items-center gap-3">
          <template v-if="!token">
            <router-link
              to="/login"
              class="text-sm font-medium transition-colors px-4 py-2 rounded-lg"
              :class="(scrolled || !isHeroPage) ? 'text-white/70 hover:text-white' : 'text-white/80 hover:text-white'"
            >Entrar</router-link>
            <router-link
              to="/cadastro"
              class="bg-secondary hover:bg-secondary-dark text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition"
            >Cadastrar</router-link>
          </template>

          <template v-else>
            <div class="relative">
              <button @click="dropdownOpen = !dropdownOpen"
                class="flex items-center gap-2.5 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl px-3 py-2 transition">
                <div class="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                  {{ initials }}
                </div>
                <span class="text-white text-sm">{{ auth.userName }}</span>
                <svg class="w-3.5 h-3.5 text-white/60 transition-transform" :class="dropdownOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              <transition name="fade">
                <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-52 bg-cocais-dark border border-white/10 rounded-2xl shadow-2xl py-2 overflow-hidden">
                  <router-link to="/usuario" @click="dropdownOpen=false"
                    class="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                    Meu Perfil
                  </router-link>
                  <router-link v-if="isAdmin" to="/admin" @click="dropdownOpen=false"
                    class="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    Painel Admin
                  </router-link>
                  <div class="border-t border-white/5 my-1"></div>
                  <button @click="logout"
                    class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                    Sair
                  </button>
                </div>
              </transition>
            </div>
          </template>
        </div>

        <!-- Mobile toggle -->
        <button @click="mobileOpen = !mobileOpen" class="lg:hidden p-2 rounded-lg bg-white/10 text-white">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition name="slide-up">
      <div v-if="mobileOpen" class="lg:hidden bg-cocais-dark border-t border-white/10">
        <div class="px-5 py-4 space-y-1">
          <router-link v-for="item in menu" :key="item.path" :to="item.path"
            @click="mobileOpen=false"
            class="block px-4 py-3 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition"
            active-class="text-secondary bg-white/5">
            {{ item.label }}
          </router-link>
          <div class="border-t border-white/10 pt-3 mt-3 space-y-2">
            <template v-if="!token">
              <router-link to="/login" @click="mobileOpen=false"
                class="block px-4 py-3 text-sm text-white/70 hover:text-white transition">Entrar</router-link>
              <router-link to="/cadastro" @click="mobileOpen=false"
                class="block px-4 py-3 bg-secondary text-white rounded-xl text-sm font-semibold text-center">Cadastrar</router-link>
            </template>
            <template v-else>
              <router-link to="/usuario" @click="mobileOpen=false" class="block px-4 py-3 text-sm text-white/70 hover:text-white transition">Meu Perfil</router-link>
              <router-link v-if="isAdmin" to="/admin" @click="mobileOpen=false" class="block px-4 py-3 text-sm text-white/70 hover:text-white transition">Painel Admin</router-link>
              <button @click="logout" class="w-full text-left px-4 py-3 text-sm text-red-400">Sair</button>
            </template>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const route  = useRoute()
const auth   = useAuthStore()

const scrolled     = ref(false)
const mobileOpen   = ref(false)
const dropdownOpen = ref(false)

const menu = [
  { label: 'Início',      path: '/' },
  { label: 'Sobre',       path: '/sobre' },
  { label: 'Programação', path: '/programacao' },
  { label: 'Galeria',     path: '/galeria' },
  { label: 'Contato',     path: '/contato' },
]

const isHeroPage = computed(() => route.path === '/')
const token      = computed(() => auth.token)
const isAdmin    = computed(() => auth.isAdmin)
const initials   = computed(() =>
  auth.userName.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase()
)

const onScroll = () => { scrolled.value = window.scrollY > 30 }
const logout = () => { auth.logout(); dropdownOpen.value=false; mobileOpen.value=false; router.push('/') }

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>