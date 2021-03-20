import * as React from "react";
import {Alert, Button, Card, Checkbox, Col, Dropdown, Form, Icon, Menu, Modal, Row, Select, Table} from "antd";

import {observer} from "mobx-react";
import {OrgStructureRequestManagement} from "./OrgStructureRequestManagement";
import {FormComponentProps} from "antd/lib/form";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import {IReactionDisposer, observable, reaction, toJS} from "mobx";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";

import {
  collection,
  injectMainStore,
  instance,
  MainStoreInjected,
  Msg,
  MultilineText,
  withLocalizedForm
} from "@cuba-platform/react";

import "../../../app/App.css";

import {OrgStructureRequest} from "../../../cuba/entities/base/tsadv_OrgStructureRequest";
import Page from "../../hoc/PageContentHoc";
import {ReadonlyField} from "../../components/ReadonlyField";
import FormContainer from "../../common/FormContainer";
import TextArea from "antd/es/input/TextArea";
import {ClickParam} from "antd/lib/menu";
import OrganizationEditor from "./OrganizationEditor";
import {restServices} from "../../../cuba/services";
import Notification from "../../util/Notification/Notification";
import {EnumValueInfo} from "@cuba-platform/rest/dist-browser/model";
import PositionEditor from "./PositionEditor";
import {CheckboxChangeEvent} from "antd/lib/checkbox";
import {DicCompany} from "../../../cuba/entities/base/base_DicCompany";
import {OrganizationGroupExt} from "../../../cuba/entities/base/base$OrganizationGroupExt";
import {DicRequestStatus} from "../../../cuba/entities/base/tsadv$DicRequestStatus";
import {PersonGroupExt} from "../../../cuba/entities/base/base$PersonGroupExt";
import {RootStoreProp} from "../../store";
import moment from "moment";
import DefaultDatePicker from "../../components/Datepicker";

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  entityId: string;
};

export type OrgRequestRow = {
  root: boolean,
  rdId: string,
  pRdId: string,
  rowKey: string,
  nameRu: string[],
  nameEn: string[],
  elementType: number,
  changeType: string,
  posGroupId: string,
  orgGroupId: string,
  pOrgGroupId: string,
  gradeGroupId: string,
  headCount: number[],
  children: OrgRequestRow[]
};

export type OrgRequestSaveModel = {
  id: string | null,
  company: string,
  department: string,
  author: string,
  modifyDate: any | null,
  requestDate: any,
  requestStatus: string,
  comment: string | null
};

export type OrgRequestGrade = {
  id: string,
  groupId: string,
  name: string
};

@injectMainStore
@observer
class OrgStructureRequestEditComponent extends React.Component<Props & WrappedComponentProps & RootStoreProp & RouteComponentProps<any> & MainStoreInjected> {
  dataInstance = instance<OrgStructureRequest>(OrgStructureRequest.NAME, {
    view: "orgStructureRequest-edit",
    loadImmediately: false
  });

  companiesDc = collection<DicCompany>(DicCompany.NAME, {
    view: "_minimal"
  });

  organizationGroupsDc = collection<OrganizationGroupExt>(OrganizationGroupExt.NAME, {
    view: "_minimal"
  });

  requestStatusDc = collection<DicRequestStatus>(DicRequestStatus.NAME, {
    view: "_minimal"
  });

  authorsDc = collection<PersonGroupExt>(PersonGroupExt.NAME, {
    view: "_minimal"
  });

  @observable
  treeData: OrgRequestRow[];

  @observable
  selectedRow: OrgRequestRow | null;

  @observable
  isNew: boolean = true;

  @observable
  treeLoading: boolean = true;

  @observable
  showOrgCreateModal: boolean = false;

  @observable
  showPosCreateModal: boolean = false;

  @observable
  updated = false;

  reactionDisposer: IReactionDisposer;

  fields = ["requestNumber", "requestDate", "company", "department", "requestStatus", "author", "modifyDate", "comment"];

  locale = this.props.mainStore!.locale!;

  @observable
  globalErrors: string[] = [];

  @observable
  columnsOptions = {
    'current': true,
    'changes': true,
    'difference': true,
  };

