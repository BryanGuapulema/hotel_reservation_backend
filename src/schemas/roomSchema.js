import z from 'zod'

const roomSchema = z.object({
  number: z.number().int().positive(), // número de habitación positivo
  type: z.enum(['single', 'double', 'suite']), // restringimos valores posibles
  capacity: z.number().int().min(1), // al menos 1 persona
  pricePerNight: z.number().nonnegative(), // no puede ser negativo
  status: z.enum(['available', 'occupied', 'maintenance']).optional() // opcional, por defecto será "available"
})

export function validateRoom (object) {
  return roomSchema.safeParse(object)
}
