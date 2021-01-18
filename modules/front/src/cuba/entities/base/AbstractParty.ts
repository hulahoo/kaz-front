import { AbstractParentEntity } from "./AbstractParentEntity";
import { BaseUserExt } from "./base$UserExt";
export class AbstractParty extends AbstractParentEntity {
  responsible?: BaseUserExt | null;
}
