import express from 'express';
import { registerUsers, loginUser, profileUser } from '../controllers/usersControllers.js';
import checkAuth from '../middleware/authMiddleware.js'


const router = express.Router();


router.post('/register-users', registerUsers)

router.post('/login', loginUser)


router.get('/profile', checkAuth, profileUser)




export default router