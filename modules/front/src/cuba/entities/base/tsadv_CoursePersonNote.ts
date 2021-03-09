import { StandardEntity } from "./sys$StandardEntity";
import { Course } from "./tsadv$Course";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class CoursePersonNote extends StandardEntity {
  static NAME = "tsadv_CoursePersonNote";
  course?: Course | null;
  personGroup?: PersonGroupExt | null;
  note?: string | null;
}
export type CoursePersonNoteViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "coursePersonNote-view";
export type CoursePersonNoteView<
  V extends CoursePersonNoteViewName
> = V extends "_base"
  ? Pick<CoursePersonNote, "id" | "course" | "personGroup" | "note">
  : V extends "_local"
  ? Pick<CoursePersonNote, "id" | "note">
  : V extends "_minimal"
  ? Pick<CoursePersonNote, "id" | "course" | "personGroup">
  : V extends "coursePersonNote-view"
  ? Pick<CoursePersonNote, "id" | "note" | "course" | "personGroup">
  : never;
