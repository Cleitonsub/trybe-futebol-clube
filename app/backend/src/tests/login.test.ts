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
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  before(async () =>
  sinon.stub(UserModel, 'findOne').resolves(adminData as UserModel)
  );

  after(() => (UserModel.findOne as sinon.SinonStub).restore());

  it('permite o acesso com dados válidos no front-end', async () => {
    const result = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    });
    expect(result.status).to.be.equal(200);
    expect(result.body).to.have.property('token');
  });

  // it('', async () => {
    
  // });

  // it('', async () => {
    
  // });

  // it('', async () => {
    
  // });

  // it('', async () => {
    
  // });
});
  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  // it('Seu sub-teste', () => {
  //   expect(false).to.be.eq(true);
  // });
