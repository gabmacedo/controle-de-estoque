import express from 'express'
const router = express.Router()
import { PrismaClient } from '@prisma/client';
import { validate as validadeCpf } from 'gerador-validador-cpf'
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    const cliente = await prisma.clientes.findMany()
    return res.status(200).json(cliente)
})

router.post('/', async (req, res) => {
    const { nome, email, cpf, rg, telefone, endereco} = req.body

     
    if (cpf && !validadeCpf(cpf)) return res.status(400).json({message: 'CPF inválido!'})

    if (email && !email.includes('@')) return res.status(400).json({message: 'Email incorreto!'})
 
    if (telefone && !telefone.length != 11) {
        return res.status(400).json({message: 'Telefone Incorreto!'})
    }

    try {
        const newCliente = await prisma.clientes.create({
            data: {
                nome,
                email: email || null,
                cpf: cpf || null,
                rg: rg || null,
                telefone: telefone || null,
                endereco: endereco || null
            }
        })
        return res.status(201).json(newCliente)
    } catch (error) {
        return res.status(500).json({error: "Erro ao criar Cliente!"})
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deleteUser = await prisma.clientes.delete({
            where: {
                id: Number(id)
            }
        })
        return res.status(200).json({message: 'Cliente deletado!', client: deleteUser})
    } catch (error) {
        return res.status(400).json({message: "Erro ao deletar!", erro: error})
    }
})


export default router