import {ProductManager} from '../js/ProductManager.js';
import carritoRouter from './routes/carrito.router.js'
import express from 'express'
import productosRouter from './routes/productos.router.js'

const productManager= new ProductManager("../CoderHouse/archivos/productos.json");

const app = express()

app.use(express.json())
app.use('/static', express.static('public'))

const productos = await productManager.getProducts();


app.get('/product', (req,res)=>{
    res.send("Hola a todos, pero ahora desde express")    
})

app.use('/api/productos', productosRouter)
app.use('/api/carrito', carritoRouter)

app.listen(8081, () => console.log("Servidor arriba en el puerto 8081"))