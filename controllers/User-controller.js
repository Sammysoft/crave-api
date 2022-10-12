import User from "../models/user-model.js";
import Bcrypt from "bcrypt";

export const UserController = {
  _signUp: async (req, res, next) => {
    try {
      console.log(req.body);
      const {
        firstname,
        lastname,
        email,
        phone_number,
        date_of_birth,
        username,
      } = req.body;
      if (
        !firstname ||
        !lastname ||
        !email ||
        !phone_number ||
        !date_of_birth ||
        !username
      ) {
        res.status(400).json({ msg: "Fill In All Details!" });
      } else {
        const addedUser = await User.findOne({
          email: email,
          username: username,
        });
        if (addedUser) {
          res
            .status(400)
            .json({
              msg: "A User with this email and username already exists!",
            });
        } else {
          const newUser = await new User();
          newUser.firstname = firstname;
          newUser.lastname = lastname;
          newUser.username = username;
          newUser.date_of_birth = date_of_birth;
          newUser.phone_number = phone_number;
          newUser.email = email;
          //Encrypting the password
          Bcrypt.genSalt(10, (err, salt) => {
            !err;
            Bcrypt.hash(password, salt, async (err, hash) => {
              const hashedPassword = await hash;
              newUser.password = hashedPassword;
              const user = await newUser.save();
              console.log(user);
              res.status(400).json({ data: user });
            });
          });
        }
      }
    } catch (error) {
      res.status(400).json({ msg: "Error, creating your account" });
    }
  },
};