  reloadTreeData = () => {
    this.treeLoading = true;
    restServices.orgStructureService.getMergedOrgStructure({requestId: this.props.entityId})
      .then(loadedData => {
        //console.log('loadedData: ', loadedData)
        this.treeData = loadedData;
      })
      .catch(async (response: any) => {
        const reader = response.response.body.getReader();
        let receivedLength = 0;
        let chunks = [];
        while (true) {
          const {done, value} = await reader.read();
          if (done) break;
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
        Notification.error({message: parse.message});
      })
      .finally(() => {
        this.treeLoading = false;
        this.selectedRow = null;
      });
  }

  getProperty = (propertyName: string, object: any) => {
    if (!object) return null;
    let parts = propertyName.split("."),
      length = parts.length, i,
      property = object || this;
    for (i = 0; i < length; i++) {
      property = property[parts[i]];
    }
    return property;
  }

  onChangeFilter = (value: string, option: React.ReactElement<HTMLLIElement>) => {
  }

  onChangeColumnFilter = (e: CheckboxChangeEvent) => {
    this.columnsOptions[e.target.id || ''] = e.target.checked;
  }

  saveRequest = (e: React.MouseEvent) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        Notification.error({
          message:
            this.props.intl.formatMessage({
              id: "management.editor.validationError"
            })
        });
        return;
      }

      let formData = this.props.form.getFieldsValue(this.fields);
      formData.requestDate = moment(formData.requstDate).format('YYYY-MM-DD HH:mm:ss.SSS');
      formData.modifyDate = moment(formData.modifyDate).format('YYYY-MM-DD HH:mm:ss.SSS');

      //console.log(formData)

