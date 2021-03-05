import React, {Component} from 'react';
import Test, {AnsweredQuestion, AnsweredTest, TestModel} from "../../../../components/Test/Test";
import AbstractRenderModalBody from "../AbstractRenderModalBody";
import {CourseSection} from "../../../../../cuba/entities/base/tsadv$CourseSection";
import Button, {ButtonType} from "../../../../components/Button/Button";
import {Modal} from "antd";
import {restServices} from "../../../../../cuba/services";
import Notification from "../../../../util/Notification/Notification";
import {observable, runInAction} from "mobx";
import {observer} from "mobx-react";
import {injectIntl, WrappedComponentProps} from "react-intl";

type TestCourseSectionRenderProps = {
  enrollmentId: string
  courseSection: CourseSection
  onFinishSection: () => void
}

@observer
class TestCourseSectionRender extends AbstractRenderModalBody<TestCourseSectionRenderProps & WrappedComponentProps> {

  @observable
  test: TestModel;

  answeredTest: AnsweredTest;

  addRemoveAnswer = (a: AnsweredQuestion) => {
    for (let i = this.answeredTest.questionsAndAnswers!.length - 1; i > -1; i--) {
      if (this.answeredTest.questionsAndAnswers![i].questionId === a.questionId) {
        this.answeredTest.questionsAndAnswers!.splice(i, 1);
      }
    }
    this.answeredTest.questionsAndAnswers!.push(a);
  };

  confirmModalFinishTest = () => {
    Modal.confirm({
      title: "Вы действительно хотите завершить тест",
      onOk: () => {
        this.finishTest();
      }
    })
  };

  finishTest = () => {
    restServices.lmsService.finishTest({answeredTest: this.answeredTest}).then(response => {
      Notification.info({
        message: `Вы набрали ${response.score} из ${response.maxScore}`
      });
      if (this.onFinishSection) {
        this.onFinishSection();
      }
    });
  };

  getModalBody = (): React.ReactNode => {
    return <Test test={this.test} finishTimeHandler={this.finishTest} addRemoveAnswer={this.addRemoveAnswer}/>
  };

  cardActionButtons = () => {
    return [<Button buttonType={ButtonType.PRIMARY} onClick={this.confirmModalFinishTest}>{this.props.intl.formatMessage({id: "course.section.test.finish"})}</Button>]
  };

  onFinishSection = () => {
    this.props.onFinishSection();
  };

  componentDidMount(): void {
    restServices.lmsService.startAndLoadTest({
      enrollmentId: this.props.enrollmentId,
      courseSectionObjectId: this.props.courseSection.sectionObject!.id
    }).then(response => {
      runInAction(() => {
        this.test = response;
        this.answeredTest = {attemptId: this.test.attemptId, questionsAndAnswers: []};
      })
    });
  }
}

export default injectIntl(TestCourseSectionRender);