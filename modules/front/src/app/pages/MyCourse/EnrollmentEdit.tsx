import * as React from "react";
import {observer} from "mobx-react";
import {action, observable, runInAction} from "mobx";
import {injectIntl, WrappedComponentProps} from "react-intl";

import {DataContainerStatus,} from "@cuba-platform/react";

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
  selectedSection: CourseSection;

  @observable
  visibleModal: boolean = false;

  clickSection = (e: React.MouseEvent<HTMLDivElement>) => {
    const courseSectionId = e.currentTarget.children.item(0)!.id;

    this.status = "LOADING";
    restServices.lmsService.loadCourseSectionData({
      enrollmentId: this.props.entityId,
      courseSectionId: courseSectionId
    }).then((courseSection) => {
      this.setSelectedSection(courseSection);
      this.loadData();
    })
  };

  playIconClick = () => {
    if (!this.selectedSection) {
      Notification.info({
        message: "Не выбран раздел курса"
      });
      return;
    }

    this.setVisibleModal(true);
  };

  @action
  setSelectedSection = (value: CourseSection) => {
    this.selectedSection = value;
  };

  @action
  setVisibleModal = (value: boolean) => {
    this.visibleModal = value;
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
                                   selectedItem={this.selectedSection ? this.selectedSection.id : null}/>
                <hr/>
                <Meta title="Анкета обратной связи" className={"course-section-item course-section-item-feedback"}/>
              </Col>
            </Row>
          </Section>
        </Spin>
        <Modal visible={this.visibleModal}
               onCancel={() => this.setVisibleModal(false)}
               footer={null}
               width={900}
               destroyOnClose>
          {this.selectedSection ? this.getSectionBody(this.selectedSection) : null}
        </Modal>
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
        })
        this.status = "DONE";
      }
    }).catch(() => {
      this.status = "DONE";
    });
  };

//TODO: переписать
  getSectionBody = (cs: CourseSection) => {
    if (!cs.sectionObject) {
      Notification.error({message: "У раздела отсутствует объект раздела!"});
      return;
    }

    if (cs.sectionObject.test) {
      return <Card className={"modal-body"} actions={[<Button buttonType={ButtonType.PRIMARY}>Завершить тест</Button>]}>
        <Test test={{
          enrollmentId: this.props.entityId,
          courseSectionObjectId: cs.sectionObject.id
        }}/>
      </Card>
    } else if (cs.sectionObject.content) {
      if (cs.sectionObject.content.contentType === "HTML") {
        return <Card className={"modal-body"}>
          <div dangerouslySetInnerHTML={{__html: cs.sectionObject.content.html!}}
               style={{width: '100%', height: '500px'}}/>
        </Card>
      }
      if (cs.sectionObject.content.contentType === "URL") {
        return <Card className={"modal-body"}>
          <div style={{width: '100%', height: '500px'}}>
            <iframe width="100%" height="100%" src={cs.sectionObject.content.url!}/>
          </div>
        </Card>
      }
      if (cs.sectionObject.content.contentType === "VIDEO") {
        return <Card className={"modal-body"}>
          <div style={{width: '100%', height: '500px'}}>
            <Video fileId={cs.sectionObject.content.file!.id!}/>
          </div>
        </Card>
      }
    }
    return null;
  };

}

export default injectIntl(EnrollmentEditComponent);
