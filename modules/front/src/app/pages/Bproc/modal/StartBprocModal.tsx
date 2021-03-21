import {collection, injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {inject, observer} from "mobx-react";
import React from "react";
import {NotPersisitBprocActors} from "../../../../cuba/entities/base/tsadv_NotPersisitBprocActors";
import {observable} from "mobx";
import {Button, Col, Form, Icon, Modal, Row, Select, Table} from "antd";
import Column from "antd/lib/table/Column";
import LoadingPage from "../../LoadingPage";
import {restServices} from "../../../../cuba/services";
import {RootStoreProp} from "../../../store";
import {BpmRolesDefiner} from "../../../../cuba/entities/base/tsadv$BpmRolesDefiner";
import {UserExt} from "../../../../cuba/entities/base/tsadv$UserExt";
import CustomButton, {ButtonType} from "../../../components/Button/Button";
import {DataInstanceStore} from "@cuba-platform/react/dist/data/Instance";
import {SerializedEntity} from "@cuba-platform/rest";
import {DicHrRole} from "../../../../cuba/entities/base/tsadv$DicHrRole";
import {injectIntl, WrappedComponentProps} from "react-intl";
import Notification from "../../../util/Notification/Notification";
import {WrappedFormUtils} from "antd/lib/form/Form";
import {CertificateRequest} from "../../../../cuba/entities/base/tsadv_CertificateRequest";
import {RouteComponentProps, withRouter} from "react-router-dom";
import Candidate from "../component/Candidate";
import {getBusinessKey} from "../../../util/util";

type StartBproc = {
  processDefinitionKey: string;
  employee?: UserExt | null;
  validate(): Promise<boolean>;
  update(): Promise<any>;
  afterSendOnApprove?: () => void;
  dataInstance: DataInstanceStore<CertificateRequest>;
  form: WrappedFormUtils;
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
  selectedUser: UserExt | null;

  users = collection<UserExt>(UserExt.NAME, {
    view: 'portal-bproc-users'
  });

  showModalOrMessage = () => {
    if (this.bprocActorMessage) {
      Notification.error({
        message: this.bprocActorMessage
      });
      return;
    }
    this.props.validate().then((isValid) => {
      if (isValid) {
        this.modalVisible = true;
      }
    });
  };

  handleOk = (e: any) => {
    Modal.confirm({
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
                  rolesLinks: this.bprocRolesDefiner!.links
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
  };

  handleCancel = (e: any) => {
    this.modalVisible = false;
  };

  onChangeBprocRole = (value: string, option: React.ReactElement<HTMLLIElement>) => {
    if (value) {
      this.selectedHrRole = {
        id: value,
        langValue1: (option.props['children'] as any)
      };
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
    if (this.items.find(i => (i.users as UserExt[]).find(u => u.id === this.selectedUser!.id) != undefined)) {
      Notification.error({
        message: this.props.intl.formatMessage({id: "bproc.startBproc.modal.error"})
      });
      return;
    }
    this.items.unshift(({
      hrRole: this.selectedHrRole,
      users: [this.selectedUser],
      bprocUserTaskCode: this.bprocRolesDefiner!.links!.find(rd => rd.hrRole!.id === this.selectedHrRole!.id)!.bprocUserTaskCode
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

  render() {
    if (!this.bprocRolesDefiner) return <LoadingPage/>;
    if (!this.items) return <div/>;

    return (
      <>
        <CustomButton buttonType={ButtonType.FOLLOW}
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
                  <Form.Item style={{margin: 0}} label={"Роль"}>
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
                  <Form.Item style={{margin: 0}} label={"Пользователь"}>
                    <Select style={{width: '100%'}} showSearch allowClear
                            filterOption={(input, option) =>
                              (option.props.children as string).toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            onChange={this.onChangeUser}>
                      {this.users.items.length > 0 ? this.users.items.map(l =>
                          <Select.Option title={(l as SerializedEntity<UserExt>).fullNameWithLogin!}
                                         key={l.id}>{(l as SerializedEntity<UserExt>).fullNameWithLogin!}</Select.Option>) :
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
                            onClick={this.addBprocUser}>Добавить</Button>
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <Table dataSource={Array.from(this.items)}
                   pagination={false} showHeader={true}
                   rowKey={record => record.id}>
              <Column key='role' title={"Роли"}
                      render={(text, record) => (record as NotPersisitBprocActors).hrRole!.langValue1}/>
              <Column key='candidates' title={"Пользователи"} render={(text, record) => {
                return <Candidate candidates={((record as NotPersisitBprocActors).users as UserExt[] | null)}/>
              }}/>
              <Column
                key="action"
                render={(text, record: SerializedEntity<NotPersisitBprocActors>) => {
                  console.log(record);
                  return record.isSystemRecord ? null : <Button type="link"
                                                                style={{padding: 0}}
                                                                onClick={() => this.showDeletionDialog(record)}>
                    <Icon type="delete" style={{fontSize: '18px', cursor: 'pointer'}}/>
                  </Button>
                }}
              />
            </Table>
          </div>
        </Modal>
      </>

    )
  }

  componentDidMount() {
    restServices.startBprocService.getBpmRolesDefiner({
      processDefinitionKey: this.props.processDefinitionKey,
      initiatorPersonGroupId: this.props.rootStore!.userInfo.personGroupId!
    })
      .then(value => {
        this.bprocRolesDefiner = value;
        restServices.startBprocService.getNotPersisitBprocActors({
          employee: this.props.employee ? this.props.employee : null,
          initiatorPersonGroupId: this.props.rootStore!.userInfo.personGroupId!,
          bpmRolesDefiner: value
        }).then(notPersisitBprocActors => {
          this.items = notPersisitBprocActors.filter(actors => actors.users && actors.users.length > 0);
        }).catch(async (response: any) => {
          const reader = response.response.body.getReader();

          let receivedLength = 0;
          let chunks = [];
          while (true) {
            const {done, value} = await reader.read();

            if (done) {
              break;
            }

            chunks.push(value);
            receivedLength += value.length;
          }

          let chunksAll = new Uint8Array(receivedLength);
          let position = 0;
          for (let chunk of chunks) {
            chunksAll.set(chunk, position);
            position += chunk.length;
          }

          let result = new TextDecoder("utf-8").decode(chunksAll);
          const parse = JSON.parse(result);
          this.bprocActorMessage = parse.message;
        });
      })
  }
}

export default withRouter(injectIntl(StartBprocModal));