import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MongoURL = "mongodb+srv://Sammysoft:tosam1999@cravestore.nwhnd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(MongoURL, {useNewUrlParser: true})
    .then(()=>console.log(`MongoDB Server Connected Successfully`));



