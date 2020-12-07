import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { RecognitionTypePojo } from "./tsadv$RecognitionTypePojo";
import { PreferencePojo } from "./tsadv$PreferencePojo";
export class ProfilePojo extends BaseUuidEntity {
  static NAME = "tsadv$ProfilePojo";
  pgId?: string | null;
  pId?: string | null;
  showImageTooltip?: boolean | null;
  image?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  fullName?: string | null;
  organization?: string | null;
  position?: string | null;
  recognitionTypes?: RecognitionTypePojo | null;
  preferences?: PreferencePojo | null;
  points?: string | null;
  coins?: string | null;
  heartAward?: string | null;
  medalCount?: any | null;
  inTeam?: number | null;
  employeeNumber?: string | null;
}
export type ProfilePojoViewName = "_minimal" | "_local" | "_base";
export type ProfilePojoView<V extends ProfilePojoViewName> = never;
