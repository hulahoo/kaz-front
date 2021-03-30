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

type InputTextDate = {
  fieldId: string,
  text: string,
  score: number,
  maxScore: number,
  minScore: number
}

export default class ScormIntegrationApi {

  inputData: InputTextDate[] = [];

  constructor() {
    this.init();
  }

  _addInputDataScore = (fieldId: string, score: number, maxScore: number, minScore: number) => {
    const foundedInputDataIndex = this.inputData.findIndex(id => id.fieldId === fieldId);

    let foundedInputData;
    if (foundedInputDataIndex === -1) {
      foundedInputData = ({
        fieldId: fieldId,
      } as InputTextDate)
    } else {
      foundedInputData = this.inputData[foundedInputDataIndex];
    }

    foundedInputData.score = score;
    foundedInputData.maxScore = maxScore;
    foundedInputData.minScore = minScore;
  };

  _addInputDataText = (fieldId: string, text: string) => {
    const foundedInputDataIndex = this.inputData.findIndex(id => id.fieldId === fieldId);

    let foundedInputData;
    if (foundedInputDataIndex === -1) {
      foundedInputData = ({
        fieldId: fieldId,
      } as InputTextDate)
    } else {
      foundedInputData = this.inputData[foundedInputDataIndex];
    }

    foundedInputData.text = text;
  };

  init = (): void => {
    window.SetObjectiveScore = (fieldId: string, score: number, maxScore: number, minScore: number) => {
      this._addInputDataScore(fieldId, score, maxScore, minScore);
    };

    window.SetObjectiveDescription = (fieldId: string, text: string) => {
      this._addInputDataText(fieldId, text);
    };

    window.SetScore = (score: number, maxScore: number, minScore: number) => {

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
        this.commit();
      },
      GetLastError: () => {

      },
      GetErrorString: () => {

      },
      GetDiagnostic: () => {

      }
    }
  };

  onTestFinish = (score: number, maxScore: number, minScore: number): void => {

  };

  getInputData = () => {
    return this.inputData;
  };

  isSucceedFinishedScorm = (): boolean => {
    return window.API_1484_11[statusField].toLowerCase() !== completedStatus;
  };

  commit = (): void => {
  };

  destroy = (): void => {
    delete window.API_1484_11;
  }
}