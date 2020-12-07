import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class AbstractEntityInt extends BaseUuidEntity {
  static NAME = "tsadv$AbstractEntityInt";
}
export type AbstractEntityIntViewName = "_minimal" | "_local" | "_base";
export type AbstractEntityIntView<
  V extends AbstractEntityIntViewName
> = V extends "_minimal"
  ? Pick<AbstractEntityInt, "id">
  : V extends "_base"
  ? Pick<AbstractEntityInt, "id">
  : never;
