import fs from 'fs';

export class Carrito{

    constructor(path){
        this.id;
        this.path = path
        this.format = "utf-8"
    }

    getCart = async() => {
        return fs.promises.readFile(this.path ,this.format)
        .then(content => JSON.parse(content))
        .catch(e => {
            console.log('ERROR', e)
            return []
        })
    }

    async getCartById(id){

        let cart = await this.getCart()

        for (let i = 0; i < cart.length; i++) {
            const c = cart[i];

            if (c.id == id) {
                return c;
            } 
        }
        
    }

    async createCart(){
        const id = await this.getNextId();
        this.getCart()
        .then(carts => {
            carts.push(
                {
                    "id":id,
                    "products":[]
                })
            return carts
        }).then(newCart => fs.promises.writeFile(this.path, JSON.stringify(newCart)))
    }

    async AddProductInCart(producto){
        this.getCart()
        .then(carts => {
            carts.products.push({
                "product" : producto.id,
                "quantity": 1
            })
            return carts
        }).then(newCart => fs.promises.writeFile(this.path, JSON.stringify(newCart)))
    }

    async updateCart(id,producto){

        let cart = await this.getCart();
        let pid = producto.id;
        console.log("log del id producto");
        console.log(pid);

        for (let i = 0; i < cart.length; i++) {
            const c = cart[i];

            if (c.id == id) {
                console.log("log del carrito");
                console.log(c.products);
                if (c.products.length == 0) {
                    c.products.push({
                        "product": pid,
                        "quantity": 1
                        })
                } else {
                    for (let j = 0; j < c.products.length; j++) {
                        const p = c.products[j];
                        console.log("log del producto dentro del carrito");
                        console.log(p);
                        if (p.product === pid) {
                            p.quantity+=1;
                        }
                    } 
                }
            } 
            fs.promises.writeFile(this.path, JSON.stringify(cart))
        }
    }

    async getNextId(){

        let carts = await this.getCart();
        const count = carts.length;


        if (count > 0) {
            const lastProduct = carts[count-1]
            const id = lastProduct.id + 1;
            return id;
        }else{
            return 1;
        }
    }
}