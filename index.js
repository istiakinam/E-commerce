const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send(`
        <div>
            <form method='POST'>
                <input name='email' placeholder='email'/>
                <input name='password' placeholder='password'/>
                <input name='passwordConfirmation" placeholder='re-enter password'/>
                <button>Submit</button>
            </form>
        </div>
    `);
})

app.post('/', (req, res) => {
    res.send("Account Created");
})

app.listen(port, () => {
    console.log('Example with express')
})