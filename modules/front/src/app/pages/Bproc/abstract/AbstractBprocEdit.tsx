import React from 'react';
import {FormattedMessage, WrappedComponentProps} from "react-intl";
import {RootStoreProp} from "../../../store";
import {getCubaREST, MainStoreInjected} from "@cuba-platform/react";
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
import Notification from "../../../util/Notification/Notification";
import moment from "moment/moment";
import {UserExt} from "../../../../cuba/entities/base/tsadv$UserExt";

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

  @observable
  employee: UserExt;

  processInstanceData: ProcessInstanceData | null;

  isCalledProcessInstanceData = false

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

  fields: any;

  processDefinitionKey: string;

  validate = (): Promise<boolean> => {
    let isValidatedSuccess = true;
    this.props.form.validateFields(this.fields, {force: true}, (err, values) => {
      isValidatedSuccess = !err;
      if (err) {
        message.error(
          this.props.intl.formatMessage({
            id: "management.editor.validationError"
          })
        );
      }
    });
    return new Promise(resolve => resolve(isValidatedSuccess));
  };

  getUpdateEntityData = (): any => {
  };

  update = () => {
    return this.dataInstance.update(this.getUpdateEntityData());
  };

  takCard = () => {
    if (!this.tasks) return <div/>;
    const tasks = Array.from(this.tasks);
    return <ExtTaskDataCards tasks={tasks}/>
  }

  isNotDraft = () => {
    return this.dataInstance.item && this.dataInstance.item.status ? this.dataInstance.item.status.code !== "DRAFT" : true;
  };

  commentRequiredOutcomes = ['REJECT', 'REVISION'];

  isStartCommentVisible = false;

  isUpdateBeforeOutcome = false;

  setEmployee = (personGroupId: string): Promise<UserExt> => {
    return getCubaREST()!.searchEntities<UserExt>(UserExt.NAME, {
      conditions: [{
        property: 'personGroup.id',
        operator: '=',
        value: personGroupId
      }, {
        property: 'active',
        operator: '=',
        value: 'TRUE'
      }]
    }).then(value => this.employee = value[0]);
  }

  getOutcomeBtns = (isNeedBpm?: any): JSX.Element | null => {
    const {status} = this.dataInstance;

    if (isNeedBpm !== false) isNeedBpm = true;

    return this.formData
      ? isNeedBpm
        ? <BprocButtons dataInstance={this.dataInstance}
                        formData={this.formData}
                        validate={this.validate}
                        employee={() => this.employee}
                        update={this.update}
                        processInstanceData={this.processInstanceData}
                        afterSendOnApprove={this.afterSendOnApprove}
                        isStartForm={this.isStartForm}
                        processDefinitionKey={this.processDefinitionKey}
                        form={this.props.form}
                        isUpdateBeforeOutcome={this.isUpdateBeforeOutcome}
                        commentRequiredOutcomes={this.commentRequiredOutcomes}
                        isStartCommentVisible={this.isStartCommentVisible}
                        task={this.activeTask}/>
        : <Button
          buttonType={ButtonType.PRIMARY}
          onClick={() => {
            this.validate().then(isValid => {
              if (isValid) {
                this.update().then(() => this.updated = true)
                  .catch((e: any) => {
                    Notification.error({
                      message: this.props.intl.formatMessage({id: "management.editor.error"})
                    });
                  });
              }
            });
          }}
          disabled={status !== "DONE" && status !== "ERROR"}
          loading={status === "LOADING"}
          style={{marginLeft: "8px"}}>
          <FormattedMessage id="management.editor.submit"/>
        </Button>
      : null;
  };

  componentDidMount() {
    this.setReactionDisposer();
    this.loadData();
    this.loadBpmProcessData();
  }

  processInstanceBusinessKey = (): string => {
    return this.props.entityId;
  }

  initVariablesByBproc = () => {

  }

  loadData = () => {
    if (this.props.entityId !== "new") {
      this.dataInstance.load(this.props.entityId);
    } else {
      const entityName = this.dataInstance.entityName;
      restServices.portalHelperService.newEntity({entityName: entityName}).then((response: T) => {
        this.initItem(response);
      });
    }
  }

  loadBpmProcessData = () => {
    const processDefinitionKey = this.processDefinitionKey;
    if (this.props.entityId !== "new") {

      restServices.bprocService.processInstanceData({
        processInstanceBusinessKey: this.processInstanceBusinessKey(),
        processDefinitionKey: processDefinitionKey
      }).then(value => {
        this.isCalledProcessInstanceData = true;
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
                    this.initVariablesByBproc();
                  });
              else this.initVariablesByBproc();
            })
        } else {
          restServices.bprocService.getStartFormData({processDefinitionKey: processDefinitionKey})
            .then(formData => {
              this.formData = formData;
              this.isStartForm = true;
              this.initVariablesByBproc();
            });
        }
      })
    } else {
      const processDefinitionKey = this.processDefinitionKey;

      restServices.bprocService.getStartFormData({processDefinitionKey: processDefinitionKey})
        .then(formData => {
          this.formData = formData;
          this.isStartForm = true;
          this.initVariablesByBproc();
        });
    }
  }

  protected initItem(request: T): void {
    this.dataInstance.setItem(request);

    const fieldValues = this.dataInstance.getFieldValues(this.fields);
    this.props.form.setFieldsValue(fieldValues);
  }

  setReactionDisposer = () => {
    this.reactionDisposer = reaction(
      () => {
        return this.dataInstance.item;
      },
      () => {
        const obj = {
          ...this.dataInstance.getFieldValues(this.fields)
        };
        if (this.isCalledProcessInstanceData && !this.processInstanceData) {
          const now = moment();
          now.locale(this.props.rootStore!.userInfo.locale!);
          obj["requestDate"] = now;
        }
        this.props.form.setFieldsValue(obj);
      }
    );
  };

  afterSendOnApprove = () => {
    this.props.history!.goBack();
  };

  componentWillUnmount() {
    this.reactionDisposer();
  }

}

export default AbstractBprocEdit;
