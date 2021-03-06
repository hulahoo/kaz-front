import * as React from "react";
import {inject, observer} from "mobx-react";
import {action, observable, runInAction} from "mobx";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {DataContainerStatus, getCubaREST, injectMainStore} from "@cuba-platform/react";
import "../../../app/App.css";
import {Enrollment} from "../../../cuba/entities/base/tsadv$Enrollment";
import Section from "../../hoc/Section";
import {Button, Col, Icon, Row, Spin} from "antd";
import NoImage from "../../components/NoImage";
import Page from "../../hoc/PageContentHoc";
import {Meta} from "antd/es/list/Item";
import {SerializedEntity} from "@cuba-platform/rest";
import CourseSectionList, {ListItem} from "../../components/CourseSectionList";
import Notification from "../../util/Notification/Notification";
import {EnrollmentManagement} from "./EnrollmentManagement";
import {restQueries} from "../../../cuba/queries";
import CourseSectionModal from "./CourseSectionModal";
import {CourseSectionAttempt} from "../../../cuba/entities/base/tsadv$CourseSectionAttempt";
import moment from "moment";
import {LearningFeedbackTemplate} from "../../../cuba/entities/base/tsadv$LearningFeedbackTemplate";
import {CourseSectionRenderType} from "./RenderModalBody/RenderModalBody";
import {Link, RouteComponentProps} from "react-router-dom";
import {StudentHomework} from "../../../cuba/entities/base/tsadv_StudentHomework";
import {RootStoreProp} from "../../store";
import {withRouter} from "react-router";
import {restServices} from "../../../cuba/services";
import {CourseFeedbackPersonAnswer} from "../../../cuba/entities/base/tsadv$CourseFeedbackPersonAnswer";

type Props = {
  entityId: string;
};

export type SelectedSection = {
  id: string,
  type: CourseSectionRenderType
}

@inject("rootStore")
@injectMainStore
@observer
class EnrollmentEditComponent extends React.Component<Props & WrappedComponentProps & RootStoreProp & RouteComponentProps<any>> {

  @observable
  status: DataContainerStatus = "CLEAN";

  @observable
  dataInstance: SerializedEntity<Enrollment>;

  @observable
  feedbacks: Array<SerializedEntity<LearningFeedbackTemplate>> | null;

  @observable
  selectedSection: SelectedSection | null = null;

  @observable
  visibleModal: boolean = false;

  @observable
  loadingFinishCourse: boolean = false;

  @observable
  isHasHomework: boolean = false;

  @observable
  isHomeworkDone: boolean = false;

  render() {
    const homeworkTitle = <>
      {this.isHomeworkDone
        ? <Icon type="check-circle" className={"done"} theme="twoTone"
                twoToneColor="#12BF66"
                style={{fontSize: '32px'}}/>
        : null}
      <div>{this.props.intl.formatMessage({id: "homework"})}</div>
    </>;
    const linkHomework = this.isHasHomework && this.dataInstance
      ? <div
        onClick={() => {
          if (!this.isAllPassed()) {
            Notification.info({
              message: this.props.intl.formatMessage({id: 'complete.all.sections.course.first'})
            });
            return
          } else
            this.props.history.push("/" + EnrollmentManagement.PATH + "/" + this.props.entityId + "/" + EnrollmentManagement.HOMEWORK);
        }}
      >
        <div key="homework" id="homework">
          <Meta title={homeworkTitle}
                className={"course-section-item"}>
          </Meta>
        </div>
      </div>
      : null;

    const courseSections = this.dataInstance ? this.dataInstance.course!.sections!.map(s => {
      return {
        succeedFinished: s.courseSectionAttempts!.filter(a => a.success).length > 0,
        id: s.id,
        text: s.sectionName,
        type: "course-section"
      } as ListItem
    }) : [];

    return (
      <Page>
        <Spin spinning={this.status === 'LOADING'}>
          <Section size={"large"} sectionName={this.dataInstance ? this.dataInstance!.course!.name! : null}>
            <Row>
              <Col span={16}>
                <div className="course-logo">
                  <div style={{width: '100%'}}>
                    <img src={require('../../../resources/img/tdc_logo.png')} alt="tdc logo" style={{width: '20%'}}/>
                    {this.status === 'LOADING' || this.status === 'CLEAN' ? <NoImage/> :
                      <div className="play-block">
                        <div className="play-icon" onClick={this.playIconClick}>
                          <div className="triangle-icon"/>
                        </div>
                        {/*<Icon type="caret-right" className="play-icon"/>*/}
                        <h1
                          className="play-text">{this.selectedSection
                          ? this.selectedSection.type === "course-section"
                            ? this.dataInstance.course!.sections!.find(s => s.id === this.selectedSection!.id)!.sectionName
                            : this.feedbacks!.find(s => s.id === this.selectedSection!.id)!.name
                          : null}
                        </h1>
                      </div>}
                  </div>
                  <div style={{width: '100%'}}>
                    <img src={require('../../../resources/img/lines.png')} alt="tdc logo" style={{width: '100%'}}/>
                  </div>
                </div>
              </Col>
              <Col span={8} style={{paddingLeft: "30px"}}>
                <CourseSectionList dataInstance={courseSections}
                                   clickItemHandler={this.clickSection}
                                   selectedItem={this.selectedSection ? this.selectedSection.id : null}/>
                <div>
                  {linkHomework}
                </div>
                <hr/>
                <div className={"course-feedback-sections"}>
                  <CourseSectionList dataInstance={this.feedbacks ? this.feedbacks.map(f => {
                    return {
                      id: f.id,
                      succeedFinished: (f as any).sended,
                      text: f._instanceName,
                      type: "feedback"
                    }
                  }) : null} clickItemHandler={this.clickSection}
                                     selectedItem={this.selectedSection ? this.selectedSection.id : null}/>
                </div>
              </Col>
            </Row>
          </Section>
          {this.visibleModal ? <CourseSectionModal
            courseId={this.dataInstance.course!.id}
            loadingFinishCourse={this.loadingFinishCourse}
            setLoadingFinishCourseSection={this.setLoadingFinishCourseSection}
            finishedCourseSection={this.finishedCourseSection}
            onFinishSection={this.finishSection}
            selectNextSection={this.selectNextSection}
            onCloseModal={this.onCloseModal}
            selectedSection={this.selectedSection!}
            setFinishedFeedback={this.setFinishedFeedback}
            enrollmentId={this.props.entityId}/> : <></>}
        </Spin>
      </Page>);
  }

