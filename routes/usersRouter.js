import express from 'express';
import { registerUsers, loginUser } from '../controllers/usersControllers.js';


const router = express.Router();


router.post('/register-users', registerUsers)

router.post('/login', loginUser)




export default router