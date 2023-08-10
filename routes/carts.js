import express from 'express'

const router = express.Router();

//Receive a POST request to add an item to the cart
router.post('/cart/products', (req, res) => {
    console.log(req.body.productId)
    res.send(req.body.productId)
})

//Receive a GET request to display all items in the cart

//Receive a POST request to delete item in the cart

export default router