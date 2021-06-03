import {collection, injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {inject, observer} from "mobx-react";
import React, {createElement, Fragment} from "react";
import {NotPersisitBprocActors} from "../../../../cuba/entities/base/tsadv_NotPersisitBprocActors";
import {observable} from "mobx";
import {Button, Col, Form, Icon, message, Modal, Row, Select, Table} from "antd";
import Column from "antd/lib/table/Column";
import {restServices} from "../../../../cuba/services";
import {RootStoreProp} from "../../../store";
import {BpmRolesDefiner} from "../../../../cuba/entities/base/tsadv$BpmRolesDefiner";
import {TsadvUser} from "../../../../cuba/entities/base/tsadv$UserExt";
import CustomButton, {ButtonType} from "../../../components/Button/Button";
import {DataInstanceStore} from "@cuba-platform/react/dist/data/Instance";
import {SerializedEntity} from "@cuba-platform/rest";
import {DicHrRole} from "../../../../cuba/entities/base/tsadv$DicHrRole";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import Notification from "../../../util/Notification/Notification";
import {WrappedFormUtils} from "antd/lib/form/Form";
import {CertificateRequest} from "../../../../cuba/entities/base/tsadv_CertificateRequest";
import {RouteComponentProps, withRouter} from "react-router-dom";
import Candidate from "../component/Candidate";
import {catchException, getBusinessKey} from "../../../util/util";
import TextArea from "antd/es/input/TextArea";

type StartBproc = {
  processDefinitionKey: string;
  employeePersonGroupId: () => string;
  validate(): Promise<boolean>;
  update(): Promise<any>;
  afterSendOnApprove?: () => void;
  dataInstance: DataInstanceStore<CertificateRequest>;
  form: WrappedFormUtils;
  isStartCommentVisible?: boolean,
  commentRequiredOutcomes?: string[],
  beforeCompletePredicate?: (outcome: string) => Promise<boolean>;
}

@inject("rootStore")
@injectMainStore
@observer
class StartBprocModal extends React.Component<StartBproc & MainStoreInjected & RootStoreProp & WrappedComponentProps & RouteComponentProps> {

  @observable
  modalVisible: boolean;

  @observable
  mainStore = this.props.mainStore!;

  @observable
  items: NotPersisitBprocActors[];

  @observable
  bprocActorMessage: string | null;

  @observable
  bprocRolesDefiner: BpmRolesDefiner | null;

  @observable
  selectedHrRole: DicHrRole | null;

  @observable
  selectedUser: TsadvUser | null;

  users = collection<TsadvUser>(TsadvUser.NAME, {
    view: 'portal-bproc-users'
  });

  showModalOrMessage = () => {

    const loadBpmRolesDefiner = () => catchException(restServices.startBprocService.getBpmRolesDefiner({
        processDefinitionKey: this.props.processDefinitionKey,
        employeePersonGroupId: this.props.employeePersonGroupId(),
        isAssistant: this.props.rootStore!.assistantTeamInfo.active
      })
        .then(value => {
          this.bprocRolesDefiner = value;

          catchException(restServices.startBprocService.getNotPersisitBprocActors({
            employeePersonGroupId: this.props.employeePersonGroupId(),
            bpmRolesDefiner: value,
            isAssistant: this.props.rootStore!.assistantTeamInfo.active
          }).then(notPersisitBprocActors => {
            this.items = notPersisitBprocActors.filter(actors => actors.users && actors.users.length > 0);
          })).catch((reason: Error) => {
            this.handleCancel();
            Notification.error({
              message: reason.message
            });
          })

        })
    )
      .catch((reason: Error) => {
        this.handleCancel();
        Notification.error({
          message: reason.message
        });
      });

    this.props.validate().then((isValid) => {
      if (isValid) {
        if (this.props.beforeCompletePredicate) {
          this.props.beforeCompletePredicate('START').then(value => {
            if (value) {
              this.modalVisible = true;
              loadBpmRolesDefiner();
            }
          })
        } else {
          this.modalVisible = true;
          loadBpmRolesDefiner();
        }
      }
    })
  };

  validateActors = (): boolean => {

    let isValidateSuccess = true;

    this.bprocRolesDefiner!.links!
      .filter(value => value.required)
      .filter(value => value.isAddableApprover)
      .forEach(value => {
        const find = this.items.find(actor => actor.bprocUserTaskCode === value.bprocUserTaskCode);
        if (!find) {
          isValidateSuccess = false;
          Notification.error({
            message: this.props.intl.formatMessage({id: 'add.required.actor'}, {actor: value.hrRole!['_instanceName']})
          });
        }
      })


    return isValidateSuccess;
  }

  handleOk = (e: any) => {

    if (!this.validateActors()) return;

    const handleOk = () => Modal.confirm({
      title: this.props.intl.formatMessage(
        {id: "START.INFO"}
      ),
      okText: this.props.intl.formatMessage({
        id: "cubaReact.dataTable.yes"
      }),
      cancelText: this.props.intl.formatMessage({
        id: "cubaReact.dataTable.no"
      }),
      onOk: () => {
        this.props.update()
          .then(() => {
            restServices.startBprocService.saveBprocActors({
              entityId: this.props.dataInstance.item!.id,
              notPersisitBprocActors: this.items
            }).then(response => {
              restServices.bprocRuntimeService.startProcessInstanceByKey({
                businessKey: getBusinessKey(this.props.dataInstance.item!),
                processDefinitionKey: this.props.processDefinitionKey,
                variables: {
                  entity: this.props.dataInstance.item,
                  rolesLinks: this.bprocRolesDefiner!.links,
                  startComment: this.props.form.getFieldValue("bproc-comment"),
                }
              }).then(response => {
                this.modalVisible = false;
                if (this.props.afterSendOnApprove) {
                  this.props.afterSendOnApprove();
                }
                Notification.success({
                  message: this.props.intl.formatMessage({id: "START.success"})
                });
              })
                .catch((e: any) => {
                  Notification.error({
                    message: this.props.intl.formatMessage({id: "management.editor.error"})
                  });
                })
            })
              .catch((e: any) => {
                Notification.error({
                  message: this.props.intl.formatMessage({id: "management.editor.error"})
                });
              });
          })
          .catch((e: any) => {
            Notification.error({
              message: this.props.intl.formatMessage({id: "management.editor.error"})
            });
          });
      }
    });

    if (this.props.isStartCommentVisible)
      this.props.form.validateFields(['bproc-comment'],
        {force: true},
        (err) => {
          if (err) {
            message.error(
              this.props.intl.formatMessage({
                id: "management.editor.validationError"
              })
            );
          } else handleOk();
        });
    else handleOk();

  };

  handleCancel = (e?: any) => {
    this.modalVisible = false;
  };

  onChangeBprocRole = (value: string, option: React.ReactElement<HTMLLIElement>) => {
    if (value) {
      this.selectedHrRole = {
        id: value,
        langValue1: (option.props['children'] as any)
      };
      this.selectedHrRole["_instanceName"] = this.selectedHrRole.langValue1;
    } else {
      this.selectedHrRole = null;
    }
  };

  onChangeUser = (value: string, option: React.ReactElement<HTMLLIElement>) => {
    if (value) {
      this.selectedUser = {
        id: value,
        fullNameWithLogin: (option.props['children'] as any),
      };
    } else {
      this.selectedUser = null;
    }
  };

  addBprocUser = () => {
    if (this.items.find(i => (i.users as TsadvUser[]).find(u => u.id === this.selectedUser!.id) !== undefined)) {
      Notification.error({
        message: this.props.intl.formatMessage({id: "bproc.startBproc.modal.error"})
      });
      return;
    }
    const rolesLink = this.bprocRolesDefiner!.links!.find(rd => rd.hrRole!.id === this.selectedHrRole!.id)!;
    this.items.unshift(({
      hrRole: this.selectedHrRole,
      users: [this.selectedUser],
      bprocUserTaskCode: rolesLink.bprocUserTaskCode,
      rolesLink: rolesLink
    } as any));
  };

  showDeletionDialog = (e: SerializedEntity<NotPersisitBprocActors>) => {
    Modal.confirm({
      title: this.props.intl.formatMessage(
        {id: "management.browser.delete.areYouSure"},
        {instanceName: e._instanceName}
      ),
      okText: this.props.intl.formatMessage({
        id: "management.browser.delete.ok"
      }),
      cancelText: this.props.intl.formatMessage({
        id: "management.browser.delete.cancel"
      }),
      onOk: () => {
        return this.deleteRow(e);
      }
    });
  };

  deleteRow = (row: SerializedEntity<NotPersisitBprocActors>) => {
    this.items = this.items.filter(r => r.users![0].id !== row.users![0].id);
  };

  commentValidator = (rule: any, value: any, callback: any) => {
    if (this.modalVisible && !value && this.props.isStartCommentVisible
      && this.props.commentRequiredOutcomes && this.props.commentRequiredOutcomes.find(outcome => outcome === 'START')) {
      callback(this.props.intl.formatMessage({id: 'comment.required'}));
    }
    callback();
  };

  render() {

    return (
      <>
        <CustomButton buttonType={ButtonType.PRIMARY}
                      onClick={this.showModalOrMessage}
                      key="start">
          {this.props.intl.formatMessage({
            id: "START"
          })}
        </CustomButton>
        <Modal
          title={this.props.intl.formatMessage({id: "START"})}
          visible={this.modalVisible}
          onOk={this.handleOk}
          width={700}
          onCancel={this.handleCancel}>
          <div>
            <div>
              <Row type={"flex"} justify={"center"} align={"bottom"}>
                <Col span={8}>
                  <Form.Item style={{margin: 0}} label={<FormattedMessage id="bproc.startBproc.modal.role"/>}>
                    <Select style={{width: '100%'}} onChange={this.onChangeBprocRole}>
                      {this.bprocRolesDefiner && this.bprocRolesDefiner.links ? this.bprocRolesDefiner.links.filter(l => l.isAddableApprover && l.hrRole).map(l =>
                          <Select.Option
                            key={l.hrRole!.id}>{(l.hrRole as SerializedEntity<DicHrRole>)._instanceName}</Select.Option>) :
                        <Select.Option key="empty"/>
                      }
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={1}/>
                <Col span={8}>
                  <Form.Item style={{margin: 0}} label={<FormattedMessage id="bproc.startBproc.modal.user"/>}>
                    <Select style={{width: '100%'}} showSearch allowClear
                            filterOption={(input, option) =>
                              (option.props.children as string).toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            onChange={this.onChangeUser}>
                      {this.users.items.length > 0 ? this.users.items.map(l =>
                          <Select.Option title={(l as SerializedEntity<TsadvUser>).fullNameWithLogin!}
                                         key={l.id}>{(l as SerializedEntity<TsadvUser>).fullNameWithLogin!}</Select.Option>) :
                        <Select.Option key="empty"/>
                      }
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={1}/>
                <Col span={6}>
                  <Form.Item style={{margin: 0}}>
                    <Button type={"primary"}
                            disabled={!(this.selectedHrRole && this.selectedUser)}
                            onClick={this.addBprocUser}><FormattedMessage id="bproc.startBproc.modal.add"/></Button>
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <Table dataSource={Array.from(this.items || [])}
                   pagination={false} showHeader={true}
                   rowKey={record => record.id}>
              <Column key='role' title={<FormattedMessage id="bproc.startBproc.modal.roles"/>}
                      render={(text, record) => ((record as NotPersisitBprocActors).hrRole! as SerializedEntity<DicHrRole>)._instanceName}/>
              <Column key='candidates' title={<FormattedMessage id="bproc.startBproc.modal.users"/>}
                      render={(text, record) => {
                        return <Candidate
                          candidates={((record as NotPersisitBprocActors).users as TsadvUser[] | null)}/>
                      }}/>
              <Column
                key="action"
                render={(text, record: SerializedEntity<NotPersisitBprocActors>) => {
                  return record.isSystemRecord ? null : <Button type="link"
                                                                style={{padding: 0}}
                                                                onClick={() => this.showDeletionDialog(record)}>
                    <Icon type="delete" style={{fontSize: '18px', cursor: 'pointer'}}/>
                  </Button>
                }}
              />
            </Table>

            <div style={this.props.isStartCommentVisible ? {} : {display: 'none'}}>
              <Form.Item>
                {createElement(Fragment, null, this.props.intl.formatMessage({id: 'comment'}))}
                {this.props.form.getFieldDecorator("bproc-comment", {
                  rules: [{
                    validator: this.commentValidator
                  }]
                })(
                  <TextArea
                    rows={4}/>
                )}
              </Form.Item>
            </div>
          </div>
        </Modal>
      </>

    )
  }
}

const startBprocModal = withRouter(injectIntl(StartBprocModal));
export default startBprocModal;