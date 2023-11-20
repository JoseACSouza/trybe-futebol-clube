import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import auth from '../middlewares/Auth.validate';
import { verifyEqualTeams, validateMatch } from '../middlewares/Match.validate';

const matchController = new MatchController();
const matchRouter = Router();

matchRouter.get('/', async (req, res) => matchController.index(req, res));
matchRouter.post(
  '/',
  auth,
  validateMatch,
  verifyEqualTeams,
  async (req, res) => matchController.create(req, res),
);
matchRouter.patch(
  '/:id/finish',
  auth,
  async (req, res) => matchController.finish(req, res),
);
matchRouter.patch('/:id', auth, async (req, res) => matchController.patchMatch(req, res));

export default matchRouter;
