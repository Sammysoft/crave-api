import Merchant from "../models/merchant-schemma.js";
import Meal from '../models/meal-schema.js'
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import Category from "../models/category-model.js";


const merchantController = {

    //Sign In API endpoint

    _auth: async(req,res,next)=>{
        const { storename, password, storemail } = req.body;
        try {
            if(!storename || !password || !storemail){
              res.status(400).json({
                    msg: 'Please provide all fields'
                })
            }else{
                const merchantDetails = await Merchant.findOne({storename: storename});
                if(merchantDetails){
                    if(merchantDetails.storemail === storemail){
                            bcrypt.compare( password, merchantDetails.password, (err, isMatch)=>{
                                if(isMatch){
                                    const payload =  {
                                      id: merchantDetails._id,
                                      storename: merchantDetails.storename
                                 }
                                     const accesstoken = jwt.sign(
                                        payload, 'crave_secret', { expiresIn: "1d" }
                                     )

                                  res.status(200).json({token: "Bearer " + accesstoken} )
                                }else{
                                   res.status(400).json({msg: 'Wrong Password!'})
                                }
                            })

                       }else{
                        res.status(400).json({
                            msg: `You have entered the wrong email for ${merchantDetails.storename}`
                        })
                       }
                    } else{
                        res.status(400).json({
                            msg: "Sorry, this store name is not recognized"
                        })
                    }
            }
        } catch (error) {
            res.status(400).json({msg: 'Error occured'})
        }
    },



    //signup API endpoint

    _signup: async(req,res,next)=>{
        const merchant = await new Merchant(req.body)
        try {
            bcrypt.genSalt(10, (err, salt)=>{
                !err
                bcrypt.hash(merchant.password, salt, async(err, hash)=>{
                    !err
                    merchant.password = hash;
                    const newMerchant = await merchant.save();
                    res.status(200).json({
                        msg: "You are now registered on Crave",
                        data: newMerchant
                    })
                })

                })
        } catch (error) {
                    res.status(400).json({
                        msg: "Could not secure password"
                    })
                }
    },



    _makeOrder: async (req,res,next)=>{
        const { customer, dateoforder, mealordered } = req.body;
        Merchant.findById({_id: req.params.id}, (err, merchant)=>{
           merchant
                let orderDetails = { customer, dateoforder, mealordered }
                merchant.orders.push(orderDetails)
                merchant.save();
                res.status(200).json({
                    msg: "Order has been made",
                    data: orderDetails
                })
            !merchant
                res.status(400).json({msg: "No such Merchant exist!"})
        })


    },


    _numberOfOrders: async (req,res,next)=>{
        const merchantInfo = Merchant.findById({_id: req.params.id})
        try {
          const numberOfOrders =  merchantInfo.orders.length();
          res.status(200).json({
              msg: numberOfOrders
          })
        } catch (error) {

        }
    },
    _addMeal: async(req,res,next)=>{

        const { store, mealname, description, mealincredients, price, stockcount, size, itemunit, tags, category} = req.body;
        try {
            const payload = {
                mealname, description,
                mealincredients, price, stockcount
                ,size, itemunit,
                tags, category, store
            }
                const meal = new Meal(payload);
                console.log(meal)
                meal.save()
                res.status(200).json({
                    data: `Added ${mealname} To ${store}`
                })
        } catch (error) {
                res.status(400).json({
                    msg:`Could not add ${mealname} To ${store}`
                })
        }
    },


    _getMeals:async(req,res,next)=>{
        Meal.find({store: req.body.store}, (err, meal)=>{
          if(!err){
            const availableMeals = meal
            console.log(availableMeals)
            res.status(200).json({
                msg: availableMeals
            })
          }else{
              res.status(400).json({
                  msg: 'Could not retrieve Menu Lists'
              })
          }
        })
    },


    _addCategory: async (req,res,next)=>{
        const { category } = req.body;

        const newCategory = await new Category(category);
        newCategory.save();
        res.status(200).json({
            msg: `Added ${category} To Your Meal Category`
        })
    },

    _getCategory: async (req,res,next)=>{
        const { store } = req.body;
        console.log(store)
        const category = await Category.find({ storename: store })

        console.log(category)
        if(category){
            res.status(200).json({
                data: category
            })
        }else{
            res.status(400).json({
                data: `Could not get category from ${store}`
            })
        }
    },

    _addBankDetails: async(req,res,next)=>{
        const { bankname, accountname, accountnumber, isPrimary, store } = req.body;
       try {
        Merchant.findOne({storename: store}, (err, merchant)=>{
            const payload = {
                bankname, accountname, accountnumber, isPrimary
            }
            console.log(payload)
            merchant.bankdetails.push(payload);
            merchant.save();
            res.status(200).json({msg: `Added A new Bank Account To ${store}`})
        })
       } catch (error) {
            res.status(400).json({
                msg: `Could not Add Bank Detail To ${store}`
            })
       }

    },


    _getBank: async(req,res,next)=>{
        const {store} = req.body;
        try {
            Merchant.findOne({storename: store}, (err, merchant)=>{
                merchant
                    console.log(merchant)
                    res.status(200).json({
                        data: merchant.bankdetails
                    })
                    err
                    return res.status(400).json({msg: 'Could not get bank details'})
                })
        } catch (error) {
            res.status(400).json({msg: "An error occured!"})
        }

    },



    _ownerProfile: async (req,res,next)=>{
        const {fu  } = req.body;
    }

}

export default merchantController;