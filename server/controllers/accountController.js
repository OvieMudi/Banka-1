import Account from '../models/accountModel';

export default class AccountController {
  static async createAccount(req, res) {
    const account = new Account(req.body);

    account.owner = req.user.id;
    account.owneremail = req.user.email;
    const newAccount = await account.createAccount();
    const firstName = req.user.firstname;
    const lastName = req.user.lastname;
    const {
      accountnumber, owneremail, type, balance,
    } = newAccount;
    return res.status(201).json({
      status: 201,
      data: {
        accountNumber: Number(accountnumber),
        firstName,
        lastName,
        email: owneremail,
        type,
        openingBalance: parseFloat(balance.toFixed(1)),

      },
    });
  }

  static async changeStatus(req, res) {
    const { accountnumber } = req.params;
    const accountExists = await Account.getAccount(accountnumber);
    if (!accountExists) {
      return res.status(404).json({
        status: 404,
        error: 'Account does not exist.',
      });
    }
    const { status } = req.body;

    const { status: currentStatus } = accountExists;
    if (status === currentStatus) {
      return res.status(200).json({
        status: 200,
        error: `Account status is currently ${currentStatus}`,
      });
    }
    accountExists.status = status || accountExists.status;

    await Account.changeStatus(accountExists);
    return res.status(200).json({
      status: 200,
      data: {
        accountNumber: Number(accountnumber),
        status,
      },
    });
  }

  static async deleteAccount(req, res) {
    const { accountnumber } = req.params;

    const accountExists = await Account.getAccount(accountnumber);
    if (!accountExists) {
      return res.status(404).json({
        status: 404,
        error: 'Account does not exist.',
      });
    }
    await Account.deleteAccount(accountnumber);
    return res.status(200).json({
      status: 200,
      message: 'Account successfuly deleted',
    });
  }

  static async accountTransactionHistory(req, res) {
    const { accountnumber } = req.params;

    const result = await Account.accountTransactionHistory(accountnumber);
    if (!result.length) {
      return res.status(404).json({
        status: 404,
        error: 'No transaction found for this account.',
      });
    }
    const results = result.map((rest) => {
      const {
        id, createdon, type, amount, oldbalance, newbalance,
      } = rest;
      return {
        id, createdon, type, accountnumber, amount, oldbalance, newbalance,
      };
    });
    return res.status(200).json({
      status: 200,
      data: {
        results,
      },
    });
  }

  static async getAccount(req, res) {
    const { accountnumber } = req.params;

    const result = await Account.getAccount(Number(accountnumber));
    if (!result) {
      return res.status(404).json({
        status: 404,
        error: 'Account does not exist.',
      });
    }
    const {
      createdon, owneremail, type, status, balance,
    } = result;
    return res.status(200).json({
      status: 200,
      data: {
        createdon,
        accountNumber: Number(accountnumber),
        owneremail,
        type,
        status,
        balance,
      },
    });
  }

  static async getAllAccounts(req, res) {
    let result;
    const { status } = req.query;
    if (status === 'dormant') {
      result = await Account.dormant();
    } else if (status === 'active') {
      result = await Account.active();
    } else result = await Account.getAllAccounts();
    if (!result.length) {
      return res.status(404).json({
        status: 404,
        error: 'No account found.',
      });
    }
    const results = result.map((rest) => {
      const {
        createdon, accountnumber, owneremail, type, status, balance,
      } = rest;
      return {
        createdon, accountnumber, owneremail, type, status, balance,
      };
    });
    return res.status(200).json({
      status: 200,
      data: results,
    });
  }
}
