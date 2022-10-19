import { IMatches } from './IMatches';

export interface ITeamsHome {
  id: number,
  teamName: string,
  matchesHome: IMatches[]
}
