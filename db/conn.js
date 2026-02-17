import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const { MONGO_URI } = process.env

export async function start() {
    mongoose.set('strictQuery', true)
    try {
        
        mongoose.connect(MONGO_URI)
        console.log('Conectado ao mongodb!')
        
    } catch (e) {
        console.error(e)
    }
}