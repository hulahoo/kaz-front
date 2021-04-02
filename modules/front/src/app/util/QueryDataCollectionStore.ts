import {DataCollectionStore, getCubaREST} from "@cuba-platform/react";
import {runInAction} from "mobx";

export class QueryDataCollectionStore<T> extends DataCollectionStore<T> {
  constructor(entityName: string, queryName: string, params: any) {
    super(entityName, params);
    this.load = () => {
      this.changedItems.clear();
      this.status = "LOADING";
      this.loading(getCubaREST()!.queryWithCount<T>(this.entityName, queryName, params));
    };
  }

  loading = (promise: any) => {
    promise
      .then((resp: any) => {
        runInAction(() => {
          this.items = resp.result;
          this.count = resp.count;
          this.status = 'DONE';

          this.afterLoad();
        });
      })
      .catch(() => {
        runInAction(() => {
          this.status = 'ERROR';
        });
      });
  };

  afterLoad = (): void => {

  }
}

export function queryCollection<T>(entityName: string, queryName: string, params: any): QueryDataCollectionStore<T> {
  console.log(params);
  const queryDataCollectionStore = new QueryDataCollectionStore<T>(entityName, queryName, params);
  if (typeof params.loadImmediately === 'undefined' || params.loadImmediately) {
    queryDataCollectionStore.load();
  }
  return queryDataCollectionStore;
}