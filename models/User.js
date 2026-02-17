import { Schema, model } from 'mongoose'

const schemaUsers = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    logado: {type: Boolean, default: false},
    active: {type: Boolean, default: true},
    createAt: {type: String, default: new Date().toLocaleString()}
})

export const User = model('users', schemaUsers)