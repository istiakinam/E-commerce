import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import authRouter from './routes/admin/auth.js'
import productsRouter from './routes/products.js'
import adminProductsRouter from './routes/admin/products.js'

const app = express();

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
    keys: ['asdf1234']
}));
app.use(authRouter);
app.use(productsRouter);
app.use(adminProductsRouter);

const port = 3000;

app.listen(port, () => {
    console.log('Listening')
})