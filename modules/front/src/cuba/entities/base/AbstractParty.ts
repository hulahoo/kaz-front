import { AbstractParentEntity } from "./AbstractParentEntity";
import { UserExt } from "./base$UserExt";
export class AbstractParty extends AbstractParentEntity {
  responsible?: UserExt | null;
}
