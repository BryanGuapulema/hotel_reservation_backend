import z from 'zod'

const reservationSchema = z.object({
  user: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId'),
  room: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId'),
  checkInDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: 'Invalid date'
  }),
  checkOutDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: 'Invalid date'
  }),
  status: z.enum(['pending', 'confirmed', 'cancelled']).default('pending')
}).refine(data => new Date(data.checkOutDate) > new Date(data.checkInDate), {
  message: 'checkOutDate must be after checkInDate',
  path: ['checkOutDate']
})

export function validateReservation (object) {
  return reservationSchema.safeParse(object)
}
