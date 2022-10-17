import * as express from 'express';
import MatchesService from '../services/MatchesService';
import MatchesModel from '../database/models/MatchesModel';
import MatchesController from '../controllers/matchesController';
import tokenValidate from '../middlewares/tokenValidate';

const router = express.Router();

const matchesService = new MatchesService(MatchesModel);
const matchesController = new MatchesController(matchesService);
const { getAllMatches, saveMatches, updateById } = matchesController;

router.get('/', getAllMatches);
router.post('/', tokenValidate, saveMatches);
router.patch('/:id/finish', updateById);

export default router;
