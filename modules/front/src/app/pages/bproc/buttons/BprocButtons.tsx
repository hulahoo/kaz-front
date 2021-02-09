import React, {FormEvent} from "react";
import {BprocFormData} from "../../../../cuba/entities/bproc/bproc_FormData";
import {ExtTaskData} from "../../../../cuba/entities/base/tsadv_ExtTaskData";
import {DataInstanceStore} from "@cuba-platform/react/dist/data/Instance";
import {AbstractBprocRequest} from "../../../../cuba/entities/base/AbstractBprocRequest";
import {BprocFormOutcome} from "../../../../cuba/entities/bproc/bproc_FormOutcome";
import {ProcessInstanceData} from "../../../../cuba/entities/base/bproc_ProcessInstanceData";
import Button, {ButtonType} from "../../../components/Button/Button";
import {injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {observer} from "mobx-react";
import {observable} from "mobx";
import {StartBprocModal} from "../modal/StartBprocModal";

type TaskProps = {
  dataInstance: DataInstanceStore<AbstractBprocRequest>;
  formData: BprocFormData;
  validate(): void;
  update(): void;
  isValidatedSuccess: boolean;
  isStartForm: boolean;
  task: ExtTaskData | null;
  processInstanceData: ProcessInstanceData | null;
  processDefinitionKey: string;
};

@injectMainStore
@observer
export class BprocButtons extends React.Component<TaskProps & MainStoreInjected> {

  state = {visible: false};

  @observable
  mainStore = this.props.mainStore!;

  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  handleOk = (e: any) => {
    this.setState({
      modalVisible: false,
    });
  };

  handleCancel = (e: any) => {
    this.setState({
      modalVisible: false,
    });
  };

  OutcomeButton = (outcome: BprocFormOutcome) => {
    return (
      <Button buttonType={ButtonType.FOLLOW}
              key={outcome.id}>
        {outcome.id}
      </Button>
    );
  }

  StartForm = () => {
    return (
      <StartBprocModal
        employee={null}
        validate={this.props.validate}
        update={this.props.update}
        isValidatedSuccess={this.props.isValidatedSuccess}
        dataInstance={this.props.dataInstance}
        processDefinitionKey={this.props.processDefinitionKey}/>
    )
  }

  render() {
    // const btns = this.props.isStartForm ? this.StartForm() : this.props.formData.outcomes!.map(value => this.OutcomeButton(value));
    return this.StartForm();
  }
}
