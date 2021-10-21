import { StandardEntity } from "./sys$StandardEntity";
import { DicCompany } from "./base_DicCompany";
export class PortalMenuCustomization extends StandardEntity {
  static NAME = "tsadv_PortalMenuCustomization";
  menuItem?: string | null;
  parent?: PortalMenuCustomization | null;
  active?: boolean | null;
  menuType?: any | null;
  name1?: string | null;
  name2?: string | null;
  name3?: string | null;
  portalAvailability?: any | null;
  companies?: DicCompany[] | null;
  name?: string | null;
}
export type PortalMenuCustomizationViewName = "_base" | "_local" | "_minimal";
export type PortalMenuCustomizationView<
  V extends PortalMenuCustomizationViewName
> = V extends "_base"
  ? Pick<
      PortalMenuCustomization,
      | "id"
      | "menuItem"
      | "portalAvailability"
      | "active"
      | "menuType"
      | "name1"
      | "name2"
      | "name3"
      | "name"
    >
  : V extends "_local"
  ? Pick<
      PortalMenuCustomization,
      | "id"
      | "menuItem"
      | "active"
      | "menuType"
      | "name1"
      | "name2"
      | "name3"
      | "portalAvailability"
      | "name"
    >
  : V extends "_minimal"
  ? Pick<PortalMenuCustomization, "id" | "menuItem" | "portalAvailability">
  : never;
