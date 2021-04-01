import React from "react";
import {BprocFormData} from "../../../../cuba/entities/bproc/bproc_FormData";
import {ExtTaskData} from "../../../../cuba/entities/base/tsadv_ExtTaskData";
import {DataInstanceStore} from "@cuba-platform/react/dist/data/Instance";
import {AbstractBprocRequest} from "../../../../cuba/entities/base/AbstractBprocRequest";
import {ProcessInstanceData} from "../../../../cuba/entities/base/bproc_ProcessInstanceData";
import {injectMainStore} from "@cuba-platform/react";
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
  validate(): Promise<boolean>;
  update(): Promise<any>;
  afterSendOnApprove?: () => void
  isStartForm: boolean;
  task: ExtTaskData | null;
  processInstanceData: ProcessInstanceData | null;
  processDefinitionKey: string;
  form: WrappedFormUtils,
  isUpdateBeforeOutcome?: boolean,
  commentRequiredOutcomes?: string[],
  isStartCommentVisible?: boolean,
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
      dataInstance={this.props.dataInstance}
      form={this.props.form}
      isStartCommentVisible={this.props.isStartCommentVisible}
      afterSendOnApprove={this.props.afterSendOnApprove}
      commentRequiredOutcomes={this.props.commentRequiredOutcomes}
      processDefinitionKey={this.props.processDefinitionKey}/>
  };

  render() {
    return this.props.isStartForm
      ? this.StartForm() : this.props.formData.outcomes
        ? this.props.formData.outcomes.reverse().map(value => <OutcomeButtonModal outcome={value}
                                                                                  key={value.id}
                                                                                  form={this.props.form}
                                                                                  validate={this.props.isUpdateBeforeOutcome ? this.props.validate : undefined}
                                                                                  update={this.props.isUpdateBeforeOutcome ? this.props.update : undefined}
                                                                                  afterSendOnApprove={this.props.afterSendOnApprove}
                                                                                  commentRequiredOutcomes={this.props.commentRequiredOutcomes}
                                                                                  task={this.props.task}/>)
        : "";
  }
}

export default injectIntl(BprocButtons);
