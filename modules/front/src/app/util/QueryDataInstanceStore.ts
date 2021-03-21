import {DataInstanceStore, getCubaREST, getMainStore, MainStore} from "@cuba-platform/react";
import {PredefinedView} from "@cuba-platform/rest";
import {runInAction} from "mobx";

export class QueryDataInstanceStore<T> extends DataInstanceStore<T> {
  queryName: string;
  params: any;
  afterLoad: () => void;

  constructor(mainStore: MainStore, entityName: string, queryName: string, params: any, afterLoad?: () => void, viewName = PredefinedView.MINIMAL) {
    super(mainStore, entityName, viewName);
    this.queryName = queryName;
    this.params = params;
    if (afterLoad) {
      this.afterLoad = afterLoad;
    } else {
      this.afterLoad = () => {
      };
    }
  }

  load = () => {
    this.status = "LOADING";
    this.item = undefined;
    getCubaREST()!.query<T>(this.entityName, this.queryName, this.params)
      .then((loadedEntity) => {
        runInAction(() => {
          this.item = loadedEntity[0];
          this.status = "DONE";

          this.afterLoad();
        });
      })
      .catch(() => {
        runInAction(() => {
          this.status = "ERROR";
        });
      });
  };
}

export function queryInstance<T>(entityName: string, queryName: string, params: any, afterLoad?: () => void): QueryDataInstanceStore<T> {
  return new QueryDataInstanceStore<T>(getMainStore(), entityName, queryName, params, afterLoad);
}