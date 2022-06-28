import express from 'express';
import { registerUsers, loginUser, getProfileUser, updateBudget } from '../controllers/usersControllers.js';
import checkAuth from '../middleware/authMiddleware.js'


const router = express.Router();


router.post('/register-users', registerUsers)

router.post('/login', loginUser)



// Private Routes
router.get('/profile', checkAuth, getProfileUser)

router.put('/update-budget/:id', checkAuth , updateBudget)





export default router