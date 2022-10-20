import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) {}

  public getFinishedHomeTeam = async (_req: Request, res: Response) => {
    const { code, data } = await this.leaderboardService.getFinishedHomeTeam();

    return res.status(code).json(data);
  };

  public getFinishedAwayTeam = async (_req: Request, res: Response) => {
    const { code, data } = await this.leaderboardService.getFinishedAwayTeam();

    return res.status(code).json(data);
  };
}

export default LeaderboardController;
