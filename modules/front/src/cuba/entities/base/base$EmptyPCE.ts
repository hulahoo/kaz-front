import { AbstractParentCategorizedEntity } from "./AbstractParentCategorizedEntity";
export class EmptyPCE extends AbstractParentCategorizedEntity {
  static NAME = "base$EmptyPCE";
}
export type EmptyPCEViewName = "_base" | "_local" | "_minimal";
export type EmptyPCEView<V extends EmptyPCEViewName> = never;
