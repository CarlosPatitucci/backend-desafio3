const express = require('express');
const ProductManager = require('./productManager');

const server = express();
const port = 8080; 

server.use(express.urlencoded({extended:true}));

const manager = new ProductManager('./src/products.json')

server.get('/',(req, res)=>{
    res.send('Bienvenidos al puerto 8080')
})

server.get("/products/:id", async (req, res) => {
    
    let products = await manager.getProducts();
    let id = req.params.id;
    

    const producto = products.find(item => item.id == id );

    if(producto) {
        res.send(producto);
    }else{
        res.send("El producto no fue encontrado");
    }
})


server.get("/products", async (req, res) => {
    let products = await manager.getProducts();

    if (req.query.limit) {
        let limit = parseInt(req.query.limit);
        const productos = products.slice(0, limit);
        res.send(productos);
    } else {
        res.send(products);
    }
});

server.listen(port, ()=>console.log(`El servidor esta corriendo en el puerto${port}`));