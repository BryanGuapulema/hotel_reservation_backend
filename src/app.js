import express from 'express'
import { homeRouter } from './routes/home.routes.js'

const PORT = process.env.PORT ?? 1234

const app = express()
app.disable('x-powered-by')
app.use(express.json())

app.get('/', homeRouter)

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
