import Transaction from '../models/transactionModel';
import Account from '../models/accountModel';

export default class TransactionController {
  static async debit(req, res) {
    const { accountnumber } = req.params;
    const accountExists = await Account.getAccount(accountnumber);
    if (!accountExists) {
      return res.status(404).json({
        status: 404,
        error: 'Account does not exist.',
      });
    }
    const { balance } = accountExists;
    let transaction;
    try {
      transaction = new Transaction(req.body);
    } catch (error) {
      return error.message;
    }

    if (balance < transaction.amount) {
      return res.status(422).json({
        status: 422,
        error: 'Insufficient fund',
      });
    }

    transaction.accountnumber = accountnumber;
    transaction.cashier = req.user.id;
    transaction.oldbalance = balance;
    transaction.newbalance = balance - transaction.amount;

    const newTransaction = await transaction.debit();
    const {
      id, amount, cashier, type, newbalance,
    } = newTransaction;

    return res.status(201).json({
      status: 201,
      data: {
        transactionId: id,
        accountnumber,
        amount: parseFloat(amount),
        cashier,
        transactionType: type,
        accountBalance: String(newbalance),
      },
    });
  }

  static async credit(req, res) {
    const { accountnumber } = req.params;
    const accountExists = await Account.getAccount(accountnumber);
    if (!accountExists) {
      return res.status(404).json({
        status: 404,
        error: 'Account does not exist.',
      });
    }
    const { balance } = accountExists;
    let transaction;
    try {
      transaction = new Transaction(req.body);
    } catch (error) {
      return error.message;
    }

    transaction.accountnumber = accountnumber;
    transaction.cashier = req.user.id;
    transaction.oldbalance = balance;
    transaction.newbalance = balance + transaction.amount;
    const newTransaction = await transaction.credit(balance);
    const {
      id, amount, cashier, type, newbalance,
    } = newTransaction;

    return res.status(201).json({
      status: 201,
      data: {
        transactionId: id,
        accountnumber,
        amount,
        cashier,
        transactionType: type,
        accountBalance: newbalance,
      },
    });
  }

  static async retractTrasaction(req, res) {
    const { accountnumber, id } = req.params;
    const accountExists = await Account.getAccount(accountnumber);
    const TransactionExists = await Transaction.getTransaction(id);

    if (!TransactionExists || !accountExists) {
      return res.status(404).json({
        status: 404,
        error: 'Transaction does not exist.',
      });
    }
    const { balance } = accountExists;
    const { amount } = TransactionExists;

    let transaction;
    try {
      transaction = new Transaction(req.body);
    } catch (error) {
      return error.message;
    }

    if (((transaction.createdon - TransactionExists.createdon) / 60000) > 3) {
      return res.status(400).json({
        status: 400,
        error: 'Transaction must be reversed only within 3 minutes.',
      });
    }

    transaction.accountnumber = accountnumber;
    transaction.cashier = req.user.id;
    transaction.oldbalance = balance;
    transaction.amount = amount;
    let newTransaction;
    if (TransactionExists.type === 'credit') {
      if (amount > balance) {
        return res.status(400).json({
          status: 400,
          error: 'Insufficent funds',
        });
      }
      transaction.newbalance = balance - amount;
      newTransaction = await transaction.updateTransaction('debit', id);
    } else {
      transaction.newbalance = balance + amount;
      newTransaction = await transaction.updateTransaction('credit', id);
    }
    const {
      cashier, type, newbalance,
    } = newTransaction;

    return res.status(200).json({
      status: 200,
      data: {
        transactionId: id,
        accountnumber,
        amount,
        cashier,
        transactionType: type,
        accountBalance: newbalance,
      },
    });
  }

  static async getTransaction(req, res) {
    const { id } = req.params;

    const result = await Transaction.getTransaction(id);
    if (!result) {
      return res.status(404).json({
        status: 404,
        error: 'Transaction does not exist.',
      });
    }
    const {
      createdon, type, accountnumber, amount, oldbalance, newbalance,
    } = result;
    return res.status(200).json({
      status: 200,
      data: {
        transactionId: id,
        createdon,
        type,
        accountNumber: Number(accountnumber),
        amount,
        oldbalance,
        newbalance,
      },
    });
  }
}
