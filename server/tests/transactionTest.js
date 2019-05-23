/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import {
  wrongAcctNo,
  wrongTransactionId,
  wrongTransactionAmount,
  clientField2,
  staffField2, accountType,
  transaction,
  emptytransaction,
  adminField2,
} from './testData';

const { expect } = chai;
chai.use(chaiHttp);

let clientToken;
let staffToken;
let adminToken;
let clientAcct;

before(async () => {
  const respons = await chai
    .request(app)
    .post('/api/v1/auth/signup')
    .send(clientField2);

  clientToken = respons.body.data.token;

  const userRespons = await chai
    .request(app)
    .post('/api/v1/accounts')
    .set({ Authorization: `Bearer ${clientToken}` })
    .send(accountType);

  clientAcct = userRespons.body.data.accountNumber;

  const adminrespons = await chai
    .request(app)
    .post('/api/v1/admin')
    .send(adminField2);

  adminToken = adminrespons.body.data.token;

  const staffRespons = await chai
    .request(app)
    .post('/api/v1/staff')
    .set({ Authorization: `Bearer ${adminToken}` })
    .send(staffField2);

  staffToken = staffRespons.body.data.token;
});


describe('TRANSACTION TEST', () => {
  it('it should return an error if account number is wrong', async () => {
    const res = await chai.request(app)
      .post(`/api/v1/transactions/${wrongAcctNo}/debit`)
      .set({ Authorization: `Bearer ${staffToken}` })
      .send(transaction);
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('error');
  });

  it('it should return an error if amount is not a positive number', async () => {
    const res = await chai.request(app)
      .post(`/api/v1/transactions/${clientAcct}/debit`)
      .set({ Authorization: `Bearer ${staffToken}` })
      .send(wrongTransactionAmount);
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('error');
  });

  it('it should return an error if amount is empty', async () => {
    const res = await chai.request(app)
      .post(`/api/v1/transactions/${clientAcct}/debit`)
      .set({ Authorization: `Bearer ${staffToken}` })
      .send(emptytransaction);
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('error');
  });

  it('it should return 403 if if user is not authorized', async () => {
    const res = await chai.request(app)
      .post(`/api/v1/transactions/${clientAcct}/debit`)
      .set({ Authorization: 'Bearer wrongtoken' })
      .send(transaction);
    expect(res).to.have.status(403);
    expect(res).to.have.property('error');
  });
});

describe('CASHIER CAN CREDIT ACCOUNT', () => {
  it('it credit an account with all the correct details', async () => {
    const res = await chai.request(app)
      .post(`/api/v1/transactions/${clientAcct}/credit`)
      .set({ Authorization: `Bearer ${staffToken}` })
      .send(transaction);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('data');
  });

  it('it should return an error if account number is wrong', async () => {
    const res = await chai.request(app)
      .post(`/api/v1/transactions/${wrongAcctNo}/credit`)
      .set({ Authorization: `Bearer ${staffToken}` })
      .send(transaction);
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('error');
  });

  it('it should return an error if amount is not a positive number', async () => {
    const res = await chai.request(app)
      .post(`/api/v1/transactions/${clientAcct}/credit`)
      .set({ Authorization: `Bearer ${staffToken}` })
      .send(wrongTransactionAmount);
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('error');
  });

  it('it should return an error if amount is empty', async () => {
    const res = await chai.request(app)
      .post(`/api/v1/transactions/${clientAcct}/credit`)
      .set({ Authorization: `Bearer ${staffToken}` })
      .send(emptytransaction);
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('error');
  });

  it('it should return an error if user is not authorized', async () => {
    const res = await chai.request(app)
      .post(`/api/v1/transactions/${clientAcct}/credit`)
      .set({ Authorization: 'Bearer wrongtoken' })
      .send(transaction);
    expect(res).to.have.status(403);
    expect(res).to.have.property('error');
  });
});

describe('TEST GET TRANSACTION HISTORY', () => {
  it('it should return an error if account number is wrong', async () => {
    const res = await chai.request(app)
      .get(`/api/v1/transactions/${wrongAcctNo}`)
      .set({ Authorization: `Bearer ${staffToken}` });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('error');
  });

  it('it should return an error if unauthorized', async () => {
    const res = await chai.request(app)
      .get(`/api/v1/transactions/${clientAcct}`)
      .set({ Authorization: 'Bearer wrong token' });
    expect(res).to.have.status(403);
    expect(res.body).to.have.property('error');
  });
});

describe('TEST GET SPECIFIC ACCOUNT TRANSACTION', () => {
  it('it should return an error if transaction Id is wrong', async () => {
    const res = await chai.request(app)
      .get(`/api/v1/transactions/${wrongTransactionId}`)
      .set({ Authorization: `Bearer ${staffToken}` });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('error');
  });

  it('it should return an error if unauthorized', async () => {
    const res = await chai.request(app)
      .get('/api/v1/transactions/1')
      .set({ Authorization: 'Bearer wrong token' });
    expect(res).to.have.status(403);
    expect(res.body).to.have.property('error');
  });
});

describe('CONDUCT REVERSAL ON AN ACCOUNT', () => {
  it('it should return an error if the account number doesn\'t exist', async () => {
    const res = await chai.request(app)
      .patch('/api/v1/transactions/reverse/1232314567/1')
      .set({ Authorization: `Bearer ${staffToken}` });
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('error');
  });

  it('it should return an error if the transaction doesn\'t exist', async () => {
    const res = await chai.request(app)
      .patch(`/api/v1/transactions/reverse/${clientAcct}/5`)
      .set({ Authorization: `Bearer ${staffToken}` });
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('error');
  });

  it('it should perform a reversal on an account', async () => {
    const res = await chai.request(app)
      .patch(`/api/v1/transactions/reverse/${clientAcct}/1`)
      .set({ Authorization: `Bearer ${staffToken}` });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('data');
  });
});
