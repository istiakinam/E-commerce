import express from 'express'
import cartsRepo from '../repositories/carts.js'

const router = express.Router();

//Receive a POST request to add an item to the cart
router.post('/cart/products', async (req, res) => {
    //New cart needed or not
    let cart
    if(!req.session.cartId) {
        //no cart, then create anew
        cart = await cartsRepo.create({ items: [] })
        //and store cartId in req.session.cartId
        req.session.cartId = cart.id
    } else {
        //cart exists! retreive cart from repository
        cart = await cartsRepo.getOne(req.session.cartId)
    }

    console.log(cart)

    //Either increment quantity of existing product

    //Or add new product to items array


    res.send("Product added to Cart")
})

//Receive a GET request to display all items in the cart

//Receive a POST request to delete item in the cart

export default router