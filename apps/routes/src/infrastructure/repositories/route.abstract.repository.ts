import { ICreateRoute, IUpdateRoute, Route } from 'libs/interfaces';
export abstract class RouteAbstractRepository {
  abstract create(data: ICreateRoute): Promise<Route>;
  abstract updateByIdAndFetch(routeId: string, data: Omit<IUpdateRoute, 'id'>): Promise<Route>;
}
