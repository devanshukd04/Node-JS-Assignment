import express from 'express';
import {createUser, signIn, getUser} from '../controllers/user.js'

const router=express.Router();

router.post('/signup/createUser',createUser);

router.post('/signin',signIn);

router.get('/get',getUser);

export default router;