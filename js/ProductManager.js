
class ProductManager{

    constructor(){
        this.products=[]
        this.path = "../archivos/productos.txt"
    }

    camposVacios(tittle, description, price, thumbnail, code, stock){
        return ( (tittle.trim().length==0) || (description.trim().length==0) || (price.trim().length==0) || (thumbnail.trim().length==0) || (code.trim().length==0) || (stock.trim().length==0))
    }

    existeCode(code){

        if (this.products.length == 0) {
            return false;
        }   

        for (let i = 0; i < this.products.length; i++) {
            const p = this.products[i];
            if (p.code == code) {
                return true;
            }
        }
    }

    addProduct(tittle, description, price, thumbnail, code, stock){

        if (this.camposVacios(tittle, description, price, thumbnail, code, stock)) {
            console.log("campos invalidos")
        }
        if(this.existeCode(code)){
            console.log("El codigo "+code+" es invalido para el producto "+tittle)
        }
        else{
            const id = this.getNextId();
            const producto = {
                id,
                tittle,
                description,
                price,
                thumbnail,
                code,
                stock
            }
            this.products.push(producto);
        }
    }

    getProducts(){
        return this.products;
    }

    getProductById(id){

        for (let i = 0; i < this.products.length; i++) {
            const p = this.products[i];

            if (p.id == id) {
                return p;
            } 
        }
        
        console.log("Product not found");
        
    }

    getNextId(){
        const count = this.products.length;

        if (count > 0) {
            const lastProduct = this.products[count-1]
            const id = lastProduct.id + 1;
            return id;
        }else{
            return 1;
        }
    }
}

const productManager=new ProductManager();

productManager.addProduct("Water Cooler AM4", "refrigeracion liquida para CPU Ryzen", "20000", "http:imagen-1", "BEASVC001", "3");
console.log(productManager.getProducts())

productManager.addProduct("RTX 4080 16Gb", "Tarjeta de video Nvidia", "500.000", "http:imagen-2", "BEASVC777", "5");
productManager.addProduct("RX 6700 12Gb", "Tarjeta de video AMD", "300.000", "http:imagen-3", "OPP123", "7");
console.log(productManager.getProductById(3))

productManager.addProduct("ASUS B550 HDV", "Tarjeta madre de asus", "22.000", "http:imagen-4", "SIBCO548", "15");
productManager.addProduct("Fuente ASUS 1000w", "Fuente de alimentacion asus de 1000W", "65.000", "http:imagen-5", "BEASVC001", "11");

console.log(productManager.getProducts())
console.log(productManager.getProductById(1))