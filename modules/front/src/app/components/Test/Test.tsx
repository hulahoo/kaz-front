import React from 'react';
import {Spin, Statistic} from "antd";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {restServices} from "../../../cuba/services";
import {observable, runInAction} from "mobx";
import {observer} from "mobx-react";
import Question from "./Question";

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

  render() {
    if (!this.test) {
      return <Spin spinning/>
    }

    const {Countdown} = Statistic;
    const timer = Date.now() + 1000 * 60 * this.test.timer;
    return (
      <div>
        <div className={"timer-block"}>
          <span className={"timer-title"}>{this.props.intl.formatMessage({id: 'test.time'})}: </span>
          <Countdown value={timer} onFinish={this.props.finishTimeHandler}/>
        </div>
        <div className="test-container">
          {this.test.testSections.map(ts => <div className={"test-section"}>
            <div className={"test-section-title"}>
              <span>{ts.name}</span>
            </div>
            {ts.questionsAndAnswers.map(question => <><Question
              testSectionId={ts.id}
              addRemoveAnswer={this.addRemoveAnswer}
              question={question}/></>)}
          </div>)}
        </div>
      </div>
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