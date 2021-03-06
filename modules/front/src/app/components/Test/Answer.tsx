import React, {ReactElement} from "react";
import {Card, Checkbox, Input, Radio} from "antd";
import {RadioChangeEvent} from "antd/es/radio";
import CheckboxGroup, {CheckboxValueType} from "antd/es/checkbox/Group";
import {AnswerModel} from "./Question";
import {AnsweredQuestion} from "./TestComponent";
import {observer} from "mobx-react";
import {getCubaREST} from "@cuba-platform/react";
import {observable} from "mobx";

export interface AnswerComponentProps {
  answers?: AnswerModel[],
  type: string,
  questionId: string,
  testSectionId: string
}

export interface AnswerComponentHandlers {
  addRemoveAnswer: (a: AnsweredQuestion) => void
}

@observer
class Answer extends React.Component<AnswerComponentProps & AnswerComponentHandlers> {

  @observable
  imgUrlMap = new Map<string, string>();

  answerChangeHandler = (e: RadioChangeEvent | React.FocusEvent<HTMLInputElement>) => {
    this.props.addRemoveAnswer({
      testSectionId: this.props.testSectionId,
      questionId: this.props.questionId,
      answer: [e.target.value]
    } as AnsweredQuestion);
  };

  answerCheckboxChangeHandler = (checkedValues: CheckboxValueType[]) => {
    this.props.addRemoveAnswer({
      testSectionId: this.props.testSectionId,
      questionId: this.props.questionId,
      answer: checkedValues
    } as AnsweredQuestion);
  };
  getAnswerComponentByType: React.FC<any> = (type: string): ReactElement => {
    switch (type) {
      case "ONE": {
        return <Radio.Group onChange={this.answerChangeHandler} className={"answer-block"}>
          {this.props.answers!.map(el => {
            const imgUrl = el.imageId && this.imgUrlMap.get(el.imageId);
            return <Card className="card-test-answer-item"
                         key={el.id}><Radio value={el.id}
                                            key={`radio_${el.id}`}
                                            style={{
                                              display: "block",
                                              wordWrap: "break-word",
                                              whiteSpace: "normal"
                                            }}><span>{el.text}</span>{
              imgUrl
                ? <img alt={el.text}
                       style={{maxHeight: 200, paddingLeft: 10}}
                       src={imgUrl}/>
                : <></>
            }</Radio></Card>
          })}
        </Radio.Group>;
      }
      case "MANY": {
        return <CheckboxGroup onChange={this.answerCheckboxChangeHandler} className={"answer-block"}>
          {this.props.answers!.map(el => {
            const imgUrl = el.imageId && this.imgUrlMap.get(el.imageId);
            return <Card className="card-test-answer-item" key={el.id}><Checkbox value={el.id}
                                                                                 key={`checkBox_${el.id}`}
                                                                                 style={{
                                                                                   display: "block",
                                                                                   wordWrap: "break-word",
                                                                                   whiteSpace: "normal",
                                                                                   marginLeft: '0'
                                                                                 }}>{el.text}</Checkbox>{
              imgUrl
                ? <img alt={el.text}
                       style={{maxHeight: 200, paddingLeft: 10}}
                       src={imgUrl}/>
                : <></>
            }</Card>
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
    console.log(this.imgUrlMap.size);
    return this.getAnswerComponentByType(type);
  }

  componentDidMount() {

    if (this.props.answers)
      this.props.answers.map(value => value.imageId)
        .filter(value => value)
        .forEach(imageId =>
          getCubaREST()!.getFile(imageId!)
            .then((value: Blob) => this.imgUrlMap.set(imageId!, URL.createObjectURL(value))));
  }
}

export default Answer;