  @action
  setVisibleModal = (value: boolean) => {
    this.visibleModal = value;
  };

  @action
  setSelectedSection = (value: SelectedSection | null) => {
    this.selectedSection = value;
  };

  @action
  onCloseModal = () => {
    this.setVisibleModal(false);
  };

  componentDidMount() {
    if (this.props.entityId !== EnrollmentManagement.NEW_SUBPATH) {
      this.loadData();
    }

    restQueries.homeworksByEnrollment(this.props.entityId).then(value => {
      this.isHasHomework = value.length > 0;
      if (this.isHasHomework) {
        getCubaREST()!.searchEntitiesWithCount(StudentHomework.NAME, {
          conditions: [{
            property: "homework.id",
            operator: "in",
            value: value.map(record => record.id!)
          }, {
            property: "personGroup.id",
            operator: "=",
            value: this.props.rootStore!.userInfo.personGroupId!
          }, {
            property: "isDone",
            operator: "=",
            value: 'TRUE'
          }]
        })
          .then(homeworkCount => {
            this.isHomeworkDone = homeworkCount.count >= value.length;
          })
      }
    });
  }

  playIconClick = () => {
    if (!this.selectedSection) {
      Notification.info({
        message: "???? ???????????? ???????????? ??????????"
      });
      return;
    }

    const indexSelectedCourseSection = this.dataInstance.course!.sections!.findIndex(s => s.id === this.selectedSection!.id);
    const notFinishedRequiredSections = this.dataInstance.course!.sections!
      .filter(((value, index) => index < indexSelectedCourseSection))
      .filter(courseSection => courseSection.mandatory && courseSection.courseSectionAttempts!.filter(a => a.success).length === 0);
    if (notFinishedRequiredSections.length > 0) {
      Notification.info({
        message: this.props.intl.formatMessage({id: 'enrollment.section.start.error.required'}) + (": " + notFinishedRequiredSections.map(cs => cs.sectionName).join(", "))
      });
      return;
    }
    const selectedSection = this.dataInstance.course!.sections!.find(s => s.id === this.selectedSection!.id);
    if (selectedSection
      && selectedSection.sectionObject
      && selectedSection.sectionObject.objectType
      && selectedSection.sectionObject.objectType.code === 'TEST'
      && selectedSection.sectionObject.test!.maxAttempt
      && (selectedSection.courseSectionAttempts || []).filter(value => value.activeAttempt).length >= selectedSection.sectionObject.test!.maxAttempt) {
      Notification.info({
        message: this.props.intl.formatMessage({id: 'exceeded.max.test.attempts'})
      });
      return;
    }

    if (this.selectedSection!.type === "feedback") {
      if (!this.isAllPassed()) {
        Notification.info({
          message: this.props.intl.formatMessage({id: 'complete.all.sections.course.first'})
        });
        return;
      }
    }
    this.setVisibleModal(true);
  };

  isAllPassed = () => {
    return this.dataInstance.course!.sections!
      .every(value => (value.courseSectionAttempts !== undefined
        && value.courseSectionAttempts !== []
        && value.courseSectionAttempts!.some(a => !!a.success)));
  }

