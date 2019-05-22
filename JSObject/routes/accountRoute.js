import { Router } from 'express';
import accountController from '../controllers/accountController';
import { requireAuth, staffAuth } from '../middlewares/authentication';
import paramsValidate from '../middlewares/validateParams';
import accountValidate from '../middlewares/validateAccount';

const accountRouter = new Router();
const {
  createAccount,
  activateDeactivate,
  deleteAccount,
  specificAccount,
  allAccounts,
} = accountController;

accountRouter.post(
  '/',
  requireAuth,
  accountValidate.createAccount,
  createAccount,
);

accountRouter.patch('/:accountNo',
  requireAuth,
  staffAuth,
  paramsValidate.acctNo,
  activateDeactivate);

accountRouter.delete('/:accountNo',
  requireAuth,
  staffAuth,
  paramsValidate.acctNo,
  deleteAccount);

accountRouter.get('/:accountNo',
  requireAuth, staffAuth,
  paramsValidate.acctNo,
  specificAccount);

accountRouter.get('/', requireAuth, staffAuth, allAccounts);
export default accountRouter;
