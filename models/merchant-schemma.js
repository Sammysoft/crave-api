import mongoose from 'mongoose';

const date = new Date().getDate()


//Schema for Bank details
const bankSchema =  mongoose.Schema({
        accountname:{type: String},
        accountnumber:{type: String},
        bankname:{type: String},
        isPrimary:{type: Boolean,  default: false}

});

//Schema for The Shop Owner
const ownerSchema = mongoose.Schema({
    fullname: {type: String},
    email:{type: String},
    phonenumber:{type: String},
    password:{type: String}
})



//Schema for each Order made by customers from the mobile App
const orderSchema = mongoose.Schema({
    customer: {type: String},
    dateoforder:{type: String, default: date},
    mealordered:{type: String}

})


//Overall merchant schemma
const merchantSchema = mongoose.Schema({
    storename:{type: String, required: true},
    storelogo:{type: String},
    storedescription:{type: String},
    storetagline:{type: String},
    storelocation:{type: String},
    careline1:{type: String},
    careline2:{type: String},
    password: {type: String},
    storemail:{type: String, required: true},
    businesshours:{
        monday:{
            start:{type: String},
            end:{type:String}
        },
        tuesday:{
            start:{type: String},
             end:{type:String}},
        wednesday:{
            start:{type: String},
            end:{type:String}},
        thursday:{
            start:{type: String},
            end:{type:String}},
        friday:{
            start:{type: String},
            end:{type:String}},
        saturday:{
            start:{type: String},
            end:{type:String}},
        sunday:{
            start:{type: String},
            end:{type:String}}
    },
    documents:{
        type: String
    },
    bankdetails:[bankSchema],
    profile:ownerSchema,
    orders: [orderSchema]
})


const Merchant = mongoose.model('Merchant', merchantSchema)
export default Merchant;
