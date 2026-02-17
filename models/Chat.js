import { Schema, model } from 'mongoose'

const schemaChat = new Schema({
    name: {type: String, required: true},
    creatorId: {type: String, required: true},
    creatorName: {type: String, required: true},
    creatorEmail: {type: String, required: true},
    active: {type: Boolean, default: true},
    createAt: {type: Date, default: Date.now},
    participants: [{ type: String }]
})

const schemaMessage = new Schema({
  chatId: { type: Schema.Types.ObjectId, ref: 'Chat', required: true, index: true },
  senderId: { type: String, required: true },
  senderName: { type: String, required: true },
  content: { type: String, required: true },
  visualized: { type: Boolean, default: false },
  visualizedAt: Date,
  createdAt: { type: Date, default: Date.now, index: true }
});

const Chat = model('chat', schemaChat)
const ChatMessage = model('chatmessage', schemaMessage)

export {
    Chat,
    ChatMessage
}