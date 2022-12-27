import {ProductManager} from '../../js/ProductManager.js';
import { Router } from 'express'

const router = Router()
const productos= new ProductManager("./archivos/productos.json");

router.get('/', async (req, res) => {

    let productLimit = req.query.limit;
    
    if (!productLimit || (productLimit >= productos.length)) {
        res.send(await productos.getProducts())     
    } else {
        res.send(await productos.getProductsWithLimit(parseInt(productLimit,10)))
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

router.put("/:pid", async (req, res) => {

    const pid = req.params.pid;
    const productUpdate = req.body;
    await productos.updateProduct(parseInt(pid,10), productUpdate.tittle, productUpdate.description, productUpdate.code, productUpdate.price, productUpdate.status, productUpdate.stock, productUpdate.category, productUpdate.thumbnail)

    res.send(await productos.getProductById(parseInt(pid,10)))
})

router.post('/', async (req, res) => {
    const producto = req.body

    await productos.addProduct(producto.tittle, producto.description, producto.code, producto.price, producto.stock, producto.category, producto.thumbnail);

    let mensaje=productos.getMensaje();

    res.send({status: mensaje})
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
