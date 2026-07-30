export interface IUpdateRoute {
  id: string;
  routeName: string;
  userId: string;
  country?: string;
  distance?: number;
  durationLabel?: string;
  pointsCount?: number;
  difficulty?: string;
}
