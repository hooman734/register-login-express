import express from 'express';
// import api/account
import { handleRegisterGet, handleRegisterPost } from './account/register';
import { handleLoginGet, handleLoginPost } from './account/login';
import { handleLogoutGet } from './account/logout';

const router = express.Router();

router.get('/register', handleRegisterGet);
router.post('/register', handleRegisterPost);

router.get('/login', handleLoginGet);
router.post('/login', handleLoginPost);

router.get('/logout', handleLogoutGet);

export default router;
