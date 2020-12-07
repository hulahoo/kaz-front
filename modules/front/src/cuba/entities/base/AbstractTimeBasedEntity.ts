import { AbstractParentEntity } from "./AbstractParentEntity";
export class AbstractTimeBasedEntity extends AbstractParentEntity {
  startDate?: any | null;
  endDate?: any | null;
  writeHistory?: boolean | null;
}
