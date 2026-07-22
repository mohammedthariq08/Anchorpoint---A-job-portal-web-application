import { Router } from 'express';
import { register,login } from '../authentication/authentication.mjs';

const userRouter = Router();

userRouter.post('/register',register);
userRouter.post('/login',login);

export default userRouter;