import express from 'express';
import merchantController from '../controllers/merchants-controller.js';
import passport from "passport"
const merchantRouter = express.Router();

merchantRouter.post('/auth', merchantController._auth)
merchantRouter.post('/signup', merchantController._signup)
merchantRouter.get('/dashboard', passport.authenticate('jwt', {session: false}), (req,res,next)=>{
    return res.status(200).json({
        data : req.user,
    })
})
merchantRouter.post('/order', merchantController._makeOrder)
merchantRouter.get('/orders/:id', merchantController._numberOfOrders)
merchantRouter.post('/meal/add/', merchantController._addMeal)
merchantRouter.post('/menu/lists', merchantController._getMeals);
merchantRouter.post('/menu/add-category', merchantController._addCategory)
merchantRouter.post('/menu/category', merchantController._getCategory)
merchantRouter.post('/settings/bank', merchantController._addBankDetails)
export default merchantRouter;