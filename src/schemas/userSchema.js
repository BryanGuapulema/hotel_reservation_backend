import z from 'zod'

const userSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6)
})

export function validateUser (object) {
  return userSchema.safeParse(object)
}
