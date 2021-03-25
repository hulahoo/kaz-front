import {
  DataCollectionStore,
  DataContainerStatus,
  DataInstanceStore,
  getCubaREST,
  getMainStore,
  MainStore
} from "@cuba-platform/react";
import {PredefinedView} from "@cuba-platform/rest";
import {observable, runInAction, toJS} from "mobx";

type ServiceFunction<T> = () => Promise<T>

export class ServiceDataInstanceStore<T> extends DataInstanceStore<T> {

  constructor(mainStore: MainStore, service: ServiceFunction<T>) {
    super(mainStore, "");
    this.load = () => {
      this.changedItems.clear();
      this.status = "LOADING";
      this.loading(service());
    };
  }

  loading = (promise: any) => {
    promise
      .then((resp: any) => {
        runInAction(() => {
          this.item = resp;
          // this.count = resp.count;
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

  afterLoad = () => {

  }
}

export function serviceInstance<T>(service: ServiceFunction<T>): ServiceDataInstanceStore<T> {
  return new ServiceDataInstanceStore<T>(getMainStore(), service);
}