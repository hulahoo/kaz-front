import React, {Component, createElement, Fragment} from 'react';
import {observer} from "mobx-react";
import {BprocFormOutcome} from "../../../../cuba/entities/bproc/bproc_FormOutcome";
import {RouteComponentProps, withRouter} from "react-router";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {Form, Modal} from "antd";
import Button, {ButtonType} from "../../../components/Button/Button";
import TextArea from "antd/es/input/TextArea";
import {observable} from "mobx";
import {restServices} from "../../../../cuba/services";
import Notification from "../../../util/Notification/Notification";
import {ExtTaskData} from "../../../../cuba/entities/base/tsadv_ExtTaskData";
import {WrappedFormUtils} from "antd/lib/form/Form";

type Props = {
  outcome: BprocFormOutcome
  task: ExtTaskData | null;
  afterSendOnApprove?: () => void;
  validate?(): Promise<boolean>;
  update?(): Promise<any>;
  commentRequiredOutcomes?: string[],
  beforeCompletePredicate?: (outcome: string) => Promise<boolean>;
  form: WrappedFormUtils;
  setOpenedOutcomeModal: (value: string | null) => void,
  openedOutcomeModal: string | null;
}

@observer
class OutcomeButtonModal extends Component<Props & WrappedComponentProps & RouteComponentProps> {

  @observable
  modalVisibleMap = new Map<string, boolean>();

  showModal = (outcome: BprocFormOutcome) => {
    const setModalVisible = () => {
      if (this.props.beforeCompletePredicate) {
        this.props.beforeCompletePredicate(outcome.id!).then(value => {
          this.modalVisibleMap.set(outcome.id!, value);
          if ((value as boolean)) {
            this.props.setOpenedOutcomeModal(outcome.id!);
          }
        });
      } else {
        this.modalVisibleMap.set(outcome.id!, true);
        this.props.setOpenedOutcomeModal(outcome.id!);
      }
    };

    if (this.modalVisibleMap.get(outcome.id!) !== true) {
      if (this.props.validate)
        this.props.validate().then((isValid) => {
          if (isValid) setModalVisible();
        }).catch(reason => {
          Notification.error({
              message: this.props.intl.formatMessage({
                id: "management.editor.validationError"
              })
            }
          );
        });
      else setModalVisible();
    }
  };

  handleOk = (outcome: BprocFormOutcome) => {
    this.props.form.validateFields(["bproc-comment"], {force: true}, (err, values) => {
      if (err) {
        Notification.error({
            message: this.props.intl.formatMessage({
              id: "management.editor.validationError"
            })
          }
        );
        return;
      }

      if (this.props.update)
        this.props.update().then(value => this.completeWithOutcome(outcome))
          .catch((e: any) => {
            Notification.error({
              message: this.props.intl.formatMessage({id: "management.editor.error"})
            });
          });
      else this.completeWithOutcome(outcome);
    });
  };

  completeWithOutcome = (outcome: BprocFormOutcome) => {
    return restServices.bprocTaskService.completeWithOutcome({
      taskData: this.props.task!,
      outcomeId: outcome.id!,
      processVariables: {
        "comment": this.props.form.getFieldValue("bproc-comment")
      }
    })
      .then(value => {
        this.modalVisibleMap.set(outcome.id!, false);
        this.props.setOpenedOutcomeModal(null);
        if (this.props.afterSendOnApprove) {
          this.props.afterSendOnApprove();
        }
        Notification.success({
          message: this.props.intl.formatMessage({id: "bproc." + outcome.id + ".success"})
        });
      })
      .catch((e: any) => {
        Notification.error({
          message: this.props.intl.formatMessage({id: "management.editor.error"})
        });
      });
  }

  handleCancel = (outcome: BprocFormOutcome) => {
    this.modalVisibleMap.set(outcome.id!, false);
    this.props.setOpenedOutcomeModal(null);
    this.props.form.resetFields(["bproc-comment"]);
  };

  commentValidator = (rule: any, value: any, callback: any) => {
    if (!value
      && this.props.commentRequiredOutcomes && this.props.commentRequiredOutcomes.find(o => o == this.props.openedOutcomeModal)) {
      callback(this.props.intl.formatMessage({id: 'comment.required'}));
      return;
    }
    callback();
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {outcome} = this.props;
    const title = this.props.intl.formatMessage({id: outcome.id!});

    return <Button buttonType={ButtonType.PRIMARY}
                   className={outcome.id!.toLowerCase()}
                   onClickCapture={() => this.showModal(outcome)}
                   key={outcome.id}>
      {title}
      <Modal
        title={title}
        visible={this.modalVisibleMap.get(outcome.id!)}
        onOk={this.handleOk.bind(null, outcome)}
        onCancel={this.handleCancel.bind(null, outcome)}>
        <Form.Item>
          {createElement(Fragment, null, this.props.intl.formatMessage({id: 'comment'}))}
          {getFieldDecorator("bproc-comment", {
            rules: [{
              validator: this.commentValidator
            }]
          })(
            <TextArea
              rows={4}/>
          )}
        </Form.Item>
      </Modal>
    </Button>;
  }
}

export default injectIntl(withRouter(OutcomeButtonModal));