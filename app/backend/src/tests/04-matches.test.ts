import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchesModel from '../database/models/MatchesModel';

import { mockGetAll } from './Mocks/matchesMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes com matches' , () => {
  describe('Testes em GET /matches', () => {
    
    beforeEach(async () => {
      sinon.stub(MatchesModel, 'findAll').resolves(mockGetAll as unknown as MatchesModel[]);
    });
  
    afterEach(() => {
     (MatchesModel.findAll as sinon.SinonStub).restore();
    });
    
    it('retorna todas as partidas corretamente', async () => {
      
      const { status, body } = await chai.request(app).get('/matches');
      expect(status).to.equal(200);
      expect(body).to.deep.equal(mockGetAll);
    });
  });
});