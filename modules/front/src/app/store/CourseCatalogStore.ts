import RootStore from "./RootStore";
import {action, observable} from "mobx";

export default class CourseCatalogStore {
  root: RootStore;

  selectedCategoryId: string;
  selectedEnrollmentId: string;

  constructor(root: RootStore) {
    this.root = root;
  }

  setSelectedCategoryId = (value: string) => {
    this.selectedCategoryId = value;
  };

  setSelectedEnrollmentId = (value: string) => {
    this.selectedEnrollmentId = value;
  };
}