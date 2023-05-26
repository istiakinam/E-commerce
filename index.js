import express from 'express';
import bodyParser from 'body-parser';
import usersRepo from './repositories/users.js';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

app.get('/', (req, res) /*middleware function*/ => {
    res.send(`
        <div>
            <form method='POST'>
                <input name='email' placeholder='email'/>
                <input name='password' placeholder='password'/>
                <input name='passwordConfirmation' placeholder='re-enter password'/>
                <button>Submit</button>
            </form>
        </div>
    `);
})

app.post('/', async (req, res) => {
    const { email, password, passwordConfirmation } = req.body;
    
    const existingUser = await usersRepo.getOneBy({ email })
    if(existingUser) {
        return res.send('User already exists.')
    }
    if(password !== passwordConfirmation) {
        return res.send("Passwords do not match!")
    }

    res.send(`Account Created!`);
})

app.listen(port, () => {
    console.log('Listening')
})