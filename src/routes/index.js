import { Router } from "express";
import uploadimage, { login, register } from "../controllers/auth.js";
import authMiddleware from "../../service.js";
import multer from 'multer';
import express from 'express'
const app = express();
import path from 'path';
import fs from 'fs';
const router = Router()
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// Set up storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Set up multer with storage configuration
const upload = multer({ storage: storage });
router.post('/signup',register);
router.get('/login', login);
router.get('/profile', authMiddleware, async (req, res) => {
    return res.send({user:req.user})
});
router.post('/upload', upload.single('image'),uploadimage)
 


export default  router;