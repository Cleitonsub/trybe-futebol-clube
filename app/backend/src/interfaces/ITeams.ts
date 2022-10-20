import { IMatches } from './IMatches';

export interface ITeams {
  id: number,
  teamName: string,
  matchesHome?: IMatches[],
  matchesAway?: IMatches[],
}
