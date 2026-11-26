import { moeda, type Transacao } from '../tipos'
export default function Resumo({ transacoes }: { transacoes: Transacao[] }) {
  const receitas = transacoes.filter(t => t.tipo === 'receita').reduce((total, t) => total + Math.round(t.valor * 100), 0)
  const despesas = transacoes.filter(t => t.tipo === 'despesa').reduce((total, t) => total + Math.round(t.valor * 100), 0)
  const saldo = receitas - despesas
  return <section className="grid gap-3 sm:grid-cols-3">
    <div className="painel"><p className="text-sm text-slate-500">Receitas</p><p className="text-lg font-bold text-emerald-700">{moeda(receitas / 100)}</p></div>
    <div className="painel"><p className="text-sm text-slate-500">Despesas</p><p className="text-lg font-bold text-red-700">{moeda(despesas / 100)}</p></div>
    <div className="painel"><p className="text-sm text-slate-500">Saldo</p><p className={'text-lg font-bold ' + (saldo < 0 ? 'text-red-700' : 'text-emerald-700')}>{moeda(saldo / 100)}</p></div>
  </section>
}
