import * as express from 'express';
import MatchesService from '../services/MatchesService';
import MatchesModel from '../database/models/MatchesModel';
import MatchesController from '../controllers/matchesController';

const router = express.Router();

const matchesService = new MatchesService(MatchesModel);
const matchesController = new MatchesController(matchesService);
const { getAllMatches } = matchesController;

router.get('/', getAllMatches);

export default router;
