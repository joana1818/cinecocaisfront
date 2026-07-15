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

router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('token')
  const tipo = localStorage.getItem('userTipo')

  if (to.meta.requiresAuth && !token) return next('/login')
  if (to.meta.requiresAdmin && tipo !== 'ADMIN') {
    return next({ path: '/usuario', query: { acesso: 'admin' } })
  }
  next()
})

export default router