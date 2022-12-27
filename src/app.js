import {ProductManager} from '../js/ProductManager.js';
import carritoRouter from './routes/carrito.router.js'
import express from 'express'
import handlebars from 'express-handlebars';
import productosRouter from './routes/productos.router.js'

const productManager= new ProductManager("../CoderHouse/archivos/productos.json");

const app = express()

app.use(express.json())
app.use('/static', express.static('public'))

const productos = await productManager.getProducts();

app.use('/api/productos', productosRouter)
app.use('/api/carts', carritoRouter)

app.listen(8081, () => console.log("Servidor arriba en el puerto 8081"))