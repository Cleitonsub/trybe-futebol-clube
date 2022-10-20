import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';
import { IResponse } from '../interfaces/IResponse';
import { IMatches } from '../interfaces/IMatches';
import { Err } from '../middlewares/errorMiddleware';
import { IUpProgress } from '../interfaces/IUpProgress';

class MatchesService {
  constructor(private matchesModel: typeof MatchesModel) {}

  public async getAllMatches(): Promise<IResponse> {
    const result = await this.matchesModel.findAll({
      include: [{
        model: TeamsModel, as: 'teamHome', attributes: { exclude: ['id'] },
      },
      {
        model: TeamsModel, as: 'teamAway', attributes: { exclude: ['id'] },
      }],
    });
    if (!result) throw new Err(404, 'No matches found');

    return { code: 200, data: result };
  }

  public async getAllMatchesInProgress(progress: boolean): Promise<IResponse> {
    const result = await this.matchesModel.findAll(
      { where: { inProgress: progress },
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

  public async saveMatches(body: IMatches): Promise<IResponse> {
    const { homeTeam, awayTeam } = body;

    if (homeTeam === awayTeam) {
      throw new Err(401, 'It is not possible to create a match with two equal teams');
    }

    const home = await TeamsModel.findByPk(homeTeam);
    const away = await TeamsModel.findByPk(awayTeam);
    if (!home || !away) {
      throw new Err(404, 'There is no team with such id!');
    }

    const result = await this.matchesModel.create(body);

    return { code: 201, data: result };
  }

  public async updateById(id: number): Promise<IResponse> {
    await this.matchesModel.update({ inProgress: false }, { where: { id } });

    return { code: 200, data: { message: 'Finished' } };
  }

  public async updateProgressById(id: number, body: IUpProgress): Promise<IResponse> {
    await this.matchesModel.update(body, { where: { id } });

    return { code: 200, data: { message: 'Updated score' } };
  }
}

export default MatchesService;
