import {restServices} from "../../cuba/services";
import {observable, runInAction} from "mobx";

type Status = "LOADING" | "DONE" | "ERROR"

export type SecurityState = {
  inaccessibleAttributes: string[];
  filteredAttributes: string[];
  readonlyAttributes: string[];
  requiredAttributes: string[];
  hiddenAttributes: string[];
}

class EntitySecurityState {
  @observable
  status: Status;

  entityName: string;
  entityId: string;

  @observable
  securityState: SecurityState;

  constructor(entityName: string, entityId: string) {
    this.entityName = entityName;
    this.entityId = entityId;
  }

  loadSecurityState = () => {
    this.status = "LOADING";
    restServices.portalAccessEntityAttributesService.entityAttributesSecurityState({
      entityName: this.entityName,
      entityId: this.entityId
    }).then(r => {
      runInAction(() => {
        this.status = "DONE";
        this.securityState = r;
      });

      this.afterLoad();
    }).catch(reason => {
      this.status = "ERROR";
    });
  };

  afterLoad = (): void => {

  }
}

export default EntitySecurityState;