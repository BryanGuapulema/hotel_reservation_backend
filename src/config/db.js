// config/db.js
import { connect } from 'mongoose'

const connectDB = async () => {
  try {
    await connect(process.env.MONGODB_URI)
    console.log('✅ Conectado a MongoDB Atlas')
  } catch (err) {
    console.error('❌ Error de conexión a MongoDB:', err.message)
    process.exit(1) // Detener la app si falla la conexión
  }
}

export default connectDB
