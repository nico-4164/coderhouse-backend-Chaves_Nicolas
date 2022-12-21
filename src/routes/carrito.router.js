import {Carrito} from '../../js/carrito.js'
import {ProductManager} from '../../js/ProductManager.js';
import { Router } from 'express'

const router = Router()
const cart = new Carrito('./archivos/carrito.json');
const productos= new ProductManager("./archivos/productos.json");

router.get('/', async (req, res) => {
    res.json(await cart.getCart())
})

router.get('/:pid', async (req, res) => {

    const pid = req.params.pid;
    if (!pid) {
        res.send({error:"la solicitud no existe"})
    } else {
        res.send(await cart.getCartById(parseInt(pid,10)))
    }
})

router.post('/', (req, res) => {

    let c = req.body;
    cart.createCart()
    res.send({status: 'success'})
})

router.post('/:cid/product/:pid', async (req, res) => {

    const cid = req.params.cid;
    const pid = req.params.pid;

    cart.updateCart(cid,await productos.getProductById(parseInt(pid,10)))
    res.send({status: 'success'})
})



export default router
