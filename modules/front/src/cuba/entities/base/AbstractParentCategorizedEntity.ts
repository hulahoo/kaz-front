import { CategorizedEntity } from "./sys$CategorizedEntity";
export class AbstractParentCategorizedEntity extends CategorizedEntity {
  updateTs?: any | null;
  updatedBy?: string | null;
  createTs?: any | null;
  createdBy?: string | null;
  version?: number | null;
  deleteTs?: any | null;
  deletedBy?: string | null;
}
