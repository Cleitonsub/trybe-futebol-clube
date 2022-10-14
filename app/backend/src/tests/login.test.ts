import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';

import { adminData, token, userData } from './usersMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste em POST /login', () => {

  before(async () =>
  sinon.stub(UserModel, 'findOne').resolves(adminData as UserModel)
  );

  after(() => (UserModel.findOne as sinon.SinonStub).restore());

  it('permite o acesso do usuário com dados válidos no front-end', async () => {
    const chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    });
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('nega o acesso do usuário com a falta do email no front-end', async () => {
    const chaiHttpResponse = await chai.request(app).post('/login').send({
      email: '',
      password: 'secret_admin',
    });
    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.a('object');
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
  });

  it('nega o acesso do usuário com a falta de password no front-end', async () => {
    const chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: '',
    });
    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.a('object');
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
  });

  it('nega o acesso do usuário com o email inválido no front-end', async () => {
    const chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'test@test.com',
      password: 'secret_admin',
    });
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.a('object');
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
  });

  it('nega o acesso do usuário com o password inválido no front-end', async () => {
    const chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'teste',
    });
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.a('object');
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
  });
});

describe('Teste em GET /login/validate', () => {

  before(async () =>
  sinon.stub(UserModel, 'findOne').resolves(userData as UserModel)
  );

  after(() => (UserModel.findOne as sinon.SinonStub).restore());

  it('retorna os dados corretamente no front-end com validação do token aceita', async () => {
    const chaiHttpResponse = await chai.request(app).get('/login/validate').set('authorization', token);
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal({ role: userData.role });
  });

  it('retorna os dados corretamente no front-end com validação do token negada', async () => {
    const chaiHttpResponse = await chai.request(app).get('/login/validate').set('authorization', '');
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({ role: userData.role });
  });
});
