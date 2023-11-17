import * as express from 'express';
import TeamController from './controllers/TeamController';

class App {
  public app: express.Express;
  public team: TeamController;
  constructor() {
    this.app = express();
    this.config();
    this.team = new TeamController();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));

    // Teams
    this.app.get('/teams', async (_req, res) => this.team.index(res));
    this.app.get('/teams/:id', async (req, res) => this.team.show(req, res));
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
