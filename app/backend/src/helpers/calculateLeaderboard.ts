import { ITeams } from '../interfaces/ITeams';
import { IRatings } from '../interfaces/IRating';

const forEachForMatchesHome = (teams: any, currentMatch: string) => {
  let wins = 0;
  let loss = 0;
  let draw = 0;
  let totalPoints = 0;

  teams[currentMatch].forEach((matches: any) => {
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

const forEachForMatchesAway = (teams: any, currentMatch: string) => {
  let wins = 0;
  let loss = 0;
  let draw = 0;
  let totalPoints = 0;

  teams[currentMatch].forEach((matches: any) => {
    if (matches.homeTeamGoals < matches.awayTeamGoals) {
      wins += 1;
      totalPoints += 3;
    } else if (matches.homeTeamGoals > matches.awayTeamGoals) {
      loss += 1;
      totalPoints += 0;
    } else if (matches.homeTeamGoals === matches.awayTeamGoals) {
      draw += 1;
      totalPoints += 1;
    }
  });
  return { wins, loss, draw, totalPoints };
};

const calculateTotalPoints = (teams: any, currentMatch: string) => {
  if (currentMatch === 'matchesHome') {
    const results = forEachForMatchesHome(teams, currentMatch);
    return results;
  }
  const results = forEachForMatchesAway(teams, currentMatch);
  return results;
};

const calculateGoals = (teams: ITeams) => {
  let goalsFavor = 0;
  let goalsOwn = 0;
  if (!teams.matchesHome) {
    teams.matchesAway?.forEach((matches) => {
      goalsFavor += matches.awayTeamGoals;
      goalsOwn += matches.homeTeamGoals;
    });

    const goalsBalance = goalsFavor - goalsOwn;

    return { goalsBalance, goalsFavor, goalsOwn };
  }

  teams.matchesHome.forEach((matches) => {
    goalsFavor += matches.homeTeamGoals;
    goalsOwn += matches.awayTeamGoals;
  });

  const goalsBalance = goalsFavor - goalsOwn;

  return { goalsBalance, goalsFavor, goalsOwn };
};

const totalRating = (teams: any, currentMatch: string) => {
  const points = calculateTotalPoints(teams, currentMatch);
  const goals = calculateGoals(teams);
  const totalGames = teams[currentMatch].length;
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
