import { Router } from 'express';
import accountRouter from './accountRoute';
import transactionRouter from './transactionRoute';
import userRouter from './userRoute';

const router = new Router();

router.get('/api/v1', (req, res) => {
  res.status(200).json(
    { message: 'Welcome to Banka' },
  );
});

router.use('/api/v1/accounts', accountRouter);
router.use('/api/v1/transactions', transactionRouter);
router.use('/api/v1', userRouter);
router.use((req, res)=>{
  res.status(404).json({
    status: 404,
    message: 'No such endpoints on this server'
  })
});

export default router;