  clickSection = (e: React.MouseEvent<HTMLDivElement>) => {
    const courseSectionId = (e.currentTarget.children.item(0)! as any).id!;
    const sectionType = (e.currentTarget.children.item(0)! as any).getAttribute('type') as CourseSectionRenderType;

    this.setSelectedSection({
      type: sectionType,
      id: courseSectionId
    });
  };

  selectNextSection = () => {
    const selectedSectionIndex = this.dataInstance.course!.sections!.findIndex(s => s.id === this.selectedSection!.id);
    if (selectedSectionIndex != this.dataInstance.course!.sections!.length - 1) {
      const nextSelectedSectionIndex = selectedSectionIndex + 1;
      const nextSection = this.dataInstance.course!.sections!.find((s, index) => index === nextSelectedSectionIndex);
      if (nextSection) {
        this.setVisibleModal(false);
        this.setSelectedSection({
          type: "course-section",
          id: nextSection.id
        });
        //?????????? ???? ???????????????????? ?????????????? ???? ???????????? ????????????.
        setTimeout(this.playIconClick, 100);
      } else {
        this.setVisibleModal(false);
      }
    } else {
      this.setVisibleModal(false);
    }
    this.setLoadingFinishCourseSection(false);
  };

  setLoadingFinishCourseSection = (value: boolean) => {
    this.loadingFinishCourse = value;
  };

  finishSection = async () => {
    this.setLoadingFinishCourseSection(true);
    try {
      const attempt = await getCubaREST()!.searchEntitiesWithCount(CourseSectionAttempt.NAME, {
        conditions: [{
          property: "enrollment",
          operator: "=",
          value: this.props.entityId
        }, {
          property: "courseSection",
          operator: "=",
          value: this.selectedSection!.id
        }]
      }, {view: "course-section-attempt"});

      if ((attempt.count == 0)) {
        const newAttempt = getCubaREST()!.commitEntity(CourseSectionAttempt.NAME, {
          courseSection: {
            id: this.selectedSection!.id,
          },
          attemptDate: moment().toISOString(),
          activeAttempt: false,
          success: true,
          enrollment: {
            id: this.props.entityId
          }
        } as CourseSectionAttempt);

        this.finishedCourseSection(this.selectedSection!.id, true);
        this.selectNextSection();

        return newAttempt;
      } else {
        this.selectNextSection();
        return (attempt.result[0] as CourseSectionAttempt);
      }
    } catch (e) {
      this.setLoadingFinishCourseSection(false);
      throw new e;
    }
  };

  finishedCourseSection = (courseSectionId: string, success: boolean) => {
    this.dataInstance.course!.sections!.filter(s => s.id === courseSectionId).forEach(s => {
      const courseSectionAttempt = new CourseSectionAttempt();
      courseSectionAttempt.success = success;
      courseSectionAttempt.activeAttempt = true;
      if (s.courseSectionAttempts) {
        s.courseSectionAttempts.push(courseSectionAttempt);
      } else {
        s.courseSectionAttempts = [courseSectionAttempt];
      }
    })
  };

  loadData = () => {
    this.status = "LOADING";
    restServices.courseService.courseEnrollmentInfo({enrollmentId: this.props.entityId}).then((response: SerializedEntity<Enrollment>) => {
      runInAction(() => {
        this.dataInstance = response
      });
      this.status = "DONE";

      this.loadFeedback();
    }).catch(() => {
      this.status = "DONE";
    });
  };

  loadFeedback = () => {
    restQueries.courseFeedbacks(this.dataInstance.course!.id, "COURSE").then(r => {
      if (r.length > 0) {
        const userFeedbacks = getCubaREST()!.searchEntities(CourseFeedbackPersonAnswer.NAME, {
          conditions: [
            {
              property: "feedbackTemplate.id",
              operator: "in",
              value: r.map(f => f.id)
            }, {
              property: "personGroup.id",
              operator: "=",
              value: this.props.rootStore!.userInfo.personGroupId!
            }, {
              property: "course.id",
              operator: "=",
              value: this.dataInstance.course!.id
            }
          ]
        }, {view: "courseFeedbackPersonAnswer.edit"});
        userFeedbacks.then(responseFeedbacks => {
          responseFeedbacks.forEach(rf => {
            (r!.find(f => f.id === (rf as SerializedEntity<CourseFeedbackPersonAnswer>).feedbackTemplate!.id) as any).sended = true;
          });
          this.feedbacks = r;
        });
      }
    })
  }

  setFinishedFeedback = (feedbackId: string) => {
    (this.feedbacks!.find(f => f.id === feedbackId) as any).sended = true;
  }
}

export default withRouter(injectIntl(EnrollmentEditComponent));
