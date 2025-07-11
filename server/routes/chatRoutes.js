import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js'
import { getChats, newChat, updateChatConv, renameChat, deleteChat } from '../controllers/chatController.js';

const router = Router();

router.get('/', authMiddleware, getChats);
router.post('/new', authMiddleware, newChat);
router.put('/:chatId/update_conv', authMiddleware, updateChatConv);
router.put('/:chatId/rename', authMiddleware, renameChat);
router.delete('/:chatId/delete', authMiddleware, deleteChat);


export default router;