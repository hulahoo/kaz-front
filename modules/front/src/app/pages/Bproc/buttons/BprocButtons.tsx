import React from "react";
import {BprocFormData} from "../../../../cuba/entities/bproc/bproc_FormData";
import {ExtTaskData} from "../../../../cuba/entities/base/tsadv_ExtTaskData";
import {DataInstanceStore} from "@cuba-platform/react/dist/data/Instance";
import {AbstractBprocRequest} from "../../../../cuba/entities/base/AbstractBprocRequest";
import {ProcessInstanceData} from "../../../../cuba/entities/base/bproc_ProcessInstanceData";
import {injectMainStore, withLocalizedForm} from "@cuba-platform/react";
import {inject, observer} from "mobx-react";
import StartBprocModal from "../modal/StartBprocModal";
import {WrappedFormUtils} from "antd/lib/form/Form";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {UserExt} from "../../../../cuba/entities/base/tsadv$UserExt";
import {FormComponentProps} from "antd/es/form";
import OutcomeButtonModal from "../modal/OutcomeButtonModal";

type TaskProps = {
  dataInstance: DataInstanceStore<AbstractBprocRequest>;
  formData: BprocFormData;
  employee?: UserExt | null;
  validate(): void;
  update(): Promise<any>;
  isValidatedSuccess(): boolean;
  isStartForm: boolean;
  task: ExtTaskData | null;
  processInstanceData: ProcessInstanceData | null;
  processDefinitionKey: string;
  form: WrappedFormUtils
};

@inject("rootStore")
@injectMainStore
@observer
class BprocButtons extends React.Component<TaskProps & WrappedComponentProps & FormComponentProps> {
  StartForm = () => {
    return <StartBprocModal
      employee={this.props.employee}
      validate={this.props.validate}
      update={this.props.update}
      isValidatedSuccess={this.props.isValidatedSuccess}
      dataInstance={this.props.dataInstance}
      form={this.props.form}
      processDefinitionKey={this.props.processDefinitionKey}/>
  };

  render() {
    return this.props.isStartForm
      ? this.StartForm() : this.props.formData.outcomes
        ? this.props.formData.outcomes.map(value => <OutcomeButtonModal outcome={value}
                                                                        task={this.props.task}/>)
        : "";
  }
}

export default injectIntl(BprocButtons);
