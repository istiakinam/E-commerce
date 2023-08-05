import express from 'express'
import multer from 'multer'

import { handleErrors } from './middlewares.js'
import productsRepo from '../../repositories/products.js'
import productsNewTemplate from '../../views/admin/products/new.js'
import { productsIndexTemplate } from '../../views/admin/products/index.js'
import { requireTitle, requirePrice } from './validators.js'

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

router.get('/admin/products', async (req, res) => {
    const products = await productsRepo.getAll()
    res.send(productsIndexTemplate({ products }))
})

router.get('/admin/products/new', (req, res) => {
    res.send(productsNewTemplate({}))
})

router.post(                    //ordering of middleware is important
    '/admin/products/new',  
    upload.single('image'),
    [requireTitle, requirePrice], 
    handleErrors(productsNewTemplate),
    async (req, res) => {
        const image = req.file.buffer.toString('base64')
        const { title, price } = req.body
        await productsRepo.create({ title, price, image })

        res.send('Submitted')   
})

export default router


