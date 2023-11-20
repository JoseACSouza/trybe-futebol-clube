import { Response, Request } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  public service: MatchService;

  constructor() {
    this.service = new MatchService();
  }

  private verifyQuery = (inProgress: unknown) => {
    const query = inProgress === 'true';
    return query;
  };

  public index = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress as string) {
      const query = this.verifyQuery(inProgress);
      try {
        const response = await this.service.getInProgressMatches(query);
        return res.status(200).json(response);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      const response = await this.service.getAll();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  };

  public finish = async (req:Request, res: Response) => {
    const { id } = req.params;
    try {
      await this.service.patchInProgress(id);
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      console.log(error);
    }
  };

  public patchMatch = async (req:Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    try {
      await this.service.patchGoals(homeTeamGoals, awayTeamGoals, id);
      return res.status(200).json({ message: 'Patched' });
    } catch (error) {
      console.log(error);
    }
  };

  public create = async (req:Request, res: Response) => {
    const { homeTeamGoals, awayTeamGoals, awayTeamId, homeTeamId } = req.body;
    try {
      const newMatch = await this.service.newMatch(
        { homeTeamGoals, awayTeamGoals, awayTeamId, homeTeamId },
      );
      return res.status(201).json(newMatch);
    } catch (error) {
      console.log(error);
    }
  };
}
