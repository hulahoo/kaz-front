import React from "react";
import {BprocFormData} from "../../../../cuba/entities/bproc/bproc_FormData";
import {ExtTaskData} from "../../../../cuba/entities/base/tsadv_ExtTaskData";
import {DataInstanceStore} from "@cuba-platform/react/dist/data/Instance";
import {AbstractBprocRequest} from "../../../../cuba/entities/base/AbstractBprocRequest";
import {BprocFormOutcome} from "../../../../cuba/entities/bproc/bproc_FormOutcome";
import {ProcessInstanceData} from "../../../../cuba/entities/base/bproc_ProcessInstanceData";
import Button, {ButtonType} from "../../../components/Button/Button";
import {injectMainStore} from "@cuba-platform/react";
import {inject, observer} from "mobx-react";
import {observable} from "mobx";
import StartBprocModal from "../modal/StartBprocModal";
import {Modal} from "antd";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import {restServices} from "../../../../cuba/services";
import {WrappedFormUtils} from "antd/lib/form/Form";
import TextArea from "antd/es/input/TextArea";
import {injectIntl, WrappedComponentProps} from "react-intl";
import Notification from "../../../util/notification/Notification";

type TaskProps = {
  dataInstance: DataInstanceStore<AbstractBprocRequest>;
  formData: BprocFormData;
  validate(): void;
  update(): void;
  isValidatedSuccess(): boolean;
  isStartForm: boolean;
  task: ExtTaskData | null;
  processInstanceData: ProcessInstanceData | null;
  processDefinitionKey: string;
  redirectPath: string;
  form: WrappedFormUtils
};

@inject("rootStore")
@injectMainStore
@observer
class BprocButtons extends React.Component<TaskProps & WrappedComponentProps & RouteComponentProps> {

  @observable
  modalVisibleMap = new Map<string, boolean>();

  @observable
  isRedirectPath = false;

  comment: string | null;

  showModal = (outcome: BprocFormOutcome) => {
    this.modalVisibleMap.set(outcome.id!, true);
  };

  setComment = (comment: string | null) => {
    this.comment = comment;
  };

  handleOk = (outcome: BprocFormOutcome) => {
    this.modalVisibleMap.set(outcome.id!, false);

    restServices.bprocTaskService.completeWithOutcome({
      taskData: this.props.task!,
      outcomeId: outcome.id!,
      processVariables: {
        "comment": this.comment
      }
    })
      .then(value => {
        Notification.success({
          message: this.props.intl.formatMessage({id: "bproc." + outcome.id + ".success"})
        });
      })
    this.isRedirectPath = true;
  };

  handleCancel = (outcome: BprocFormOutcome) => {
    this.modalVisibleMap.set(outcome.id!, false);
  };

  OutcomeButton = (outcome: BprocFormOutcome) => {
    const title = this.props.intl.formatMessage({id: outcome.id!});
    return <Button buttonType={ButtonType.FOLLOW}
                   onClickCapture={() => this.showModal(outcome)}
                   key={outcome.id}>
      {title}
      <Modal
        title={title}
        visible={this.modalVisibleMap.get(outcome.id!)}
        onOk={() => this.handleOk(outcome)}
        onCancel={() => this.handleCancel(outcome)}>
        <TextArea
          onChange={event => {
            const {value} = event.currentTarget;
            this.setComment(value);
          }}
          rows={4}
          id={outcome.id + "_textArea"}
          required={outcome.id !== "APPROVE"}/>
      </Modal>
    </Button>;
  }

  StartForm = () => {
    return <StartBprocModal
      employee={null}
      validate={this.props.validate}
      update={this.props.update}
      isValidatedSuccess={this.props.isValidatedSuccess}
      dataInstance={this.props.dataInstance}
      form={this.props.form}
      processDefinitionKey={this.props.processDefinitionKey}/>
  }

  render() {
    if (this.isRedirectPath)
      return <Redirect to={this.props.redirectPath}/>;
    return this.props.isStartForm
      ? this.StartForm() : this.props.formData.outcomes
        ? this.props.formData.outcomes.map(value => this.OutcomeButton(value))
        : "";
  }
}

export default withRouter(injectIntl(BprocButtons));
