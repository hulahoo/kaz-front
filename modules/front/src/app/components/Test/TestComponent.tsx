import React from 'react';
import {Spin, Statistic} from "antd";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {observer} from "mobx-react";
import QuestionBlock from "./QuestionBlock";
import {QuestionModel} from "./Question";
import {observable} from "mobx";
import Button from "../Button/Button";

export type TestSectionModel = {
  id?: string,
  name?: string,
  questionsAndAnswers: QuestionModel[]
}

export type TestModel = {
  attemptId: string,
  timer?: number,
  testSections: TestSectionModel[]
}

type Props = {
  test: TestModel
  finishTimeHandler?: () => void
  onFullScreenClick?: () => void
  onFinishTest?: (answers: any) => void
  addRemoveAnswer: (a: AnsweredQuestion) => void
}

export interface AnsweredTest {
  attemptId: string
  testSections: AnsweredTestSections[]
}

export interface AnsweredTestSections {
  testSectionId?: string,
  questionsAndAnswers: AnsweredQuestion[]
}

export interface AnsweredQuestion {
  testSectionId?: string,
  questionId: string,
  answer: string[]
}

@observer
class TestComponent extends React.Component<Props & WrappedComponentProps> {

  @observable
  isStarted = false;

  render() {
    if (!this.props.test) {
      return <Spin spinning/>
    }
    const {Countdown} = Statistic;
    return (
      <div className={"timer-block"}>
        <div style={{display: 'flex', justifyContent: 'space-between'}} className={"fullscreen-icon"}>
          <span className={"timer-title"}>{this.props.intl.formatMessage({id: 'test.time'})}: </span>
        </div>
        {this.props.test.timer
          ? <Countdown value={Date.now() + 1000 * 60 * this.props.test.timer}
                       onFinish={this.props.finishTimeHandler}/>
          : <></>}
        <QuestionBlock testSections={this.props.test.testSections} addRemoveAnswer={this.props.addRemoveAnswer}/>
      </div>
    );
  }

}

export default injectIntl(TestComponent);