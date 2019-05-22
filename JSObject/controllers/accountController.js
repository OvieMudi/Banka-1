import AccountModel from '../models/accountModel';
import data from '../mock/mockData';
import generateAcctNo from '../helpers/generateAcctNo';

const { users, accounts } = data;

class Accounts {
  static createAccount(req, res) {
    const id = accounts.length + 1;
    const accountNumber = generateAcctNo();
    const { type } = req.body;
    const userId = req.user.id;
    const user = users.filter(u => u.id === Number(userId));
    const account = new AccountModel(id, accountNumber, type);
    account.owner = user[0].id;
    user[0].noOfAccounts += 1;
    accounts.push(account);

    const response = {
      accountNumber,
      firstname: user[0].firstName,
      lastname: user[0].lastName,
      email: user[0].email,
      type,
      openingBalance: 0.00,
    };

    res.status(201).json({
      status: 201,
      data: response,
    });
  }

  static activateDeactivate(req, res) {
    const { accountNo } = req.params;
    const account = accounts.filter(acct => acct.accountNumber === Number(accountNo));
    if (account.length <= 0) {
      res.status(404).json({
        status: 404,
        error: `Account ${accountNo} not found`,
      });
    } else {
      if (account[0].status === 'active') {
        account[0].status = 'dormant';
      } else {
        account[0].status = 'active';
      }
      const response = {
        accountNumber: account[0].accountNumber,
        status: account[0].status,
      };
      res.status(200).json({
        status: 200,
        data: response,
      });
    }
  }

  static deleteAccount(req, res) {
    const { accountNo } = req.params;
    const acctIndex = accounts.findIndex(acct => acct.accountNumber === Number(accountNo));
    if (acctIndex < 0) {
      res.status(404).json({
        status: 404,
        error: `Delete error! Account ${accountNo} not found`,
      });
    } else {
      accounts.splice(acctIndex, 1);
      res.status(200).json({
        status: 200,
        message: 'Account successfully deleted',
      });
    }
  }

  static specificAccount(req, res) {
    const { accountNo } = req.params;
    const account = accounts.filter(acct => acct.accountNumber === Number(accountNo));
    if (account.length <= 0) {
      res.status(404).json({
        status: 404,
        error: `Account ${accountNo} not found`,
      });
    } else {
      res.status(200).json({
        status: 200,
        data: account,
      });
    }
  }

  static allAccounts(req, res) {
    if (accounts.length <= 0) {
      res.status(404).json({
        status: 404,
        message: 'No accounts in the database',
      });
    } else {
      res.status(200).json({
        status: 200,
        data: accounts,
      });
    }
  }
}
export default Accounts;
