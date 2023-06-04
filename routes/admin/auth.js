import usersRepo from '../../repositories/users.js';
import express from 'express'

const router = express.Router();

router.get('/signup', (req, res) /*middleware function*/ => {
    res.send(`
        <div>
        ID is: ${req.session.userId}
            <form method='POST'>
                <input name='email' placeholder='email'/>
                <input name='password' placeholder='password'/>
                <input name='passwordConfirmation' placeholder='re-enter password'/>
                <button>Submit</button>
            </form>
        </div>
    `);
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
    res.send(` 
        <div>
            <form method='POST'>
                <input name='email' placeholder='email'/>
                <input name='password' placeholder='password'/>
                <button>Sign In</button>
            </form>
        </div>
    `)
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