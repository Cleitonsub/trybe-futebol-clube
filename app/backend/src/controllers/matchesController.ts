import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

class MatchesController {
  constructor(private matchesService: MatchesService) {}

  public getAllMatches = async (_req: Request, res: Response) => {
    const { code, data } = await this.matchesService.getAllMatches();

    return res.status(code).json(data);
  };
}

export default MatchesController;
