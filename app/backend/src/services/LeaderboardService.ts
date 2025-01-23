import TeamService from './TeamService';
import MatchService from './MatchService';

export default class {
  public serviceAllTeams: TeamService;
  public serviceAllMatchesFinished: MatchService;

  constructor() {
    this.serviceAllTeams = new TeamService();
    this.serviceAllMatchesFinished = new MatchService();
  }

  public results = async () => {
    const matchesFinish = await this.serviceAllMatchesFinished.getInProgressMatches(false);
    const allTeams = await this.serviceAllTeams.getAll();

    return { matchesFinish, allTeams };
  };
}
