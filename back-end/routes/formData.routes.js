import express from 'express';
import {uploadFormData} from '../controllers/formData.js'
import singleUpload from '../middlewares/multer.js';

const router=express.Router();

router.post('/upload-data',singleUpload,uploadFormData)


export default router;