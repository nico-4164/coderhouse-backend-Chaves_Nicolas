import express, { urlencoded } from "express";

import {ProductManager} from '../js/ProductManager.js';

const productManager= new ProductManager("../CoderHouse/archivos/productos.json");

const app = express()

app.use(urlencoded({extended:true}))

const productos = await productManager.getProducts();


app.get('/product', (req,res)=>{
    res.send("Hola a todos, pero ahora desde express")    
})

//app.get('/productos', (req, res) => res.send({productos} ) )

app.get('/productos', (req, res) => {

    let productLimit = req.query.limite;
    console.log(productLimit);
    let list=[]
    
    if (!productLimit || (productLimit >= productos.length)) {
        console.log("enrtro en el if");
        console.log(productos);
        res.send({productos})
    } else {
        for (let i = 0; i < productLimit; i++) {
            const element = productos[i];
            list.push(element);
        }
        console.log(list);
        res.send({productos:list})
    }
})

app.get('/productos/:pid', (req, res) => {

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


app.listen(8081, () => console.log("Servidor arriba en el puerto 8081"))