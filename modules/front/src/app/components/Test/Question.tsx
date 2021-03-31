import React from "react";
import {AnsweredQuestion} from "./TestComponent";
import Answer from "./Answer";

export type QuestionModel = {
  id: string,
  text: string,
  type: string,
  answers?: AnswerModel[]
}

export type AnswerModel = {
  id: string,
  text: string
}

export interface TestComponentProps {
  question: QuestionModel,
  testSectionId: string
}

export interface TestComponentHandlers {
  addRemoveAnswer: (a: AnsweredQuestion) => void
}

class Question extends React.Component<TestComponentProps & TestComponentHandlers> {

  render() {
    return (
      <div className={"question-block"}>
        <div className={"question-title"}>{this.props.question.text}</div>
        <div className={"question-options"}>
          <Answer answers={this.props.question.answers} type={this.props.question.type}
                  addRemoveAnswer={this.props.addRemoveAnswer} questionId={this.props.question.id} testSectionId={this.props.testSectionId}/>
        </div>
      </div>);
  }
}

export default Question;