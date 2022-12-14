import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';

import { adminData, token } from './Mocks/usersMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes com login', () => {

  before(async () =>
    sinon.stub(UserModel, 'findOne').resolves(adminData as UserModel)
  );

  after(() => (UserModel.findOne as sinon.SinonStub).restore());

  describe('Testes em POST /login', () => {

    it('permite o acesso do usuário com dados válidos no front-end', async () => {
      const { status, body } = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });
      expect(status).to.be.equal(200);
      expect(body).to.have.property('token');
    });

    it('nega o acesso do usuário com a falta do email no front-end', async () => {
      const { status, body } = await chai.request(app).post('/login').send({
        email: '',
        password: 'secret_admin',
      });
      expect(status).to.be.equal(400);
      expect(body).to.be.a('object');
      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('All fields must be filled');
    });

    it('nega o acesso do usuário com a falta de password no front-end', async () => {
      const { status, body } = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: '',
      });
      expect(status).to.be.equal(400);
      expect(body).to.be.a('object');
      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('All fields must be filled');
    });

    it('nega o acesso do usuário com o email inválido no front-end', async () => {
      const { status, body } = await chai.request(app).post('/login').send({
        email: 'test@test.com',
        password: 'secret_admin',
      });
      expect(status).to.be.equal(401);
      expect(body).to.be.a('object');
      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('Incorrect email or password');
    });

    it('nega o acesso do usuário com o password inválido no front-end', async () => {
      const { status, body } = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'teste123',
      });
      expect(status).to.be.equal(401);
      expect(body).to.be.a('object');
      expect(body).to.have.property('message');
      expect(body.message).to.be.equal('Incorrect email or password');
    });
  });

  describe('Testes em GET /login/validate', () => {

    it('retorna os dados corretamente no front-end com validação do token aceita', async () => {
      const { status, body } = await chai.request(app).get('/login/validate').set('authorization', token);
      expect(status).to.be.equal(200);
      expect(body).to.deep.equal({ role: adminData.role });
    });

    it('retorna os dados corretamente no front-end com validação do token negada', async () => {
      const { status, body } = await chai.request(app).get('/login/validate').set('authorization', '');
      expect(status).to.be.equal(401);
      expect(body).to.deep.equal({ message: 'Token must be a valid token' });
    });
  });
});
