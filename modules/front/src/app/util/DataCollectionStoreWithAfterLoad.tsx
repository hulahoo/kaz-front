import {runInAction} from "mobx";
import {DataCollectionOptions} from "@cuba-platform/react/dist/data/Collection";
import {DataCollectionStore, getCubaREST} from "@cuba-platform/react";
import {EntitiesWithCount} from "@cuba-platform/rest/dist-node/model";

export class DataCollectionStoreWithAfterLoad<T> extends DataCollectionStore<T> {

  afterLoad: () => void;

  constructor(entityName: string, afterLoad: () => void, opts: DataCollectionOptions) {
    super(entityName, !!opts.trackChanges);
    this.afterLoad = afterLoad;

    if (opts.view) {
      this.view = opts.view;
    }
    if (opts.filter) {
      this.filter = opts.filter;
    }
    if (opts.sort) {
      this.sort = opts.sort;
    }
    if (opts.limit !== null && opts.limit !== undefined) {
      this.limit = opts.limit;
    }
    if (opts.offset !== null && opts.offset !== undefined) {
      this.offset = opts.offset;
    }

    this.load = () => {
      this.changedItems.clear();
      this.status = "LOADING";
      if (this.filter) {
        this.handleLoadingPromise(getCubaREST()!.searchEntitiesWithCount(this.entityName, this.filter, this.loadOptions()));
      } else {
        this.handleLoadingPromise(getCubaREST()!.loadEntitiesWithCount(this.entityName, this.loadOptions()));
      }
    };

  }

  loadOptions = () => {
    const loadOptions = {
      view: this.view,
    };
    if (this.sort) {
      loadOptions['sort'] = this.sort;
    }
    if (this.limit !== null && this.limit !== undefined) {
      loadOptions["limit"] = this.limit;
    }
    if (this.offset !== null && this.offset !== undefined) {
      loadOptions['offset'] = this.offset;
    }
    return loadOptions;
  }

  handleLoadingPromise = (promise: Promise<EntitiesWithCount<T>>) => {
    promise
      .then((resp) => {
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
  }
}

export function collectionWithAfterLoad<T>(entityName: string, afterLoad: () => void, opts?: DataCollectionOptions): DataCollectionStoreWithAfterLoad<T> {
  if (!opts) opts = {
    loadImmediately: true
  };
  const dataCollection = new DataCollectionStoreWithAfterLoad<T>(entityName, afterLoad, opts);
  if (typeof opts.loadImmediately === 'undefined' || opts.loadImmediately) {
    dataCollection.load();
  }
  return dataCollection;
}