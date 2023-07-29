import express from 'express'
import { validationResult } from 'express-validator'
import multer from 'multer'

import productsRepo from '../../repositories/products.js'
import productsNewTemplate from '../../views/admin/products/new.js'
import { requireTitle, requirePrice } from './validators.js'

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

router.get('/admin/products', (req, res) => {})

router.get('/admin/products/new', (req, res) => {
    res.send(productsNewTemplate({}))
})

router.post('/admin/products/new', [requireTitle, requirePrice], upload.single('image'), (req, res) => {
    const errors = validationResult(req)

    console.log(req.file)

    res.send('Submitted')           
})

export default router


