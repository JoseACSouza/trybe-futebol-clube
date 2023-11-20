import * as express from 'express';
import TeamController from './controllers/TeamController';
import LoginController from './controllers/LoginController';
import MatchController from './controllers/MatchController';
import { validateFields, verifyFields } from './middlewares/Login.validate';
import auth from './middlewares/Auth.validate';
import { validateMatch, verifyEqualTeams } from './middlewares/Match.validate';

class App {
  public app: express.Express;
  public team: TeamController;
  public login: LoginController;
  public matches: MatchController;

  // eslint-disable-next-line max-lines-per-function
  constructor() {
    this.app = express();
    this.config();
    this.team = new TeamController();
    this.login = new LoginController();
    this.matches = new MatchController();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));

    // Teams
    this.app.get('/teams', async (_req, res) => this.team.index(res));
    this.app.get('/teams/:id', async (req, res) => this.team.show(req, res));

    // Login
    this.app.post(
      '/login',
      verifyFields,
      validateFields,
      async (req, res) => this.login.login(req, res),
    );
    this.app.get(
      '/login/role',
      auth,
      async (_req, res) => this.login.showRole(_req, res),
    );

    // Matches
    this.app.get('/matches', async (req, res) => this.matches.index(req, res));
    this.app.patch('/matches/:id/finish', auth, async (req, res) => this.matches.finish(req, res));
    this.app.patch('/matches/:id', auth, async (req, res) => this.matches.patchMatch(req, res));
    this.app.post(
      '/matches',
      auth,
      validateMatch,
      verifyEqualTeams,
      async (req, res) => this.matches.create(req, res),
    );
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
