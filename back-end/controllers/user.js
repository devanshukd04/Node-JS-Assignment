import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";
import _ from "lodash";
import User from "../models/User.js";
import twilio from "twilio";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { Response } from "./response.js";

const createUser = async (req, res) => {
  const {
    firstname,
    email,
    password,
  } = req.body;
  console.log(req.body)
  try {

    if(!firstname || !email || !password){
      return res
        .status(400)
        .json(Response(false, "Please send all required details", {}));
    }

    const existingUser = await User.findOne({
      email: email,
    });

    if (existingUser) {
      return res
        .status(400)
        .json(Response(false, "User already registered!", {}));
    }

    const salt = await bcrypt.genSalt(10);
    const user = new User({
      first_name: firstname,
      email: email,
      password: password,
    });
    user.password = await bcrypt.hash(user.password, salt);
    const result = await user.save();

    return res.status(200).json(Response(true, "User create Successfully", {}));
  } catch (error) {
    return res.status(400).json(Response(false, error.message, {}));
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email: email,
    });
    if (!user) {
      return res.status(400).json(Response(false, "User doesn't exist", {}));
    }
    const validUser = await bcrypt.compare(password, user.password);
    if (validUser) {
      const token = user.generateJWT();
      res.cookie("Token", token);
      return res
        .status(200)
        .json(Response(true, "Sign In Successful", { user:user.first_name, token: token }));
    }
    return res
      .status(400)
      .json(Response(false, "Please enter a valid password", {}));
  } catch (error) {
    return res.status(400).json(Response(false, error.message, {}));
  }
};

const getUser = async (req, res) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await User.findById(decoded._id).select("-password -app_password");
      if (user) {
        res
          .status(200)
          .json(
            Response(true, "User details fetched successfully", { user: user })
          );
      } else {
        return res.status(400).json(Response(false, "User does not exist", {}));
      }
    } catch (error) {
      return res.status(401).json(Response(false, error.message, {}));
    }
  } else {
    return res.status(404).json(Response(false, "Token was not passed", {}));
  }
};

export { createUser, signIn, getUser };
