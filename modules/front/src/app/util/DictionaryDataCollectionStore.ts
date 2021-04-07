import {AbstractDictionary} from "../../cuba/entities/base/AbstractDictionary";
import {ServiceDataCollectionStore} from "./ServiceDataCollectionStore";
import {restServices} from "../../cuba/services";
import {runInAction} from "mobx";
import {DataCollectionOptions} from "@cuba-platform/react/dist/data/Collection";
import {getCubaREST} from "@cuba-platform/react";

export class DictionaryDataCollectionStore<T extends AbstractDictionary> extends ServiceDataCollectionStore<T> {

  constructor(dictionaryName: string, personGroupId: string, opts: DataCollectionOptions) {
    super(restServices.portalHelperService.companiesForLoadDictionary.bind(null, {
      personGroupId: personGroupId,
    }), dictionaryName);

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
  }

  loading = (promise: any) => {
    promise
      .then((resp: any) => {
          if (resp) {
            if (!this.filter) this.filter = {conditions: []}

            this.filter.conditions.push({property: "company.id", operator: "in", value: resp})
          }
          if (this.filter) {
            this.loadingDictionaries(getCubaREST()!.searchEntitiesWithCount(this.entityName, this.filter, this.loadOptions()));
          } else {
            this.loadingDictionaries(getCubaREST()!.loadEntitiesWithCount(this.entityName, this.loadOptions()));
          }
        }
      )
      .catch(() => {
        runInAction(() => {
          this.status = 'ERROR';
        });
      });
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

  loadingDictionaries(promise: Promise<any>) {
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

  afterLoad = () => {

  }
}

export function dictionaryCollection<T extends AbstractDictionary>(dictionaryName: string, personGroupId: string, opts?: DataCollectionOptions): DictionaryDataCollectionStore<T> {
  if (!opts) opts = {
    loadImmediately: true
  };
  const dataCollection = new DictionaryDataCollectionStore<T>(dictionaryName, personGroupId, opts);
  if (typeof opts.loadImmediately === 'undefined' || opts.loadImmediately) {
    dataCollection.load();
  }
  return dataCollection;
}