const express = require('express');
const port = 8080;
const productsRouter = require('./routes/products.route')
const cartRouter = require('./routes/carts.route');

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.listen(port, ()=>console.log(`Server running on port ${port}`));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);