import {action, observable, runInAction} from "mobx";
import {default as React, FormEvent} from "react";
import {getCubaREST, injectMainStore, MainStoreInjected, withLocalizedForm} from "@cuba-platform/react";
import Page from "../../hoc/PageContentHoc";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {RootStoreProp} from "../../store";
import {inject, observer} from "mobx-react";
import {CourseInfo, CourseTrainerInfo, restServices} from "../../../cuba/services";
import {Card, Col, Form, Input, List, Modal, Rate, Row, Spin} from "antd";
import LoadingPage from "../LoadingPage";
import Notification from "../../util/notification/Notification";
import Button, {ButtonType} from "../../components/Button/Button";
import Section from "../../hoc/Section";
import moment from "moment";
import {Link} from "react-router-dom";
import {FormComponentProps} from "antd/es/form";
import {CourseRequest} from "../../../cuba/entities/base/tsadv$CourseRequest";
import {CourseReview} from "../../../cuba/entities/base/tsadv$CourseReview";
import {Enrollment} from "../../../cuba/entities/base/tsadv$Enrollment";

type Props = {
  entityId: string;
};

type RateRenderMeta = {
  rate: React.ReactNode,
  finished: number
}

@inject("rootStore")
@injectMainStore
@observer
class CourseEdit extends React.Component<Props & WrappedComponentProps & RootStoreProp & MainStoreInjected & FormComponentProps> {

  rateList: RateRenderMeta[] = [];

  @observable
  dataInstance: CourseInfo;

  @observable
  visibleTrainerModal = false;

  @observable
  updated = false;

  @observable
  selectedTrainer: CourseTrainerInfo;

  @observable
  globalErrors: string[] = [];

  @observable
  sendingComment = false;

  @observable
  subscribingToCourse: boolean = false;

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

