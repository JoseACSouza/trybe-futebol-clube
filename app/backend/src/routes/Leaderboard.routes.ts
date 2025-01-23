import { Router } from 'express';
import LeaderboardsController from '../controllers/LeaderboardsController';

const leaderboardsController = new LeaderboardsController();
const leaderboardsRouter = Router();

leaderboardsRouter.get('/home', (req, res) => leaderboardsController.index(req, res));

export default leaderboardsRouter;
