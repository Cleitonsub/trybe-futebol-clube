import * as express from 'express';
import TeamsService from '../services/TeamsService';
import TeamsModel from '../database/models/TeamsModel';
import TeamsController from '../controllers/teamsController';
// import tokenValidate from '../middlewares/tokenValidate';

const router = express.Router();

const teamsService = new TeamsService(TeamsModel);
const teamsController = new TeamsController(teamsService);
const { getTeamById } = teamsController;

// router.use(tokenValidate);
router.get('/:id', getTeamById);

export default router;
