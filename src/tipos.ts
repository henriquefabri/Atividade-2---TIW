export type Tipo = 'receita' | 'despesa'
export type Categoria = 'salário' | 'alimentação' | 'transporte' | 'estudos' | 'lazer' | 'outros'
export const categorias: Categoria[] = ['salário', 'alimentação', 'transporte', 'estudos', 'lazer', 'outros']
export interface Transacao {
  id: string
  descricao: string
  valor: number
  categoria: Categoria
  tipo: Tipo
}
export type Dados = Omit<Transacao, 'id'>
export const moeda = (valor: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