      restServices.orgStructureService.saveRequest({
        orgRequestSaveModel: formData as OrgRequestSaveModel
      }).then(r => {
        Notification.success({message: this.props.intl.formatMessage({id: "org.request.saved"})});
        this.props.history.push(OrgStructureRequestManagement.PATH + "/" + r.id);
      });
    });
  }

  setRowClassName = (record: any) => {
    return this.selectedRow !== undefined
    && this.selectedRow !== null
    && record.rowKey === this.selectedRow.rowKey ? 'ant-table-row-selected' : '';
  }

  onRowClick = (record: any) => {
    this.selectedRow = record;
  }

  excludeSelectedRow = () => {
    this.showExcludeDialog(this.selectedRow!);
  }

  showExcludeDialog = (row: any) => {
    Modal.confirm({
      title: this.props.intl.formatMessage({id: "management.browser.exclude.areYouSure"}, {
        type: this.props.intl.formatMessage({id: "exclude.type." + row.elementType}),
        name: this.locale === 'ru' ? row.nameRu[0] || row.nameRu[1] : row.nameEn[0] || row.nameEn[1]
      }),
      okText: this.props.intl.formatMessage({
        id: "management.browser.exclude.ok"
      }),
      cancelText: this.props.intl.formatMessage({
        id: "management.browser.exclude.cancel"
      }),
      onOk: () => {
        restServices.orgStructureService.exclude({
          requestId: this.props.entityId,
          requestDetailId: row.rdId || null,
          elementGroupId: row.posGroupId || row.orgGroupId || null,
          elementType: row.elementType
        }).then(() => {
          Notification.success({
            message:
              this.props.intl.formatMessage({id: "org.request.exclude.success." + row.elementType})
          });
          this.reloadTreeData();
        });
      }
    });
  };

  preCreate = (e: ClickParam) => {
    this.isNew = true;
    this.showHideModal(e.key, true);
  }

  preEdit = (e: React.MouseEvent) => {
    if (this.selectedRow === undefined || this.selectedRow === null) {
      return;
    }
    this.isNew = false;
    this.showHideModal(this.selectedRow.elementType === 1 ? 'org' : 'pos', true);
  }

  showHideModal = (id: string, show: boolean) => {
    if (id === 'org') {
      this.showOrgCreateModal = show;
    } else {
      this.showPosCreateModal = show;
    }
  }

  onSaveOrganization = (rdId: string) => {
    this.reloadTreeData();
    this.showOrgCreateModal = false;
    Notification.success({message: this.props.intl.formatMessage({id: "org.request.organization.saved"})});
  }

  onSavePosition = (rdId: string) => {
    this.reloadTreeData();
    this.showPosCreateModal = false;
    Notification.success({message: this.props.intl.formatMessage({id: "org.request.position.saved"})});
  }

  render() {
    const messages = this.props.mainStore!.messages!;
    const locale = this.locale;
    const {status} = this.dataInstance;
    const changeTypes: EnumValueInfo[] = this.props.mainStore!.enums!.filter(e => e.name === "kz.uco.tsadv.modules.personal.enums.OrgRequestChangeType")[0].values;

    const createLinks = (
      <Menu onClick={this.preCreate}>
        <Menu.Item key="org">
          <Icon type="bank"/>
          {this.props.intl.formatMessage({id: "org.request.org.create"})}
        </Menu.Item>
        <Menu.Item key="pos">
          <Icon type="container"/>
          {this.props.intl.formatMessage({id: "org.request.pos.create"})}
        </Menu.Item>
      </Menu>
    );

    const buttons = [
      <Dropdown overlay={createLinks} key="create" disabled={!this.selectedRow}>
        <Button type="primary" className={"b-btn"}>
          <Icon type="plus"/>
          <FormattedMessage id="management.browser.create"/>
          <Icon type="down"/>
        </Button>
      </Dropdown>,
      <Button
        htmlType="button"
        key="edit"
        style={{margin: "0 12px 12px 12px"}}
        disabled={!this.selectedRow}
        onClick={this.preEdit}
        className={"b-btn"}
        type="default">
        <Icon type="edit"/>
        <FormattedMessage id="management.browser.edit"/>
      </Button>,
      <Button
        htmlType="button"
        style={{margin: "0 12px 12px 0"}}
        disabled={!this.selectedRow}
        onClick={this.excludeSelectedRow}
        className={"b-btn"}
        key="exclude"
        type="default">
        <Icon type="delete"/>
        <FormattedMessage id="management.browser.exclude.ok"/>
      </Button>,
      <Button
        htmlType="button"
        style={{margin: "0 12px 12px 0"}}
        onClick={this.reloadTreeData}
        className={"b-btn"}
        key="refresh"
        type="default">
        <Icon type="sync"/>
        <FormattedMessage id="management.browser.refresh"/>
      </Button>
    ];

    let columns = [
      {
        title: this.props.intl.formatMessage({id: "org.request.filter.3"}),
        group: 'current',
        children: [
          {
            title: this.props.intl.formatMessage({id: "org.request.detail.department"}),
            dataIndex: locale === 'ru' ? 'nameRu[0]' : 'nameEn[0]'
          },
          {
            title: this.props.intl.formatMessage({id: "org.request.detail.changeType"}),
            dataIndex: 'changeType',
            width: '12%',
            render: (x: string) => (x !== undefined && x !== null) ? this.props.intl.formatMessage({id: "org.request.detail.changeType." + x}) : undefined
          },
          {
            title: this.props.intl.formatMessage({id: "org.request.detail.grade"}),
            dataIndex: 'grade[0]',
            width: '30%'
          },
          {
            title: this.props.intl.formatMessage({id: "org.request.detail.hc"}),
            dataIndex: 'headCount[0]'
          },
          {
            title: this.props.intl.formatMessage({id: "org.request.detail.bs"}),
            dataIndex: 'baseSalary[0]'
          },
          {
            title: this.props.intl.formatMessage({id: "org.request.detail.tp1"}),
            dataIndex: 'mtPayrollPer[0]'
          },
          {
            title: this.props.intl.formatMessage({id: "org.request.detail.tp"}),
            dataIndex: 'mtPayroll[0]'
          }
        ]
      },
      {
        title: this.props.intl.formatMessage({id: "org.request.filter.4"}),
        group: 'changes',
        children: [
          {
            title: this.props.intl.formatMessage({id: "org.request.detail.department"}),
            dataIndex: locale === 'ru' ? 'nameRu[1]' : 'nameEn[1]'
          },
          {
            title: this.props.intl.formatMessage({id: "org.request.detail.grade"}),
            dataIndex: 'grade[1]',
            width: '30%'
          },
          {
            title: this.props.intl.formatMessage({id: "org.request.detail.hc"}),
            dataIndex: 'headCount[1]'
          },
          {
            title: this.props.intl.formatMessage({id: "org.request.detail.bs"}),
            dataIndex: 'baseSalary[1]'
          },
          {
            title: this.props.intl.formatMessage({id: "org.request.detail.tp1"}),
            dataIndex: 'mtPayrollPer[1]'
          },
          {
            title: this.props.intl.formatMessage({id: "org.request.detail.tp"}),
            dataIndex: 'mtPayroll[1]'
          }
        ]
      },
      {
        title: this.props.intl.formatMessage({id: "org.request.filter.5"}),
        group: 'difference',
        children: [
          {
            title: this.props.intl.formatMessage({id: "org.request.detail.department"}),
            dataIndex: locale === 'ru' ? 'nameRu[2]' : 'nameEn[2]'
          },
          {
            title: this.props.intl.formatMessage({id: "org.request.detail.grade"}),
            dataIndex: 'grade[2]',
            width: '30%'
          },
          {
            title: this.props.intl.formatMessage({id: "org.request.detail.hc"}),
            dataIndex: 'headCount[2]'
          },
          {
            title: this.props.intl.formatMessage({id: "org.request.detail.bs"}),
            dataIndex: 'baseSalary[2]'
          },
          {
            title: this.props.intl.formatMessage({id: "org.request.detail.tp1"}),
            dataIndex: 'mtPayrollPer[2]'
          },
          {
            title: this.props.intl.formatMessage({id: "org.request.detail.tp"}),
            dataIndex: 'mtPayroll[2]'
          }
        ]
      }
    ];

    columns = columns.filter(c => {
      return this.columnsOptions[c.group];
    })

    return (
      <Page>
        <Card className="narrow-layout" bordered={false}>
          <div className={"large-section section-container mb-0"}>
            <h3 style={{fontWeight: "bold"}}>{this.props.intl.formatMessage({id: "org.request.info"})}</h3>
            <Form layout="vertical" className="compact-form">
              <FormContainer>
                <Row className={"form-row"}>
                  <Col md={24} lg={6}>
                    <ReadonlyField
                      entityName={this.dataInstance.entityName}
                      propertyName="requestNumber"
                      form={this.props.form}
                      disabled={true}/>
                  </Col>
                  <Col md={24} lg={6}>
                    <ReadonlyField
                      entityName={this.dataInstance.entityName}
                      propertyName="company"
                      optionsContainer={this.companiesDc}
                      form={this.props.form}
                      disabled={true}/>
                  </Col>
                  <Col md={24} lg={6}>
                    <ReadonlyField
                      entityName={this.dataInstance.entityName}
                      propertyName="department"
                      optionsContainer={this.organizationGroupsDc}
                      form={this.props.form}
                      disabled={true}/>
                  </Col>
                </Row>
                <Row className={"form-row"}>
                  <Col md={24} lg={6}>
                    <Form.Item label={<Msg entityName={OrgStructureRequest.NAME} propertyName='requestDate'/>}
                               key='requestDate'>
                      {this.props.form.getFieldDecorator('requestDate')(<DefaultDatePicker disabled/>)}
                    </Form.Item>
                  </Col>
                  <Col md={24} lg={6}>
                    <ReadonlyField
                      entityName={this.dataInstance.entityName}
                      propertyName="requestStatus"
                      optionsContainer={this.requestStatusDc}
                      form={this.props.form}
                      disabled={true}/>
                  </Col>
                  <Col md={24} lg={6}>
                    <ReadonlyField
                      entityName={this.dataInstance.entityName}
                      propertyName="author"
                      optionsContainer={this.authorsDc}
                      form={this.props.form}
                      disabled={true}/>
                  </Col>
                </Row>
              </FormContainer>

              {this.globalErrors.length > 0 && (
                <Alert
                  message={<MultilineText lines={toJS(this.globalErrors)}/>}
                  type="error"
                  style={{marginBottom: "24px"}}
                />
              )}
            </Form>
          </div>

          <div className={"large-section section-container mb-0"}>
            <Row>
              <Col md={24} lg={6}>
                <div style={{borderRight: '2px solid #e8e8e8', marginRight: '20px', paddingRight: '20px'}}>
                  <h3 style={{fontWeight: "bold"}}>{this.props.intl.formatMessage({id: "org.request.filter"})}</h3>
                  <Form layout="vertical" className="compact-form">
                    <Form.Item label={this.props.intl.formatMessage({id: "org.request.filter.1"})}>
                      <Select onChange={this.onChangeFilter}
                              defaultActiveFirstOption={true}
                              defaultValue={"all"}
                              filterOption={(input, option) =>
                                (option.props.children as string).toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }>
                        <Select.Option
                          key="all">{this.props.intl.formatMessage({id: "org.request.filter.v1"})}</Select.Option>
                        {
                          changeTypes.map((s, i) =>
                            <Select.Option title={s.caption} key={s.id}>{s.caption}</Select.Option>)
                        }
                      </Select>
                    </Form.Item>
                    <Form.Item label={this.props.intl.formatMessage({id: "org.request.filter.2"})}>
                      <Select onChange={this.onChangeFilter} defaultActiveFirstOption={true} defaultValue={"all"}>
                        <Select.Option
                          key="all">{this.props.intl.formatMessage({id: "org.request.filter.v1"})}</Select.Option>
                        <Select.Option
                          key="changes">{this.props.intl.formatMessage({id: "org.request.filter.v2"})}</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item>
                      <Checkbox onChange={this.onChangeColumnFilter} id={"current"} defaultChecked={true}>
                        {this.props.intl.formatMessage({id: "org.request.filter.3"})}
                      </Checkbox>
                    </Form.Item>
                    <Form.Item>
                      <Checkbox onChange={this.onChangeColumnFilter} id={"changes"} defaultChecked={true}>
                        {this.props.intl.formatMessage({id: "org.request.filter.4"})}
                      </Checkbox>
                    </Form.Item>
                    <Form.Item>
                      <Checkbox onChange={this.onChangeColumnFilter} id={"difference"} defaultChecked={true}>
                        {this.props.intl.formatMessage({id: "org.request.filter.5"})}
                      </Checkbox>
                    </Form.Item>
                  </Form>
                </div>
              </Col>
              <Col md={24} lg={12}>
                <h3 style={{fontWeight: "bold"}}>{this.props.intl.formatMessage({id: "org.request.comment.block"})}</h3>

                <div>
                  <Form layout="horizontal" className="compact-form">
                    <Form.Item label={<Msg entityName={OrgStructureRequest.NAME} propertyName='modifyDate'/>}
                               key='modifyDate'
                               style={{marginBottom: '12px'}}>
                      {this.props.form.getFieldDecorator('modifyDate')(<DefaultDatePicker/>)}
                    </Form.Item>

                    <Form.Item label={<Msg entityName={OrgStructureRequest.NAME} propertyName='comment'/>}
                               key="comment">
                      {this.props.form.getFieldDecorator('comment')
                      (<TextArea rows={4}/>)}
                    </Form.Item>
                  </Form>
                </div>
                <div>
                  <Button type="primary"
                          disabled={status !== "DONE" && status !== "ERROR"}
                          loading={status === "LOADING"}
                          style={{marginRight: "10px"}}
                          className={"b-btn"}
                          onClick={this.saveRequest}>
                    <Icon type="check"/>
                    <FormattedMessage id="management.editor.submit"/>
                  </Button>
                  <Link to={OrgStructureRequestManagement.PATH}>
                    <Button htmlType="button" type="default">
                      <Icon type="close"/>
                      <FormattedMessage id="management.editor.cancel"/>
                    </Button>
                  </Link>
                </div>
              </Col>
            </Row>
          </div>
          {this.props.entityId != OrgStructureRequestManagement.NEW_SUBPATH ?
            <div className={"large-section section-container"}>
              <div>
                {buttons}
              </div>
              <Table columns={columns}
                     loading={this.treeLoading}
                     dataSource={Array.from(this.treeData || '')}
                     rowKey={(r: OrgRequestRow) => r.rowKey}
                     className="kzm-tree-table"
                     indentSize={10}
                     pagination={false}
                     size={'small'} bordered={true}
                     tableLayout={"auto"}
                     rowClassName={this.setRowClassName}
                     onRow={(record) => {
                       return {
                         onClick: this.onRowClick.bind(this, record)
                       };
                     }}/>
            </div> : null}
        </Card>

        {this.showOrgCreateModal ?
          <OrganizationEditor row={this.selectedRow}
                              requestId={this.props.entityId}
                              treeData={this.treeData}
                              isNew={this.isNew}
                              form={this.props.form}
                              closeModal={() => this.showOrgCreateModal = false}
                              onSave={this.onSaveOrganization}/> : null}

        {this.showPosCreateModal ?
          <PositionEditor row={this.selectedRow}
                          requestId={this.props.entityId}
                          treeData={this.treeData}
                          isNew={this.isNew}
                          form={this.props.form}
                          closeModal={() => this.showPosCreateModal = false}
                          onSave={this.onSavePosition}/> : null}
      </Page>
    );
  }

  componentDidMount() {
    if (this.props.entityId !== OrgStructureRequestManagement.NEW_SUBPATH) {
      this.dataInstance.load(this.props.entityId);

      this.reloadTreeData();
    } else {
      restServices.orgStructureService.initialCreate()
        .then(data => {
          delete data.id;
          this.dataInstance.setItem(data);
        });
    }

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
  }

  componentWillUnmount() {
    this.reactionDisposer();
  }
}

export default injectIntl(
  withLocalizedForm<EditorProps>({
    onValuesChange: (props: any, changedValues: any) => {
      // Reset server-side errors when field is edited
      Object.keys(changedValues).forEach((fieldName: string) => {
        props.form.setFields({
          [fieldName]: {
            value: changedValues[fieldName]
          }
        });
      });
    }
  })(withRouter(OrgStructureRequestEditComponent))
);
