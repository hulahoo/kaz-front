import * as React from "react";
import {observer} from "mobx-react";
import {action, observable, runInAction} from "mobx";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {DataContainerStatus, getCubaREST} from "@cuba-platform/react";
import "../../../app/App.css";
import {Enrollment} from "../../../cuba/entities/base/tsadv$Enrollment";
import Section from "../../hoc/Section";
import {Col, Icon, Row, Spin} from "antd";
import Img from "../../components/Img";
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
import {Link} from "react-router-dom";

type Props = {
  entityId: string;
};

export type SelectedSection = {
  id: string,
  type: CourseSectionRenderType
}

@observer
class EnrollmentEditComponent extends React.Component<Props & WrappedComponentProps> {


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
  isHasHomework: boolean = false;

  render() {
    const homeworkTitle = <>
      <Icon type="check-circle" className={"done"} theme="twoTone" twoToneColor="#12BF66"
            style={{fontSize: '32px'}}/>
      <div>{this.props.intl.formatMessage({id: "homework"})}</div>
    </>;
    const linkHomework = this.isHasHomework && this.dataInstance
      ? <Link
        to={EnrollmentManagement.PATH + "/" + this.props.entityId + "/" + EnrollmentManagement.HOMEWORK}>
        <div key="homework" id="homework">
          <Meta title={homeworkTitle}
                className={"course-section-item"}>
          </Meta>
        </div>
      </Link>
      : null;

    const courseSections = this.dataInstance ? this.dataInstance.course!.sections!.map(s => {
      return {
        hasAttempt: s.courseSectionAttempts!.filter(a => a.enrollment!.id === this.props.entityId).length > 0,
        id: s.id,
        text: s.sectionName,
        type: "course-section"
      } as ListItem
    }) : [];

    return (
      // @ts-ignore
      <Page>
        <Spin spinning={this.status === 'LOADING'}>
          <Section size={"large"} sectionName={this.dataInstance ? this.dataInstance!.course!.name! : null}>
            <Row>
              <Col span={16} style={{height: '350px'}}>
                <div className="course-logo">
                  {this.status === 'LOADING' || this.status === 'CLEAN' ? <NoImage/> :
                    <>
                      <Icon type="caret-right" className={"play-icon"} onClick={this.playIconClick}/>
                      <Img isBase src={this.dataInstance.course!.logo}
                           alt={this.dataInstance.course!.name!}
                           style={{borderRadius: '4px', width: '100%', height: '100%'}}/></>}
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
                      hasAttempt: false,
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
            onFinishSection={this.finishSection}
            onCloseModal={this.onCloseModal}
            selectedSection={this.selectedSection!}
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
    });
  }

  playIconClick = () => {
    if (!this.selectedSection) {
      Notification.info({
        message: "Не выбран раздел курса"
      });
      return;
    }
    this.setVisibleModal(true);
  };

  clickSection = (e: React.MouseEvent<HTMLDivElement>) => {
    const courseSectionId = (e.currentTarget.children.item(0)! as any).id!;
    const sectionType = (e.currentTarget.children.item(0)! as any).getAttribute('type') as CourseSectionRenderType;

    this.setSelectedSection({
      type: sectionType,
      id: courseSectionId
    });
  };

  finishSection = () => {
    getCubaREST()!.searchEntitiesWithCount(CourseSectionAttempt.NAME, {
      conditions: [{
        property: "enrollment",
        operator: "=",
        value: this.props.entityId
      }, {
        property: "courseSection",
        operator: "=",
        value: this.selectedSection!.id
      }]
    }, {view: "course-section-attempt"}).then(response => {
      if ((response.count == 0)) {
        getCubaREST()!.commitEntity(CourseSectionAttempt.NAME, {
          courseSection: {
            id: this.selectedSection!.id,
          },
          attemptDate: moment().toISOString(),
          activeAttempt: false,
          success: true,
          enrollment: {
            id: this.props.entityId
          }
        } as CourseSectionAttempt).then(respones => {
          const selectedSectionIndex = this.dataInstance.course!.sections!.findIndex(s => s.id === this.selectedSection!.id);
          if (selectedSectionIndex != this.dataInstance.course!.sections!.length - 1) {
            const nextSelectedSectionIndex = selectedSectionIndex + 1;
            const nextSection = this.dataInstance.course!.sections!.find((s, index) => index === nextSelectedSectionIndex);
            if (nextSection) {
              this.finishedCourseSection(this.selectedSection!.id);
              this.setSelectedSection({
                type: "course-section",
                id: nextSection.id
              });
              this.playIconClick();
            } else {
              this.visibleModal = false;
            }
          } else {
            this.visibleModal = false;
          }
        });
      } else {
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
            this.playIconClick();
          } else {
            this.visibleModal = false;
          }
        } else {
          this.visibleModal = false;
        }
      }
    })
  };

  finishedCourseSection = (courseSectionId: string) => {
    this.dataInstance.course!.sections!.filter(s => s.id === courseSectionId).forEach(s => {
      if (s.courseSectionAttempts) {
        s.courseSectionAttempts.push(new CourseSectionAttempt());
      } else {
        s.courseSectionAttempts = [new CourseSectionAttempt()];
      }
    })
  };

  loadData = () => {
    this.status = "LOADING";
    restQueries.enrollment(this.props.entityId).then((response: SerializedEntity<Enrollment>[]) => {
      if (response && response.length > 0) {
        runInAction(() => {
          this.dataInstance = response[0]
        });
        this.status = "DONE";

        this.loadFeedback();
      }
    }).catch(() => {
      this.status = "DONE";
    });
  };

  loadFeedback = () => {
    restQueries.courseFeedbacks(this.dataInstance.course!.id, "COURSE").then(r => {
      this.feedbacks = r;
    })
  }
}

export default injectIntl(EnrollmentEditComponent);
