import React, {ReactElement} from "react";
import {Card, Checkbox, Input, Radio} from "antd";
import {RadioChangeEvent} from "antd/es/radio";
import CheckboxGroup, {CheckboxValueType} from "antd/es/checkbox/Group";
import {AnswerModel} from "./Question";
import {AnsweredQuestion} from "./Test";

export interface AnswerComponentProps {
  answers?: AnswerModel[],
  type: string,
  questionId: string,
  testSectionId: string
}

export interface AnswerComponentHandlers {
  addRemoveAnswer: (a: AnsweredQuestion) => void
}

class Answer extends React.Component<AnswerComponentProps & AnswerComponentHandlers> {

  answerChangeHandler = (e: RadioChangeEvent | React.FocusEvent<HTMLInputElement>) => {
    this.props.addRemoveAnswer({
      testSectionId: this.props.testSectionId,
      questionId: this.props.questionId,
      answer: [e.target.value]
    } as AnsweredQuestion);
  };

  answerCheckboxChangeHandler = (checkedValues: CheckboxValueType[]) => {
    this.props.addRemoveAnswer({
      questionId: this.props.questionId,
      answer: checkedValues
    } as AnsweredQuestion);
  };
  getAnswerComponentByType: React.FC<any> = (type: string): ReactElement => {
    switch (type) {
      case "ONE": {
        return <Radio.Group onChange={this.answerChangeHandler} className={"answer-block"}>
          {this.props.answers!.map(el => {
            return <Card className="card-test-answer-item"><Radio value={el.id}
                                                                  style={{
                                                                    display: "block",
                                                                    wordWrap: "break-word",
                                                                    whiteSpace: "normal"
                                                                  }}>{el.text}</Radio></Card>
          })}
        </Radio.Group>;
      }
      case "MANY": {
        return <CheckboxGroup onChange={this.answerCheckboxChangeHandler} className={"answer-block"}>
          {this.props.answers!.map(el => {
            return <Card className="card-test-answer-item"><Checkbox value={el.id}
                                                                     style={{
                                                                       display: "block",
                                                                       wordWrap: "break-word",
                                                                       whiteSpace: "normal",
                                                                       marginLeft: '0'
                                                                     }}>{el.text}</Checkbox></Card>
          })}
        </CheckboxGroup>
      }
      case "TEXT": {
        return <Card className="card-test-answer-item"><Input onBlur={this.answerChangeHandler}
                                                              className={"answer-block"}/></Card>
      }
      case "NUM": {
        return <Card className="card-test-answer-item"><Input type={"number"} onBlur={this.answerChangeHandler}
                                                              className={"answer-block"}/></Card>
      }
    }
    return <></>
  };

  render() {
    const {type} = this.props;
    return this.getAnswerComponentByType(type);
  }
}

export default Answer;