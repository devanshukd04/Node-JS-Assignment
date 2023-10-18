import multer from "multer";
import User from "../models/User.js";
import JobApplication from "../models/JobApplication.js";
import { Response } from "./response.js";
import getDataUri from "../utils/dataUtils.js";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";

const uploadFormData = async (req, res) => {

  const token = req.headers.authorization;
  const obj = JSON.parse(req.body.data);

  const {
    username,
    email,
    number,
    addressLine1,
    addressLine2,
    city,
    state,
    pincode,
    country,
  } = obj.form1Data;

  const form3Data = obj.form3Data;

  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await User.findById(decoded._id).select("-password");

      if (!user) {
        return res.status(400).json(Response(false, "User does not exist", {}));
      }


      let images = [];
      const files = req.files;
      for (let i = 0; i < files.length + 1; i++) {
        if (i < files.length) {
          const file = files[i];
          const fileUri = getDataUri(file);
          const myCloud = await cloudinary.uploader.upload(fileUri.content);
          images.push(myCloud.url);
        } else {
          const job = new JobApplication({
            user_email: user.email,
            username: username,
            email: email,
            number: number,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            city: city,
            state: state,
            pincode: pincode,
            country: country,
            files: images,
            job_application: form3Data,
          });

          const result = await job.save();

          return res
            .status(200)
            .json(
              Response(true, "Data Uploaded Successfully", { result: result })
            );
        }
      }
    } else {
      return res.status(404).json(Response(false, "Token was not passed", {}));
    }
  } catch (err) {
    return res.status(401).json(Response(false, err.message, {}));
  }
};

const getSubmissions = async (req, res) => {
  const token = req.headers.authorization;
  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await User.findById(decoded._id).select("-password");
      if (!user) {
        return res.status(400).json(Response(false, "User does not exist", {}));
      }

      const data=await JobApplication.find({user_email:user.email});
      return res
        .status(200)
        .json(Response(true, "Image Uploaded Successfully", {data}));
    } else {
      return res.status(404).json(Response(false, "Token was not passed", {}));
    }
  } catch (error) {
    return res.status(401).json(Response(false, err.message, {}));
  }
};

export { uploadFormData, getSubmissions };
