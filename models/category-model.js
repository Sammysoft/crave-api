import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    category:{
        type: String
    },
    storename:{
        type: String
    }
})

const Category = mongoose.model('Category', categorySchema);

export default Category;