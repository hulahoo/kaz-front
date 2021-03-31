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

export default class ScormIntegrationApi {

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
    }

    foundedInputData.score = score;
    foundedInputData.maxScore = maxScore;
    foundedInputData.minScore = minScore;
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
    }
    foundedInputData.answer = answer;
  };

  init = (): void => {
    window.SetObjectiveScore = (fieldId: string, score: number, maxScore: number, minScore: number) => {
      this._addInputDataScore(fieldId, score, maxScore, minScore);
    };

    window.SetObjectiveDescription = (fieldId: string, text: string) => {
      this._addInputDataText(fieldId, text);
    };

    window.SetScore = (score: number, maxScore: number, minScore: number) => {
      this.type = "test";
      this.testResult = {
        score: score,
        maxScore: maxScore,
        minScore: minScore,
      }
    };

    window.API_1484_11 = {
      Initialize: () => {
      },
      GetValue: (property: string, value: string) => {
      },
      Finish: () => {
      },
      //TODO: переписать, чтобы сеттились как вложенные объекты
      SetValue: (property: string, value: string) => {
        window.API_1484_11[property] = value;
      },
      Commit: () => {
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
        }
      },
      GetLastError: () => {

      },
      GetErrorString: () => {

      },
      GetDiagnostic: () => {

      },
      Terminate: () => {

      }
    }
  };

  onScormTestFinish = (score: number, maxScore: number, minScore: number, success: boolean): void => {

  };

  onScormDefaultFinish = (inputData: ScormInputData[], success: boolean) => {

  };

  getInputData = (): ScormInputData[] => {
    return this.inputData;
  };

  isSucceedFinishedScorm = (): boolean => {
    return window.API_1484_11[statusField] && window.API_1484_11[statusField].toLowerCase() !== completedStatus;
  };

  destroy = (): void => {
    delete window.API_1484_11;
  }
}