import ILeaderboards from '../Interfaces/Leaderboards';
import IMatch from '../Interfaces/Match';
import ITeam from '../Interfaces/Team';

const totalPoints = (partidasTime: IMatch[]) => {
  const points = partidasTime.reduce((acc, game) => {
    if (game.homeTeamGoals > game.awayTeamGoals) return acc + 3;
    if (game.homeTeamGoals === game.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return points;
};

export const totalVitoriasHome = (partidasTime: IMatch[]) => {
  const vitorias = partidasTime.reduce((acc, game) => {
    if (game.homeTeamGoals > game.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return vitorias;
};

export const totalEmpates = (partidasTime: IMatch[]) => {
  const empates = partidasTime.reduce((acc, game) => {
    if (game.homeTeamGoals === game.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return empates;
};

export const totalDerrotasHome = (partidasTime: IMatch[]) => {
  const derrotas = partidasTime.reduce((acc, game) => {
    if (game.homeTeamGoals < game.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return derrotas;
};

export const golHome = (partidasTime: IMatch[]) => {
  const gols = partidasTime.reduce((acc, game) => acc + game.homeTeamGoals, 0);
  return gols;
};

export const golAway = (partidasTime: IMatch[]) => {
  const gols = partidasTime.reduce((acc, game) => acc + game.awayTeamGoals, 0);
  return gols;
};

const efficiency = (partidasTime: IMatch[]) => {
  const points = totalPoints(partidasTime);
  const partidas = partidasTime.length;
  const eficiencia = ((points / (partidas * 3)) * 100).toFixed(2);
  return { eficiencia, partidas, points };
};

export const classificacaoSort = (classificacao: ILeaderboards[]) => {
  const sort = classificacao.sort(
    (a, b) =>
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn,
  );
  return sort;
};

const resultadoTime = (time: ITeam, partidasTime: IMatch[]) => {
  const { eficiencia, partidas, points } = efficiency(partidasTime);
  const result: ILeaderboards = {
    name: time.teamName,
    totalPoints: points,
    totalGames: partidas,
    totalVictories: totalVitoriasHome(partidasTime),
    totalDraws: totalEmpates(partidasTime),
    totalLosses: totalDerrotasHome(partidasTime),
    goalsFavor: golHome(partidasTime),
    goalsOwn: golAway(partidasTime),
    goalsBalance: golHome(partidasTime) - golAway(partidasTime),
    efficiency: eficiencia,
  };
  return result;
};

const LeaderboardUtilsHome = async (
  matchesFinish: IMatch[],
  allTeams: ITeam[],
) => {
  const classificacao: ILeaderboards[] = await allTeams.map((time) => {
    const partidasTime: IMatch[] = matchesFinish.filter(
      (iten) => iten.homeTeamId === time.id,
    );
    return resultadoTime(time, partidasTime);
  });
  return classificacaoSort(classificacao);
};

export default LeaderboardUtilsHome;
