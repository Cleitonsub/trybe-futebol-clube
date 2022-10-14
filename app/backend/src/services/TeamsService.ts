import { Err } from '../middlewares/errorMiddleware';
import TeamsModel from '../database/models/TeamsModel';
import { ITeam } from '../interfaces/ITeam';

class TeamsService {
  constructor(private teamsModel: typeof TeamsModel) {}

  public async getTeamById(id: number): Promise<ITeam> {
    const result = await this.teamsModel.findByPk(id);
    if (!result) throw new Err(404, 'Team not found');

    return { code: 200, data: result };
  }
}

export default TeamsService;
