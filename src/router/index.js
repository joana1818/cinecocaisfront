import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('../views/home.vue') },
  { path: '/sobre', name: 'sobre', component: () => import('../views/sobre.vue') },
  { path: '/programacao', name: 'programacao', component: () => import('../views/programacao.vue') },
  { path: '/galeria', name: 'galeria', component: () => import('../views/galeria.vue') },
  { path: '/contato', name: 'contato', component: () => import('../views/contato.vue') },
  { path: '/cadastro', name: 'cadastro', component: () => import('../views/cadastro.vue') },
  { path: '/login', name: 'login', component: () => import('../views/login.vue') },
  {
    path: '/usuario',
    name: 'usuario',
    component: () => import('../views/usuario.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

// Função para verificar se o JWT expirou
function isTokenExpired(token) {
  if (!token) return true
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    if (!payload.exp) return false
    return Date.now() >= payload.exp * 1000
  } catch {
    return true // Token inválido ou malformado
  }
}

router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('token')
  const tipo = localStorage.getItem('userTipo')

  // Se a rota exige autenticação
  if (to.meta.requiresAuth) {
    // Caso o token não exista ou já tenha expirado, limpa o storage e manda pro login
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem('token')
      localStorage.removeItem('userTipo')
      return next('/login')
    }
  }

  // Se exige admin e o tipo não for ADMIN
  if (to.meta.requiresAdmin && tipo !== 'ADMIN') {
    return next({ path: '/usuario', query: { acesso: 'admin' } })
  }

  next()
})

export default router