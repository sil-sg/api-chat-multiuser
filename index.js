import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { User, Message, Chat, ChatMessage } from './models/index.js'
import { start } from './db/conn.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
const { PORT } = process.env

start()

app.get('/', (req, res) => { res.json({ message: "Server running...", sucess: true }) })
//app.get('/api', (req, res) => { res.json({ message: "Server running..." }) })

// GET ALL
app.get('/users', async (req, res) => {
    try {
        
        const data = await User.find()
        
        if (data) {
            res.json({ message: 'sucess', content: data })
            console.log({ message: 'sucess', content: data })
        } else {
            res.json({ message: 'failed' })
            console.log({ message: 'failed' })
        }
    } catch (e) {
        res.json({ message: 'failed' })
        console.error(e)
    }
})
app.get('/messages', async (req, res) => {
    try {
        
        const data = await Message.find()
        
        if (data) {
            res.json({ message: 'sucess', content: data })
            console.log({ message: 'sucess', content: data })
        } else {
            res.json({ message: 'failed' })
            console.log({ message: 'failed' })
        }
    } catch (e) {
        res.json({ message: 'failed' })
        console.error(e)
    }
})
app.get('/chats', async (req, res) => {
    try {
        
        const data = await Chat.find()
        
        if (data) {
            res.json({ message: 'sucess', content: data })
            console.log({ message: 'sucess', content: data })
        } else {
            res.json({ message: 'failed' })
            console.log({ message: 'failed' })
        }
    } catch (e) {
        res.json({ message: 'failed' })
        console.error(e)
    }
})

// DELETE ALL
app.delete('/users', async (req, res) => {
    try {
        
        const data = await User.deleteMany({})
        
        if (data) {
            res.json({ message: 'sucess', content: data })
            console.log({ message: 'sucess', content: data })
        } else {
            res.json({ message: 'failed' })
            console.log({ message: 'failed' })
        }
    } catch (e) {
        res.json({ message: 'failed' })
        console.error(e)
    }
})

// GET ONE BY EMAIL / VERIFY
app.get('/users/:email', async (req, res) => {
    try {
        const { email } = req.params
        
        const data = await User.find({ email: email })
        
        if (data && email) {
            if (data.length === 0) {
                res.json({ message: 'sucess', content: data })
                console.log({ message: 'sucess', content: data })
            } else {
                res.json({ message: 'failed', content: data })
                console.log({ message: 'failed', content: data })
            }
        } else {
            res.json({ message: 'failed' })
            console.log({ message: 'failed' })
        }
    } catch (e) {
        res.json({ message: 'failed' })
        console.error(e)
    }
})

// POST USER / MESSAGE
app.post('/users', async (req, res) => {
    try {
        const { name, email, password } = req.body
        
        const data = await User.create({ name: name, email: email, password: password })
        
        if (data && name && email && password) {
            res.json({ message: 'sucess', content: data })
            console.log({ message: 'sucess', content: data })
        } else {
            res.json({ message: 'failed' })
            console.log({ message: 'failed' })
        }
    } catch (e) {
        res.json({ message: 'failed' })
        console.error(e)
    }
})
app.post('/messages', async (req, res) => {
    try {
        const { content, senderId, senderName, visualized } = req.body
        
        const data = await Message.create({ content: content, senderId: senderId, senderName: senderName, visualized: visualized })
        
        if (data && content && senderId && senderName && visualized) {
            res.json({ message: 'sucess', content: data })
            console.log({ message: 'sucess', content: data })
        } else {
            res.json({ message: 'failed' })
            console.log({ message: 'failed' })
        }
    } catch (e) {
        res.json({ message: 'failed' })
        console.error(e)
    }
})

// LOGIN TO ACCOUNT
app.get('/users/:name/:email/:password', async (req, res) => {
    try {
        const { name, email, password } = req.params
        
        const data = await User.find({ name: name, email: email, password: password })
        
        if (data && name && email && password) {
            if (data.length === 1) {
                res.json({ message: 'sucess', content: data[0] })
                console.log({ message: 'sucess', content: data[0] })
            } else {
                res.json({ message: 'failed', content: data })
                console.log({ message: 'failed', content: data })
            }
        } else {
            res.json({ message: 'failed' })
            console.log({ message: 'failed' })
        }
    } catch (e) {
        res.json({ message: 'failed' })
        console.error(e)
    }
})

// CHAT PRIVATE
app.post('/chats', async (req, res) => {
    try {
        const { name, creatorId, creatorName, creatorEmail } = req.body
        
        const data = await Chat.create({ 
            name: name, 
            creatorId: creatorId, 
            creatorName: creatorName, 
            creatorEmail: creatorEmail,
            participants: [creatorId]
        })
        
        if (data && name && creatorId && creatorName && creatorEmail) {
            res.json({ message: 'sucess', content: data })
            console.log({ message: 'sucess', content: data })
        } else {
            res.json({ message: 'failed' })
            console.log({ message: 'failed' })
        }
    } catch (e) {
        res.json({ message: 'failed' })
        console.error(e)
    }
})

app.listen(PORT, () => console.log('Servidor rodando na porta: ' + PORT))
