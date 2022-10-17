import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

class MatchesController {
  constructor(private matchesService: MatchesService) {}

  public getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress) {
      const {
        code,
        data,
      } = await this.matchesService.getAllMatchesInProgress(inProgress === 'true');
      return res.status(code).json(data);
    }

    const { code, data } = await this.matchesService.getAllMatches();

    return res.status(code).json(data);
  };

  public saveMatches = async (req: Request, res: Response) => {
    const { code, data } = await this.matchesService.saveMatches(req.body);

    return res.status(code).json(data);
  };

  public updateById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { code, data } = await this.matchesService.updateById(Number(id));

    return res.status(code).json(data);
  };
}

export default MatchesController;
