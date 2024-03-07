const fs = require("fs");

class ProductManager {
    static id = 0;
    constructor() {
        this.products = [];
        this.path = "./productos.json";
    }


    addProduct(title, description, price, thumbnail, code, stock) {
        if(!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Los campos deben ser obligatorios");
            return;
        }

        if(this.products.some(item => item.code === code)) {
            console.log("El código no debe repetirse");
            return;
        }

        const newProduct = {
            id: ++ProductManager.id,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
        }
    }

    async getProducts(){
        const product = await fs.promises.readFile(this.path, "utf-8");
        if(product) {
            return JSON.parse(product);
        } else {
            console.error("No se pudo leer el archivo de productos");
        }
    }

    async getProductById(id) {
        try {
            const productsById = await this.getProducts();
            return productsById.find(product => product.id === id);
        } catch (error) {
            console.log("No se pudo obtener el producto por su ID", error);
        }
    }


    async deleteProduct(id) {
        try {
            const productsDelete = await this.getProducts();
            const productsFilter = products.filter(product => product.id !== id);
        } catch (error) {
        console.error("Error al eliminar el producto");
        }
    }
}

const newManager = new ProductManager("./productos.json");

console.log(newManager.getProducts());

newManager.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123", 25);
newManager.addProduct("producto prueba2", "este es un producto prueba", 350, "sin imagen", "abc124", 30);
newManager.addProduct("producto prueba2", "este es un producto prueba", 350, "sin imagen", "abc124", 30);

console.log(newManager.getProducts());

newManager.getProductById(2);