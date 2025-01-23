import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/TeamService';

export const verifyEqualTeams = (req :Request, res:Response, next:NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;
  if (homeTeamId === awayTeamId) {
    return res.status(422).json(
      { message: 'It is not possible to create a match with two equal teams' },
    );
  }
  next();
};

const validateTeams = async (homeTeamId: number, awayTeamId: number) => {
  const service = new TeamService();
  try {
    const verification = await Promise.all(
      [service.getById(homeTeamId), service.getById(awayTeamId)],
    );
    return (!!(verification[0] && verification[1]));
  } catch (error) {
    console.log(error);
  }
};

export const validateMatch = async (req :Request, res:Response, next:NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;

  const verifyTeams = await validateTeams(homeTeamId, awayTeamId);

  if (!verifyTeams) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  next();
};
