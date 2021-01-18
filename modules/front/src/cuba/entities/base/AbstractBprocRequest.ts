import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicRequestStatus } from "./tsadv$DicRequestStatus";
export class AbstractBprocRequest extends AbstractParentEntity {
  requestNumber?: any | null;
  status?: DicRequestStatus | null;
  requestDate?: any | null;
}
