import React, {Component} from 'react';
import Question from "./Question";
import {Icon} from "antd";
import {AnsweredQuestion, TestModel} from "./Test";
import {action, observable} from "mobx";
import {observer} from "mobx-react";

type Props = {
  test: TestModel
  addRemoveAnswer: (a: AnsweredQuestion) => void
}

@observer
class QuestionBlock extends Component<Props> {

  @observable
  questionIndex: number = 0;

  @action
  setQuestionIndex = (value: number) => {
    this.questionIndex = value;
  };

  render() {
    return (<div className="test-container">
        {this.props.test.testSections.map(ts => <div className={"test-section"}>
          <div className={"test-section-title"}>
            <span>{ts.name}</span>
          </div>
          {ts.questionsAndAnswers.map((question, index) => <div
            className={"question-container" + (this.questionIndex === index ? " visible" : "")}><Question
            testSectionId={ts.id}
            addRemoveAnswer={this.props.addRemoveAnswer}
            question={question}/>
            <div className="question-control-block">
              {this.questionIndex === 0 ? <span/> :
                <span className="control" onClick={this.setQuestionIndex.bind(null, (this.questionIndex - 1))}>
                              <Icon type="arrow-left"/>
                Назад
              </span>}{this.questionIndex === (ts.questionsAndAnswers.length - 1) ? <span/> :
              <span className="control" onClick={this.setQuestionIndex.bind(null, (this.questionIndex + 1))}>
                Далее
                <Icon type="arrow-right"/>
                </span>}
            </div>
          </div>)}
        </div>)}
      </div>
    );
  }
}

export default QuestionBlock;