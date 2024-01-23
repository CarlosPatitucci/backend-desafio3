const ProductManager = require("./productManager");

const manager = new ProductManager('./src/products.json');

async function cargarProductos(){

    await manager.addProduct({title: "Zanahoria", description: "vegetal naranja", price: 100, img: "imagen 1", code: "COD01", stock: 150})
    await manager.addProduct({title: "Banana", description: "fruta amarilla nutritiva", price: 150, img: "imagen 2", code: "COD02", stock: 250})
    await manager.addProduct({title: "Manzana", description: "fruta roja", price: 200, img: "imagen 3", code: "COD03", stock: 350})
    await manager.addProduct({title: "Kiwi", description: "fruta con pelos y acida", price: 250, img: "imagen 4", code: "COD04", stock: 450})
    await manager.addProduct({title: "Tomate", description: "vegetal naranja, sirve para hacer salsa", price: 300, img: "imagen 5", code: "COD05", stock: 550})
    await manager.addProduct({title: "Pera", description: "fruta jugosa y dulce", price: 350, img: "imagen 6", code: "COD06", stock: 650})
    await manager.addProduct({title: "Lechuga", description: "vegetal verde", price: 400, img: "imagen 7", code: "COD07", stock: 350})
    await manager.addProduct({title: "Queso", description: "Lacteo", price: 450, img: "imagen 8", code: "COD08", stock: 450})
    await manager.addProduct({title: "Cebolla", description: "Verdura que al pelar puede hacer llorar", price: 500, img: "imagen 9", code: "COD09", stock: 250})
    await manager.addProduct({title: "Melon", description: "fruta grande y redonda, dulce", price: 550, img: "imagen 10", code: "COD010", stock: 750})
    await manager.addProduct({title: "Remolacha", description: "verdura morada", price: 600, img: "imagen 11", code: "COD011", stock: 1050})

    const products = await manager.getProducts()
    console.log(products)

    await manager.deleteProduct(1)
}


cargarProductos();
