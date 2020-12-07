import { StandardEntity } from "./sys$StandardEntity";
export class AbstractParentEntity extends StandardEntity {
  legacyId?: string | null;
  organizationBin?: string | null;
  integrationUserLogin?: string | null;
}
