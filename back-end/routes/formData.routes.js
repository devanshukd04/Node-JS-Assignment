import express from 'express';
import {uploadFormData,getSubmissions} from '../controllers/formData.js'
import singleUpload from '../middlewares/multer.js';

const router=express.Router();

router.post('/upload-data',singleUpload,uploadFormData)
router.get('/getSubmissions',getSubmissions);


export default router;