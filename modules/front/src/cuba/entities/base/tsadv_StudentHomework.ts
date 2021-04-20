import { AbstractParentEntity } from "./AbstractParentEntity";
import { Homework } from "./tsadv_Homework";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { FileDescriptor } from "./sys$FileDescriptor";
export class StudentHomework extends AbstractParentEntity {
  static NAME = "tsadv_StudentHomework";
  homework?: Homework | null;
  personGroup?: PersonGroupExt | null;
  answer?: string | null;
  answerFile?: FileDescriptor | null;
  isDone?: boolean | null;
  trainerComment?: string | null;
  trainer?: PersonGroupExt | null;
}
export type StudentHomeworkViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "studentHomework.edit";
export type StudentHomeworkView<
  V extends StudentHomeworkViewName
> = V extends "_base"
  ? Pick<
      StudentHomework,
      | "id"
      | "answer"
      | "isDone"
      | "trainerComment"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      StudentHomework,
      | "id"
      | "answer"
      | "isDone"
      | "trainerComment"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "studentHomework.edit"
  ? Pick<
      StudentHomework,
      | "id"
      | "answer"
      | "isDone"
      | "trainerComment"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "homework"
      | "personGroup"
      | "answerFile"
      | "trainer"
    >
  : never;
