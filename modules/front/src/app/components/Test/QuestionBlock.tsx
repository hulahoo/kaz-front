import React, {Component} from 'react';
import Question from "./Question";
import {Icon} from "antd";
import {AnsweredQuestion, TestSectionModel} from "./TestComponent";
import {action, observable} from "mobx";
import {observer} from "mobx-react";
import {injectIntl, WrappedComponentProps} from "react-intl";

type Props = {
  testSections: TestSectionModel[]
  addRemoveAnswer: (a: AnsweredQuestion) => void
  setDisableFinishSectionBtn?: (value: boolean) => void
}

@observer
class QuestionBlock extends Component<Props & WrappedComponentProps> {

  @observable
  questionIndex: number = 0;

  @observable
  testSectionIndex: number = 0;

  @action
  setQuestionIndex = (value: number) => {
    const currentTestSection = this.props.testSections;
    const currentTestSectionQuestionsLength = currentTestSection[this.testSectionIndex].questionsAndAnswers.length;
    const isLastSection = this.testSectionIndex === (this.props.testSections.length - 1);
    const isLastQuestionIndex = value === (this.props.testSections[this.props.testSections.length - 1].questionsAndAnswers.length - 1);

    if (value === currentTestSectionQuestionsLength) {
      this.questionIndex = 0;
      this.testSectionIndex = this.testSectionIndex + 1;

      const isLastQuestion = (isLastSection && isLastQuestionIndex);
      if (this.props.setDisableFinishSectionBtn) {
        this.props.setDisableFinishSectionBtn(!isLastQuestion);
      }

      return;
    } else if (value < 0) {
      this.testSectionIndex = this.testSectionIndex - 1;
      this.questionIndex = currentTestSectionQuestionsLength - 1;

      return;
    }

    const isLastQuestion = (isLastSection && isLastQuestionIndex);
    if (this.props.setDisableFinishSectionBtn) {
      this.props.setDisableFinishSectionBtn(!isLastQuestion);
    }
    this.questionIndex = value;
  };

  render() {
    return (<div className="test-container">
        {this.props.testSections.map((currentTestSection, tsIndex) => <div
          className={"test-section" + (this.testSectionIndex === tsIndex ? " visible" : "")}>
          {currentTestSection.name ?
            <div className={"test-section-title"}>
              <span>{currentTestSection.name}</span>
            </div>
            : null}

          {currentTestSection.questionsAndAnswers.map((question, index) => <div
            className={"question-container" + (this.questionIndex === index ? " visible" : "")}
            key={question.id}><Question
            addRemoveAnswer={this.props.addRemoveAnswer}
            key={`question_${question.id}`}
            question={question}
            testSectionId={currentTestSection.id!}/>
            <div className="question-control-block">
              {this.questionIndex === 0 && this.testSectionIndex === 0
                ? <span/>
                : <span className="control" onClick={this.setQuestionIndex.bind(null, (this.questionIndex - 1))}>
                              <Icon type="arrow-left"/>
                  {this.props.intl.formatMessage({id: "prevQuestion"})}
              </span>}
              {this.questionIndex === (currentTestSection.questionsAndAnswers.length - 1) && this.testSectionIndex === (this.props.testSections.length - 1)
                ? <span/>
                : <span className="control" onClick={this.setQuestionIndex.bind(null, (this.questionIndex + 1))}>
                  {this.props.intl.formatMessage({id: "nextQuestion"})}
                  <Icon type="arrow-right"/>
                </span>}
            </div>
          </div>)}
        </div>)}
      </div>
    );
  }
}

export default injectIntl(QuestionBlock);