import { Router } from 'express';
import { register, login, getUserById, getAllUsers } from '../controllers/userController';
import auth from '../middleware/auth';


const router: Router = Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes

// router.get('/', auth, getAllUsers);
// router.get('/:id', auth, getUserById);
// router.put('/:id', auth, updateUser);
// router.delete('/:id', auth, deleteUser);

export default router;