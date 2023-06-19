import usersRepo from '../../repositories/users.js';
import express from 'express'
import signupTemplate from '../../views/admin/auth/signup.js'
import signinTemplate from '../../views/admin/auth/signin.js'

const router = express.Router();

router.get('/signup', (req, res) /*middleware function*/ => {
    res.send(signupTemplate({ req }));
})

router.post('/signup', async (req, res) => {
    const { email, password, passwordConfirmation } = req.body;
    
    const existingUser = await usersRepo.getOneBy({ email })
    if(existingUser) {
        return res.send('User already exists.')
    }
    if(password !== passwordConfirmation) {
        return res.send("Passwords do not match!")
    }

    //create user inside user repo
    const user = await usersRepo.create({ email, password });

    //store the id of that user inside the users cookie
    req.session.userId = user.id    //added by cookieSession    

    res.send(`Account Created!`);
})

router.get('/signout', (req, res) => {
    req.session = null
    res.send('Logged out')
})

router.get('/signin', (req, res) => {  //router.get -> get resource from server from specified URL
    res.send(signinTemplate())
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await usersRepo.getOneBy({ email })    

    if(!user) {
        return res.send('Email not found')
    }

    const validPassword = await usersRepo.comparePasswords(user.password, password)

    if(!validPassword)  {
        return res.send('Password does not match')
    }

    req.session.userId = user.id

    res.send('You are signed in!')
})

export default router;