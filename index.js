import express from 'node:express'

const PORT = process.env.PORT ?? 1234

const app = express()

app.get('/', (req, res) => {
  res.json({ message: 'Hola' })
})

app.listen(PORT, () => (
  console.log(`Server listening on http:localhost:${PORT}`)
))
