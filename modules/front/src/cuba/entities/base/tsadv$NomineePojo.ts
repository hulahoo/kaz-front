import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class NomineePojo extends BaseUuidEntity {
  static NAME = "tsadv$NomineePojo";
  pId?: string | null;
  pgId?: string | null;
  image?: string | null;
  fullName?: string | null;
  position?: string | null;
  organization?: string | null;
  program?: string | null;
  year?: number | null;
  description?: string | null;
  personAwardId?: string | null;
  employeeNumber?: string | null;
}
export type NomineePojoViewName = "_minimal" | "_local" | "_base";
export type NomineePojoView<
  V extends NomineePojoViewName
> = V extends "_minimal"
  ? Pick<NomineePojo, "id" | "description">
  : V extends "_base"
  ? Pick<NomineePojo, "id" | "description">
  : never;
