import express from 'express';
import {
    getAllMessages,
  sendMessage,
  getMessages,
  updateMessage,
  deleteMessage
} from '../controllers/messageController.js';
// import protectRoute from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/all-messages', getAllMessages);             
router.post('/', sendMessage);                   
router.get('/', getMessages);           
router.put('/:id', updateMessage);              
router.delete('/:id', deleteMessage);         
// router.post('/', protectRoute, sendMessage);                   
// router.get('/:withUser', protectRoute, getMessages);           
// router.put('/:id', protectRoute, updateMessage);              
// router.delete('/:id', protectRoute, deleteMessage);         

export default router;
