import { IRatings } from '../interfaces/IRating';
import { ITeamsHome } from '../interfaces/ITeamsHome';

const calculateTotalPoints = (teams: any) => {
  let wins = 0;
  let loss = 0;
  let draw = 0;
  let totalPoints = 0;

  teams.matchesHome.forEach((matches: any) => {
    if (matches.homeTeamGoals > matches.awayTeamGoals) {
      wins += 1;
      totalPoints += 3;
    } else if (matches.homeTeamGoals < matches.awayTeamGoals) {
      loss += 1;
      totalPoints += 0;
    } else if (matches.homeTeamGoals === matches.awayTeamGoals) {
      draw += 1;
      totalPoints += 1;
    }
  });

  return { wins, loss, draw, totalPoints };
};

const calculateGoals = (teams: ITeamsHome) => {
  let goalsFavor = 0;
  let goalsOwn = 0;

  teams.matchesHome.forEach((matches) => {
    goalsFavor += matches.homeTeamGoals;
    goalsOwn += matches.awayTeamGoals;
  });

  const goalsBalance = goalsFavor - goalsOwn;

  return { goalsBalance, goalsFavor, goalsOwn };
};

const totalRating = (teams: any) => {
  const points = calculateTotalPoints(teams);
  const goals = calculateGoals(teams);
  const totalGames = teams.matchesHome.length;
  const efficiency = (points.totalPoints / (totalGames * 3)) * 100;

  return {
    name: teams.teamName,
    totalPoints: points.totalPoints,
    totalGames,
    totalVictories: points.wins,
    totalDraws: points.draw,
    totalLosses: points.loss,
    goalsFavor: goals.goalsFavor,
    goalsOwn: goals.goalsOwn,
    goalsBalance: goals.goalsBalance,
    efficiency: Number(efficiency.toFixed(2)),
  };
};

const sortRating = (ratings: IRatings[]) => {
  const result = ratings.sort((ratingsA: IRatings, ratingsB: IRatings) => {
    if (ratingsA.totalPoints < ratingsB.totalPoints) { return 1; }
    if (ratingsA.totalPoints > ratingsB.totalPoints) { return -1; }
    if (ratingsA.totalVictories < ratingsB.totalVictories) { return 1; }
    if (ratingsA.totalVictories > ratingsB.totalVictories) { return -1; }
    if (ratingsA.goalsBalance < ratingsB.goalsBalance) { return 1; }
    if (ratingsA.goalsBalance > ratingsB.goalsBalance) { return -1; }
    if (ratingsA.goalsFavor < ratingsB.goalsFavor) { return 1; }
    if (ratingsA.goalsFavor > ratingsB.goalsFavor) { return -1; }
    if (ratingsA.goalsOwn < ratingsB.goalsOwn) { return 1; }
    if (ratingsA.goalsOwn > ratingsB.goalsOwn) { return -1; }
    return 0;
  });
  return result;
};

export {
  totalRating,
  sortRating,
};
