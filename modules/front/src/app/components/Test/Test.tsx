import React from 'react';
import {Card, Icon, Modal, Spin, Statistic} from "antd";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {restServices} from "../../../cuba/services";
import {observable, runInAction} from "mobx";
import {observer} from "mobx-react";
import QuestionBlock from "./QuestionBlock";
import Button, {ButtonType} from "../Button/Button";
import Notification from "../../util/notification/Notification";

type AnswerModel = {
  id: string,
  text: string,
}

type QuestionModel = {
  id: string,
  text: string,
  type: string,
  answers: AnswerModel[];
}

type TestSectionModel = {
  id: string,
  name: string,
  questionsAndAnswers: QuestionModel[]
}

export type TestModel = {
  attemptId: string,
  timer: number,
  testSections: TestSectionModel[]
}

type TestProps = {
  enrollmentId: string,
  courseSectionObjectId: string
}

type Props = {
  test: TestProps
  finishTimeHandler?: () => void
  onFullScreenClick?: () => void
}

export interface AnsweredTest {
  attemptId: string
  questionsAndAnswers: AnsweredQuestion[],
}

export interface AnsweredQuestion {
  questionId: string,
  answer: string[]
}

@observer
class Test extends React.Component<Props & WrappedComponentProps> {

  @observable
  test: TestModel;

  answeredTest: AnsweredTest;

  addRemoveAnswer = (a: AnsweredQuestion) => {
    for (let i = this.answeredTest.questionsAndAnswers!.length - 1; i > -1; i--) {
      if (this.answeredTest.questionsAndAnswers![i].questionId === a.questionId) {
        this.answeredTest.questionsAndAnswers!.splice(i, 1);
      }
    }
    this.answeredTest.questionsAndAnswers!.push(a);
  };

  finishTest = () => {
    Modal.confirm({
      title: "Вы действительно хотите завершить тест",
      onOk: () => {
        restServices.lmsService.finishTest({answeredTest: this.answeredTest}).then(respnonse => {
          Notification.info({
            message: `Вы набрали ${respnonse.score} из ${respnonse.maxScore}`
          });
          if (this.props.finishTimeHandler) {
            this.props.finishTimeHandler();
          }
        });
      }
    })
  };

  render() {
    if (!this.test) {
      return <Spin spinning/>
    }
    const {Countdown} = Statistic;
    const timer = Date.now() + 1000 * 60 * this.test.timer;

    return (
      <Card className={"modal-body card-actions-container"}
            actions={[<Button buttonType={ButtonType.PRIMARY} onClick={this.finishTest}>Завершить тест</Button>]}>
        <div className={"timer-block"}>
          <div style={{display: 'flex', justifyContent: 'space-between'}} className={"fullscreen-icon"}>
            <span className={"timer-title"}>{this.props.intl.formatMessage({id: 'test.time'})}: </span>
            <Icon type="fullscreen" onClick={this.props.onFullScreenClick}/>
          </div>
          <Countdown value={timer}
                     onFinish={this.props.finishTimeHandler ? this.props.finishTimeHandler.bind(null, this.answeredTest) : null}/>
          <QuestionBlock test={this.test} addRemoveAnswer={this.addRemoveAnswer}/>
        </div>
      </Card>
    );
  }


  componentDidMount(): void {
    restServices.lmsService.startAndLoadTest({
      enrollmentId: this.props.test.enrollmentId,
      courseSectionObjectId: this.props.test.courseSectionObjectId
    }).then(response => {
      runInAction(() => {
        this.test = response;
        this.answeredTest = {attemptId: this.test.attemptId, questionsAndAnswers: []};
      })
    });
  }
}

export default injectIntl(Test);