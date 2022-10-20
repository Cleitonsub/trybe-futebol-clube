import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/TeamsModel';

import { TeamsData, TeamData } from './Mocks/teamMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes com teams' , () => {

  beforeEach(async () => {
    sinon.stub(TeamsModel, 'findAll').resolves(TeamsData as TeamsModel[]);
    sinon.stub(TeamsModel, 'findByPk').resolves(TeamData as TeamsModel);
  });

  afterEach(() => {
   (TeamsModel.findAll as sinon.SinonStub).restore();
   (TeamsModel.findByPk as sinon.SinonStub).restore();
  });

  describe('Testes em GET /teams', () => {

    it('retorna todos os times corretamente', async () => {
      const { status, body } = await chai.request(app).get('/teams');
      expect(status).to.equal(200);
      expect(body).to.deep.equal(TeamsData);
    });
  
  });

  describe('Testes em GET /teams/:id', () => {

    it('retorna dados de um time especifico', async () => {
      const { status, body } = await chai.request(app).get('/teams/5');
      expect(status).to.equal(200);
      expect(body).to.deep.equal(TeamData);
    });
  });
});
