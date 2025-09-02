import z from 'zod'

const userSchema = z.object({
  username: z.string().min(1, 'El nombre es obligatorio'),
  email: z.email('Formato de email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
})

export function validateUser (object) {
  return userSchema.safeParse(object)
}
