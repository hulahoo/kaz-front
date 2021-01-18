import { StandardEntity } from "./sys$StandardEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicInternshipType } from "./tsadv$DicInternshipType";
import { PartyExt } from "./base$PartyExt";
import { DicInternshipRating } from "./tsadv$DicInternshipRating";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { InternshipExpenses } from "./tsadv$InternshipExpenses";
export class Internship extends StandardEntity {
  static NAME = "tsadv$Internship";
  personGroup?: PersonGroupExt | null;
  comment?: string | null;
  internshipType?: DicInternshipType | null;
  school?: PartyExt | null;
  specialization?: string | null;
  reason?: string | null;
  agreementNumber?: string | null;
  agreementDate?: any | null;
  startDate?: any | null;
  endDate?: any | null;
  payable?: boolean | null;
  mainMentor?: PersonGroupExt | null;
  mainMentorReason?: string | null;
  internshipRating?: DicInternshipRating | null;
  internshipReason?: string | null;
  organizationGroup?: OrganizationGroupExt | null;
  internshipExpenses?: InternshipExpenses[] | null;
  orderDate?: any | null;
  mentorOrderDate?: any | null;
}
export type InternshipViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "internship.edit"
  | "internship.for.loadList";
export type InternshipView<V extends InternshipViewName> = V extends "_base"
  ? Pick<
      Internship,
      | "id"
      | "comment"
      | "specialization"
      | "reason"
      | "agreementNumber"
      | "agreementDate"
      | "startDate"
      | "endDate"
      | "payable"
      | "mainMentorReason"
      | "internshipReason"
      | "orderDate"
      | "mentorOrderDate"
    >
  : V extends "_local"
  ? Pick<
      Internship,
      | "id"
      | "comment"
      | "specialization"
      | "reason"
      | "agreementNumber"
      | "agreementDate"
      | "startDate"
      | "endDate"
      | "payable"
      | "mainMentorReason"
      | "internshipReason"
      | "orderDate"
      | "mentorOrderDate"
    >
  : V extends "internship.edit"
  ? Pick<
      Internship,
      | "id"
      | "comment"
      | "specialization"
      | "reason"
      | "agreementNumber"
      | "agreementDate"
      | "startDate"
      | "endDate"
      | "payable"
      | "mainMentorReason"
      | "internshipReason"
      | "orderDate"
      | "mentorOrderDate"
      | "internshipType"
      | "school"
      | "mainMentor"
      | "internshipRating"
      | "organizationGroup"
      | "internshipExpenses"
      | "personGroup"
    >
  : V extends "internship.for.loadList"
  ? Pick<
      Internship,
      "id" | "personGroup" | "mainMentor" | "organizationGroup" | "startDate"
    >
  : never;
