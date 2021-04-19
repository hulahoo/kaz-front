import {ScormInputData} from "../../../../../cuba/services";

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

export type ScormType = "default" | "test";

export type CompleteStatus = 'completed' | "incomplete" | "unknown";

export type SuccessStatus = 'success' | "incomplete" | "unknown";

export type ScormProperty =
  "cmi.suspend_data"
  | "cmi.score.raw"
  | "cmi.score.max"
  | "cmi.score.min"
  | "cmi.success_status"
  | "cmi.completion_status";

export default class ScormIntegrationApi {

  commited: boolean = false;

  inputData: ScormInputData[] = [];

  testResult: ScormTestData;

  type: ScormType = "default";

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

    window.API_1484_11 = {
      Initialize: () => {
      },
      GetValue: (property: string) => {
        return window.API_1484_11[property];
      },
      Finish: () => {
      },
      //TODO: переписать, чтобы сеттились как вложенные объекты
      SetValue: (property: ScormProperty, value: string) => {
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
        this.afterPropertySetValue(property, value);
      },
      Commit: () => {
        switch (this.type) {
          case "test": {
            this.onScormTestFinish(this.testResult.score, this.testResult.maxScore, this.testResult.minScore, this.isSucceedFinishedScorm());
            break;
          }
          case "default": {
            this.onScormDefaultFinish(this.inputData, this.isSucceedFinishedScorm());
            break;
          }
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

  afterPropertySetValue = (property: ScormProperty, value: string) => {

  };

  getInputData = (): ScormInputData[] => {
    return this.inputData;
  };

  isSucceedFinishedScorm = (): boolean => {
    const completionStatusProperty = "cmi.completion_status" as ScormProperty;
    const completedStatus = "completed" as CompleteStatus;

    const successStatusProperty = "cmi.success_status" as ScormProperty;
    const successStatus = "success" as SuccessStatus;

    return (window.API_1484_11[completionStatusProperty] && window.API_1484_11[completionStatusProperty].toLowerCase() === completedStatus)
      && (window.API_1484_11[successStatusProperty] && window.API_1484_11[successStatusProperty].toLowerCase() === successStatus);
  };

  destroy = (): void => {
    delete window.API_1484_11;
  };

  initApiData = (initObject: any): void => {
    Object.entries(initObject).forEach(([key, value]) => window.API_1484_11[key] = value);
  };

  getScormType = (): ScormType => {
    return this.type;
  };

  getTestResult = (): ScormTestData => {
    return this.testResult;
  }
}