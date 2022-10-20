import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';

import { TeamsData } from './Mocks/teamMock';
import { mockGetFinishedHomeTeam, mockGetFinishedAwayTeam } from './Mocks/leaderboardMock';
import { mockGetAll} from './Mocks/matchesMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes com leaderboard' , () => {
  describe('Testes em GET /leaderboard/home', () => {

/*
 * Inspirado em link:https://itnext.io/unit-testing-sequelize-models-made-easy-108f079f1e38
 * Porem quem me deu a opcao foi o proprio VSCode
 */

    sinon.stub(TeamsModel.prototype.get()).resolves(TeamsData as TeamsModel[]);
    sinon.stub(MatchesModel.prototype.get()).resolves({
      model: MatchesModel,
      as: 'matchesHome',
      where: { inProgress: false },
      attributes: { exclude: ['id'] },
    });

    it('retorna as classificacoes dos times da casa na tela de classificacao do front-end', async () => {
      const { status, body } = await chai.request(app).get('/leaderboard/home');
      expect(status).to.equal(200);
      expect(body).to.deep.equal(mockGetFinishedHomeTeam);
    });
  
    it('retorna as classificacoes dos times de fora na tela de classificacao do front-end', async () => {
      const result = await chai.request(app).get('/leaderboard/away');

      expect(result.status).to.be.equal(200);
      expect(result.body).to.deep.equal(mockGetFinishedAwayTeam);
    });
  });
});
