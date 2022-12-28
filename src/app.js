import { ProductManager } from './public/js/ProductManager.js';
import { Server } from "socket.io";
import __dirname from './utils.js';
import carritoRouter from './routes/carrito.router.js'
import express from 'express'
import handlebars from 'express-handlebars';
import productosRouter from './routes/productos.router.js'
import viewsRouter from './routes/realTimeProducts.router.js'

const app = express()
const productManager= new ProductManager("./src/public/archivos/productos.json");

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

socketServer.on('connection', async socket => {

    console.log('conexion exitosa');

    socket.on('pedido', async data => {

        console.log("SERVER: ", {data});

        await productManager.addProduct(data.tittle, data.desciption, data.code, data.price, data.stock, data.category, data.thumbnail)
        const productos = await productManager.getProducts();

        console.log(productos)
        socket.emit('update',productos)
        
    })

    socket.on('delete', async data => {

        console.log("SERVER: ", data);

        await productManager.deleteProduct(parseInt(data,10))
        const productos = await productManager.getProducts();

        console.log(productos)
        socket.emit('update',productos)
        
    })

})