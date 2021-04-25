import {action, observable, runInAction} from "mobx";
import {default as React} from "react";
import {getCubaREST, injectMainStore, MainStoreInjected, withLocalizedForm} from "@cuba-platform/react";
import Page from "../../hoc/PageContentHoc";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {RootStoreProp} from "../../store";
import {inject, observer} from "mobx-react";
import {CourseInfo, CourseTrainerInfo, restServices} from "../../../cuba/services";
import {Card, Col, Form, Row} from "antd";
import LoadingPage from "../LoadingPage";
import Notification from "../../util/Notification/Notification";
import Button, {ButtonType} from "../../components/Button/Button";
import Section from "../../hoc/Section";
import moment from "moment";
import {Link} from "react-router-dom";
import {FormComponentProps} from "antd/es/form";
import {CourseReview} from "../../../cuba/entities/base/tsadv$CourseReview";
import {Enrollment} from "../../../cuba/entities/base/tsadv$Enrollment";
import MaterialHeader from "../Material/MaterialHeader";
import MaterialDescription from "../Material/MaterialDescription";
import MaterialTrainerModal from "../Material/MaterialTrainerModal";
import MaterialReviews, {RateRenderMeta} from "../Material/MaterialReviews";
import Rate from "../../components/Rate/Rate";
import {getBlobUrl} from "../../util/util";

type Props = {
  entityId: string;
};

@inject("rootStore")
@injectMainStore
@observer
class CourseEdit extends React.Component<Props & WrappedComponentProps & RootStoreProp & MainStoreInjected & FormComponentProps> {

  rateList: RateRenderMeta[] = [];

  @observable
  dataInstance: CourseInfo;

  @observable
  updated = false;

  @observable
  globalErrors: string[] = [];

  @observable
  sendingComment: boolean = false;

  @observable
  subscribingToCourse: boolean = false;

  @observable
  selectedTrainer: CourseTrainerInfo;

  @observable
  visibleTrainerModal = false;

  showTrainerInfo = (trainerId: string) => {
    restServices.courseService.courseTrainerInfo({trainerId: trainerId}).then(response => {
      this.selectedTrainer = response;
      if (response.image) {
        getCubaREST()!.getFile(response.image.id).then(blob => {
          runInAction(() => {
            this.selectedTrainer = {
              ...this.selectedTrainer,
              image: {
                blob: URL.createObjectURL(blob)
              }
            }
          })
        });
      }
      this.setVisibleTrainerModal(true);
    });
  };

  @action
  setVisibleTrainerModal = (value: boolean) => {
    this.visibleTrainerModal = value;
  };

  changeRate = (value: number) => {
    runInAction(() => {
      this.dataInstance = {
        ...this.dataInstance,
        avgRate: value
      };
      Notification.success({
        message: this.props.intl.formatMessage({id: "course.rate.notification"})
      })
    })
  };

  sendComment = (rate: number, text: string): void => {
    this.sendingComment = true;

    const requestData = {
      rate, text,
      course: {
        id: this.props.entityId
      },
      personGroup: {
        id: this.props.rootStore!.userInfo.personGroupId
      }
    };

    getCubaREST()!.commitEntity(CourseReview.NAME, (requestData as any)).then((response: CourseReview) => {
      this.sendingComment = false;
      Notification.success({
        message: this.props.intl.formatMessage({id: "course.rate.notification"})
      });
      this.load();
    }).catch(() => {
      this.sendingComment = false;
    });
  };

  subscribeToCourse = () => {
    if (!this.dataInstance.selfEnrollment) {
      Notification.error({
        message: this.props.intl.formatMessage({id: "course.error.enrollment.selfEnrollment"})
      });
      return;
    }

    this.subscribingToCourse = true;
    restServices.courseService.validateEnroll({courseId: this.props.entityId, locale: this.props.mainStore!.locale!})
      .then(response => {
        if (response.key) {
          getCubaREST()!.commitEntity(Enrollment.NAME, ({
            personGroup: {
              id: this.props.rootStore!.userInfo.personGroupId!
            },
            status: "APPROVED",
            course: {
              id: this.props.entityId
            },
            date: moment().toISOString()
          } as Enrollment))
            .then(() => {
              this.subscribingToCourse = false;

              Notification.success({
                message: this.props.intl.formatMessage({id: "course.notification.enrollment"})
              });
              this.load();
            }).catch(() => {
            this.subscribingToCourse = false;
          })
        } else {
          Notification.error({
            message: response.value
          });
          this.subscribingToCourse = false;
        }
      })
      .catch(() => {
        this.subscribingToCourse = false;
      });
  };

