import express from 'express';
import { registerUsers, loginUser, getProfileUser } from '../controllers/usersControllers.js';
import checkAuth from '../middleware/authMiddleware.js'


const router = express.Router();


router.post('/register-users', registerUsers)

router.post('/login', loginUser)


router.get('/profile', checkAuth, getProfileUser)




export default router