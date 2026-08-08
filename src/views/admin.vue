<template>
  <div>
    <header-comp />

    <main class="pt-20 min-h-screen bg-gray-50">
      <!-- Top -->
      <div class="bg-gradient-to-r from-primary-dark to-primary py-8 px-4">
        <div class="max-w-7xl mx-auto">
          <h1 class="font-heading text-3xl font-bold text-white">Painel Administrativo</h1>
          <p class="text-white/70 text-sm mt-1">Gerencie eventos, galeria e usuários</p>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 py-8">

        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div v-for="s in statsCards" :key="s.label" class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div class="text-2xl font-heading font-bold mb-0.5" :class="s.color">{{ s.value }}</div>
            <div class="text-gray-500 text-xs font-medium">{{ s.label }}</div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="flex gap-2 mb-6 bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100 w-fit">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            type="button"
            @click.prevent="activeTab = tab.key"
            class="px-5 py-2 rounded-xl text-sm font-semibold transition"
            :class="activeTab === tab.key ? 'bg-primary text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'"
          >{{ tab.label }}</button>
        </div>

        <!-- EVENTOS tab -->
        <div v-if="activeTab === 'eventos'" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div class="flex items-center justify-between mb-5">
            <h2 class="font-heading text-xl font-bold text-gray-800">Eventos</h2>
            <button @click="showEventoModal = true; eventoForm = { ...defaultEventoForm }" class="bg-secondary hover:bg-secondary-dark text-white text-sm font-semibold px-4 py-2 rounded-xl transition flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              Novo Evento
            </button>
          </div>
          <loading-comp v-if="loading" />
          <div v-else class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-100">
                  <th class="text-left py-3 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Título</th>
                  <th class="text-left py-3 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Tipo</th>
                  <th class="text-left py-3 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Data</th>
                  <th class="text-left py-3 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Vagas</th>
                  <th class="text-center py-3 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="ev in eventos" :key="ev.id" class="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td class="py-3 px-3 font-medium text-gray-700">{{ ev.titulo }}</td>
                  <td class="py-3 px-3">
                    <span class="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">{{ ev.tipo }}</span>
                  </td>
                  <td class="py-3 px-3 text-gray-500">{{ formatDate(ev.dataEvento) }}</td>
                  <td class="py-3 px-3 text-gray-500">{{ ev.vagasOcupadas || 0 }}/{{ ev.vagasTotal || '∞' }}</td>
                  <td class="py-3 px-3 text-center">
                    <button @click="deletarEvento(ev.id)" class="text-red-400 hover:text-red-600 text-xs font-semibold transition">Excluir</button>
                  </td>
                </tr>
                <tr v-if="eventos.length === 0">
                  <td colspan="5" class="text-center py-12">
                    <div class="flex flex-col items-center gap-3">
                      <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <p class="text-gray-400 font-semibold">Nenhum evento cadastrado</p>
                      <p class="text-gray-300 text-sm">Clique em "Novo Evento" acima para criar um</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- GALERIA tab -->
        <div v-if="activeTab === 'galeria'" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div class="flex items-center justify-between mb-5">
            <h2 class="font-heading text-xl font-bold text-gray-800">Galeria</h2>
            <button @click="showGaleriaModal = true" class="bg-secondary hover:bg-secondary-dark text-white text-sm font-semibold px-4 py-2 rounded-xl transition flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              Nova Foto
            </button>
          </div>
          <loading-comp v-if="loading" />
          <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div v-for="item in galeria" :key="item.id" class="relative group rounded-xl overflow-hidden">
              <img :src="resolveImageUrl(item.imagemUrl)" :alt="item.titulo" @error="handleImageError" class="w-full h-56 object-cover">
              <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <button @click="deletarGaleria(item.id)" class="text-white text-xs font-semibold bg-red-500 px-3 py-1.5 rounded-lg">Excluir</button>
              </div>
              <p class="text-xs text-gray-600 mt-1 truncate px-1">{{ item.titulo }}</p>
            </div>
            <div v-if="galeria.length === 0" class="col-span-full flex flex-col items-center justify-center py-16">
              <svg class="w-16 h-16 text-gray-200 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <p class="text-gray-400 font-semibold mb-1">Nenhuma foto na galeria</p>
              <p class="text-gray-300 text-sm">Clique em "Nova Foto" acima para adicionar imagens</p>
            </div>
          </div>
        </div>

        <!-- MENSAGENS tab -->
        <div v-if="activeTab === 'mensagens'" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 class="font-heading text-xl font-bold text-gray-800 mb-5">Mensagens de Contato</h2>
          <loading-comp v-if="loading" />
          <div v-else class="space-y-3">
            <div v-for="msg in mensagens" :key="msg.id" class="border border-gray-100 rounded-xl p-4" :class="msg.lida ? 'opacity-60' : ''">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <span class="font-semibold text-gray-700 text-sm">{{ msg.nome }}</span>
                    <span v-if="!msg.lida" class="w-2 h-2 bg-secondary rounded-full"></span>
                  </div>
                  <p class="text-xs text-gray-400 mb-2">{{ msg.email }} · {{ formatDate(msg.createdAt) }}</p>
                  <p class="text-xs font-semibold text-primary mb-1">{{ msg.assunto }}</p>
                  <p class="text-sm text-gray-600 line-clamp-2">{{ msg.mensagem }}</p>
                </div>
                <div class="flex gap-2 shrink-0">
                  <button v-if="!msg.lida" @click="marcarLida(msg.id)" class="text-xs text-primary hover:underline font-medium">Marcar lida</button>
                  <button @click="deletarMensagem(msg.id)" class="text-xs text-red-400 hover:text-red-600 font-medium">Excluir</button>
                </div>
              </div>
            </div>
            <div v-if="mensagens.length === 0" class="text-center py-10 text-gray-400">Nenhuma mensagem recebida</div>
          </div>
        </div>

        <!-- USUARIOS tab -->
        <div v-if="activeTab === 'usuarios'" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 class="font-heading text-xl font-bold text-gray-800 mb-5">Usuários Cadastrados</h2>
          <loading-comp v-if="loading" />
          <div v-else class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-100">
                  <th class="text-left py-3 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Nome</th>
                  <th class="text-left py-3 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">E-mail</th>
                  <th class="text-left py-3 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Tipo</th>
                  <th class="text-left py-3 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Cadastro</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="u in usuarios" :key="u.id" class="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td class="py-3 px-3 font-medium text-gray-700">{{ u.nome }}</td>
                  <td class="py-3 px-3 text-gray-500">{{ u.email }}</td>
                  <td class="py-3 px-3">
                    <span class="text-xs px-2 py-0.5 rounded-full font-semibold" :class="u.tipo === 'ADMIN' ? 'bg-secondary/10 text-secondary' : 'bg-gray-100 text-gray-600'">{{ u.tipo }}</span>
                  </td>
                  <td class="py-3 px-3 text-gray-500">{{ formatDate(u.createdAt) }}</td>
                </tr>
                <tr v-if="usuarios.length === 0">
                  <td colspan="4" class="text-center py-10 text-gray-400">Nenhum usuário</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal Evento -->
    <transition name="fade">
      <div v-if="showEventoModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl p-7 w-full max-w-xl max-h-[90vh] overflow-y-auto">
          <h3 class="font-heading text-2xl font-bold mb-5">Criar Novo Evento</h3>
          <form @submit.prevent="criarEvento" class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Título</label>
              <input v-model="eventoForm.titulo" type="text" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm">
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Descrição</label>
              <textarea v-model="eventoForm.descricao" required rows="3" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm resize-none"></textarea>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Data</label>
                <input v-model="eventoForm.dataEvento" type="date" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm">
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Horário</label>
                <input v-model="eventoForm.horario" type="time" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm">
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Tipo</label>
                <select v-model="eventoForm.tipo" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm">
                  <option value="EXIBICAO">Exibição</option>
                  <option value="DEBATE">Debate</option>
                  <option value="OFICINA">Oficina</option>
                  <option value="WORKSHOP">Workshop</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Vagas</label>
                <input v-model.number="eventoForm.vagasTotal" type="number" min="1" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm">
              </div>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Local</label>
              <input v-model="eventoForm.local" type="text" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm">
            </div>
            <div class="flex gap-3 pt-2">
              <button type="submit" class="flex-1 bg-secondary text-white py-3 rounded-xl font-semibold text-sm hover:bg-secondary-dark transition">Criar</button>
              <button type="button" @click="showEventoModal = false" class="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-semibold text-sm hover:bg-gray-200 transition">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <!-- Modal Galeria -->
    <transition name="fade">
      <div v-if="showGaleriaModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl p-7 w-full max-w-md">
          <h3 class="font-heading text-2xl font-bold mb-5">Adicionar Foto</h3>
          <form @submit.prevent="criarGaleria" class="space-y-4">
            <div class="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4">
              <p class="text-xs text-blue-700"><strong>Dica:</strong> Cole a URL completa da imagem (deve começar com https://)</p>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Título</label>
              <input v-model="galeriaForm.titulo" type="text" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm">
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">URL da Imagem *</label>
              <input v-model="galeriaForm.imagemUrl" type="url" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" placeholder="https://exemplo.com/imagem.jpg">
              <p class="text-xs text-gray-400 mt-2">Exemplo: https://drive.google.com/uc?export=view&id=SEU_ID</p>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Descrição (opcional)</label>
              <input v-model="galeriaForm.descricao" type="text" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm">
            </div>
            <div class="flex items-center gap-2">
              <input v-model="galeriaForm.destaque" type="checkbox" id="destaque" class="rounded">
              <label for="destaque" class="text-sm text-gray-600">Marcar como destaque</label>
            </div>
            <div class="flex gap-3 pt-2">
              <button type="submit" class="flex-1 bg-secondary text-white py-3 rounded-xl font-semibold text-sm hover:bg-secondary-dark transition">Adicionar</button>
              <button type="button" @click="showGaleriaModal = false" class="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-semibold text-sm hover:bg-gray-200 transition">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <footer-comp />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { eventosAPI, galeriaAPI, contatoAPI, usersAPI, resolveAssetUrl } from '../services/api'
import headerComp from '../components/header.vue'
import footerComp from '../components/footer.vue'
import loadingComp from '../components/loading.vue'

const activeTab = ref('eventos')
const loading = ref(true)
const eventos = ref([])
const galeria = ref([])
const mensagens = ref([])
const usuarios = ref([])
const showEventoModal = ref(false)
const showGaleriaModal = ref(false)

const tabs = [
  { key: 'eventos', label: 'Eventos' },
  { key: 'galeria', label: 'Galeria' },
  { key: 'mensagens', label: 'Mensagens' },
  { key: 'usuarios', label: 'Usuários' },
]

const defaultEventoForm = { titulo: '', descricao: '', dataEvento: '', horario: '', local: '', tipo: 'EXIBICAO', vagasTotal: 50 }
const eventoForm = ref({ ...defaultEventoForm })
const galeriaForm = ref({ titulo: '', imagemUrl: '', descricao: '', destaque: false })

const statsCards = computed(() => [
  { label: 'Eventos', value: eventos.value.length, color: 'text-primary' },
  { label: 'Galeria', value: galeria.value.length, color: 'text-blue-500' },
  { label: 'Mensagens', value: mensagens.value.length, color: 'text-secondary' },
  { label: 'Usuários', value: usuarios.value.length, color: 'text-green-500' },
])

const formatDate = (d) => {
  if (!d) return '--'
  const date = new Date(d)
  if (isNaN(date.getTime())) return '--'
  return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
}

const resolveImageUrl = (url) => resolveAssetUrl(url)

const handleImageError = (event) => {
  event.target.src = '/logo-cinecocais.png'
}

const fetchAll = async () => {
  loading.value = true
  try {
    const [ev, gal, msg, usr] = await Promise.allSettled([
      eventosAPI.listar({}),
      galeriaAPI.listar({}),
      contatoAPI.listar({}),
      usersAPI.listar({}),
    ])
    if (ev.status === 'fulfilled') eventos.value = ev.value.data
    if (gal.status === 'fulfilled') galeria.value = gal.value.data
    if (msg.status === 'fulfilled') mensagens.value = msg.value.data
    if (usr.status === 'fulfilled') usuarios.value = usr.value.data
  } finally {
    loading.value = false
  }
}

const criarEvento = async () => {
  try {
    const payload = {
      ...eventoForm.value,
      dataEvento: new Date(`${eventoForm.value.dataEvento}T00:00:00.000Z`).toISOString(),
    }
    await eventosAPI.criar(payload)
    showEventoModal.value = false
    fetchAll()
  } catch (e) { alert(e.response?.data?.error || 'Erro ao criar evento') }
}

const deletarEvento = async (id) => {
  if (!confirm('Excluir este evento?')) return
  try { await eventosAPI.deletar(id); fetchAll() } catch { alert('Erro ao excluir') }
}

const criarGaleria = async () => {
  try {
    await galeriaAPI.criar(galeriaForm.value)
    showGaleriaModal.value = false
    galeriaForm.value = { titulo: '', imagemUrl: '', descricao: '', destaque: false }
    fetchAll()
  } catch { alert('Erro ao adicionar foto') }
}

const deletarGaleria = async (id) => {
  if (!confirm('Excluir esta foto?')) return
  try { await galeriaAPI.deletar(id); fetchAll() } catch { alert('Erro ao excluir') }
}

const marcarLida = async (id) => {
  try { await contatoAPI.marcarLida(id); fetchAll() } catch { alert('Erro') }
}

const deletarMensagem = async (id) => {
  if (!confirm('Excluir esta mensagem?')) return
  try { await contatoAPI.deletar(id); fetchAll() } catch { alert('Erro') }
}

onMounted(fetchAll)
</script>