import { moeda, type Transacao } from '../tipos'
interface Props {
  transacoes: Transacao[]
  editar: (transacao: Transacao) => void
  remover: (id: string) => void
}
export default function Lista({ transacoes, editar, remover }: Props) {
  return <section className="painel space-y-3">
    <h2 className="text-lg font-semibold">Transações</h2>
    {!transacoes.length && <p className="py-6 text-center text-slate-500">Nenhuma transação encontrada.</p>}
    {transacoes.map(t => <article key={t.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-3">
      <div className="min-w-0 break-words"><p className="font-medium">{t.descricao}</p><p className="text-sm text-slate-500">{t.categoria} · {t.tipo}</p></div>
      <div className="flex flex-wrap items-center gap-3"><span className={t.tipo === 'receita' ? 'font-semibold text-emerald-700' : 'font-semibold text-red-700'}>{t.tipo === 'receita' ? '+' : '-'} {moeda(t.valor)}</span>
      <button className="text-sm text-blue-700 hover:underline" onClick={() => editar(t)}>Editar</button>
      <button className="text-sm text-red-700 hover:underline" onClick={() => remover(t.id)}>Remover</button></div>
    </article>)}
  </section>
}
