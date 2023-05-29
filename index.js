import express from 'express';
import bodyParser from 'body-parser';
import usersRepo from './repositories/users.js';
import cookieSession from 'cookie-session';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
    keys: ['asdf1234']
}));

const port = 3000;

app.get('/signup', (req, res) /*middleware function*/ => {
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

app.post('/signup', async (req, res) => {
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

app.get('/signout', (req, res) => {
    req.session = null
    res.send('Logged out')
})

app.get('/signin', (req, res) => {  //app.get -> get resource from server from specified URL
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

app.post('/signin', (req, res) => {
    
})

app.listen(port, () => {
    console.log('Listening')
})