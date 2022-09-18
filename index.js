import express from 'express';
import './config/db.js';
import bodyParser from 'body-parser';
import merchantRouter from './routes/merchants.js';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/passport.js';


dotenv.config();

const app = express();
const port = process.env.PORT || 8089;

app.listen(port, ()=> console.log(`Server running on http://localhost:${port}`));


// enabling cors middleware
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type");
      next();
    });
app.use(cors())

//configuring passport authentification middleware

app.use(session({
    secret: "crave_secret",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl:"mongodb+srv://Sammysoft:tosam1999@cravestore.nwhnd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", collectionName: "sessions" } ),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))
app.use(passport.initialize());
app.use(passport.session())


//configuring body-parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/merchant', merchantRouter)
