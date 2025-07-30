import express from 'express'
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const prisma = new PrismaClient()
const router = express.Router()


router.get('/', async (req, res) => {
    try {
        const users = await prisma.users.findMany()
        return res.json(users)
    } catch (error) {
        return res.status(500).json({error: "Erro ao buscar usuarios."})
    }
})

router.post('/register', async (req, res) => {
    const { nome, email, senha } = req.body
    const hashedPassword = await bcrypt.hash(senha, 10)
    try {
        const user = await prisma.users.create({
            data: {
                nome,
                email,
                senha: hashedPassword
            }
        })
        return res.status(200).json({msg: 'Usuário registrado!', usuario: user, done: true})
    } catch (error) {
        return res.status(400).json({error: error})
    }
})

router.post('/login', async (req, res) => {
    const { email, senha } = req.body
    const user = await prisma.users.findFirst({
        where: {
            email: email
        }
    })
    if (!user) return res.status(400).json({msg: 'Senha Incorreta ou Usuário inexistente!'})
    try {
        const checkPassword = await bcrypt.compare(senha, user.senha)
        if (checkPassword) {
            const secret = process.env.SECRET
            const options = {
                expiresIn: '12h'
            }
            const token = jwt.sign({id: user.id}, secret, options)
            return res.status(200).json({msg: 'Logado com sucesso', token, nome: user.nome})
        } else {
            return res.json({msg: 'Senha Incorreta ou Usuário inexistente!'})
        }
    } catch (error) {
        return res.status(500).json({msg: error})
    }
})

export default router