  render() {
    if (!this.dataInstance) {
      return <LoadingPage/>
    }

    return (
      <Page>
        <Card className="narrow-layout card-actions-container" actions={[
          <Link to={"/course"}>
            <Button buttonType={ButtonType.FOLLOW}>
              <FormattedMessage id="back"/>
            </Button>
          </Link>
        ]} bordered={false}>
          <div className={"course-edit-container"}>
            <Section size={"large"}>
              <MaterialHeader
                name={this.dataInstance.name}
                finished={this.dataInstance.finished}
                avgRate={this.dataInstance.avgRate}
                enrollmentId={this.dataInstance.enrollmentId}
                materialInfoType="course"
                imageProps={{
                  type: "promise",
                  imgSrcProp: getBlobUrl(this.dataInstance.logo)
                }}
                reviewsCount={this.dataInstance.rateReviewCount}
                subscribe={this.subscribeToCourse}
                subscribing={this.subscribingToCourse}
              />
            </Section>
            <Section size={"large"} sectionName={this.props.intl.formatMessage({id: "course.information"})}>
              <MaterialDescription descriptionHtml={this.dataInstance.description}>
                <Row>
                  <Col span={5}>
                    <Form.Item label={this.props.intl.formatMessage({id: "course.trainers"})} className={"form-item break-words"}
                               key='trainers'>
                      {this.dataInstance.trainers.map((trainer: any) => <a className={"default-link"}
                                                                           style={{marginRight: '10px'}}
                                                                           onClick={() => {
                                                                             this.showTrainerInfo(trainer.key)
                                                                           }}>{trainer.value}</a>)}
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item label={this.props.intl.formatMessage({id: "course.prerequisition"})}
                               className="form-item break-words"
                               key='preRequisitions'>
                      {this.dataInstance.preRequisitions}
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item label={this.props.intl.formatMessage({id: "course.duration"})} className={"form-item break-words"}
                               key='duration'>
                      {this.dataInstance.educationDuration}
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item label={this.props.intl.formatMessage({id: "course.period"})} className={"form-item break-words"}
                               key='duration'>
                      {this.dataInstance.educationPeriod}
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item label={this.props.intl.formatMessage({id: "course.confirm"})} className={"form-item break-words"}
                               key='certificate'>
                      {/*<span>{this.props.intl.formatMessage({id: "course.certificate." + this.dataInstance.isIssuedCertificate})}</span>*/}
                      <span>{this.dataInstance.learningProof}</span>
                    </Form.Item>
                  </Col>
                </Row>
              </MaterialDescription>
            </Section>
            <Section sectionName={this.props.intl.formatMessage({id: "reviews"})} size={"large"}>
              <MaterialReviews avgRate={this.dataInstance.avgRate}
                               comments={this.dataInstance.comments}
                               rateList={this.rateList}
                               sendComment={this.sendComment}
                               sendingComment={this.sendingComment}/>
            </Section>
          </div>
        </Card>
        <MaterialTrainerModal trainer={this.selectedTrainer} setVisibleTrainerModal={this.setVisibleTrainerModal}
                              visibleTrainerModal={this.visibleTrainerModal}/>
      </Page>
    );
  }

  componentDidMount() {
    this.load();
  }

  load = () => {
    this.rateList = [];
    restServices.courseService.courseInfo({
      courseId: this.props.entityId,
      personGroupId: this.props.rootStore!.userInfo.personGroupId!
    }).then(courseInfo => {
      runInAction(() => {
        this.dataInstance = courseInfo;

        for (let i = 5; i > 0; i--) {
          const rateCount = this.dataInstance.rating.find(r => r.key === i);

          this.rateList.push({
            rate: <Rate disabled value={i} key={i}/>,
            finished: rateCount ? rateCount.value : 0
          })
        }
      })
    })
  };

  componentWillUnmount() {
  }
}

export default injectIntl(withLocalizedForm<Props>({
  onValuesChange: (props: any, changedValues: any) => {
    // Reset server-side errors when field is edited
    Object.keys(changedValues).forEach((fieldName: string) => {
      props.form.setFields({
        [fieldName]: {
          value: changedValues[fieldName]
        }
      });
    });
  }
})(CourseEdit));