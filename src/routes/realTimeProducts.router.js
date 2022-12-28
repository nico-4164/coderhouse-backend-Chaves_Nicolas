import {ProductManager} from '../public/js/ProductManager.js';
import express from 'express'

const router = express.Router();
const productManager= new ProductManager("./src/public/archivos/productos.json");

router.get('/', async (req, res) => {
    const productos = await productManager.getProducts();
    res.render('realtimeproducts',{productos})
})




export default router;