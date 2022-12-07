import express, { urlencoded } from "express";

import {ProductManager} from '../js/ProductManager.js';

const productManager= new ProductManager("../CoderHouse/archivos/productos.json");

const app = express()

app.use(urlencoded({extended:true}))

const productos = await productManager.getProducts();


app.get('/product', (req,res)=>{
    res.send("Hola a todos, pero ahora desde express")    
})

app.get('/productos', (req, res) => res.send({productos} ) )
app.get('/productos/:limite', (req, res) => {

    const productLimit = req.params.limite;
    console.log(productLimit);
    let list=[]
    
    for (let i = 0; i < productLimit; i++) {
        const element = productos[i];
        list.push(element);
    }
    console.log(list);
    res.send({productos:list})

})

app.listen(8081, () => console.log("Servidor arriba en el puerto 8081"))