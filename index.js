const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

app.get('/', (req, res) => {
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

app.post('/', (req, res) => {
    console.log(req.body);
    res.send("Account Created");
})

app.listen(port, () => {
    console.log('Example with express')
})