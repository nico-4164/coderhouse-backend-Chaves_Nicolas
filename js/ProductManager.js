import fs from 'fs';

export class ProductManager{

    constructor(path){
        this.path = path
        this.format = "utf-8"
        this.mensaje = ""
    }

    async camposVacios(tittle, description, price, category, code, stock){
        return  ( (tittle===undefined || tittle.trim().length==0) || 
                (description===undefined || description.trim().length==0) || 
                (price===undefined) ||  
                (code===undefined || code.trim().length==0) || 
                (stock===undefined)) ||
                (category===undefined || category.trim().length==0) 
    }

    getMensaje(){
        return this.mensaje;
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

    async addProduct(tittle, description, code, price, stock, category, thumbnail){

        if (await this.camposVacios(tittle, description, price, category, code, stock)) {
            this.mensaje="campos invalidos";
            return;
        }
        if(await this.existeCode(code)){
            console.log("El codigo "+code+" es invalido para el producto "+tittle);
            this.mensaje="El codigo "+code+" es invalido para "+tittle;
        }
        else{
            this.mensaje="success";
            let status = true;
            const id = await this.getNextId();
            const producto = {
                id,
                tittle,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnail
            }

            this.getProducts()
            .then(products => {
                products.push(producto)
                return products
            })
            .then(productNew => fs.promises.writeFile(this.path, JSON.stringify(productNew)))
        }
    }

    async updateProduct(id, tittle, description,code, price, stock, status, category, thumbnail){

        let productos = await this.getProducts()

        for (let i = 0; i < productos.length; i++) {
            const p = productos[i];

            if (p.id == id) {

                console.log("entro en la edicion");
                
                p.tittle=tittle;
                p.description=description;
                p.code=code;
                p.price=price;
                p.status=status;
                p.stock=stock;
                p.category=category;
                p.thumbnail=thumbnail;
                i=productos.length;
            } 
            
        }
        fs.promises.writeFile(this.path, JSON.stringify(productos))
        
    }

    async deleteProduct(id){

        let productos = await this.getProducts()
        const filterProductos = await productos.filter((p) => p.id !== id)

        fs.promises.writeFile(this.path, JSON.stringify(filterProductos))

    }

    getProducts = async() => {
        return fs.promises.readFile(this.path ,this.format)
        .then(content => JSON.parse(content))
        .catch(e => {
            console.log('ERROR', e)
            return []
        })
    }

    getProductsWithLimit = async(limite) => {
        return fs.promises.readFile(this.path ,this.format)
        .then(content => JSON.parse(content))
        .then(productos => productos.slice(0,limite))
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
        return {status: 'El producto que desea modificar no se encontro'}
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