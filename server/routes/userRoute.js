import { Router } from 'express';
import userController from '../controllers/userController';
import { requireAuth, staffAuth, adminAuth } from '../middlewares/authentication';
import userValidate from '../middlewares/validateUser';
import paramsValidate from '../middlewares/validateParams';


const userRouter = new Router();
const {
  signUp, signin, allUserAccounts,
  createStaff, createAdmin, sendResetMail,
  passwordReset, resetPassword,
} = userController;

userRouter.post('/auth/signup',
  userValidate.client,
  signUp);

userRouter.post('/auth/signin',
  userValidate.login,
  signin);

userRouter.post('/staff',
  requireAuth, adminAuth,
  userValidate.login,
  createStaff);

userRouter.post('/admin',
  userValidate.login,
  createAdmin);

userRouter.get('/user/:email/accounts',
  requireAuth, staffAuth,
  paramsValidate.email,
  allUserAccounts);

userRouter.post('/auth/passwordreset', sendResetMail);
userRouter.get('/auth/passwordreset/:id/:token', passwordReset);
userRouter.post('/auth/resetpassword', resetPassword);

export default userRouter;
