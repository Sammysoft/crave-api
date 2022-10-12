import express from "express";
import { UserController } from "../controllers/User-controller.js";
const userRoute = express.Router();


userRoute.post("/user_signup", UserController._signUp);


export default userRoute;