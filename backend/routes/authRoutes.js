import express from 'express';
import { getUsers, registerUser, loginUser, deleteUser, bulkDeleteUsers, UpdateProfile } from '../controllers/authController.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/users', getUsers);
// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Delete User
router.delete('/users/:userId', deleteUser);

// Bulk User Delete
router.post('/users/bulk-delete', bulkDeleteUsers);

// Update Profile
router.put('/users/update-profile', verifyToken, UpdateProfile);


export default router;
