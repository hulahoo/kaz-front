import {DataInstanceStore, getCubaREST, getMainStore, MainStore} from "@cuba-platform/react";
import {PredefinedView} from "@cuba-platform/rest";
import {observable, runInAction, toJS} from "mobx";

export class QueryDataInstanceStore<T> extends DataInstanceStore<T> {
  queryName: string;
  params: any;


  constructor(mainStore: MainStore, entityName: string, queryName: string, params: any, viewName = PredefinedView.MINIMAL) {
    super(mainStore, entityName, viewName);
    this.queryName = queryName;
    this.params = params;
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

  afterLoad = (): void => {

  }
}

export function queryInstance<T>(entityName: string, queryName: string, params: any): QueryDataInstanceStore<T> {
  return new QueryDataInstanceStore<T>(getMainStore(), entityName, queryName, params);
}