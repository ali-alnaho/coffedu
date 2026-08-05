import { Router } from 'express';
import { register, login } from './auth.controller.js';
import { activateManagerAccount } from './auth.activateManagerAccount.js';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/activateManagerAccount', activateManagerAccount);

export default authRouter;
