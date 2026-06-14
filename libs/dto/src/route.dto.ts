import { RouteOrmEntity } from '../../entities/src/enity';

export class RouteDto {
  public static fromEntity(orm?: RouteOrmEntity) {
    return orm ? new RouteDto(orm.id, orm.routeName) : null;
  }

  public constructor(_id: string, _routeName: string) {}

  get id() {
    return this._id;
  }

  get routeName() {
    return this._routeName;
  }
}