  submitCommentForm = (e: FormEvent) => {
    e.preventDefault();
    this.sendingComment = true;

    const requestData = {
      ...this.props.form.getFieldsValue(),
      course: {
        id: this.props.entityId
      },
      personGroup: {
        id: this.props.rootStore!.userInfo.personGroupId
      }
    };

    getCubaREST()!.commitEntity(CourseReview.NAME, (requestData as any)).then((response: CourseReview) => {
      this.sendingComment = false;
      this.props.form.resetFields();
      this.props.form.setFieldsValue({
        rate: null
      });

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
      .then(response => {
        this.subscribingToCourse = false;

        Notification.success({
          message: this.props.intl.formatMessage({id: "course.notification.enrollment"})
        });
        this.load();
      }).catch(() => {
      this.subscribingToCourse = false;
    })
  };

  @action
  setVisibleTrainerModal = (value: boolean) => {
    this.visibleTrainerModal = value;
  };

  render() {
    if (!this.dataInstance) {
      return <LoadingPage/>
    }

    const {TextArea} = Input;

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
              <Row>
                <Col span={16}>
                  <div className="course-info-container">
                    <div className={"course-name"}><span>{this.dataInstance.name}</span></div>
                  </div>
                  <div className={"course-info-rate form-item"} style={{marginTop: '32px'}}>
                    <><Rate className={"rate-container"} value={this.dataInstance.avgRate} allowHalf disabled
                            onChange={this.changeRate}/>
                      ({this.dataInstance.rateReviewCount} {this.props.intl.formatMessage({id: "course.ratingCount"})})
                    </>
                  </div>
                  <div className={"course-info-feedback"}>
                    <Row>
                      <Col style={{display: 'inline-block'}}>
                        <Form.Item label={this.props.intl.formatMessage({id: "course.studentFinished"})}
                                   className={"form-item"}
                                   key='finished'>{
                          <span>{this.dataInstance.finished}</span>
                        }
                        </Form.Item>
                      </Col>
                      <Col style={{display: 'inline-block'}}>
                        <Form.Item label={this.props.intl.formatMessage({id: "course.reviewCount"})}
                                   className={"form-item"}
                                   key='finished'>{
                          <span>{this.dataInstance.comments.length}</span>
                        }
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                  {this.dataInstance.hasEnrollment ?
                    <FormattedMessage id={this.props.intl.formatMessage({id: "course.enrolled"})}/> :
                    <Button buttonType={ButtonType.PRIMARY} loading={this.subscribingToCourse}
                            onClick={this.subscribeToCourse}>{this.props.intl.formatMessage({id: "course.subscribe"})}</Button>}
                </Col>
                <Col span={8}>
                  <div className="course-info-image">
                    <img alt={this.dataInstance.logo}
                         src={this.dataInstance.logo ? "data:image/png;base64, " + this.dataInstance.logo : undefined}/>
                  </div>
                </Col>
              </Row>
            </Section>
            <Section size={"large"} sectionName={this.props.intl.formatMessage({id: "course.information"})}>
              <Row>
                <Col>
                  <Form.Item label={this.props.intl.formatMessage({id: "course.description"})} className={"form-item"}
                             key='description'>
                    {this.dataInstance.description ?
                      <div dangerouslySetInnerHTML={{__html: this.dataInstance.description}}/> : <></>}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={5}>
                  <Form.Item label={this.props.intl.formatMessage({id: "course.trainers"})} className={"form-item"}
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
                             className={"form-item"}
                             key='preRequisitions'>
                    {this.dataInstance.preRequisitions}
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item label={this.props.intl.formatMessage({id: "course.duration"})} className={"form-item"}
                             key='duration'>
                    {this.dataInstance.educationDuration}
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item label={this.props.intl.formatMessage({id: "course.period"})} className={"form-item"}
                             key='duration'>
                    {this.dataInstance.educationPeriod}
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label={this.props.intl.formatMessage({id: "course.confirm"})} className={"form-item"}
                             key='certificate'>
                    <span>{this.props.intl.formatMessage({id: "course.certificate." + this.dataInstance.isIssuedCertificate})}</span>
                  </Form.Item>
                </Col>
              </Row>
            </Section>
            <Section sectionName={this.props.intl.formatMessage({id: "course.studentReviews"})} size={"large"}>
              <Row type={"flex"}>
                <Col span={6} className={"centered-flex-container"}>
                  <div className={"large-rate centered-flex-container"}>
                    <span className={"large-text"}>{this.dataInstance.avgRate.toFixed(1)}</span>
                    <Rate allowHalf disabled value={this.dataInstance.avgRate}/>
                    <span className="default-font">{this.props.intl.formatMessage({id: "course.rating"})}</span>
                  </div>
                </Col>
                <Col span={18}>
                  <List className={"rates-list"}
                        itemLayout="horizontal"
                        dataSource={this.rateList}
                        renderItem={item => (
                          <List.Item
                            style={{}}>
                            <List.Item.Meta
                              title={item.rate}
                            />
                            <div>{item.finished} {this.props.intl.formatMessage({id: "course.students"})}</div>
                          </List.Item>
                        )}
                  />
                </Col>
              </Row>
              {this.dataInstance && this.dataInstance.comments.length > 0
                ? <Row>
                  <List itemLayout="horizontal"
                        dataSource={this.dataInstance.comments}
                        renderItem={item => (
                          <List.Item
                            style={{backgroundColor: "#F3F3F3", margin: '5px 0', borderRadius: '4px', border: 'none'}}>
                            <List.Item.Meta
                              style={{margin: '0 5px'}}
                              title={<div className={"comment-header"}
                                          style={{display: 'flex', justifyContent: "space-between"}}>
                                <div className="comment-name default-font">{item.user}</div>
                                <div className="comment-date">{moment(item.date).format('DD.MM.yyyy')}</div>
                              </div>}
                              description={<span className="default-font">{item.comment}</span>}
                            />
                          </List.Item>
                        )}
                  />
                </Row>
                : <> </>}
              <Row>
                <Col>
                  <Spin tip={this.props.intl.formatMessage({id: "course.sendingReview"})}
                        spinning={this.sendingComment}>
                    <Card bordered={false} style={{marginTop: '20px'}}>
                      <Form onSubmit={this.submitCommentForm}>
                        {this.props.form.getFieldDecorator("rate")(
                          <Rate/>
                        )}
                        {this.props.form.getFieldDecorator("text")(
                          <TextArea/>
                        )}
                        <Row type="flex" justify="end">
                          <Col>
                            <Button buttonType={ButtonType.FOLLOW} style={{marginTop: '10px'}} htmlType={"submit"}>
                              {this.props.intl.formatMessage({id: "course.sendComment"})}
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </Card>
                  </Spin>
                </Col>
              </Row>
            </Section>
          </div>
          {this.selectedTrainer ? <Modal
              visible={this.visibleTrainerModal}
              footer={null}
              onCancel={() => this.setVisibleTrainerModal(false)}
              destroyOnClose={true}
              width={725}
            >
              <div className="course-trainer-modal">
                <Row style={{marginTop: '20px'}} type={"flex"} justify="center">
                  <Col sm={7} xs={24} style={{'display': 'flex', 'align-items': 'center'}}>
                    <div className="course-trainer-modal-image">
                      {this.selectedTrainer.image ? <img alt={this.selectedTrainer.fullName}
                                                         src={this.selectedTrainer.image.blob}/> :
                        <img alt={this.dataInstance.logo}
                             src={require("../../../resources/img/default-user.svg")}/>}
                    </div>
                  </Col>
                  <Col sm={1} xs={0}>
                  </Col>
                  <Col sm={16} xs={24}>
                    <div className="course-trainer-modal-content">
                      <Row className={"centered-text"}>
                        <div className="header-default">
                          {this.selectedTrainer.fullName}
                        </div>
                      </Row>
                      <Row>
                        <Col className={"form-item-container"} style={{marginTop: '32px'}}>
                          <Form.Item
                            label={this.props.intl.formatMessage({id: "course.students"})[0].toUpperCase() + "" + this.props.intl.formatMessage({id: "course.students"}).slice(1, this.props.intl.formatMessage({id: "course.students"}).length - 1)}
                            className={"form-item"}
                            key='finished'>{
                            <span>{this.selectedTrainer.finished}</span>
                          }
                          </Form.Item>
                        </Col>
                        <Col className={"form-item-container"}>
                          <Form.Item label={this.props.intl.formatMessage({id: "course.courses"})} className={"form-item"}
                                     key='courseCount'>{
                            <span>{this.selectedTrainer.courseCount}</span>
                          }
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Form.Item label={this.props.intl.formatMessage({id: "course.greetingTrainer"})} className={"form-item"}
                                   key='finished'>
                          {"Тут должно быть приветствие от тренера с наилучшими пожеланиями"}
                        </Form.Item>
                      </Row>
                      <Row>
                        <Form.Item label={this.props.intl.formatMessage({id: "course.trainerInformation"})} className={"form-item"}
                                   key='trainerInfo'>
                          {"Тут должна быть информация о тренере с наилучшими пожеланиями"}
                        </Form.Item>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
            </Modal>
            : <></>}
        </Card>
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