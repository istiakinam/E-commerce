const express = require('express');

const app = express();
const port = 3000;

app.get('/help', (req, res) => {
    res.send('Hello World');
})

app.listen(port, () => {
    console.log('Example with express')
})