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
import Notification from "../../../util/notification/Notification";
import {WrappedFormUtils} from "antd/lib/form/Form";
import {CertificateRequest} from "../../../../cuba/entities/base/tsadv_CertificateRequest";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {CertificateRequestManagement} from "../../certificateRequest/CertificateRequestManagement";
import Candidate from "../component/Candidate";

type StartBproc = {
  processDefinitionKey: string;
  employee: UserExt | null;
  validate(): void;
  update(): void;
  isValidatedSuccess(): boolean;
  dataInstance: DataInstanceStore<CertificateRequest>;
  form: WrappedFormUtils
}

@inject("rootStore")
@injectMainStore
@observer
class StartBprocModal extends React.Component<StartBproc & MainStoreInjected & RootStoreProp & WrappedComponentProps & RouteComponentProps> {

  @observable
  modalVisible: boolean = false;

  @observable
  mainStore = this.props.mainStore!;

  @observable
  items: NotPersisitBprocActors[];

  @observable
  bprocRolesDefiner: BpmRolesDefiner | null;

  selectedHrRole: DicHrRole | null;

  selectedUser: UserExt | null;

  users = collection<UserExt>(UserExt.NAME, {
    view: 'portal-bproc-users'
  });

  showModal = () => {
    this.props.validate();
    if (this.props.isValidatedSuccess()) {
      this.modalVisible = true;
    }
  };

  handleOk = (e: any) => {
    Modal.confirm({
      title: this.props.intl.formatMessage(
        {id: "bproc.start"}
      ),
      okText: this.props.intl.formatMessage({
        id: "cubaReact.dataTable.yes"
      }),
      cancelText: this.props.intl.formatMessage({
        id: "cubaReact.dataTable.no"
      }),
      onOk: () => {
        this.props.dataInstance.update({
          personGroup: {
            id: this.props.rootStore!.userInfo.personGroupId
          },
          ...this.props.form.getFieldsValue()
        }).then(() => {
          restServices.startBprocService.saveBprocActors({
            entityId: this.props.dataInstance.item!.id,
            notPersisitBprocActors: this.items
          }).then(response => {
            restServices.bprocRuntimeService.startProcessInstanceByKey({
              businessKey: this.props.dataInstance.item!.id,
              processDefinitionKey: this.props.processDefinitionKey,
              variables: {
                entity: this.props.dataInstance.item,
                rolesLinks: this.bprocRolesDefiner!.links
              }
            }).then(response => {
              this.props.history!.push(`${CertificateRequestManagement.PATH}`);
              Notification.success({
                message: this.props.intl.formatMessage({id: "bproc.start.success"})
              });
            })
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
    this.items = this.items.filter(r => r.id !== row.id);
  };

  render() {
    if (!this.bprocRolesDefiner || !this.items) return <LoadingPage/>;
    return (
      <CustomButton buttonType={ButtonType.FOLLOW}
                    onClickCapture={this.showModal}
                    key="start">
        {this.props.intl.formatMessage({
          id: "bproc.start.btn"
        })}
        <Modal
          title="Start bproc"
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
      </CustomButton>
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
          employee: this.props.employee,
          initiatorPersonGroupId: this.props.rootStore!.userInfo.personGroupId!,
          bpmRolesDefiner: value
        })
          .then(notPersisitBprocActors => {
            this.items = notPersisitBprocActors;
          })
      })
  }
}

export default withRouter(injectIntl(StartBprocModal));