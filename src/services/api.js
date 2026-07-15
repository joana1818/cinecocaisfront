import axios from 'axios'

// Em desenvolvimento usa localhost, em produção usa a URL real do servidor
// Para deploy: crie um arquivo .env com VITE_API_URL=https://api.cinecocais.com.br/api
const api = axios.create({
baseURL: import.meta.env.VITE_API_URL || 'https://cinecocaisback.onrender.com/api',  headers: { 'Content-Type': 'application/json' },
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