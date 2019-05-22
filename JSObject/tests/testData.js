// params
const wrongAcctNo = {
  accountNumber: '1234',
};

const wrongTransactionId = {
  accountNumber: 'as2',
};

// user
const clientField = {
  email: 'testClient@gmail.com',
  password: 'asdfghjkl',
  firstName: 'Halle',
  lastName: 'Berry',
};
const clientField2 = {
  email: 'testClient2@gmail.com',
  password: 'asdfghjkl',
  firstName: 'Halle',
  lastName: 'Berry',
};
const clientField3 = {
  email: 'testClientbbbb2@gmail.com',
  password: 'asdfghjkl',
  firstName: 'Halle',
  lastName: 'Berry',
};

const clientField4 = {
  email: 'testClienbbbbbbft2@gmail.com',
  password: 'asdfghjkl',
  firstName: 'Halle',
  lastName: 'Berry',
};

const staffField = {
  firstName: 'Ade',
  lastName: 'Bade',
  email: 'adebade1@gmail.com',
  password: 'adebade1234',
  isAdmin: false,
};

const staffField2 = {
  email: 'testStaff2@gmail.com',
  password: 'asdfghjkl',
  firstName: 'Halle',
  lastName: 'Berry',
  isAdmin: false,
};

const staffField3 = {
  email: 'testStaff3@gmail.com',
  password: 'asdfghjkl',
  firstName: 'Halle',
  lastName: 'Berry',
  isAdmin: false,
};
const staffField4 = {
  email: 'testStaff4@gmail.com',
  password: 'asdfghjkl',
  firstName: 'Halle',
  lastName: 'Berry',
  isAdmin: false,
};

const adminField = {
  firstName: 'Ade',
  lastName: 'Bade',
  email: 'adebade11@gmail.com',
  password: 'adebade1234',
  isAdmin: true,
};

const adminField2 = {
  email: 'testAdmin2@gmail.com',
  password: 'asdfghjkl',
  firstName: 'Halle',
  lastName: 'Berry',
  isAdmin: true,
};

const adminField3 = {
  email: 'testAdmin3@gmail.com',
  password: 'asdfghjkl',
  firstName: 'Halle',
  lastName: 'Berry',
  isAdmin: true,
};
const adminField4 = {
  email: 'testAdmin4@gmail.com',
  password: 'asdfghjkl',
  firstName: 'Halle',
  lastName: 'Berry',
  isAdmin: true,
};
const adminField5 = {
  email: 'testAdmin5@gmail.com',
  password: 'asdfghjkl',
  firstName: 'Halle',
  lastName: 'Berry',
  isAdmin: true,
};

const missingClient = {
  lastName: 'Bade',
  email: 'adebade3@gmail.com',
  password: 'adebade1234',
};

const missingStaff = {
  firstName: 'Ade',
  lastName: 'Bade',
  password: 'adebade1234',
  isAdmin: false,
};

const missingAdmin = {
  lastName: 'Bade',
  email: 'adebade31@gmail.com',
  password: 'adebade1234',
  isAdmin: true,
};
const emptyClient = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const emptyStaff = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  isAdmin: '',
};

const emptyAdmin = {
  firstName: '',
  lastName: 'Bade',
  email: '',
  password: '',
  isAdmin: '',
};

const emptyLogin = {
  email: '',
  password: '',
};

const missingLogin = {
  password: 'password',
};

const wrongLogin = {
  accountNumber: 'as2',
};

const login = {
  email: 'testClienbbbbbbft2@gmail.com',
  password: 'asdfghjkl',
};

// Account
const emptyAccountType = {
  type: '',
};

const accountType = {
  type: 'savings',
};

const wrongAccountType = {
  type: 'everyday account',
};

// Transaction
const emptytransaction = {
  amount: '',
};

const transaction = {
  amount: 10000,
};

const wrongTransactionAmount = {
  amount: '20K',
};

// testAdmin
const testAdmin = {
  firstName: 'Adeq',
  lastName: 'Badeww',
  email: 'adebadewww@gmail.com',
  password: 'adebade1234',
};

const missingtestAdmin = {
  lastName: 'Bade',
  email: 'adebade31@gmail.com',
  password: 'adebade1234',
  isAdmin: true,
};

const emptyTestAdmin = {
  firstName: '',
  lastName: 'Bade',
  email: '',
  password: '',
  isAdmin: '',
};
export {
  wrongAcctNo, wrongTransactionId, wrongAccountType, wrongLogin, wrongTransactionAmount,
  clientField, adminField, staffField, missingAdmin, missingClient,
  missingLogin, missingStaff, missingtestAdmin, emptyAccountType, emptyAdmin,
  emptyClient, emptyLogin, emptyStaff, emptyTestAdmin, emptytransaction,
  login, accountType, transaction, testAdmin, clientField2, adminField2, staffField2,
  clientField3, clientField4, staffField3, staffField4, adminField3, adminField4, adminField5,
};
