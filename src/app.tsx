import { useState } from 'react'
import Formulario from './componentes/formulario'
import Filtros from './componentes/filtros'
import Lista from './componentes/lista'
import Resumo from './componentes/resumo'
import type { Transacao, Dados, Categoria, Tipo } from './tipos'

export default function App() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([])
  const [edicao, setEdicao] = useState<Transacao | null>(null)
  const [categoria, setCategoria] = useState<Categoria | 'todas'>('todas')
  const [tipo, setTipo] = useState<Tipo | 'todos'>('todos')

  function salvar(dados: Dados) {
    if (edicao) {
      setTransacoes(atuais => atuais.map(t => t.id === edicao.id ? { ...t, ...dados } : t))
      setEdicao(null)
    } else {
      const nova = { ...dados, id: crypto.randomUUID() }
      setTransacoes(atuais => [...atuais, nova])
    }
  }

  function remover(id: string) {
    setTransacoes(atuais => atuais.filter(t => t.id !== id))
    if (edicao?.id === id) setEdicao(null)
  }

  const filtradas = transacoes.filter(t => (categoria === 'todas' || t.categoria === categoria) && (tipo === 'todos' || t.tipo === tipo))

  return <div className="min-h-screen bg-slate-100 text-slate-800">
    <header className="bg-emerald-800 text-white"><div className="mx-auto max-w-6xl px-5 py-6"><p className="text-sm text-emerald-100">Atividade 2 - TIW</p><h1 className="text-2xl font-bold">Controle de gastos pessoais</h1><p className="mt-1 text-sm">Organize suas receitas e despesas do mês.</p></div></header>
    <main className="mx-auto grid max-w-6xl items-start gap-5 p-5 lg:grid-cols-[320px_1fr]">
      <Formulario key={edicao?.id ?? 'novo'} edicao={edicao} salvar={salvar} cancelar={() => setEdicao(null)} />
      <div className="min-w-0 space-y-4">
        <Resumo transacoes={transacoes} />
        <Filtros categoria={categoria} tipo={tipo} mudarCategoria={setCategoria} mudarTipo={setTipo} />
        <Lista transacoes={filtradas} editar={setEdicao} remover={remover} />
      </div>
    </main>
  </div>
}
