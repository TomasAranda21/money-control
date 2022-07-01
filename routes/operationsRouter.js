import express from 'express';
import checkAuth from '../middleware/authMiddleware.js';
import { addOperations, getOperations, getOneOperation, updateOperation, deleteOperation } from '../controllers/operationsController.js';

const router = express.Router();


router.route('/')
.post(checkAuth, addOperations) 
.get(checkAuth, getOperations) 


router.route('/:id')
.get(checkAuth, getOneOperation) 
.put(checkAuth, updateOperation) 
.post(checkAuth, deleteOperation) 



export default router
