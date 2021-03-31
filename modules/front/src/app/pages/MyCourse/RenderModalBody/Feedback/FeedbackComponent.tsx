import React from "react";
import {injectIntl, WrappedComponentProps} from "react-intl";
import QuestionBlock from "../../../../components/Test/QuestionBlock";
import {AnswerModel, QuestionModel} from "../../../../components/Test/Question";
import {AnsweredQuestion} from "../../../../components/Test/TestComponent";

export interface FeedbackComponentProps {
  feedbacks: FeedbackCourse[] | null
}

export interface FeedbackComponentProps {
  addRemoveAnswer: (a: AnsweredQuestion) => void
}

export type FeedbackCourse = {
  id: string,
  questionLangValue1: string,
  questionType: any,
  answers?: FeedbackAnswer[]
}

export type FeedbackAnswer = {
  id: string,
  answerLangValue1: string,
}

class FeedbackComponent extends React.Component<FeedbackComponentProps & WrappedComponentProps> {
  render() {
    const {feedbacks} = this.props;
    if (feedbacks === null) {
      return <></>
    }

    return <>
      {this.props.feedbacks ?
        <QuestionBlock testSections={[{
          questionsAndAnswers: this.props.feedbacks.map(f => {
            return {
              id: f.id,
              text: f.questionLangValue1,
              type: f.questionType,
              answers: f.answers ? f.answers.map(a => {
                return {
                  id: a.id,
                  text: a.answerLangValue1
                } as AnswerModel
              }) : null
            } as QuestionModel
          })
        }]} addRemoveAnswer={this.props.addRemoveAnswer}/>
        : <></>}
    </>;
  }
}

export default injectIntl(FeedbackComponent);