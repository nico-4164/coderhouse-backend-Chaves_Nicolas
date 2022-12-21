import { Router } from 'express'

const router = Router()
const carrito = []

router.get('/', (req, res) => {
    res.json({ carrito })
})

router.post('/', (req, res) => {
    const item = req.body
    carrito.push(item)

    res.send({status: 'success'})
})



export default router
