import * as React from "react";
import {FeedbackCourse} from "./FeedbackComponent";
import {AnsweredQuestion} from "../../../../components/Test/Test";
import Answer from "../../../../components/Test/Answer";

interface FeedbackQuestionAnswerComponentProps {
  feedback: FeedbackCourse
}

interface FeedbackQuestionAnswerComponentHandls {
  addRemoveAnswer: (a: AnsweredQuestion) => void
}

export type AnsweredFeedback = {
  templateId: string,
  courseId: string,
  questionsAndAnswers: AnsweredQuestion[],
}

class FeedbackQuestionAnswerComponent extends React.Component<FeedbackQuestionAnswerComponentProps & FeedbackQuestionAnswerComponentHandls> {

  render() {
    const answers = this.props.feedback.answers ? this.props.feedback.answers.map(a => {
        return {
          id: a.id,
          text: a.answerLangValue1
        }
      }
    ) : this.props.feedback.answers;

    return <div className={"question-container"}>
      <div className={"question-title"}>{this.props.feedback.questionLangValue1}</div>
      <div className={"question-options"}>
        <Answer answers={answers} type={this.props.feedback.questionType} testSectionId={""}
                addRemoveAnswer={this.props.addRemoveAnswer} questionId={this.props.feedback.id}/>
      </div>
    </div>;
  }
}

export default FeedbackQuestionAnswerComponent;