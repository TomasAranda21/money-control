import express from 'express';
import checkAuth from '../middleware/authMiddleware.js';
import { addOperations, getOperations } from '../controllers/operationsController.js';

const router = express.Router();


router.route('/')
.post(checkAuth, addOperations) 
.get(checkAuth, getOperations) 


export default router
