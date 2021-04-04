import {AbstractDictionary} from "../../cuba/entities/base/AbstractDictionary";
import {ServiceDataCollectionStore} from "./ServiceDataCollectionStore";
import {restServices} from "../../cuba/services";

//todo
export class DictionaryDataCollectionStore<T extends AbstractDictionary> extends ServiceDataCollectionStore<T> {

  constructor(dictionaryName: string, personGroupId: string) {
    super(restServices.portalHelperService.loadDictionaries.bind(null, {
      dictionaryName: dictionaryName,
      personGroupId: personGroupId,
    }), dictionaryName);
  }

  afterLoad = () => {

  }
}

export function dictionaryCollection<T extends AbstractDictionary>(dictionaryName: string, personGroupId: string): ServiceDataCollectionStore<T> {
  return new DictionaryDataCollectionStore<T>(dictionaryName, personGroupId);
}