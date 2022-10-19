import * as express from 'express';
import LeaderboardService from '../services/LeaderboardService';
import TeamsModel from '../database/models/TeamsModel';
import LeaderboardController from '../controllers/leaderboardController';

const router = express.Router();

const leaderboardService = new LeaderboardService(TeamsModel);
const leaderboardController = new LeaderboardController(leaderboardService);
const { getFinishedHomeTeam } = leaderboardController;

router.get('/home', getFinishedHomeTeam);

export default router;
