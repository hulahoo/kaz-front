import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { PositionGroupExt } from "./base$PositionGroupExt";
export class MyTeam extends BaseUuidEntity {
  static NAME = "tsadv$MyTeam";
  personGroup?: PersonGroupExt | null;
  positionGroup?: PositionGroupExt | null;
  parentPersonGroup?: PersonGroupExt | null;
  parent?: MyTeam | null;
  personPath?: string | null;
  managerFlag?: boolean | null;
  fioWithEmployeeNumber?: string | null;
}
export type MyTeamViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "myTeam.view"
  | "myTeam-parent.view";
export type MyTeamView<V extends MyTeamViewName> = V extends "_local"
  ? Pick<MyTeam, "id" | "personPath" | "managerFlag" | "fioWithEmployeeNumber">
  : V extends "_base"
  ? Pick<MyTeam, "id" | "personPath" | "managerFlag" | "fioWithEmployeeNumber">
  : V extends "myTeam.view"
  ? Pick<
      MyTeam,
      | "id"
      | "personPath"
      | "managerFlag"
      | "fioWithEmployeeNumber"
      | "personGroup"
      | "positionGroup"
      | "parent"
      | "fioWithEmployeeNumber"
    >
  : V extends "myTeam-parent.view"
  ? Pick<
      MyTeam,
      | "id"
      | "personPath"
      | "managerFlag"
      | "fioWithEmployeeNumber"
      | "personGroup"
      | "positionGroup"
      | "parent"
    >
  : never;
