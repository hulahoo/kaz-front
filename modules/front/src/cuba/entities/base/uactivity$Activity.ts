import { AbstractParentEntity } from "./AbstractParentEntity";
import { ActivityType } from "./uactivity$ActivityType";
import { NotificationTemplate } from "./base$NotificationTemplate";
import { SendingNotification } from "./base$SendingNotification";
import { Priority } from "./uactivity$Priority";
import { User } from "./sec$User";
export class Activity extends AbstractParentEntity {
  static NAME = "uactivity$Activity";
  nameRu?: string | null;
  nameKz?: string | null;
  nameEn?: string | null;
  name?: string | null;
  type?: ActivityType | null;
  referenceId?: any | null;
  notificationTemplate?: NotificationTemplate | null;
  notificationTemplateCode?: string | null;
  sendingNotification?: SendingNotification | null;
  description?: string | null;
  priority?: Priority | null;
  allDay?: boolean | null;
  startDateTime?: any | null;
  endDateTime?: any | null;
  status?: any | null;
  assignedUser?: User | null;
  assignedBy?: User | null;
  reference?: string | null;
  eventColor?: string | null;
  notificationHeaderRu?: string | null;
  notificationHeaderKz?: string | null;
  notificationHeaderEn?: string | null;
  notificationHeader?: string | null;
  notificationBodyRu?: string | null;
  notificationBodyKz?: string | null;
  notificationBodyEn?: string | null;
  notificationBody?: string | null;
}
export type ActivityViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "activity-source-open"
  | "activity-two-tabs-browse"
  | "activity-view"
  | "activity.view"
  | "activity.view.tsadv"
  | "portal-activity"
  | "portal.notification";
export type ActivityView<V extends ActivityViewName> = V extends "_base"
  ? Pick<
      Activity,
      | "id"
      | "nameRu"
      | "nameKz"
      | "nameEn"
      | "referenceId"
      | "notificationTemplateCode"
      | "description"
      | "allDay"
      | "startDateTime"
      | "endDateTime"
      | "status"
      | "reference"
      | "eventColor"
      | "notificationHeaderRu"
      | "notificationHeaderKz"
      | "notificationHeaderEn"
      | "notificationBodyRu"
      | "notificationBodyKz"
      | "notificationBodyEn"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Activity,
      | "id"
      | "nameRu"
      | "nameKz"
      | "nameEn"
      | "referenceId"
      | "notificationTemplateCode"
      | "description"
      | "allDay"
      | "startDateTime"
      | "endDateTime"
      | "status"
      | "reference"
      | "eventColor"
      | "notificationHeaderRu"
      | "notificationHeaderKz"
      | "notificationHeaderEn"
      | "notificationBodyRu"
      | "notificationBodyKz"
      | "notificationBodyEn"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<Activity, "id" | "nameRu">
  : V extends "activity-source-open"
  ? Pick<
      Activity,
      | "id"
      | "nameRu"
      | "nameKz"
      | "nameEn"
      | "referenceId"
      | "notificationTemplateCode"
      | "description"
      | "allDay"
      | "startDateTime"
      | "endDateTime"
      | "status"
      | "reference"
      | "eventColor"
      | "notificationHeaderRu"
      | "notificationHeaderKz"
      | "notificationHeaderEn"
      | "notificationBodyRu"
      | "notificationBodyKz"
      | "notificationBodyEn"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "type"
    >
  : V extends "activity-two-tabs-browse"
  ? Pick<
      Activity,
      | "id"
      | "nameRu"
      | "nameKz"
      | "nameEn"
      | "referenceId"
      | "notificationTemplateCode"
      | "description"
      | "allDay"
      | "startDateTime"
      | "endDateTime"
      | "status"
      | "reference"
      | "eventColor"
      | "notificationHeaderRu"
      | "notificationHeaderKz"
      | "notificationHeaderEn"
      | "notificationBodyRu"
      | "notificationBodyKz"
      | "notificationBodyEn"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "name"
      | "type"
      | "priority"
      | "assignedUser"
      | "assignedBy"
      | "notificationHeader"
      | "notificationBody"
    >
  : V extends "activity-view"
  ? Pick<
      Activity,
      | "id"
      | "nameRu"
      | "nameKz"
      | "nameEn"
      | "referenceId"
      | "notificationTemplateCode"
      | "description"
      | "allDay"
      | "startDateTime"
      | "endDateTime"
      | "status"
      | "reference"
      | "eventColor"
      | "notificationHeaderRu"
      | "notificationHeaderKz"
      | "notificationHeaderEn"
      | "notificationBodyRu"
      | "notificationBodyKz"
      | "notificationBodyEn"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "type"
      | "priority"
      | "assignedUser"
      | "assignedBy"
      | "createTs"
    >
  : V extends "activity.view"
  ? Pick<
      Activity,
      | "id"
      | "nameRu"
      | "nameKz"
      | "nameEn"
      | "referenceId"
      | "notificationTemplateCode"
      | "description"
      | "allDay"
      | "startDateTime"
      | "endDateTime"
      | "status"
      | "reference"
      | "eventColor"
      | "notificationHeaderRu"
      | "notificationHeaderKz"
      | "notificationHeaderEn"
      | "notificationBodyRu"
      | "notificationBodyKz"
      | "notificationBodyEn"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "type"
      | "priority"
      | "assignedUser"
      | "assignedBy"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
    >
  : V extends "activity.view.tsadv"
  ? Pick<
      Activity,
      | "id"
      | "nameRu"
      | "nameKz"
      | "nameEn"
      | "referenceId"
      | "notificationTemplateCode"
      | "description"
      | "allDay"
      | "startDateTime"
      | "endDateTime"
      | "status"
      | "reference"
      | "eventColor"
      | "notificationHeaderRu"
      | "notificationHeaderKz"
      | "notificationHeaderEn"
      | "notificationBodyRu"
      | "notificationBodyKz"
      | "notificationBodyEn"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "type"
      | "sendingNotification"
      | "priority"
      | "assignedUser"
      | "assignedBy"
      | "createTs"
    >
  : V extends "portal-activity"
  ? Pick<
      Activity,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "nameRu"
      | "nameKz"
      | "nameEn"
      | "referenceId"
      | "notificationTemplateCode"
      | "description"
      | "allDay"
      | "startDateTime"
      | "endDateTime"
      | "status"
      | "reference"
      | "eventColor"
      | "notificationHeaderRu"
      | "notificationHeaderKz"
      | "notificationHeaderEn"
      | "notificationBodyRu"
      | "notificationBodyKz"
      | "notificationBodyEn"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "type"
    >
  : V extends "portal.notification"
  ? Pick<
      Activity,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "nameRu"
      | "nameKz"
      | "nameEn"
      | "referenceId"
      | "notificationTemplateCode"
      | "description"
      | "allDay"
      | "startDateTime"
      | "endDateTime"
      | "status"
      | "reference"
      | "eventColor"
      | "notificationHeaderRu"
      | "notificationHeaderKz"
      | "notificationHeaderEn"
      | "notificationBodyRu"
      | "notificationBodyKz"
      | "notificationBodyEn"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "name"
    >
  : never;
