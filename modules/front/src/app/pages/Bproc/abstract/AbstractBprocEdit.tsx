import React from 'react';
import {FormattedMessage, WrappedComponentProps} from "react-intl";
import {RootStoreProp} from "../../../store";
import {MainStoreInjected} from "@cuba-platform/react";
import {RouteComponentProps} from "react-router-dom";
import {FormComponentProps} from "antd/lib/form";
import {IReactionDisposer, observable, reaction} from "mobx";
import {ProcessInstanceData} from "../../../../cuba/entities/base/bproc_ProcessInstanceData";
import {ExtTaskData} from "../../../../cuba/entities/base/tsadv_ExtTaskData";
import {BprocFormData} from "../../../../cuba/entities/bproc/bproc_FormData";
import {message} from "antd";
import {restServices} from "../../../../cuba/services";
import ExtTaskDataCards from "../TaskData/ExtTaskDataCards";
import {DataInstanceStore} from "@cuba-platform/react/dist/data/Instance";
import BprocButtons from "../buttons/BprocButtons";
import Button, {ButtonType} from "../../../components/Button/Button";
import {AbstractBprocRequest} from "../../../../cuba/entities/base/AbstractBprocRequest";
import Notification from "../../../util/notification/Notification";

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  entityId: string;
};

abstract class AbstractBprocEdit<T extends AbstractBprocRequest, K> extends React.Component<K & Props & WrappedComponentProps & RootStoreProp & MainStoreInjected & RouteComponentProps<any>> {

  dataInstance: DataInstanceStore<T>;

  @observable
  updated = false;

  reactionDisposer: IReactionDisposer;

  @observable
  mainStore = this.props.mainStore!;

  processInstanceData: ProcessInstanceData | null;

  @observable
  tasks: ExtTaskData[] | null;

  @observable
  activeTask: ExtTaskData | null;

  @observable
  formData: BprocFormData | null;

  @observable
  isStartForm: boolean;

  @observable
  globalErrors: string[] = [];

  createElement = React.createElement;

  @observable
  isValidatedSuccess = false;

  validate = () => {
    this.props.form.validateFields((err, values) => {

      this.isValidatedSuccess = !err;

      if (err) {
        message.error(
          this.props.intl.formatMessage({
            id: "management.editor.validationError"
          })
        );
        return;
      }
    });
  };

  getUpdateEntityData = (): any => {
  };

  update = () => {
    return this.dataInstance.update(this.getUpdateEntityData());
  }

  takCard() {
    if (!this.tasks) return <div/>;
    const tasks = Array.from(this.tasks);
    return <ExtTaskDataCards tasks={tasks}/>
  }

  isDraft = () => {
    return this.dataInstance.item && this.dataInstance.item.status ? this.dataInstance.item.status.code !== "DRAFT" : true;
  }

  fields: any;

  getOutcomeBtns = (isNeedBpm?: any): JSX.Element | null => {
    const {status} = this.dataInstance;

    if (isNeedBpm !== false) isNeedBpm = true;

    return this.formData
      ? isNeedBpm
        ? <BprocButtons dataInstance={this.dataInstance}
                        formData={this.formData}
                        validate={this.validate}
                        update={this.update}
                        isValidatedSuccess={() => this.isValidatedSuccess}
                        processInstanceData={this.processInstanceData}
                        isStartForm={this.isStartForm}
                        processDefinitionKey={this.processDefinitionKey}
                        form={this.props.form}
                        task={this.activeTask}/>
        : <Button
          buttonType={ButtonType.PRIMARY}
          onClick={() => {
            this.validate();
            if (this.isValidatedSuccess) {
              this.update().then(() => this.updated = true)
                .catch((e: any) => {
                  Notification.error({
                    message: this.props.intl.formatMessage({id: "management.editor.error"})
                  });
                });
            }
          }}
          disabled={status !== "DONE" && status !== "ERROR"}
          loading={status === "LOADING"}
          style={{marginLeft: "8px"}}>
          <FormattedMessage id="management.editor.submit"/>
        </Button>
      : null;
  };

  processDefinitionKey: string;

  componentDidMount() {
    const entityName = this.dataInstance.entityName;
    const processDefinitionKey = this.processDefinitionKey;
    if (this.props.entityId !== "new") {
      this.dataInstance.load(this.props.entityId);
      restServices.bprocService.processInstanceData({
        processInstanceBusinessKey: this.props.entityId,
        processDefinitionKey: processDefinitionKey
      }).then(value => {
        this.processInstanceData = value;
        if (value) {
          restServices.bprocService.tasks({processInstanceData: value})
            .then(tasks => {
              this.tasks = tasks;
              this.activeTask = tasks.find(task => !task.endTime
                && Array.isArray(task.assigneeOrCandidates)
                && task.assigneeOrCandidates.some(user => user.id === this.props.rootStore!.userInfo.id)
              ) as ExtTaskData;

              if (this.activeTask)
                restServices.bprocFormService.getTaskFormData({taskId: this.activeTask.id!})
                  .then(formData => {
                    this.formData = formData;
                    this.isStartForm = false;
                  });
            })
        } else {
          restServices.bprocService.getStartFormData({processDefinitionKey: processDefinitionKey})
            .then(formData => {
              this.formData = formData;
              this.isStartForm = true;
            });
          // this.dataInstance.item!.requestDate = Date.now(); //todo
        }
      })
    } else {
      restServices.portalHelperService.newEntity({entityName: entityName}).then((response: string) => {

        restServices.bprocService.getStartFormData({processDefinitionKey: processDefinitionKey})
          .then(formData => {
            this.formData = formData;
            this.isStartForm = true;
          });

        this.dataInstance.setItem(JSON.parse(response));

        const fieldValues = this.dataInstance.getFieldValues(this.fields);
        this.props.form.setFieldsValue(fieldValues);
      });
    }
    this.setReactionDisposer();
  }

  setReactionDisposer = () => {
    this.reactionDisposer = reaction(
      () => {
        return this.dataInstance.item;
      },
      () => {
        this.props.form.setFieldsValue(
          this.dataInstance.getFieldValues(this.fields)
        );
      }
    );
  };

  componentWillUnmount() {
    this.reactionDisposer();
  }

}

export default AbstractBprocEdit;