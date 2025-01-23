import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamController = new TeamController();
const teamRouter = Router();

teamRouter.get('/', (_req, res) => teamController.index(res));
teamRouter.get('/:id', (req, res) => teamController.show(req, res));

export default teamRouter;
