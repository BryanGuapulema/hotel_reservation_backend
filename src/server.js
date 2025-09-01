import { app } from './app.js'
import dotenv from 'dotenv'
import connectDB from './config/bdLocal.js'
// import connectDB from './config/db.js'

dotenv.config()

const PORT = process.env.PORT ?? 1234

// Conectar DB
connectDB()

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
