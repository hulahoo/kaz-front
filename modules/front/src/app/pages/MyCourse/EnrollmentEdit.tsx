import * as React from "react";
import {observer} from "mobx-react";
import {action, observable, runInAction} from "mobx";
import {injectIntl, WrappedComponentProps} from "react-intl";

import {DataContainerStatus, getCubaREST, instance,} from "@cuba-platform/react";

import "../../../app/App.css";

import {Enrollment} from "../../../cuba/entities/base/tsadv$Enrollment";
import Section from "../../hoc/Section";
import {Card, Col, Icon, Modal, Row, Spin} from "antd";
import Img from "../../components/Img";
import NoImage from "../../components/NoImage";
import Page from "../../hoc/PageContentHoc";
import {Meta} from "antd/es/list/Item";
import {SerializedEntity} from "@cuba-platform/rest";
import CourseSectionList from "../../components/CourseSectionList";
import {restServices} from "../../../cuba/services";
import {CourseSection} from "../../../cuba/entities/base/tsadv$CourseSection";
import Notification from "../../util/notification/Notification";
import Button, {ButtonType} from "../../components/Button/Button";
import {EnrollmentManagement} from "./EnrollmentManagement";
import {restQueries} from "../../../cuba/queries";
import Video from "../../components/Video";
import Test from "../../components/Test/Test";
import * as ReactDOM from "react-dom";
import {RefObject} from "react";
import CourseSectionModal from "./CourseSectionModal";
import {CourseSectionAttempt} from "../../../cuba/entities/base/tsadv$CourseSectionAttempt";
import moment from "moment";

type Props = {
  entityId: string;
};

@observer
class EnrollmentEditComponent extends React.Component<Props & WrappedComponentProps> {

  @observable
  status: DataContainerStatus = "CLEAN";

  @observable
  dataInstance: SerializedEntity<Enrollment>;

  @observable
  selectedSectionId: string;

  @observable
  selectedCourseSection = instance<CourseSection>(CourseSection.NAME, {
    view: "course.section.with.format.session",
    loadImmediately: false
  });

  @observable
  visibleModal: boolean = false;

  clickSection = (e: React.MouseEvent<HTMLDivElement>) => {
    const courseSectionId = e.currentTarget.children.item(0)!.id;
    this.setSelectedSectionId(courseSectionId);
  };

  playIconClick = () => {
    if (!this.selectedSectionId) {
      Notification.info({
        message: "Не выбран раздел курса"
      });
      return;
    }

    this.selectedCourseSection.load(this.selectedSectionId);
    this.setVisibleModal(true);
  };

  onCloseModal = () => {
    this.setVisibleModal(false);
  };

  @action
  setSelectedSectionId = (value: string) => {
    this.selectedSectionId = value;
  };

  @action
  setVisibleModal = (value: boolean) => {
    this.visibleModal = value;
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
        value: this.selectedSectionId
      }]
    }, {view: "course-section-attempt"}).then(response => {
      if ((response.count == 0)) {
        getCubaREST()!.commitEntity(CourseSectionAttempt.NAME, {
          courseSection: {
            id: this.selectedCourseSection,
          },
          attemptDate: moment().toISOString(),
          activeAttempt: false,
          success: true,
          enrollment: {
            id: this.props.entityId
          }
        } as CourseSectionAttempt).then(respones => {
          const selectedSectionIndex = this.dataInstance.course!.sections!.findIndex(s => s.id === this.selectedSectionId);
          if (selectedSectionIndex != this.dataInstance.course!.sections!.length - 1) {
            const nextSelectedSectionIndex = selectedSectionIndex + 1;
            const nextSection = this.dataInstance.course!.sections!.find((s, index) => index === nextSelectedSectionIndex);
            if (nextSection) {
              this.setSelectedSectionId(nextSection.id);
              this.playIconClick();
            } else {
              this.visibleModal = false;
            }
          } else {
            this.visibleModal = false;
          }
        });
      } else {
        const selectedSectionIndex = this.dataInstance.course!.sections!.findIndex(s => s.id === this.selectedSectionId);
        if (selectedSectionIndex != this.dataInstance.course!.sections!.length - 1) {
          const nextSelectedSectionIndex = selectedSectionIndex + 1;
          const nextSection = this.dataInstance.course!.sections!.find((s, index) => index === nextSelectedSectionIndex);
          if (nextSection) {
            this.setSelectedSectionId(nextSection.id);
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

  render() {
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
                <CourseSectionList dataInstance={this.dataInstance ? this.dataInstance.course!.sections : null}
                                   clickItemHandler={this.clickSection}
                                   selectedItem={this.selectedSectionId}/>
                <hr/>
                <Meta title="Анкета обратной связи" className={"course-section-item course-section-item-feedback"}/>
              </Col>
            </Row>
          </Section>
          {this.visibleModal ? <CourseSectionModal
            onFinishSection={this.finishSection}
            onCloseModal={this.onCloseModal}
            selectedCourseSection={this.selectedCourseSection.item}
            enrollmentId={this.props.entityId}/> : <></>}
        </Spin>
      </Page>);
  }

  componentDidMount() {
    if (this.props.entityId !== EnrollmentManagement.NEW_SUBPATH) {
      this.loadData();
    }
  }

  loadData = () => {
    this.status = "LOADING";
    restQueries.enrollment(this.props.entityId).then((response: SerializedEntity<Enrollment>[]) => {
      if (response && response.length > 0) {
        runInAction(() => {
          this.dataInstance = response[0]
        });
        this.status = "DONE";
      }
    }).catch(() => {
      this.status = "DONE";
    });
  };
}

export default injectIntl(EnrollmentEditComponent);
