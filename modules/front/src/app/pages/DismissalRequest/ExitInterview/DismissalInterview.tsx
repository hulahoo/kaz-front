import { injectMainStore } from '@cuba-platform/react';
import { Button, Modal } from 'antd';
import { action, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { restServices } from '../../../../cuba/services';
import Question, { QuestionError } from '../../../components/Test/Question';
import { AnsweredQuestion } from '../../../components/Test/TestComponent';
import { RootStoreProp } from '../../../store';
import { AnsweredFeedback } from '../../MyCourse/RenderModalBody/Feedback/FeedbackQuestionAnswerComponent';
import '../../../components/Test/style.less';
import './style.less';
import { runReport } from '../../../util/reportUtil';

interface State {
}

interface Props {
  intl: IntlShape;
  closeInterview(): void;
  data: any;
  isCanViewInterview: string | null;
  setIsCanViewInterview(isCanViewInterview: any): void;
}

export type FeedbackExitInterview = {
  id: string,
  questionLangValue: string,
  questionType: any,
  answers?: FeedbackExitInterviewAnswer[]
}

export type FeedbackExitInterviewAnswer = {
  id: string,
  answerLangValue: string,
  imageId: string,
}

@inject("rootStore")
@injectMainStore
@observer
class DismissalIntervew extends React.Component<Props & RootStoreProp, State> {

  @observable
  exitInterviewTemplateId: string;

  @observable
  feedbacks: FeedbackExitInterview[];

  @observable
  performingFinishRequest = false;

  @action setPerformingFinishRequest = (value: boolean) => {
    this.performingFinishRequest = value;
  };

  @observable
  errors: {
    [key: string]: QuestionError
  } = {}


  answeredFeedback: AnsweredFeedback = {
    courseId: "empty",
    // templateId: this.exitInterviewTemplateId,
    templateId: "",
    questionsAndAnswers: []
  };

  addRemoveAnswer = (a: AnsweredQuestion) => {
    this.answeredFeedback.questionsAndAnswers = this.answeredFeedback.questionsAndAnswers
      .filter(question => {
        return question.questionId !== a.questionId
      })
    this.answeredFeedback.questionsAndAnswers!.push(a);
  };

  validate() {
    const answers = {}
    this.answeredFeedback.questionsAndAnswers.forEach(question => {
      answers[question.questionId] = question
    })
    this.errors = {}
    this.feedbacks.forEach(feedback => {
      if (!answers[feedback.id]) {
        this.errors[feedback.id] = {
          message: 'This field is required',
          questionId: feedback.id
        }
      }
    })

    if (this.answeredFeedback.questionsAndAnswers.length < this.feedbacks.length) {
      return false;
    }
    return true;
  }

  submitFeedback = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { closeInterview } = this.props;

    if (!this.validate()) {
      Modal.error({
        title: this.props.intl.formatMessage({ id: "exitInterview.modal.error.title" }),
        okText: this.props.intl.formatMessage({ id: "cubaReact.dataTable.ok" }),
      })
      return;
    }

    const data = {
      parameters: [{
        name: "entity",
        value: this.props.data.id
      }]
    };

    const reportCode = "EXIT_INTERVIEW";

    this.setPerformingFinishRequest(true);
    restServices.dismissalService.saveUserFeedback({
      templateId: this.exitInterviewTemplateId,
      personGroupId: this.props.rootStore!.userInfo.personGroupId!,
      questionsAndAnswers: this.answeredFeedback.questionsAndAnswers
    })
      .then((response: string) => {
        Modal.success({
          title: this.props.intl.formatMessage({ id: "exitInterview.modal.title" }),
          okText: this.props.intl.formatMessage({ id: "cubaReact.dataTable.ok" }),
          onOk: () => {
            this.props.setIsCanViewInterview(null);
            closeInterview();
            console.log("runReport()", data)
            runReport(reportCode, data, this.props.intl);
          }
        });
      }).finally(() => this.setPerformingFinishRequest(false));
  };

  render() {
    const { closeInterview } = this.props;
    return (
      <div className="dismissal-interview-page">
        <h4 className="dismissal-interview-page__title">
          <FormattedMessage id="dismissal-interview.title" />
        </h4>
        {
          this.feedbacks && this.feedbacks.map(question => (
            <div style={{ margin: "1rem 0" }} key={question.id}>
              <Question
                error={this.errors[question.id]}
                testSectionId={""}
                question={{
                  id: question.id,
                  text: question.questionLangValue,
                  type: question.questionType,
                  answers: question.answers
                    ? question.answers.map(answer => ({
                      id: answer.id,
                      text: answer.answerLangValue,
                    }))
                    : undefined
                }}
                addRemoveAnswer={this.addRemoveAnswer}
              />
            </div>
          ))
        }
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          onClick={this.submitFeedback}
          loading={this.performingFinishRequest}>
          <FormattedMessage id="dismissal.downloadExitInterview" />
        </Button>
        <Button
          className="dismissal-interview__close-btn"
          type="primary"
          htmlType="button"
          size="large"
          onClick={closeInterview}>
          <FormattedMessage id="close" />
        </Button>
      </div>
    )
  }

  componentDidMount(): void {
    restServices.portalHelperService
      .getConfig({ classFQN: 'kz.uco.tsadv.config.DismissalConfig', methodName: 'getExitInterviewTemplateId' })
      .then((response) => {
        console.log(response);
        this.exitInterviewTemplateId = response;
        restServices.lmsService
          .loadFeedbackData({ feedbackTemplateId: this.exitInterviewTemplateId })
          .then((response: FeedbackExitInterview[]) => {
            this.feedbacks = response;
          })
      })
  }
}

export default injectIntl(DismissalIntervew);