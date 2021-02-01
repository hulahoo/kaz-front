import {DataInstanceStore, getCubaREST, getMainStore, MainStore} from "@cuba-platform/react";
import {PredefinedView} from "@cuba-platform/rest";
import {observable, runInAction, toJS} from "mobx";

export class QueryDataInstanceStore<T> extends DataInstanceStore<T> {
  constructor(mainStore: MainStore, entityName: string, queryName: string, params: any, viewName = PredefinedView.MINIMAL) {
    super(mainStore, entityName, viewName);
    this.load = (id) => {
      this.item = undefined;
      if (!id) {
        return;
      }
      this.status = "LOADING";
      getCubaREST()!.query<T>(this.entityName, queryName,  params)
        .then((loadedEntity) => {
          runInAction(() => {
            this.item = loadedEntity[0];
            this.status = "DONE";
          });
        })
        .catch(() => {
          runInAction(() => {
            this.status = "ERROR";
          });
        });
    };
  }
}

export function queryInstance<T>(entityName: string, queryName: string, params: any) {
  return new QueryDataInstanceStore<T>(getMainStore(), entityName, queryName, params);
}