import express from 'express';
import loginController from '../controllers/auth/login.js';
import createAccountController from '../controllers/auth/createAccount.js';
import logoutController from '../controllers/auth/logout.js';
const router = express.Router();

router.post('/login', loginController);
router.post('/create', createAccountController);
router.get('/logout', logoutController);

export default router;