<template>
  <nav class="fixed w-full top-0 z-50 transition-all duration-300" :class="scrolled ? 'bg-white shadow-md' : 'bg-transparent'">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">

        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-2.5 group">
          <div class="w-9 h-9 bg-primary rounded-lg flex items-center justify-center transition group-hover:bg-primary-dark">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4" />
            </svg>
          </div>
          <span class="font-heading font-bold text-lg" :class="scrolled || !isHeroPage ? 'text-primary' : 'text-white'">Cine Cocais</span>
        </router-link>

        <!-- Menu Desktop -->
        <div class="hidden md:flex items-center gap-8">
          <router-link
            v-for="item in menu"
            :key="item.path"
            :to="item.path"
            class="text-sm font-medium transition-colors relative group"
            :class="scrolled || !isHeroPage ? 'text-gray-600 hover:text-primary' : 'text-white/90 hover:text-white'"
            active-class="!text-secondary font-semibold"
          >
            {{ item.label }}
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full"></span>
          </router-link>
        </div>

        <!-- Auth -->
        <div class="hidden md:flex items-center gap-3">
          <template v-if="!token">
            <router-link
              to="/login"
              class="text-sm font-medium transition"
              :class="scrolled || !isHeroPage ? 'text-gray-600 hover:text-primary' : 'text-white/90 hover:text-white'"
            >Entrar</router-link>
            <router-link
              to="/cadastro"
              class="bg-secondary hover:bg-secondary-dark text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
            >Cadastrar</router-link>
          </template>

          <template v-else>
            <div class="relative">
              <button @click="dropdownOpen = !dropdownOpen" class="flex items-center gap-2 group">
                <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                  {{ initials }}
                </div>
                <svg class="w-4 h-4 transition-transform" :class="dropdownOpen ? 'rotate-180' : ''" :stroke="scrolled || !isHeroPage ? '#374151' : 'white'" fill="none" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <transition name="fade">
                <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 overflow-hidden">
                  <router-link to="/usuario" @click="dropdownOpen = false" class="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition">
                    Meu Perfil
                  </router-link>
                  <router-link v-if="isAdmin" to="/admin" @click="dropdownOpen = false" class="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition">
                    Painel Admin
                  </router-link>
                  <hr class="my-1 border-gray-100">
                  <button @click="logout" class="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition">
                    Sair
                  </button>
                </div>
              </transition>
            </div>
          </template>
        </div>

        <!-- Mobile toggle -->
        <button @click="mobileOpen = !mobileOpen" class="md:hidden p-1">
          <svg class="w-6 h-6" :stroke="scrolled || !isHeroPage ? '#374151' : 'white'" fill="none" viewBox="0 0 24 24">
            <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition name="fade">
      <div v-if="mobileOpen" class="md:hidden bg-white border-t border-gray-100 shadow-lg">
        <div class="px-4 py-4 space-y-1">
          <router-link
            v-for="item in menu"
            :key="item.path"
            :to="item.path"
            @click="mobileOpen = false"
            class="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition"
            active-class="bg-primary/5 text-primary"
          >{{ item.label }}</router-link>
          <hr class="my-2 border-gray-100">
          <template v-if="!token">
            <router-link to="/login" @click="mobileOpen = false" class="block px-3 py-2.5 text-sm text-gray-700">Entrar</router-link>
            <router-link to="/cadastro" @click="mobileOpen = false" class="block px-3 py-2.5 bg-secondary text-white rounded-lg text-sm font-semibold text-center">Cadastrar</router-link>
          </template>
          <template v-else>
            <router-link to="/usuario" @click="mobileOpen = false" class="block px-3 py-2.5 text-sm text-gray-700">Meu Perfil</router-link>
            <router-link v-if="isAdmin" to="/admin" @click="mobileOpen = false" class="block px-3 py-2.5 text-sm text-gray-700">Painel Admin</router-link>
            <button @click="logout" class="block w-full text-left px-3 py-2.5 text-sm text-red-500">Sair</button>
          </template>
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
const route = useRoute()
const auth = useAuthStore()

const scrolled = ref(false)
const mobileOpen = ref(false)
const dropdownOpen = ref(false)

const menu = [
  { label: 'Início', path: '/' },
  { label: 'Sobre', path: '/sobre' },
  { label: 'Programação', path: '/programacao' },
  { label: 'Galeria', path: '/galeria' },
  { label: 'Contato', path: '/contato' },
]

const isHeroPage = computed(() => route.path === '/')
const token = computed(() => auth.token)
const isAdmin = computed(() => auth.isAdmin)
const initials = computed(() => {
  const name = auth.userName
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
})

const onScroll = () => { scrolled.value = window.scrollY > 20 }

const logout = () => {
  auth.logout()
  dropdownOpen.value = false
  mobileOpen.value = false
  router.push('/')
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>