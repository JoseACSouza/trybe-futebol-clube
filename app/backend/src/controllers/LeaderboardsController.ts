import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import IMatch from '../Interfaces/Match';
import ITeam from '../Interfaces/Team';
import LeaderboardHomeTeam from '../utils/LeaderboardHomeTeam';

export default class LeaderboardController {
  public service: LeaderboardService;

  constructor() {
    this.service = new LeaderboardService();
  }

  public index = async (req: Request, res: Response) => {
    const { matchesFinish, allTeams } = await this.service.results();
    const result = await LeaderboardHomeTeam(matchesFinish as IMatch[], allTeams as ITeam[]);
    return res.status(200).json(result);
  };
}
