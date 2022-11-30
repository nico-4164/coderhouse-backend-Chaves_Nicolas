
const fs = require('fs')
const { json } = require('stream/consumers')

class ProductManager{

    constructor(path){
        this.path = path
        this.format = "utf-8"
    }

    camposVacios(tittle, description, price, thumbnail, code, stock){
        return ( (tittle.trim().length==0) || (description.trim().length==0) || (price.trim().length==0) || (thumbnail.trim().length==0) || (code.trim().length==0) || (stock.trim().length==0))
    }

    async existeCode(code){

        let productos = await this.getProducts()

        if (productos.length == 0) {
            return false;
        }   

        for (let i = 0; i < productos.length; i++) {
            const p = productos[i];
            if (p.code == code) {
                return true;
            }
        }
    }

    async addProduct(tittle, description, price, thumbnail, code, stock){

        if (this.camposVacios(tittle, description, price, thumbnail, code, stock)) {
            console.log("campos invalidos")
        }
        if(await this.existeCode(code)){
            console.log("El codigo "+code+" es invalido para el producto "+tittle)
        }
        else{
            const id = await this.getNextId();
            const producto = {
                id,
                tittle,
                description,
                price,
                thumbnail,
                code,
                stock
            }

            this.getProducts()
            .then(products => {
                products.push(producto)
                return products
            }).then(productNew => fs.promises.writeFile(this.path, JSON.stringify(productNew)))
        }
    }

    async updateProduct(id, tittle, description, price, thumbnail, code, stock){

        let productos = await this.getProducts()
        console.log("log antes del update");
        console.log(productos);

        for (let i = 0; i < productos.length; i++) {
            const p = productos[i];

            if (p.id == id) {
                p.tittle=tittle;
                p.description=description;
                p.price=price;
                p.thumbnail=thumbnail;
                p.code=code;
                p.stock=stock;
                i=productos.length;
            } 
            
        }
        console.log("log despues del update");
        console.log(productos);
        fs.promises.writeFile(this.path, JSON.stringify(productos))
        
    }

    async deleteProduct(id){

        let productos = await this.getProducts()
        const filterProductos = await productos.filter((p) => p.id !== id)

        console.log("log antes del delete");
        console.log(productos);

        fs.promises.writeFile(this.path, JSON.stringify(filterProductos))

        console.log("log despues del delete");
        console.log(filterProductos);

    }

    getProducts = async() => {
        return fs.promises.readFile(this.path ,this.format)
        .then(content => JSON.parse(content))
        .catch(e => {
            console.log('ERROR', e)
            return []
        })
    }

    async getProductById(id){

        let productos = await this.getProducts()

        for (let i = 0; i < productos.length; i++) {
            const p = productos[i];

            if (p.id == id) {
                return p;
            } 
        }
        
        console.log("Product not found");
        
    }

    async getNextId(){

        let products = await this.getProducts();
        const count = products.length;


        if (count > 0) {
            const lastProduct = products[count-1]
            const id = lastProduct.id + 1;
            return id;
        }else{
            return 1;
        }
    }
}

async function run(){
    console.log("inicio del codigo")
    const productManager=new ProductManager("../archivos/productos.json");

    await productManager.addProduct("Water Cooler AM4", "refrigeracion liquida para CPU Ryzen", "20000", "http:imagen-1", "BEASVC001", "3");
    console.log(await productManager.getProducts())

    await productManager.addProduct("RTX 4080 16Gb", "Tarjeta de video Nvidia", "500.000", "http:imagen-2", "BEASVC777", "5");
    await productManager.addProduct("RX 6700 12Gb", "Tarjeta de video AMD", "300.000", "http:imagen-3", "OPP123", "7");
    console.log(await productManager.getProductById(3))

    await productManager.addProduct("ASUS B550 HDV", "Tarjeta madre de asus", "22.000", "http:imagen-4", "SIBCO548", "15");
    await productManager.addProduct("Fuente ASUS 1000w", "Fuente de alimentacion asus de 1000W", "65.000", "http:imagen-5", "BEASVC001", "11");

    await productManager.updateProduct(1,"Fuente ASUS 500W", "Fuente de alimentacion asus de 500W", "20.000", "http:imagen-6", "BEASVC001", "17")

    await productManager.deleteProduct(2)
    console.log("final del codigo");
    console.log(await productManager.getProducts())
}

run()