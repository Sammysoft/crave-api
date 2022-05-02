import mongoose from 'mongoose';


const date = new Date().getDate()

const orderSchema = mongoose.Schema({
    customer: {type: String},
    dateoforder:{type: String, default: date},
    mealordered:{type: String}

})

const mealSchema = mongoose.Schema({
    category:{type: String, required: true},
    mealname:{type: String, required: true},
    description:{type: String},
    mealincredients:{type: String},
    price:{type: Number},
    stockcount: {type: Number},
    size:{type: String},
    itemunit:{type: String},
    tags:{type: String},
    status:{type:Boolean, default: true},
    orders:[orderSchema],
    store:{type: String}
})

const Meal = mongoose.model('Meal', mealSchema);

export default Meal;