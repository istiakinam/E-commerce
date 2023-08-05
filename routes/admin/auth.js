import express from 'express'

import { handleErrors } from './middlewares.js';
import usersRepo from '../../repositories/users.js';
import { check, validationResult } from 'express-validator'
import signupTemplate from '../../views/admin/auth/signup.js'
import signinTemplate from '../../views/admin/auth/signin.js'
import { checkEmail, 
        checkPassword, 
        requireEmail, 
        requirePassword, 
        requirePasswordConfirmation 
    } from './validators.js'

const router = express.Router();

router.get('/signup', (req, res) /*middleware function*/ => {
    res.send(signupTemplate({ req }));
})

router.post(
    '/signup', 
    [requireEmail, requirePassword, requirePasswordConfirmation],
    handleErrors(signupTemplate),
    async (req, res) => {
        const { email, password } = req.body;

        //create user inside user repo
        const user = await usersRepo.create({ email, password });

        //store the id of that user inside the users cookie
        req.session.userId = user.id    //added by cookieSession    

        res.redirect('/admin/products');
})

router.get('/signout', (req, res) => {
    req.session = null
    res.send('Logged out')
})

router.get('/signin', (req, res) => {  //router.get -> get resource from server from specified URL
    res.send(signinTemplate({}))
})

router.post('/signin', 
    [
        checkEmail,
        checkPassword        
    ], 
    handleErrors(signinTemplate),
    async (req, res) => {
        const { email } = req.body;
        const user = await usersRepo.getOneBy({ email })    

        req.session.userId = user.id

        res.redirect('/admin/products');
    }
)

export default router;