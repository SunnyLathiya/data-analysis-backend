import express from 'express';
import { userSignin, userSignup } from '../controllers/userController';

const router = express.Router();

router.post('/user-signup', userSignup);
router.post('/user-signin', userSignin);

export default router;
