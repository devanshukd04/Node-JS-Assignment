import express from "express";
import userRoutes from "./user.routes.js";
import formRoutes from "./formData.routes.js";
import {isLoggedIn} from '../middlewares/isLoggedIn.js'

const router = express.Router();

router.use("/user", userRoutes);
router.use("/form", formRoutes);

export default router;