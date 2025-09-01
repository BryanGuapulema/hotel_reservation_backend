import { app } from './app.js'
import dotenv from 'dotenv'

dotenv.config()
import connectDB from './config/db.js'


const PORT = process.env.PORT ?? 1234

// Conectar DB
//connectDB()

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
