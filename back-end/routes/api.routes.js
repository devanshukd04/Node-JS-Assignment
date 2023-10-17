import express from "express";
import userRoutes from "./user.routes.js";
import {isLoggedIn} from '../middlewares/isLoggedIn.js'

const router = express.Router();

router.use("/user", userRoutes);

export default router;