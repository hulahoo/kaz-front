import React, {Component} from 'react';
import AbstractRenderModalBody from "../AbstractRenderModalBody";
import FeedbackComponent, {FeedbackCourse} from "./FeedbackComponent";
import {Button, Modal} from "antd";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {action, observable} from "mobx";
import {AnsweredFeedback} from "./FeedbackQuestionAnswerComponent";
import {AnsweredQuestion} from "../../../../components/Test/TestComponent";
import {restServices} from "../../../../../cuba/services";
import {observer} from "mobx-react";

type FeedbackCourseSectionRenderProps = {
  templateId: string,
  okFinishFeedbackHandler: () => void
  changeModalScreenSize: () => void
  onCloseModal: () => void
  feedbacks: FeedbackCourse[] | null,
  courseId: string
}

@observer
class FeedbackCourseSectionRender extends AbstractRenderModalBody<FeedbackCourseSectionRenderProps & WrappedComponentProps> {

  @observable
  performingFinishRequest = false;

  @observable
  questionIndex: number = 0;

  @action setPerformingFinishRequest = (value: boolean) => {
    this.performingFinishRequest = value;
  };

  getModalBody = () => {
    return <FeedbackComponent addRemoveAnswer={this.addRemoveAnswer} {...this.props}/>
  };

  answeredFeedback: AnsweredFeedback = {
    courseId: this.props.courseId,
    templateId: this.props.templateId,
    questionsAndAnswers: []
  };

  addRemoveAnswer = (a: AnsweredQuestion) => {
    for (let i = this.answeredFeedback.questionsAndAnswers!.length - 1; i > -1; i--) {
      if (this.answeredFeedback.questionsAndAnswers![i].questionId === a.questionId) {
        this.answeredFeedback.questionsAndAnswers!.splice(i, 1);
      }
    }
    this.answeredFeedback.questionsAndAnswers!.push(a);
  };

  submitFeedback = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {onCloseModal} = this.props;

    this.setPerformingFinishRequest(true);
    restServices.lmsService.finishFeedback({answeredFeedback: this.answeredFeedback})
      .then((response: string) => {
        Modal.success({
          title: this.props.intl.formatMessage({id: "feedback.modal.title"}),
          okText: this.props.intl.formatMessage({id: "cubaReact.dataTable.ok"}),
          onOk: () => {
            onCloseModal();
          }
        });
      }).finally(() => this.setPerformingFinishRequest(false));
  };

  cardActionButtons = () => {
    return [
      <Button
        type="primary"
        htmlType="submit"
        size="large"
        onClick={this.submitFeedback}
        loading={this.performingFinishRequest}>
        <FormattedMessage id="course.feedback.finish"/>
      </Button>
    ]
  };
}

export default injectIntl(FeedbackCourseSectionRender);