import {ProductManager} from '../../js/ProductManager.js';
import { Router } from 'express'

const router = Router()
const productos= new ProductManager("../CoderHouse/archivos/productos.json");

router.get('/', async (req, res) => {

    let productLimit = req.query.limite;
    let list=[]

    console.log("mensaje dentro del get de productos");
    console.log(productos.getProducts());
    
    if (!productLimit || (productLimit >= productos.length)) {
        res.json(await productos.getProducts())     
    } else {
        for (let i = 0; i < productLimit; i++) {
            const element = productos[i];
            list.push(element);
        }
        res.send({productos:list})
    }
})

router.get('/:pid', (req, res) => {

    const pid = req.params.pid;

    if (!pid) {
        console.log("enrtro en el if");
        res.send({productos})
    } else {

        let produto = productos.find(p => p.id === parseInt(pid,10));
        
        if (!produto) return res.send({error:"el producto no existe"})

        res.send(produto)
    }
})

router.post('/', async (req, res) => {
    const producto = req.body

    await productos.addProduct(producto.tittle, producto.description, producto.price , producto.thumbnail, producto.code , producto.stock);
    res.send({status: 'success'})
})



export default router
