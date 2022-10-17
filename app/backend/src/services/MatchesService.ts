import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';
import { ITeam } from '../interfaces/ITeam';

class MatchesService {
  constructor(private matchesModel: typeof MatchesModel) {}

  public async getAllMatches(): Promise<ITeam> {
    const result = await this.matchesModel.findAll({
      include: [{
        model: TeamsModel, as: 'teamHome', attributes: { exclude: ['id'] },
      },
      {
        model: TeamsModel, as: 'teamAway', attributes: { exclude: ['id'] },
      }],
    });

    return { code: 200, data: result };
  }

  public async getAllMatchesInProgress(): Promise<ITeam> {
    const result = await this.matchesModel.findAll(
      { where: { inProgress: true },
        include: [{
          model: TeamsModel, as: 'teamHome', attributes: { exclude: ['id'] },
        },
        {
          model: TeamsModel, as: 'teamAway', attributes: { exclude: ['id'] },
        }],
      },
    );

    return { code: 200, data: result };
  }
}

export default MatchesService;
