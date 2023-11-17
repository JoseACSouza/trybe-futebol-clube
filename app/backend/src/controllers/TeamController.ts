import { Response, Request } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  public service: TeamService;

  constructor() {
    this.service = new TeamService();
  }

  public index = async (res: Response) => {
    try {
      const response = await this.service.getAll();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  };

  public show = async (req:Request, res: Response) => {
    const { id } = req.params;
    try {
      const response = await this.service.getById(id);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  };
}
