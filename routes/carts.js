import express from 'express'
import cartsRepo from '../repositories/carts.js'
import productsRepo from '../repositories/products.js'
import cartShowTemplate from '../views/carts/show.js'

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

    //Either increment quantity of existing product
    const existingItem = cart.items.find(item => item.id === req.body.productId)

    if(existingItem) {
        existingItem.quantity++
    } else {
        //Or add new product to items array
        cart.items.push({ id: req.body.productId, quantity: 1 }) 
    }
    
    await cartsRepo.update(cart.id, {   //id, change that we made
        items: cart.items
    })

    res.redirect('/cart')
})

//Receive a GET request to display all items in the cart
router.get('/cart', async (req, res) => {
    if(!req.session.cartId) {
        return res.redirect('/')
    }

    const cart = await cartsRepo.getOne(req.session.cartId)

    for(let item of cart.items) {
        const product = await productsRepo.getOne(item.id)

        item.product = product
    }

    res.send(cartShowTemplate({ items: cart.items }))
})

//Receive a POST request to delete item in the cart
router.post('/cart/products/delete', async (req, res) => {
    const { itemId } = req.body

    const cart = await cartsRepo.getOne(req.session.cartId) //cartId that belongs to this user

    const items = await cart.items.filter(item => item.id !== itemId)

    await cartsRepo.update(req.session.cartId, { items })

    res.redirect('/cart')
})

export default router