import { connect } from 'mongoose'

// URL de conexión local
const mongoURI = 'mongodb://127.0.0.1:27017/hotelDB'

const connectDB = async () => {
  try {
    await connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('✅ Conectado a MongoDB LOCAL')
  } catch (err) {
    console.error('❌ Error de conexión a MongoDB:', err.message)
    process.exit(1) // Detener la app si falla la conexión
  }
}

export default connectDB
