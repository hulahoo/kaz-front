import {action, observable, runInAction} from "mobx";
import {default as React} from "react";
import {getCubaREST, injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import Page from "../../hoc/PageContentHoc";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {RootStoreProp} from "../../store";
import {inject, observer} from "mobx-react";
import {CourseInfo, CourseTrainerInfo, restServices} from "../../../cuba/services";
import {Col, Collapse, Form, List, Modal, Rate, Row} from "antd";
import LoadingPage from "../LoadingPage";
import Notification from "../../util/notification/Notification";
import Button, {ButtonType} from "../../components/Button/Button";
import Section from "../../hoc/Section";
import moment from "moment";

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
class CourseEdit extends React.Component<Props & WrappedComponentProps & RootStoreProp & MainStoreInjected> {

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

  changeRate = (value: number) => {
    runInAction(() => {
      this.dataInstance = {
        ...this.dataInstance,
        avgRate: value
      };
      Notification.success({
        message: "Спасибо за оценку"
      })
    })
  };

  showTrainerInfo = (trainerId: string) => {
    restServices.courseService.courseTrainerInfo({trainerId: trainerId}).then(response => {
      getCubaREST()!.getFile(response.image.id).then(blob => {
        response.image.blob = URL.createObjectURL(blob);
        this.selectedTrainer = response;
      });

      this.setVisibleTrainerModal(true);
    });
  };

  @action
  setVisibleTrainerModal = (value: boolean) => {
    this.visibleTrainerModal = value;
  };

  render() {
    if (!this.dataInstance) {
      return <LoadingPage/>
    }

    const {Panel} = Collapse;
    return (
      <Page>
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
                    ({this.dataInstance.rateReviewCount} оценок)
                  </>
                </div>
                <div className={"course-info-feedback"}>
                  <Row>
                    <Col style={{display: 'inline-block'}}>
                      <Form.Item label={"Сотрудников прошли курс"} className={"form-item"}
                                 key='finished'>{
                        <span>{this.dataInstance.finished}</span>
                      }
                      </Form.Item>
                    </Col>
                    <Col style={{display: 'inline-block'}}>
                      <Form.Item label={"Отзывов о курсе"} className={"form-item"}
                                 key='finished'>{
                        <span>{this.dataInstance.comments.length}</span>
                      }
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
                <Button buttonType={ButtonType.PRIMARY}>Записаться на курс</Button>
              </Col>
              <Col span={8}>
                <div className="course-info-image">
                  <img alt={this.dataInstance.logo}
                       src={this.dataInstance.logo ? "data:image/png;base64, " + this.dataInstance.logo : undefined}/>
                </div>
              </Col>
            </Row>
          </Section>
          <Section size={"large"} sectionName={"Информация о курсе"}>
            <Row>
              <Col span={6}>
                <Form.Item label={"Тренеры"} className={"form-item"}
                           key='trainers'>
                  {this.dataInstance.trainers.map((trainer: any) => <a className={"default-link"}
                                                                       style={{marginRight: '10px'}}
                                                                       onClick={() => {
                                                                         this.showTrainerInfo(trainer.key)
                                                                       }}>{trainer.value}</a>)}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={"Продолжительность дней"} className={"form-item"}
                           key='duration'>
                  {this.dataInstance.endDate.diff(this.dataInstance.startDate, 'days') ? this.dataInstance.endDate.diff(this.dataInstance.startDate, 'days') : ""}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={"Пререквизиты"} className={"form-item"}
                           key='preRequisitions'>
                  {this.dataInstance.preRequisitions}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={"Сертификат"} className={"form-item"}
                           key='certificate'>
                  <span>{this.props.intl.formatMessage({id: "course.certificate." + this.dataInstance.isIssuedCertificate})}</span>
                </Form.Item>
              </Col>
            </Row>
            <Collapse bordered={false} style={{backgroundColor: "white"}}>
              <Panel header="Разделы курса" key="1">
                <List
                  itemLayout="horizontal"
                  dataSource={this.dataInstance.sections}
                  renderItem={item => (
                    <List.Item
                      style={{backgroundColor: "#F3F3F3", margin: '5px 0', borderRadius: '4px', border: 'none'}}>
                      <List.Item.Meta
                        title={<span style={{marginLeft: '10px'}}>{item.value}</span>}
                      />
                    </List.Item>
                  )}
                />
              </Panel>
            </Collapse>
          </Section>
          <Section sectionName={"Отзывы студентов"} size={"large"}>
            <Row type={"flex"}>
              <Col span={6} className={"centered-flex-container"}>
                <div className={"large-rate centered-flex-container"}>
                  <span className={"large-text"}>{this.dataInstance.avgRate}</span>
                  <Rate allowHalf disabled value={this.dataInstance.avgRate}/>
                  <span className="default-font">Рейтинг курса</span>
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
                          <div>{item.finished} студентов</div>
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
                        <Form.Item label={"Студентов"} className={"form-item"}
                                   key='finished'>{
                          <span>{this.selectedTrainer.finished}</span>
                        }
                        </Form.Item>
                      </Col>
                      <Col className={"form-item-container"}>
                        <Form.Item label={"Курсов"} className={"form-item"}
                                   key='courseCount'>{
                          <span>{this.selectedTrainer.courseCount}</span>
                        }
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Form.Item label={"Приветствие тренера"} className={"form-item"}
                                 key='finished'>
                        {"Тут должно быть приветствие от тренера с наилучшими пожеланиями"}
                      </Form.Item>
                    </Row>
                    <Row>
                      <Form.Item label={"Информация о тренере"} className={"form-item"}
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
      </Page>
    );
  }

  componentDidMount() {
    restServices.courseService.courseInfo({courseId: this.props.entityId}).then(courseInfo => {
      runInAction(() => {
        this.dataInstance = courseInfo;

        for (let i = 5; i > 0; i--) {
          const rateCount = this.dataInstance.rating.find(r => r.key === i);

          this.rateList.push({
            rate: <Rate disabled value={i}/>,
            finished: rateCount ? rateCount.value : 0
          })
        }
      })
    })
  }

  componentWillUnmount() {
  }
}

export default injectIntl(CourseEdit);