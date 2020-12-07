import { AbstractParentCategorizedEntity } from "./AbstractParentCategorizedEntity";
export class EmptyPCE extends AbstractParentCategorizedEntity {
  static NAME = "base$EmptyPCE";
}
export type EmptyPCEViewName = "_minimal" | "_local" | "_base";
export type EmptyPCEView<V extends EmptyPCEViewName> = never;
