import TransactionModel from '../models/transactionModel';
import data from '../mock/mockData';

const { accounts, transactions } = data;

class Transactions {
  static async debitAccount(req, res) {
    const id = transactions.length + 1;
    const type = 'debit';
    const { accountNo } = req.params;
    const { amount } = req.body;
    const cashier = req.user.id;
    const account = accounts.filter(acct => acct.accountNumber === Number(accountNo));
    if (account.length <= 0) {
      res.status(404).json({
        status: 404,
        error: `Account ${accountNo} not found`,
      });
    }
    const oldBalance = account[0].balance;
    if (account[0].status === 'dormant') {
      res.status(400).json({
        status: 400,
        error: `Account ${accountNo} is dormant!`,
      });
    }


    const transaction = new TransactionModel(id, type, accountNo,
      amount, cashier, oldBalance);

    if (transaction.oldBalance >= amount) {
      transaction.newBalance = transaction.oldBalance - amount;
      account[0].balance = transaction.newBalance;
      transactions.push(transaction);

      const response = {
        transactionId: transactions.length,
        accountNo,
        amount: Number(amount),
        cashier: req.user.id,
        transactionType: transaction.type,
        accountBalance: String(transaction.newBalance),
      };
      res.status(200).json({
        status: 200,
        data: response,
      });
    } else {
      res.status(401).json({
        status: 401,
        error: 'Insufficient fund',
      });
    }
  }

  static async creditAccount(req, res) {
    const id = transactions.length + 1;
    const type = 'credit';
    const { accountNo } = req.params;
    const { amount } = req.body;
    const account = accounts.filter(acct => acct.accountNumber === Number(accountNo));
    const cashier = req.user.id;

    if (account.length <= 0) {
      res.status(404).json({
        status: 404,
        error: `Account ${accountNo} not found`,
      });
    }
    const oldBalance = account[0].balance;

    const transaction = new TransactionModel(id, type, accountNo,
      amount, cashier, oldBalance);
    transaction.newBalance = Number(transaction.oldBalance) + Number(amount);
    account[0].balance = transaction.newBalance;
    transactions.push(transaction);

    const response = {
      transactionId: transactions.length,
      accountNo,
      amount: Number(amount),
      cashier: req.user.id,
      transactionType: transaction.type,
      accountBalance: String(transaction.newBalance),
    };
    res.status(200).json({
      status: 200,
      data: response,
    });
  }

  static checkIfTransExists(accountNo) {
    return transactions.filter(trans => Number(trans.accountNumber) === Number(accountNo));
  }

  static transactionHistory(req, res) {
    const { accountNo } = req.params;
    const account = accounts.filter(acct => acct.accountNumber === Number(accountNo));
    if (account.length <= 0) {
      res.status(404).json({
        status: 404,
        error: `Account ${accountNo} not found`,
      });
    }
    const transactionHist = Transactions.checkIfTransExists(accountNo);
    if (transactionHist.length <= 0) {
      res.status(404).json({
        status: 404,
        error: `No transaction found on account ${accountNo}`,
      });
    } else {
      res.status(200).json({
        status: 200,
        data: transactionHist,
      });
    }
  }

  static specificTransaction(req, res) {
    const { accountNo, transactionId } = req.params;
    const account = accounts.filter(acct => acct.accountNumber === Number(accountNo));
    if (account.length <= 0) {
      res.status(404).json({
        status: 404,
        error: `Account ${accountNo} not found`,
      });
    }
    const transaction = transactions.filter(trans => trans.id === Number(transactionId));
    if (transaction.length <= 0) {
      res.status(404).json({
        status: 404,
        error: `Transaction with id ${transactionId} on account ${accountNo} not found`,
      });
    } else {
      res.status(200).json({
        status: 200,
        data: transaction,
      });
    }
  }
}
export default Transactions;
