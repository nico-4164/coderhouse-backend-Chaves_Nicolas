import { ProductManager } from '../js/ProductManager.js';
import { Server } from "socket.io";
import __dirname from './utils.js';
import carritoRouter from './routes/carrito.router.js'
import express from 'express'
import handlebars from 'express-handlebars';
import productosRouter from './routes/productos.router.js'
import viewsRouter from './routes/realTimeProducts.router.js'

const app = express()
const productManager= new ProductManager("./archivos/productos.json");

app.use(express.json())
app.use('/static', express.static('public'))

app.engine('handlebars', handlebars.engine())
app.set('views',__dirname + '/views')
app.set('view engine','handlebars')

app.get('/', async (req, res) => {
    const productos = await productManager.getProducts();
    res.render('home',{productos})
})

app.use('/realtimeproducts', viewsRouter)
app.use('/api/productos', productosRouter)
app.use('/api/carts', carritoRouter)

const httpServer = app.listen(8081, () => console.log("Servidor arriba en el puerto 8081"));
const socketServer = new Server(httpServer)

socketServer.on('connection', socket => {
    console.log('conexion exitosa');

    socket.on('pedido', data =>{

    })

})