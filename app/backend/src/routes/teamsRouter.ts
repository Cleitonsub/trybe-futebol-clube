import * as express from 'express';
import TeamsService from '../services/TeamsService';
import TeamsModel from '../database/models/TeamsModel';
import TeamsController from '../controllers/teamsController';

const router = express.Router();

const teamsService = new TeamsService(TeamsModel);
const teamsController = new TeamsController(teamsService);
const { getAllTeams, getTeamById } = teamsController;

router.get('/', getAllTeams);
router.get('/:id', getTeamById);

export default router;
