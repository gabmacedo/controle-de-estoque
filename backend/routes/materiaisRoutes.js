import express from 'express'
const router = express.Router()
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    try {
        const materiais = await prisma.materiais.findMany()
        return res.json(materiais)
    } catch (error) {
        return res.status(500).json({error: "Erro ao buscar materiais."})
    }
})

router.get('/maior', async (req, res) => {
    const material = await prisma.materiais.findFirst({
        orderBy: {
            quantidade: 'desc'
        }
    })
    return res.status(200).json(material)
})

router.get('/menor', async (req, res) => {
    const material = await prisma.materiais.findFirst({
        orderBy: {
            quantidade: 'asc'
        }
    })
    return res.status(200).json(material)
})

router.get('/agrupados', async (req, res) => {
    try {
        const materiais = await prisma.materiais.groupBy({
            by: ['nome'],
            _sum: {
                quantidade: true
            },
            orderBy: {
                _sum: {
                    quantidade: 'desc'
                }
            }
        })
    return res.json(materiais)
    } catch (error) {
        return res.status(500).json({erro: "Erro ao agrupar materiais"})
    }
})

router.post('/', async (req, res) => {
    const { nome, quantidade, preco_centavos, data } = req.body

    if (!nome || !quantidade || !preco_centavos || !data) {
        return res.status(400).json({message: "Todos os campos são obrigatórios!"})
    }
    try {
        const converterPreco = Math.round(parseFloat(preco_centavos) * 100)
        const novoMaterial = await prisma.materiais.create({
            data: {
                nome,
                quantidade,
                preco_centavos: converterPreco,
                data
            }
        })
        return res.status(201).json(novoMaterial)
    } catch (error) {
        return res.status(500).json({error: "Erro ao criar material!"})
    }
} )

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deleteMaterial = await prisma.materiais.delete({
            where: {
                id: Number(id)
            }
        })
        return res.status(200).json(deleteMaterial)
    } catch (error) {
        return res.status(400).json({message: "Erro ao deletar!", erro: error})
    }
})

export default router;