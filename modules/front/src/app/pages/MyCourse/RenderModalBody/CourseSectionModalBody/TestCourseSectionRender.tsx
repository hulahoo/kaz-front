import React from 'react';
import TestComponent, {AnsweredQuestion, AnsweredTest, TestModel} from "../../../../components/Test/TestComponent";
import AbstractRenderModalBody from "../AbstractRenderModalBody";
import {CourseSection} from "../../../../../cuba/entities/base/tsadv$CourseSection";
import Button, {ButtonType} from "../../../../components/Button/Button";
import {Modal} from "antd";
import {restServices} from "../../../../../cuba/services";
import {observable, runInAction} from "mobx";
import {observer} from "mobx-react";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {CourseSectionAttempt} from "../../../../../cuba/entities/base/tsadv$CourseSectionAttempt";

type TestCourseSectionRenderProps = {
  enrollmentId: string
  courseSection: CourseSection
  onFinishSection: () => Promise<CourseSectionAttempt>
  finishedCourseSection: (courseSectionId: string, success: boolean) => void
}

// noinspection JSIgnoredPromiseFromCall
@observer
class TestCourseSectionRender extends AbstractRenderModalBody<TestCourseSectionRenderProps & WrappedComponentProps> {

  @observable
  testModel: TestModel;

  @observable
  isStarted = false;

  @observable
  isFinished = false;

  @observable
  finishMessage: string;

  success: boolean = false;

  answeredTest: AnsweredTest;

  addRemoveAnswer = (a: AnsweredQuestion) => {
    const answeredTestSections = this.answeredTest.testSections;
    for (let i = answeredTestSections!.length - 1; i > -1; i--) {
      const testSection = answeredTestSections[i];

      if (testSection.testSectionId === a.testSectionId) {
        for (let j = testSection.questionsAndAnswers.length - 1; j > -1; j--) {
          if (testSection.questionsAndAnswers[j].questionId === a.questionId) {
            testSection.questionsAndAnswers!.splice(j, 1);
            break;
          }
        }
        testSection.questionsAndAnswers!.push({
          questionId: a.questionId,
          answer: a.answer
        });
        return;
      }
    }
    this.answeredTest.testSections.push({
      testSectionId: a.testSectionId,
      questionsAndAnswers: [{
        questionId: a.questionId,
        answer: a.answer
      }]
    });
  };

  confirmModalFinishTest = () => {
    Modal.confirm({
      title: this.props.intl.formatMessage({id: "test.modal.finish"}),
      onOk: () => {
        this.finishTest();
      }
    })
  };

  finishTest = () => {
    restServices.lmsService.finishTest({answeredTest: this.answeredTest}).then(response => {
      this.finishMessage = this.props.intl.formatMessage({id: "test.finished.result"}, {
        score: response.score,
        maxScore: response.maxScore
      });
      this.isFinished = true;
      this.success = response.success;
    });
  };

  getModalBody = (): React.ReactNode => {
    if (!this.isStarted) {
      return <div
        dangerouslySetInnerHTML={{__html: this.props.courseSection.sectionObject!.test!.instruction || ''}}
        style={{overflowY: 'auto'}}
        className="course-section-modal-body"/>;
    }

    if (this.isFinished) {
      return <div
        dangerouslySetInnerHTML={{__html: this.finishMessage || ''}}
        style={{overflowY: 'auto'}}
        className="course-section-modal-body"/>;
    }

    return <TestComponent test={this.testModel}
                          setDisableFinishSectionBtn={this.setDisableFinishSectionBtn}
                          finishTimeHandler={this.finishTest}
                          addRemoveAnswer={this.addRemoveAnswer}/>
  };

  cardActionButtons = () => {
    if (!this.isStarted) return [<Button buttonType={ButtonType.PRIMARY}
                                         onClick={this.onStartTest}>{this.props.intl.formatMessage({id: "course.section.test.start"})}</Button>];

    if (!this.isFinished) return [<Button buttonType={ButtonType.PRIMARY} disabled={this.isDisabledFinishSectionBtn}
                                          onClick={this.confirmModalFinishTest}>{this.props.intl.formatMessage({id: "course.section.test.finish"})}</Button>];

    return [<Button buttonType={ButtonType.PRIMARY}
                    onClick={this.onFinishSection}><FormattedMessage id="course.section.finish"/></Button>]
  };

  onFinishSection = () => {
    this.props.finishedCourseSection(this.props.courseSection.id, this.success);
    this.props.selectNextSection!();
  };

  onStartTest = () => {
    this.startAndLoadTest();
  };

  startAndLoadTest = (): Promise<TestModel> => {
    return restServices.lmsService.startAndLoadTest({
      enrollmentId: this.props.enrollmentId,
      courseSectionObjectId: this.props.courseSection.sectionObject!.id
    }).then(response => {
      runInAction(() => {
        this.testModel = response;
        this.answeredTest = {attemptId: this.testModel.attemptId, testSections: []};
        this.isStarted = true;
      });
      return response;
    });
  };


  componentDidMount() {
    super.componentDidMount();
    this.setDisableFinishSectionBtn(true);
  }
}

export default injectIntl(TestCourseSectionRender);