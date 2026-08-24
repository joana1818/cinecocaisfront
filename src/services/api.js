import axios from 'axios'

const baseUrl = 'https://cinecocaisback-production.up.railway.app/api'

const api = axios.create({
  baseURL: baseUrl,
  headers: { 'Content-Type': 'application/json' },
})

export const getApiOrigin = () => {
  const rawBase = api.defaults.baseURL || ''
  if (!rawBase) return ''

  // Remove o sufixo /api para montar URLs públicas de assets como /uploads.
  return rawBase.replace(/\/api\/?$/, '')
}

export const resolveAssetUrl = (url) => {
  if (!url || typeof url !== 'string') return ''

  const normalized = url.trim().replace(/\\/g, '/')
  if (!normalized) return ''
  if (/^(https?:)?\/\//i.test(normalized) || normalized.startsWith('data:') || normalized.startsWith('blob:')) {
    return normalized
  }

  const apiOrigin = getApiOrigin()
  const imagePath = normalized.startsWith('/') ? normalized : `/${normalized}`
  return apiOrigin ? `${apiOrigin}${imagePath}` : imagePath
}

// Fonte da verdade: sempre usar imagemUrl, com fallback para nomes antigos salvos por engano.
export const normalizeGaleriaItem = (item) => ({
  ...item,
  imagemUrl: resolveAssetUrl(item.imagemUrl || item.imageUrl || item.url || item.foto || item.capa),
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('userName')
      localStorage.removeItem('userTipo')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login:    (data) => api.post('/auth/login', data),
}

export const eventosAPI = {
  listar:          (params) => api.get('/eventos', { params }),
  buscar:          (id)     => api.get(`/eventos/${id}`),
  criar:           (data)   => api.post('/eventos', data),
  atualizar:       (id, data) => api.put(`/eventos/${id}`, data),
  deletar:         (id)     => api.delete(`/eventos/${id}`),
  inscrever:       (id)     => api.post(`/eventos/${id}/inscrever`),
  cancelar:        (id)     => api.delete(`/eventos/${id}/cancelar`),
  minhasInscricoes: ()      => api.get('/eventos/minhas/inscricoes'),
}

export const galeriaAPI = {
  listar:   (params)   => api.get('/galeria', { params }),
  criar:    (data)     => api.post('/galeria', data),
  atualizar:(id, data) => api.put(`/galeria/${id}`, data),
  deletar:  (id)       => api.delete(`/galeria/${id}`),
}

export const contatoAPI = {
  enviar:    (data) => api.post('/contato', data),
  listar:    (params) => api.get('/contato', { params }),
  marcarLida:(id)   => api.patch(`/contato/${id}/lida`),
  deletar:   (id)   => api.delete(`/contato/${id}`),
}

export const usersAPI = {
  perfil:          ()       => api.get('/users/perfil'),
  atualizarPerfil: (data)   => api.put('/users/perfil', data),
  alterarSenha:    (data)   => api.put('/users/senha', data),
  listar:          (params) => api.get('/users', { params }),
}

export default api