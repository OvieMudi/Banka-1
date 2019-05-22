import { Router } from 'express';
import transactionController from '../controllers/transactionController';
import { requireAuth, cashierAuth } from '../middlewares/authentication';
import paramsValidate from '../middlewares/validateParams';
import transactionValidate from '../middlewares/validateTransaction';


const transactionRouter = new Router();
const {
  debitAccount, creditAccount, transactionHistory,
  specificTransaction,
} = transactionController;

transactionRouter.post('/:accountNo/debit',
  requireAuth, cashierAuth,
  paramsValidate.acctNo,
  transactionValidate.amount,
  debitAccount);

transactionRouter.post('/:accountNo/credit',
  requireAuth, cashierAuth,
  paramsValidate.acctNo,
  creditAccount);

transactionRouter.get('/:accountNo/',
  requireAuth,
  paramsValidate.acctNo,
  transactionHistory);

transactionRouter.get('/:accountNo/:transactionId',
  requireAuth,
  paramsValidate.acctNo,
  paramsValidate.transId,
  specificTransaction);

export default transactionRouter;
