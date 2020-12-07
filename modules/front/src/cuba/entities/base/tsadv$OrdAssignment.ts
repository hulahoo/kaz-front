import { AbstractParentEntity } from "./AbstractParentEntity";
import { AssignmentGroupExt } from "./base$AssignmentGroupExt";
import { Order } from "./tsadv$Order";
import { Absence } from "./tsadv$Absence";
import { Salary } from "./tsadv$Salary";
import { BusinessTrip } from "./tsadv$BusinessTrip";
import { Dismissal } from "./tsadv$Dismissal";
import { AssignmentExt } from "./base$AssignmentExt";
import { PersonExt } from "./base$PersonExt";
import { PositionExt } from "./base$PositionExt";
export class OrdAssignment extends AbstractParentEntity {
  static NAME = "tsadv$OrdAssignment";
  assignmentGroup?: AssignmentGroupExt | null;
  order?: Order | null;
  absences?: Absence[] | null;
  salary?: Salary[] | null;
  businessTrip?: BusinessTrip[] | null;
  dismissal?: Dismissal[] | null;
  assignmentByOrderDate?: AssignmentExt | null;
  assignmentPersonByOrderDate?: PersonExt | null;
  assignmentPositionByOrderDate?: PositionExt | null;
}
export type OrdAssignmentViewName = "_minimal" | "_local" | "_base";
export type OrdAssignmentView<
  V extends OrdAssignmentViewName
> = V extends "_minimal"
  ? Pick<OrdAssignment, "id" | "assignmentGroup">
  : V extends "_local"
  ? Pick<
      OrdAssignment,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      OrdAssignment,
      | "id"
      | "assignmentGroup"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
