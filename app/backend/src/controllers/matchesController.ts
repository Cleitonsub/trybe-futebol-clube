import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

class MatchesController {
  constructor(private matchesService: MatchesService) {}

  public getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress) {
      const { code, data } = await this.matchesService.getAllMatchesInProgress();
      return res.status(code).json(data);
    }

    const { code, data } = await this.matchesService.getAllMatches();

    return res.status(code).json(data);
  };
}

export default MatchesController;
