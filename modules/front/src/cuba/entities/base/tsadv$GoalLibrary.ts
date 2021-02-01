import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicGoalCategory } from "./tsadv$DicGoalCategory";
import {Goal} from "./tsadv$Goal";
export class GoalLibrary extends AbstractParentEntity {
  static NAME = "tsadv$GoalLibrary";
  libraryName?: string | null;
  category?: DicGoalCategory | null;
  startDate?: any | null;
  endDate?: any | null;
  goals?: Goal[] | null;
}
export type GoalLibraryViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "goalLibrary.browse"
  | "goalLibrary.edit";
export type GoalLibraryView<V extends GoalLibraryViewName> = V extends "_base"
  ? Pick<
      GoalLibrary,
      | "id"
      | "libraryName"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      GoalLibrary,
      | "id"
      | "libraryName"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<GoalLibrary, "id" | "libraryName">
  : V extends "goalLibrary.browse"
  ? Pick<
      GoalLibrary,
      "id" | "category" | "libraryName" | "startDate" | "endDate"
    >
  : V extends "goalLibrary.edit"
  ? Pick<
      GoalLibrary,
      "id" | "category" | "libraryName" | "startDate" | "endDate"
    >
  : never;
