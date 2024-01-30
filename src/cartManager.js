const fs = require('fs');

class CartManager {
    static id = 0; 

    constructor(path){
        this.path = path; 
        fs.writeFileSync(path, '[]')
    }

    async addCarts(){
        
        const content = await  fs.promises.readFile(this.path, 'utf-8'); 
        const carts = JSON.parse(content); 

        const cart = {id: ++CartManager.id, products: []}

        carts.push(cart); 

        await fs.promises.writeFile(this.path, JSON.stringify(carts,null, '\t'));
    }

    async getCarts(id){
        const content = await  fs.promises.readFile(this.path, 'utf-8');
        const carts = JSON.parse(content);

        const cart = carts.find(i=>i.id == id)

        return cart; 
    }

    async addProduct(id, productId){
        const content = await  fs.promises.readFile(this.path, 'utf-8');
        const carts = JSON.parse(content);

        const cart_index = carts.findIndex(i=>i.id == id)
        const cart = {...carts[cart_index]}

        const index = cart.products.findIndex(i=>i.product == productId)
        if(index >= 0){
            cart.products[index].quantity+=1;  
        }else{
            cart.products.push({product: productId, quantity:1})
        }

        cart[cart_index] = cart;
        await fs.promises.writeFile(this.path, JSON.stringify(carts,null, '\t'));
    }

}

module.exports = CartManager; 