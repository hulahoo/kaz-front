import {ScormInputData} from "../../../../../cuba/services";

const statusField = 'cmi.completion_status';
const completedStatus = 'completed';

declare global {
  interface Window {
    API_1484_11: any;
    SetObjectiveScore: any;
    SetObjectiveDescription: any;
    SetScore: any;
  }
}

export type ScormInputData = {
  fieldId: string;
  answer: string;
  score: number;
  maxScore: number;
  minScore: number;
}

export type ScormTestData = {
  score: number;
  maxScore: number;
  minScore: number;
}

type ScormType = "default" | "test";

export const SUSPEND_DATA = 'cmi.suspend_data';

export default class ScormIntegrationApi {

  commited: boolean = false;

  inputData: ScormInputData[] = [];

  testResult: ScormTestData;

  type = "default";

  constructor() {
    this.init();
  }

  _addInputDataScore = (fieldId: string, score: number, maxScore: number, minScore: number) => {
    const foundedInputDataIndex = this.inputData.findIndex(id => id.fieldId === fieldId);

    let foundedInputData;
    if (foundedInputDataIndex === -1) {
      foundedInputData = ({
        fieldId: fieldId,
      } as ScormInputData)
    } else {
      foundedInputData = this.inputData[foundedInputDataIndex];
      this.inputData = this.inputData.filter((id, index) => index !== foundedInputDataIndex);
    }

    foundedInputData.score = score;
    foundedInputData.maxScore = maxScore;
    foundedInputData.minScore = minScore;

    this.inputData.push(foundedInputData);
  };

  _addInputDataText = (fieldId: string, answer: string) => {
    const foundedInputDataIndex = this.inputData.findIndex(id => id.fieldId === fieldId);

    let foundedInputData;
    if (foundedInputDataIndex === -1) {
      foundedInputData = ({
        fieldId: fieldId,
      } as ScormInputData)
    } else {
      foundedInputData = this.inputData[foundedInputDataIndex];
      this.inputData = this.inputData.filter((id, index) => index !== foundedInputDataIndex);
    }
    foundedInputData.answer = answer;

    this.inputData.push(foundedInputData);
  };

  init = (): void => {
    window.SetObjectiveScore = (fieldId: string, score: number, maxScore: number, minScore: number) => {
      this._addInputDataScore(fieldId, score, maxScore, minScore);
    };

    window.SetObjectiveDescription = (fieldId: string, text: string) => {
      this._addInputDataText(fieldId, text);
    };

    // window.SetScore = (score: number, maxScore: number, minScore: number) => {
    //   this.testResult = {
    //     score: window.API_1484_11['cmi.score.raw'],
    //     maxScore: maxScore,
    //     minScore: minScore,
    //   }
    // };

    window.API_1484_11 = {
      Initialize: () => {
      },
      GetValue: (property: string, value: string) => {
      },
      Finish: () => {
      },
      //TODO: переписать, чтобы сеттились как вложенные объекты
      SetValue: (property: string, value: string) => {
        switch (property) {
          case 'cmi.score.raw': {
            this.testResult = {
              ...this.testResult,
              score: Number(value)
            };
            this.type = "test";
            break;
          }
          case 'cmi.score.max': {
            this.testResult = {
              ...this.testResult,
              maxScore: Number(value)
            };
            this.type = "test";
            break;
          }
          case 'cmi.score.min': {
            this.testResult = {
              ...this.testResult,
              minScore: Number(value)
            };
            this.type = "test";
            break;
          }
          default: {
            window.API_1484_11[property] = value;
            break;
          }
        }
        this.onPropertySetValue(property, value);
      },
      Commit: () => {
        // if (!this.commited) {
        console.log('Commit');
        switch (this.type) {
          case "test": {
            this.onScormTestFinish(this.testResult.score, this.testResult.maxScore, this.testResult.minScore, this.isSucceedFinishedScorm());
            break;
          }
          case "default": {
            this.onScormDefaultFinish(this.inputData, this.isSucceedFinishedScorm());
            break;
          }
            // }
            this.commited = true;
        }
      },
      GetLastError: () => {

      },
      GetErrorString: () => {

      },
      GetDiagnostic: () => {

      }
    }
  };

  onScormTestFinish = (score: number, maxScore: number, minScore: number, success: boolean): void => {

  };

  onScormDefaultFinish = (inputData: ScormInputData[], success: boolean) => {

  };

  onPropertySetValue = (property: string, value: string) => {

  };

  getInputData = (): ScormInputData[] => {
    return this.inputData;
  };

  isSucceedFinishedScorm = (): boolean => {
    return window.API_1484_11[statusField] && window.API_1484_11[statusField].toLowerCase() === completedStatus;
  };

  destroy = (): void => {
    delete window.API_1484_11;
  };

  initApiData = (initObject: any): void => {
    Object.entries(initObject).forEach(([key, value]) => window.API_1484_11[key] = value);
  }
}