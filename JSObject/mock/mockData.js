class Data {
  constructor() {
    this.users = [{
      id: 1,
      firstName: 'Mary',
      lastName: 'Moore',
      email: 'marymore@gmail.com',
      password: '$2a$10$DlIUe48EzhsuN2F4CwDWOe19lerEDoCxG3Mp.eTI.Og2Keb6EiQqa',
      type: 'client',
      isAdmin: false,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYXJ5bW9yZUBnbWFpbC5jb20iLCJ0eXBlIjoiY2xpZW50IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU1NDk1MDA2NiwiZXhwIjoxNTU1NTU0ODY2fQ.Qn-rG_8uoWjIKAa-ZNr9wVE18jtN4tO8ix37HuCEohI',
      noOfAccounts: 1,
    }, {
      id: 2,
      firstName: 'Grey',
      lastName: 'Williams',
      email: 'greywilliams@gmail.com',
      password: '$2a$10$DlIUe48EzhsuN2F4CwDWOe19lerEDoCxG3Mp.eTI.Og2Keb6EiQqa',
      type: 'staff',
      isAdmin: false,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJncmV5d2lsbGlhbXNAZ21haWwuY29tIiwidHlwZSI6InN0YWZmIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU1NDk0OTY3MSwiZXhwIjoxNTU1NTU0NDcxfQ.C69srw1eggG25ue683mwW_DxpLHHG9mOWKBTsq8jILg',
      noOfAccounts: 1,
    },
    {
      id: 3,
      firstName: 'Tory',
      lastName: 'Adigun',
      email: 'toryadigun@gmail.com',
      password: '$2a$10$DlIUe48EzhsuN2F4CwDWOe19lerEDoCxG3Mp.eTI.Og2Keb6EiQqa',
      type: 'staff',
      isAdmin: true,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ0b3J5YWRpZ3VuQGdtYWlsLmNvbSIsInR5cGUiOiJzdGFmZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTU1NDk0OTkyNSwiZXhwIjoxNTU1NTU0NzI1fQ.rwtB23WZuTLjGHOPmwNkVt69OW1eUloJUil2URSJGAE',
      noOfAccounts: 1,
    }];
    this.accounts = [{
      id: 1,
      accountNumber: 1234567890,
      createdOn: '2018-31-05',
      type: 'savings',
      owner: 1,
      status: 'active',
      balance: 5000.00,
    }, {
      id: 2,
      accountNumber: 2234567890,
      createdOn: '2017-31-05',
      type: 'current',
      owner: 2,
      status: 'active',
      balance: 15000.00,
    }, {
      id: 3,
      accountNumber: 3234567890,
      createdOn: '2016-31-05',
      type: 'savings',
      owner: 3,
      status: 'active',
      balance: 50000.00,
    }];
    this.transactions = [{
      id: 1,
      createdOn: '2019-31-05',
      type: 'credit',
      accountNumber: 1234567890,
      cashier: 2,
      amount: 3000.00,
      oldbalance: 2000.00,
      newbalance: 5000.00,
    }, {
      id: 2,
      createdOn: '2016-31-05',
      type: 'debit',
      accountNumber: 1234567890,
      cashier: 2,
      amount: 6000.00,
      oldbalance: 10000.00,
      newbalance: 4000.00,
    }];
  }
}
const data = new Data();

export default data;
