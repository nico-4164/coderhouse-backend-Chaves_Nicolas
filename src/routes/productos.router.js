import {ProductManager} from '../../js/ProductManager.js';
import { Router } from 'express'

const router = Router()
const productos= new ProductManager("./archivos/productos.json");

router.get('/', async (req, res) => {

    let productLimit = req.query.limite;
    let list=[]
    
    if (!productLimit || (productLimit >= productos.length)) {
        res.json(await productos.getProducts())     
    } else {
        for (let i = 0; i < productLimit; i++) {
            const element = productos[i];
            list.push(element);
        }
        res.send(await productos.getProducts())
    }
})

router.get('/:pid', async (req, res) => {

    const pid = req.params.pid;

    if (!pid) {
        res.send({productos})
    } else {

        let produto = await productos.getProductById(parseInt(pid,10));
        
        if (!produto) return res.send({error:"el producto no existe"})

        res.send(produto)
    }
})

router.post('/', async (req, res) => {
    const producto = req.body

    await productos.addProduct(producto.tittle, producto.description, producto.price , producto.thumbnail, producto.code , producto.stock);
    res.send({status: 'success'})
})

router.delete('/:pid', (req, res) => {

    const pid = req.params.pid;

    if (!pid) {
        res.send({productos})
    } else {
        productos.deleteProduct(parseInt(pid,10))      
        res.send({status: 'producto eliminado'})
    }
})



export default router
