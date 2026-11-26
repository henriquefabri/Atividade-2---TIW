import { categorias, type Categoria, type Tipo } from '../tipos'

interface Props {
  categoria: Categoria | 'todas'
  tipo: Tipo | 'todos'
  mudarCategoria: (valor: Categoria | 'todas') => void
  mudarTipo: (valor: Tipo | 'todos') => void
}
export default function Filtros({ categoria, tipo, mudarCategoria, mudarTipo }: Props) {
  return <div className="painel grid gap-3 sm:grid-cols-2">
    <label>Categoria<select className="campo mt-1" value={categoria} onChange={e => mudarCategoria(e.target.value as Categoria | 'todas')}><option value="todas">Todas</option>{categorias.map(c => <option key={c}>{c}</option>)}</select></label>
    <label>Tipo<select className="campo mt-1" value={tipo} onChange={e => mudarTipo(e.target.value as Tipo | 'todos')}><option value="todos">Todos</option><option value="receita">Receitas</option><option value="despesa">Despesas</option></select></label>
  </div>
}
