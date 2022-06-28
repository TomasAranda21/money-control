import express from 'express';
import { registerUsers } from '../controllers/usersControllers.js';


const router = express.Router();


router.post('/register-users', registerUsers)



export default router