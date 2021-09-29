import React from "react";
import {AnsweredQuestion} from "./TestComponent";
import Answer from "./Answer";
import {observer} from "mobx-react";
import {observable} from "mobx";
import {getCubaREST} from "@cuba-platform/react";

export type QuestionModel = {
  id: string,
  text: string,
  type: string,
  imageId?: string,
  answers?: AnswerModel[]
}

export type AnswerModel = {
  id: string,
  text: string,
  imageId?: string,
}

export interface TestComponentProps {
  question: QuestionModel,
  testSectionId: string
}

export interface TestComponentHandlers {
  addRemoveAnswer: (a: AnsweredQuestion) => void
}

@observer
class Question extends React.Component<TestComponentProps & TestComponentHandlers> {

  @observable
  imgUrl?: string;

  render() {
    return (
      <div className={"question-block"} style={{overflowY: 'auto'}}>
        <div className={"question-title"}>{this.props.question.text}</div>
        {
          this.imgUrl
            ? <div className={"question-image"}>
              <img alt={this.props.question.text}
                   style={{maxHeight: 200, paddingLeft: 10}}
                   src={this.imgUrl}/>
            </div>
            : <></>
        }

        <div className={"question-options"}>
          <Answer answers={this.props.question.answers} type={this.props.question.type}
                  addRemoveAnswer={this.props.addRemoveAnswer} questionId={this.props.question.id}
                  testSectionId={this.props.testSectionId}/>
        </div>
      </div>);
  }

  componentDidMount() {
    if (this.props.question.imageId) {
      getCubaREST()!.getFile(this.props.question.imageId).then((value: Blob) => this.imgUrl = URL.createObjectURL(value));
    }
  }
}

export default Question;