import React from "react";
import {BprocFormData} from "../../../../cuba/entities/bproc/bproc_FormData";
import {ExtTaskData} from "../../../../cuba/entities/base/tsadv_ExtTaskData";
import {DataInstanceStore} from "@cuba-platform/react/dist/data/Instance";
import {AbstractBprocRequest} from "../../../../cuba/entities/base/AbstractBprocRequest";
import {BprocFormOutcome} from "../../../../cuba/entities/bproc/bproc_FormOutcome";
import {ProcessInstanceData} from "../../../../cuba/entities/base/bproc_ProcessInstanceData";
import Button, {ButtonType} from "../../../components/Button/Button";
import {injectMainStore} from "@cuba-platform/react";
import {observer} from "mobx-react";
import {observable} from "mobx";
import {StartBprocModal} from "../modal/StartBprocModal";
import {Modal, notification} from "antd";
import {Redirect} from "react-router-dom";
import {restServices} from "../../../../cuba/services";

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
};

@injectMainStore
@observer
export class BprocButtons extends React.Component<TaskProps> {

  @observable
  modalVisibleMap = new Map<string, boolean>();

  @observable
  isRedirectPath = false;

  showModal = (outcome: BprocFormOutcome) => {
    this.modalVisibleMap.set(outcome.id!, true);
  };

  handleOk = (outcome: BprocFormOutcome) => {
    this.modalVisibleMap.set(outcome.id!, false);

    restServices.bprocTaskService.completeWithOutcome({
      taskData: this.props.task!,
      outcomeId: outcome.id!,
      processVariables: new Map<string, any>()
    })
      .then(value => {
        notification.info({
          message: outcome.id,
          description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
          placement: 'bottomRight'
        });

        return <Redirect to={this.props.redirectPath}/>;
      })
    this.isRedirectPath = true;
  };

  handleCancel = (outcome: BprocFormOutcome) => {
    this.modalVisibleMap.set(outcome.id!, false);
  };

  OutcomeButton = (outcome: BprocFormOutcome) => {
    return <Button buttonType={ButtonType.FOLLOW}
                   onClickCapture={() => this.showModal(outcome)}
                   key={outcome.id}>
      {outcome.id}
      <Modal
        title={outcome.id}
        visible={this.modalVisibleMap.get(outcome.id!)}
        onOk={() => this.handleOk(outcome)}
        onCancel={() => this.handleCancel(outcome)}>
        <textarea id={outcome.id + "_textArea"} required={outcome.id !== "APPROVE"}/>
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
