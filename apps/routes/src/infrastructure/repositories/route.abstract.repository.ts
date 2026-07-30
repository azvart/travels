import {
  ICreateRoute,
  IDeleteUserRoute,
  IDeleteUserRouteOuput,
  IFindManyRoutes,
  IFindOneRoute,
  IUpdateRoute,
  Route,
} from 'libs/interfaces';

export abstract class RouteAbstractRepository {
  abstract create(data: ICreateRoute): Promise<Route>;
  abstract updateByIdAndFetch(routeId: string, data: Omit<IUpdateRoute, 'id'>): Promise<Route>;
  abstract findOneRoute(data:IFindOneRoute):Promise<Route>;
  abstract findManyRoutes(data:IFindManyRoutes & { userId: string }):Promise<Route[]>;
  abstract deleteUserRoute(data:IDeleteUserRoute):Promise<IDeleteUserRouteOuput>;
}
