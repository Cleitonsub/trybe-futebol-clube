import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste com server' , () => {
  describe('Teste em GET /', () => {

    it('retorna que a aplicacao esta ok', async () => {
      const { status, body } = await chai.request(app).get('/');
      expect(status).to.equal(200);
      expect(body).to.deep.equal({ ok: true });
    });
  
  });
});
