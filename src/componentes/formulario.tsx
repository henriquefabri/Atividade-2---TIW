import { useState, type FormEvent } from 'react'
import { categorias, type Categoria, type Tipo, type Dados, type Transacao } from '../tipos'

interface Props {
  edicao: Transacao | null
  salvar: (dados: Dados) => void
  cancelar: () => void
}

export default function Formulario({ edicao, salvar, cancelar }: Props) {
  const [descricao, setDescricao] = useState(edicao?.descricao ?? '')
  const [valor, setValor] = useState(edicao ? String(edicao.valor) : '')
  const [categoria, setCategoria] = useState<Categoria>(edicao?.categoria ?? 'alimentação')
  const [tipo, setTipo] = useState<Tipo>(edicao?.tipo ?? 'despesa')
  const [erros, setErros] = useState<string[]>([])

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    const problemas: string[] = []
    const numero = Number(valor)
    if ((descricao.match(/\p{L}/gu) ?? []).length < 3) problemas.push('Informe pelo menos três letras na descrição.')
    if (!Number.isFinite(numero) || numero <= 0 || Math.round(numero * 100) < 1) problemas.push('Informe um valor maior que zero.')
    setErros(problemas)
    if (problemas.length) return
    salvar({ descricao: descricao.trim(), valor: Math.round(numero * 100) / 100, categoria, tipo })
    setDescricao('')
    setValor('')
  }

  return <form className="painel space-y-4" onSubmit={enviar} noValidate>
    <h2 className="text-lg font-semibold">{edicao ? 'Editar transação' : 'Nova transação'}</h2>
    <label className="block">Descrição<input className="campo mt-1" value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Ex.: almoço" /></label>
    <label className="block">Valor (R$)<input className="campo mt-1" type="number" step="0.01" min="0.01" value={valor} onChange={e => setValor(e.target.value)} /></label>
    <label className="block">Categoria<select className="campo mt-1" value={categoria} onChange={e => setCategoria(e.target.value as Categoria)}>{categorias.map(c => <option key={c}>{c}</option>)}</select></label>
    <fieldset><legend>Tipo</legend><div className="mt-2 flex gap-4">{(['receita', 'despesa'] as const).map(t => <label key={t} className="flex gap-2"><input type="radio" name="tipo" checked={tipo === t} onChange={() => setTipo(t)} />{t}</label>)}</div></fieldset>
    {erros.length > 0 && <div role="alert" className="text-sm text-red-700">{erros.map(erro => <p key={erro}>{erro}</p>)}</div>}
    <button className="botao w-full" type="submit">{edicao ? 'Salvar alterações' : 'Adicionar'}</button>
    {edicao && <button type="button" className="w-full text-slate-600 underline" onClick={cancelar}>Cancelar</button>}
  </form>
}
