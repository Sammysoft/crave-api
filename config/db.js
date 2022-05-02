import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MongoURL = process.env.MongoURL

mongoose.connect(MongoURL, {useNewUrlParser: true})
    .then(()=>console.log(`MongoDB Server Connected Successfully`));



