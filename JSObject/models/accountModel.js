class Account {
  constructor(id, accountNumber, type) {
    this.id = id;
    this.accountNumber = accountNumber;
    this.owner = '';
    this.type = type;
    this.status = 'active';
    this.createdOn = new Date(Date.now());
    this.balance = 0.0;
  }
}
export default Account;
