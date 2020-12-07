import { AbstractParentEntity } from "./AbstractParentEntity";
export class AbstractDocument extends AbstractParentEntity {
  number?: string | null;
  issuer?: string | null;
  issueDate?: any | null;
  validEndDate?: any | null;
}
