import { Schema, model } from 'mongoose'

const schemaMessages = new Schema({
    content: {type: String, required: true},
    senderId: {type: String, required: true},
    senderName: {type: String, required: true},
    visualized: {type: Boolean, default: false},
    createAt: {type: String, default: new Date().toLocaleString()}
})

export const Message = model('messages', schemaMessages)