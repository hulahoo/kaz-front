import {DataCollectionStore, DataInstanceStore, getCubaREST, getMainStore, MainStore} from "@cuba-platform/react";
import {PredefinedView} from "@cuba-platform/rest";
import {observable, runInAction, toJS} from "mobx";

type ServiceFunction<T> = () => Promise<T>

export class ServiceDataCollectionStore<T> extends DataCollectionStore<T> {
  constructor(service: ServiceFunction<T>, entityName?: string) {
    super(entityName || "");
    this.load = () => {
      this.changedItems.clear();
      this.status = "LOADING";
      this.loading(service.call(null));
    };
  }

  loading = (promise: any) => {
    promise
      .then((resp: any) => {
        runInAction(() => {
          this.items = resp.result;
          this.count = resp.count;
          this.status = 'DONE';
        });
      })
      .catch(() => {
        runInAction(() => {
          this.status = 'ERROR';
        });
      });
  }
}

export function serviceCollection<T>(service: ServiceFunction<T>, entityName?: string): DataCollectionStore<T> {
  return new ServiceDataCollectionStore<T>(service, entityName);
}