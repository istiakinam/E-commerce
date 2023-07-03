import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import authRouter from './routes/admin/auth.js'

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
    keys: ['asdf1234']
}));
app.use(authRouter);

const port = 3000;

app.listen(port, () => {
    console.log('Listening')
})