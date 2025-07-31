import {z} from 'zod'
const agenteSchema = z
  .object({
    id: z.string().uuid({ message: 'ID inválido (UUID esperado)' }),
    nome: z.string().min(1, 'Campo obrigatório'),
    dataDeIncorporacao: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida (formato esperado: YYYY-MM-DD)'),
    cargo: z.string().min(1, 'Campo obrigatório'),
  })
  .strict({ message: 'Campo não permitido encontrado' })

const casoSchema = z
  .object({
    id: z.string().uuid({ message: 'ID inválido (UUID esperado)' }),
    titulo: z.string().min(1, 'Campo obrigatório'),
    descricao: z.string().min(1, 'Campo obrigatório'),
    status: z.enum(['aberto', 'solucionado'], {
      errorMap: () => ({ message: 'Status deve ser "aberto" ou "solucionado"' }),
    }),
  })
  .strict({ message: 'Campo não permitido encontrado' })

module.exports = {
    agenteSchema,
    casoSchema
}