const {Router} = require('express');
const ProductManager = require ('../productManager');

const router = Router();

const manager = new ProductManager(__dirname+'/../file/products.json')

router.get('/', async (req, res)=>{
    let products = await manager.getProducts()

    const {limit} = req.query;
    if(limit){
        products = products.slice(0,limit)
    } 

    res.send({products: products})
})

router.get('/:id', async (req, res)=>{
    let products = await manager.getProducts()
    let id = req.params.id; 

    let product = products.find(i=>i.id == id);

    res.send({product: product})
})

router.post('/', async (req, res) => {
    try {
        const requiredFields = ['title', 'description', 'code', 'price', 'status', 'stock', 'category', 'thumbnails'];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            const errorMessage = `Los siguientes campos son obligatorios: ${missingFields.join(', ')}.`;
            console.log(errorMessage);
            return res.status(400).send({ status: 'error', message: errorMessage });
        }

        await manager.addProduct(req.body);
        
        res.status(201).send({ status: 'success' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 'error', message: 'Error interno del servidor.' });
    }
});


router.put('/:id', async (req, res)=>{
    const id = req.params.id
    
    await manager.updateProduct(id, req.body);

    res.send({status:'success'})
})

router.delete('/:id', async (req,res)=>{
    const id = req.params.id; 
    await manager.deleteProduct(id);
    res.send({status:'success'})
})


async function addProducts(){
    await manager.addProduct({
        title: 'Zanahoria',
        description: 'Vegetal Naranja',
        code: 'COD01',
        price: 125,
        status: true,
        stock: 100,
        category: 'Verduras',
        thumbnails: 'img'
    })
}
addProducts()

module.exports = router; 