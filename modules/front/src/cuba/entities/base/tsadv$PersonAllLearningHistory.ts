import { StandardEntity } from "./sys$StandardEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { Course } from "./tsadv$Course";
export class PersonAllLearningHistory extends StandardEntity {
  static NAME = "tsadv$PersonAllLearningHistory";
  personGroup?: PersonGroupExt | null;
  course?: Course | null;
  courseName?: string | null;
  startDate?: any | null;
  endDate?: any | null;
  type?: any | null;
}
export type PersonAllLearningHistoryViewName = "_minimal" | "_local" | "_base";
export type PersonAllLearningHistoryView<
  V extends PersonAllLearningHistoryViewName
> = V extends "_minimal"
  ? Pick<PersonAllLearningHistory, "id" | "courseName" | "startDate">
  : V extends "_local"
  ? Pick<
      PersonAllLearningHistory,
      "id" | "courseName" | "startDate" | "endDate" | "type"
    >
  : V extends "_base"
  ? Pick<
      PersonAllLearningHistory,
      "id" | "courseName" | "startDate" | "endDate" | "type"
    >
  : never;
