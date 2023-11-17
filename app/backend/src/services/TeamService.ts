import Team from "../database/models/TeamModel";
import ITeam from "../Interfaces/Team";

class TeamService {
    public getAll = async (): Promise<ITeam[]> => Team.findAll();
    public getById = async (id: number | string): Promise<ITeam | null> => Team.findByPk(id);
}

export default TeamService;