import { sortRating, totalRating } from '../helpers/calculateLeaderboard';
import { IRatings } from '../interfaces/IRating';
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import { IResponse } from '../interfaces/IResponse';

class LeaderboardService {
  constructor(private teamsModel: typeof TeamsModel) {}

  public async getFinishedHomeTeam(): Promise<IResponse> {
    const teamsResult = await this.teamsModel.findAll({
      include: [
        { model: MatchesModel,
          as: 'matchesHome',
          where: { inProgress: false },
          attributes: { exclude: ['id'] },
        }],
    });
    const ratings: IRatings[] = teamsResult.map((teams) => totalRating(teams, 'matchesHome'));
    const sortRatings = sortRating(ratings);

    return { code: 200, data: sortRatings };
  }

  public async getFinishedAwayTeam(): Promise<IResponse> {
    const teamsResult = await this.teamsModel.findAll({
      include: [
        { model: MatchesModel,
          as: 'matchesAway',
          where: { inProgress: false },
          attributes: { exclude: ['id'] },
        }],
    });
    const ratings: IRatings[] = teamsResult.map((teams) => totalRating(teams, 'matchesAway'));
    const sortRatings = sortRating(ratings);

    return { code: 200, data: sortRatings };
  }
}

export default LeaderboardService;
