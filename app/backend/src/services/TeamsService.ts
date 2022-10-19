import { Err } from '../middlewares/errorMiddleware';
import TeamsModel from '../database/models/TeamsModel';
import { IResponse } from '../interfaces/IResponse';

class TeamsService {
  constructor(private teamsModel: typeof TeamsModel) {}

  public async getAllTeams(): Promise<IResponse> {
    const result = await this.teamsModel.findAll();

    return { code: 200, data: result };
  }

  public async getTeamById(id: number): Promise<IResponse> {
    const result = await this.teamsModel.findByPk(id);
    if (!result) throw new Err(404, 'Team not found');

    return { code: 200, data: result };
  }
}

export default TeamsService;
