import React, {Component} from 'react';
import {observer} from "mobx-react";
import {BprocFormOutcome} from "../../../../cuba/entities/bproc/bproc_FormOutcome";
import {withLocalizedForm} from "@cuba-platform/react";
import {RouteComponentProps, withRouter} from "react-router";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {Form, Modal} from "antd";
import Button, {ButtonType} from "../../../components/Button/Button";
import TextArea from "antd/es/input/TextArea";
import {FormComponentProps} from "antd/es/form";
import {observable} from "mobx";
import {restServices} from "../../../../cuba/services";
import Notification from "../../../util/Notification/Notification";
import {ExtTaskData} from "../../../../cuba/entities/base/tsadv_ExtTaskData";

type Props = {
  outcome: BprocFormOutcome
  task: ExtTaskData | null;
  afterSendOnApprove?: () => void;
}

@observer
class OutcomeButtonModal extends Component<Props & WrappedComponentProps & RouteComponentProps & FormComponentProps> {

  @observable
  modalVisibleMap = new Map<string, boolean>();

  showModal = (outcome: BprocFormOutcome) => {
    this.modalVisibleMap.set(outcome.id!, true);
  };

  handleOk = (outcome: BprocFormOutcome) => {
    this.props.form.validateFields((err, values) => {
      if (err) {
        Notification.error({
            message: this.props.intl.formatMessage({
              id: "management.editor.validationError"
            })
          }
        );
        return;
      }
      restServices.bprocTaskService.completeWithOutcome({
        taskData: this.props.task!,
        outcomeId: outcome.id!,
        processVariables: {
          "comment": this.props.form.getFieldValue("comment")
        }
      })
        .then(value => {
          this.modalVisibleMap.set(outcome.id!, false);
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
    });
  };

  handleCancel = (outcome: BprocFormOutcome) => {
    this.modalVisibleMap.set(outcome.id!, false);
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {outcome} = this.props;
    const title = this.props.intl.formatMessage({id: outcome.id!});

    return <Button buttonType={ButtonType.FOLLOW}
                   onClickCapture={() => this.showModal(outcome)}
                   key={outcome.id}>
      {title}
      <Modal
        title={title}
        visible={this.modalVisibleMap.get(outcome.id!)}
        onOk={this.handleOk.bind(null, outcome)}
        onCancel={() => this.handleCancel(outcome)}>
        <Form.Item>
          {getFieldDecorator("comment", {
            rules: [{required: (outcome.id === "REJECT" || outcome.id === "REVISION"), message: "Необходимо заполнить комментарий"}]
          })(
            <TextArea
              rows={4}/>
          )}
        </Form.Item>
      </Modal>
    </Button>;
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
})(withRouter(OutcomeButtonModal)));