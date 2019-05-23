/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import {
  wrongLogin,
  clientField3,
  adminField3,
  adminField0,
  clientField0,
  missingAdmin,
  missingClient,
  missingLogin,
  missingStaff,
  emptyAdmin,
  emptyClient,
  emptyLogin,
  emptyStaff,
  adminField4,
} from './testData';

const { expect } = chai;
chai.use(chaiHttp);

let adminToken;
let clientToken;

before(async () => {
  const response = await chai
    .request(app)
    .post('/api/v1/auth/signup')
    .send(clientField3);

  clientToken = response.body.data.token;

  const adminresponse = await chai
    .request(app)
    .post('/api/v1/admin')
    .send(adminField3);

  adminToken = adminresponse.body.data.token;
});

describe('USER TEST', () => {
  describe('USER SIGNUP', () => {
    it('it should return 400 if there are missing fields', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send(missingClient);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });

    it('it should return 400 if the fields are empty', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send(emptyClient);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });

    it('it should sign up a new user', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send(clientField0);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('data');
    });
  });

  describe('USER LOGIN', () => {
    it('it should sign in a new user', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signin')
        .send(clientField0);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
    });

    it('it should return 400 if the login fields are empty', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signin')
        .send(emptyLogin);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });

    it('it should return 400 if there is a missing field in login', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signin')
        .send(missingLogin);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });

    it('it should return 400 if there inputs in fields are invalid', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signin')
        .send(wrongLogin);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });
  });

  describe('ADMIN CAN CREATE STAFF/ADMIN', () => {
    it('it should create an admin', async () => {
      const res = await chai.request(app)
        .post('/api/v1/staff')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(adminField4);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('data');
    });

    it('it should return 403 if unauthorized', async () => {
      const res = await chai.request(app)
        .post('/api/v1/staff')
        .set({ Authorization: 'Bearer wrongtoken' })
        .send(adminField0);
      expect(res).to.have.status(403);
      expect(res).to.have.property('error');
    });

    it('it should return 400 if there is a missing field in the create staff form', async () => {
      const res = await chai.request(app)
        .post('/api/v1/staff')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(missingStaff);
      expect(res).to.have.status(400);
      expect(res).to.have.property('error');
    });

    it('it should return 400 if the create admin fields are empty', async () => {
      const res = await chai.request(app)
        .post('/api/v1/staff')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(emptyAdmin);
      expect(res).to.have.status(400);
      expect(res).to.have.property('error');
    });

    it('it should return 400 if there is a missing field in the create admin form', async () => {
      const res = await chai.request(app)
        .post('/api/v1/staff')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(missingAdmin);
      expect(res).to.have.status(400);
      expect(res).to.have.property('error');
    });

    it('it should return 400 if the create staff fields are empty', async () => {
      const res = await chai.request(app)
        .post('/api/v1/staff')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(emptyStaff);
      expect(res).to.have.status(400);
      expect(res).to.have.property('error');
    });
  });
});
