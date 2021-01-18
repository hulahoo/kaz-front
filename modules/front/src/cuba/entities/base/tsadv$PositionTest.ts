import { AbstractParentEntity } from "./AbstractParentEntity";
import { PositionGroupExt } from "./base$PositionGroupExt";
import { Test } from "./tsadv$Test";
export class PositionTest extends AbstractParentEntity {
  static NAME = "tsadv$PositionTest";
  positionGroup?: PositionGroupExt | null;
  test?: Test | null;
  purpose?: any | null;
  startDate?: any | null;
  endDate?: any | null;
}
export type PositionTestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "positionTest.edit";
export type PositionTestView<V extends PositionTestViewName> = V extends "_base"
  ? Pick<
      PositionTest,
      | "id"
      | "purpose"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PositionTest,
      | "id"
      | "purpose"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "positionTest.edit"
  ? Pick<
      PositionTest,
      | "id"
      | "purpose"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "positionGroup"
    >
  : never;
