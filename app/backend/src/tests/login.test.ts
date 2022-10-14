import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';

import { adminData } from './usersMock';

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
});
