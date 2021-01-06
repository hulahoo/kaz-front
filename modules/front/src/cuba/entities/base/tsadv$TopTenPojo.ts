import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class TopTenPojo extends BaseUuidEntity {
  static NAME = "tsadv$TopTenPojo";
  order?: number | null;
  pId?: string | null;
  pgId?: string | null;
  fullName?: string | null;
  organization?: string | null;
  position?: string | null;
  image?: string | null;
  medal?: string | null;
  count?: any | null;
  birthday?: string | null;
  heartAward?: string | null;
  employeeNumber?: string | null;
}
export type TopTenPojoViewName = "_base" | "_local" | "_minimal";
export type TopTenPojoView<V extends TopTenPojoViewName> = never;
