import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { AssignmentGroupExt } from "./base$AssignmentGroupExt";
import { OrdAssignment } from "./tsadv$OrdAssignment";
import { OrderGroup } from "./tsadv$OrderGroup";
import { DicLCArticle } from "./tsadv$DicLCArticle";
import { DicDismissalReason } from "./tsadv$DicDismissalReason";
import { DicDismissalStatus } from "./tsadv$DicDismissalStatus";
import { Order } from "./tsadv$Order";
export class Dismissal extends AbstractParentEntity {
  static NAME = "tsadv$Dismissal";
  personGroup?: PersonGroupExt | null;
  assignmentGroup?: AssignmentGroupExt | null;
  ordAssignment?: OrdAssignment | null;
  orderGroup?: OrderGroup | null;
  dismissalDate?: any | null;
  requestDate?: any | null;
  lcArticle?: DicLCArticle | null;
  dismissalReason?: DicDismissalReason | null;
  status?: DicDismissalStatus | null;
  order?: Order | null;
  orderNumber?: string | null;
  orderDate?: any | null;
  finalCalculationDate?: any | null;
}
export type DismissalViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "dismissal.view"
  | "dismissal.card"
  | "dismissal.forNotification";
export type DismissalView<V extends DismissalViewName> = V extends "_minimal"
  ? Pick<Dismissal, "id">
  : V extends "_local"
  ? Pick<
      Dismissal,
      | "id"
      | "dismissalDate"
      | "requestDate"
      | "orderNumber"
      | "orderDate"
      | "finalCalculationDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      Dismissal,
      | "id"
      | "dismissalDate"
      | "requestDate"
      | "orderNumber"
      | "orderDate"
      | "finalCalculationDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "dismissal.view"
  ? Pick<
      Dismissal,
      | "id"
      | "dismissalDate"
      | "requestDate"
      | "orderNumber"
      | "orderDate"
      | "finalCalculationDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "personGroup"
      | "ordAssignment"
      | "orderGroup"
      | "lcArticle"
      | "dismissalReason"
      | "status"
      | "order"
    >
  : V extends "dismissal.card"
  ? Pick<
      Dismissal,
      | "id"
      | "personGroup"
      | "ordAssignment"
      | "orderGroup"
      | "dismissalDate"
      | "requestDate"
      | "lcArticle"
      | "dismissalReason"
      | "status"
    >
  : V extends "dismissal.forNotification"
  ? Pick<
      Dismissal,
      | "id"
      | "dismissalDate"
      | "requestDate"
      | "orderNumber"
      | "orderDate"
      | "finalCalculationDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "personGroup"
      | "ordAssignment"
      | "orderGroup"
      | "lcArticle"
      | "dismissalReason"
      | "status"
      | "order"
      | "assignmentGroup"
    >
  : never;
