import React, {Component} from 'react';
import {Col, Form, Modal, Row} from "antd";
import {CourseTrainerInfo} from "../../../cuba/services";
import {injectIntl, WrappedComponentProps} from "react-intl";

type MaterialTrainerModalProps = {
  trainer?: CourseTrainerInfo;
  visibleTrainerModal: boolean;
}

type MaterialTrainerModalHandler = {
  setVisibleTrainerModal?: (visible: boolean) => void
}

class MaterialTrainerModal extends Component<MaterialTrainerModalProps & MaterialTrainerModalHandler & WrappedComponentProps> {
  render() {
    const {trainer, visibleTrainerModal, setVisibleTrainerModal} = this.props;
    if (!trainer) {
      return null;
    }

    return (
      <Modal
        visible={visibleTrainerModal}
        footer={null}
        onCancel={setVisibleTrainerModal ? setVisibleTrainerModal.bind(null, false) : null}
        destroyOnClose={true}
        width={725}
      >
        <div className="course-trainer-modal">
          <Row style={{marginTop: '20px'}} type={"flex"} justify="center">
            <Col sm={7} xs={24} style={{'display': 'flex', 'align-items': 'center'}}>
              <div className="course-trainer-modal-image">
                {trainer.image ? <img alt={trainer.fullName}
                                      src={trainer.image.blob}/> :
                  <img alt={trainer.fullName}
                       src={require("../../../resources/img/default-user.svg")}/>}
              </div>
            </Col>
            <Col sm={1} xs={0}>
            </Col>
            <Col sm={16} xs={24}>
              <div className="course-trainer-modal-content">
                <Row className={"centered-text"}>
                  <div className="header-default">
                    {trainer.fullName}
                  </div>
                </Row>
                <Row>
                  <Col className={"form-item-container"} style={{marginTop: '32px'}}>
                    <Form.Item
                      label={this.props.intl.formatMessage({id: "course.students"})}
                      className={"form-item"}
                      key='finished'>{
                      <span>{trainer.finished}</span>
                    }
                    </Form.Item>
                  </Col>
                  <Col className={"form-item-container"}>
                    <Form.Item label={this.props.intl.formatMessage({id: "course.courses"})} className={"form-item"}
                               key='courseCount'>{
                      <span>{trainer.courseCount}</span>
                    }
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Form.Item label={this.props.intl.formatMessage({id: "course.greetingTrainer"})}
                             className={"form-item"}
                             key='finished'>
                    {trainer.greeting}
                  </Form.Item>
                </Row>
                <Row>
                  <Form.Item label={this.props.intl.formatMessage({id: "course.trainerInformation"})}
                             className={"form-item"}
                             key='trainerInfo'>
                    {trainer.information}
                  </Form.Item>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
    );
  }
}

export default injectIntl(MaterialTrainerModal);