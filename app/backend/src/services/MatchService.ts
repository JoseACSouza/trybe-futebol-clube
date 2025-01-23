import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import IMatch from '../Interfaces/Match';
import { NewMatch } from '../types/newMatch';

class MatchService {
  public getAll = async (): Promise<IMatch[]> => Match.findAll({
    include: [
      {
        model: Team,
        as: 'homeTeam',
        attributes: ['teamName'],
      },
      {
        model: Team,
        as: 'awayTeam',
        attributes: ['teamName'],
      },
    ],
  });

  public getInProgressMatches = async (progress: boolean): Promise<IMatch[] | null> =>
    Match.findAll({
      where: { inProgress: progress },
      include: [
        {
          model: Team,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: Team,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });

  public getById = async (id: number | string): Promise<IMatch | null> =>
    Match.findByPk(id, {
      include: [
        {
          model: Team,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: Team,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });

  public patchInProgress = async (id:number | string) =>
    Match.update({ inProgress: false }, { where: { id } });

  public patchGoals = async (
    homeTeamGoals: number | undefined,
    awayTeamGoals: number | undefined,
    id: number | string,
  ) =>
    Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

  public newMatch = async (newMatch: NewMatch) => Match.create({
    ...newMatch,
    inProgress: true,
  });
}

export default MatchService;
