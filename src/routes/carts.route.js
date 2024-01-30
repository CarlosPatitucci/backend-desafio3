const {Router}= require('express');
const CartManager = require('../cartManager');
const ProductManager = require('../productManager');

const router = Router();


const managerProduct = new ProductManager(__dirname+'/../file/products.json')
const managerCart = new CartManager(__dirname+'/../file/carts.json');

router.post('/',async (req, res)=>{
    await managerCart.addCarts();
    res.send({status:'success'})
})

router.get('/:id',async (req, res)=>{
    const id = req.params.id; 

    const cart = await managerCart.getCarts(id)

    res.send({status:'success', products: cart.products})

})

router.post('/:id/product/:iid', async (req, res)=>{
    const id = req.params.id; 
    const productId = req.params.iid; 

    const cart = await managerCart.getCarts(id)
    const product = await managerProduct.getProduct(productId)
    if(!cart){
        res.status(400).send('Collection does not exist')
    }
    if(!product){
        res.status(400).send('product does not exist')
    }

    managerCart.addProduct(id, productId)

    res.send({status:'success'})
})


module.exports = router; 