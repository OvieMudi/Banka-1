/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import {
  wrongAcctNo,
  wrongAccountType,
  emptyAccountType,
  accountType,
  clientField2,
  staffField,
  adminField5,
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

  const adminrespons = await chai
    .request(app)
    .post('/api/v1/admin')
    .send(adminField5);

  adminToken = adminrespons.body.data.token;

  const staffRespons = await chai
    .request(app)
    .post('/api/v1/staff')
    .set({ Authorization: `Bearer ${adminToken}` })
    .send(staffField);

  staffToken = staffRespons.body.data.token;
});

describe('ACCOUNT TEST', () => {
  describe('CREATE A BANK ACCOUNT', () => {
    it('it should create a bankaccount', async () => {
      const res = await chai.request(app)
        .post('/api/v1/accounts')
        .set({ Authorization: `Bearer ${clientToken}` })
        .send({ type: 'savings' });
      clientAcct = res.body.data.accountNumber;
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('data');
    });

    it('it should return 400 if account type is empty', async () => {
      const res = await chai.request(app)
        .post('/api/v1/accounts')
        .set({ Authorization: `Bearer ${clientToken}` })
        .send(emptyAccountType);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });

    it('it should return 400 if account type is wrong', async () => {
      const res = await chai.request(app)
        .post('/api/v1/accounts')
        .set({ Authorization: `Bearer ${clientToken}` })
        .send(wrongAccountType);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });

    it('it should return 403 if unauthorized', async () => {
      const res = await chai.request(app)
        .post('/api/v1/accounts')
        .set({ Authorization: 'Bearer wrong token' })
        .send(accountType);
      expect(res).to.have.status(403);
      expect(res.body).to.have.property('error');
    });
  });

  describe('TEST ACTIVATE/DEACTIVATE ACCOUNT', () => {
    it('it should deactivate an account', async () => {
      const res = await chai.request(app)
        .patch(`/api/v1/accounts/${clientAcct}`)
        .set({ Authorization: `Bearer ${staffToken}` })
        .send({ status: 'dormant' });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
    });

    it('it should activate an account', async () => {
      const res = await chai.request(app)
        .patch(`/api/v1/accounts/${clientAcct}`)
        .set({ Authorization: `Bearer ${staffToken}` })
        .send({ status: 'active' });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
    });

    it('it should return an error for an invalid status', async () => {
      const res = await chai.request(app)
        .patch(`/api/v1/accounts/${clientAcct}`)
        .set({ Authorization: `Bearer ${staffToken}` })
        .send({ status: 'dorm' });
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });


    it('it should return 400 if account number is wrong', async () => {
      const res = await chai.request(app)
        .patch(`/api/v1/accounts/${wrongAcctNo}`)
        .set({ Authorization: `Bearer ${staffToken}` });
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });

    it('it should return 403 if unauthorized', async () => {
      const res = await chai.request(app)
        .patch(`/api/v1/accounts/${clientAcct}`)
        .set({ Authorization: 'Bearer wrong token' });
      expect(res).to.have.status(403);
      expect(res.body).to.have.property('error');
    });
  });

  describe('TEST GET SPECIFIC ACCOUNT', () => {
    it('it should return 400 if account number is wrong', async () => {
      const res = await chai.request(app)
        .get(`/api/v1/accounts/${wrongAcctNo}/transactions`)
        .set({ Authorization: `Bearer ${staffToken}` });
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });

    it('it should return 403 if unauthorized', async () => {
      const res = await chai.request(app)
        .get(`/api/v1/accounts/${clientAcct}/transactions`)
        .set({ Authorization: 'Bearer wrong token' });
      expect(res).to.have.status(403);
      expect(res.body).to.have.property('error');
    });
  });

  describe('TEST GET ALL ACCOUNTS', () => {
    it('it should return all account numbers', async () => {
      const res = await chai.request(app)
        .get('/api/v1/accounts')
        .set({ Authorization: `Bearer ${staffToken}` });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
    });

    it('it should return 403 if unauthorized', async () => {
      const res = await chai.request(app)
        .get('/api/v1/accounts')
        .set({ Authorization: 'Bearer wrong token' });
      expect(res).to.have.status(403);
      expect(res.body).to.have.property('error');
    });
  });

  describe('TEST DELETE ACCOUNT', () => {
    it('it should delete a specific account', async () => {
      const res = await chai.request(app)
        .delete(`/api/v1/accounts/${clientAcct}`)
        .set({ Authorization: `Bearer ${staffToken}` });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message');
    });

    it('it should return 400 if account number is wrong', async () => {
      const res = await chai.request(app)
        .delete(`/api/v1/accounts/${wrongAcctNo}`)
        .set({ Authorization: `Bearer ${staffToken}` });
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });

    it('it should return 403 if unauthorized', async () => {
      const res = await chai.request(app)
        .delete(`/api/v1/accounts/${clientAcct}`)
        .set({ Authorization: 'Bearer wrong token' });
      expect(res).to.have.status(403);
      expect(res.body).to.have.property('error');
    });
  });
});
