import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

class TeamsController {
  constructor(private teamsService: TeamsService) {}

  public getAllTeams = async (_req: Request, res: Response) => {
    const { code, data } = await this.teamsService.getAllTeams();

    return res.status(code).json(data);
  };

  public getTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { code, data } = await this.teamsService.getTeamById(Number(id));

    return res.status(code).json(data);
  };
}

export default TeamsController;
