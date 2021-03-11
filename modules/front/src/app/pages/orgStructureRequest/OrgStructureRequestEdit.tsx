import * as React from "react";
import {FormEvent} from "react";
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Dropdown,
  Form,
  Icon,
  Input,
  Menu,
  Modal,
  Row,
  Select,
  Table
} from "antd";

import {observer} from "mobx-react";
import {OrgStructureRequestManagement} from "./OrgStructureRequestManagement";
import {FormComponentProps} from "antd/lib/form";
import {Link, Redirect} from "react-router-dom";
import {IReactionDisposer, observable, reaction, toJS} from "mobx";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";

import {
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

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  entityId: string;
};

export type OrgRequestRow = {
  root: boolean,
  rId: string,
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

export type OrgRequestGrade = {
  id: string,
  groupId: string,
  name: string
};

@injectMainStore
@observer
class OrgStructureRequestEditComponent extends React.Component<Props & WrappedComponentProps & MainStoreInjected> {
  dataInstance = instance<OrgStructureRequest>(OrgStructureRequest.NAME, {
    view: "orgStructureRequest-edit",
    loadImmediately: false
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
  comment: string | null;

  @observable
  updated = false;

  reactionDisposer: IReactionDisposer;

  fields = ["requestNumber", "requestDate", "company", "department", "author"];

  @observable
  globalErrors: string[] = [];

  @observable
  columnsOptions = {
    'current': true,
    'changes': true,
    'difference': true,
  }

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

  saveRequestInfo = (e: FormEvent) => {
    console.log(e);
  }

  setComment = (comment: string | null) => {
    this.comment = comment;
  };

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

  saveRequest = () => {
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
        name: row.nameRu[0]
      }),
      okText: this.props.intl.formatMessage({
        id: "management.browser.exclude.ok"
      }),
      cancelText: this.props.intl.formatMessage({
        id: "management.browser.exclude.cancel"
      }),
      onOk: () => {
        restServices.orgStructureService.exclude({
          requestId: row.rId,
          requestDetailId: row.rdId,
          elementGroupId: row.posGroupId || row.orgGroupId || null,
          elementType: row.elementType
        }).then(() => {
          Notification.success({message: row.nameRu[0] + ' успешно упразднена!'});
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
    Notification.success({message: 'Организация успешно сохранена!'});
  }

  onSavePosition = (rdId: string) => {
    this.reloadTreeData();
    this.showPosCreateModal = false;
    Notification.success({message: 'Позиция успешно сохранена!'});
  }

  render() {
    if (this.updated) {
      return <Redirect to={OrgStructureRequestManagement.PATH}/>;
    }

    const messages = this.props.mainStore!.messages!;
    const {status} = this.dataInstance;
    const changeTypes: EnumValueInfo[] = this.props.mainStore!.enums!.filter(e => e.name === "kz.uco.tsadv.modules.personal.enums.OrgRequestChangeType")[0].values;

    const createLinks = (
      <Menu onClick={this.preCreate}>
        <Menu.Item key="org">
          <Icon type="bank"/>
          Создать организацию
        </Menu.Item>
        <Menu.Item key="pos">
          <Icon type="container"/>
          Создать позицию
        </Menu.Item>
      </Menu>
    );

    const buttons = [
      <Dropdown overlay={createLinks} key="create">
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
        title: 'Текущее положение',
        group: 'current',
        children: [
          {
            title: 'Department/Job',
            dataIndex: 'nameRu[0]'
          },
          {
            title: 'Тип изменения',
            dataIndex: 'changeType',
            width: '12%',
          },
          {
            title: 'Grade',
            dataIndex: 'grade[0]',
            width: '30%'
          },
          {
            title: 'Head Count',
            dataIndex: 'headCount[0]'
          },
          {
            title: 'Base Salary',
            dataIndex: 'baseSalary[0]'
          },
          {
            title: 'Monthly total payroll (per 1)',
            dataIndex: 'mtPayrollPer[0]'
          },
          {
            title: 'Monthly total payroll',
            dataIndex: 'mtPayroll[0]'
          }
        ]
      },
      {
        title: 'Предлагаемые изменения',
        group: 'changes',
        children: [
          {
            title: 'Department/Job',
            dataIndex: 'nameRu[1]'
          },
          {
            title: 'Grade',
            dataIndex: 'grade[1]',
            width: '30%'
          },
          {
            title: 'Head Count',
            dataIndex: 'headCount[1]'
          },
          {
            title: 'Base Salary',
            dataIndex: 'baseSalary[1]'
          },
          {
            title: 'Monthly total payroll (per 1)',
            dataIndex: 'mtPayrollPer[1]'
          },
          {
            title: 'Monthly total payroll',
            dataIndex: 'mtPayroll[1]'
          }
        ]
      },
      {
        title: 'Разница',
        group: 'difference',
        children: [
          {
            title: 'Department/Job',
            dataIndex: 'nameRu[2]'
          },
          {
            title: 'Grade',
            dataIndex: 'grade[2]',
            width: '30%'
          },
          {
            title: 'Head Count',
            dataIndex: 'headCount[2]'
          },
          {
            title: 'Base Salary',
            dataIndex: 'baseSalary[2]'
          },
          {
            title: 'Monthly total payroll (per 1)',
            dataIndex: 'mtPayrollPer[2]'
          },
          {
            title: 'Monthly total payroll',
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
            <h3 style={{fontWeight: "bold"}}>Информация о заявке</h3>
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
                    <Form.Item label={<Msg entityName={OrgStructureRequest.NAME} propertyName='company'/>}>
                      <Input disabled value={this.getProperty('company._instanceName', this.dataInstance.item)}/>
                    </Form.Item>
                  </Col>
                  <Col md={24} lg={6}>
                    <Form.Item label={<Msg entityName={OrgStructureRequest.NAME} propertyName='department'/>}>
                      <Input disabled value={this.getProperty('department._instanceName', this.dataInstance.item)}/>
                    </Form.Item>
                  </Col>
                </Row>
                <Row className={"form-row"}>
                  <Col md={24} lg={6}>
                    <ReadonlyField
                      entityName={this.dataInstance.entityName}
                      propertyName="requestDate"
                      form={this.props.form}
                      disabled={true}/>
                  </Col>
                  <Col md={24} lg={6}>
                    <Form.Item label={<Msg entityName={OrgStructureRequest.NAME} propertyName='requestStatus'/>}
                               labelCol={{span: 12}} colon={true}>
                      <Input disabled value={this.getProperty('requestStatus._instanceName', this.dataInstance.item)}/>
                    </Form.Item>
                  </Col>
                  <Col md={24} lg={6}>
                    <Form.Item label={<Msg entityName={OrgStructureRequest.NAME} propertyName='author'/>}>
                      <Input disabled value={this.getProperty('author._instanceName', this.dataInstance.item)}/>
                    </Form.Item>
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
                  <h3 style={{fontWeight: "bold"}}>Фильтр</h3>
                  <Form layout="vertical" className="compact-form">
                    <Form.Item label={"Тип изменения"}>
                      <Select onChange={this.onChangeFilter}
                              defaultActiveFirstOption={true}
                              defaultValue={"all"}
                              filterOption={(input, option) =>
                                (option.props.children as string).toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }>
                        <Select.Option key="all">Все</Select.Option>
                        {
                          changeTypes.map((s, i) =>
                            <Select.Option title={s.caption} key={s.id}>{s.caption}</Select.Option>)
                        }
                      </Select>
                    </Form.Item>
                    <Form.Item label={"Показать"}>
                      <Select onChange={this.onChangeFilter} defaultActiveFirstOption={true} defaultValue={"all"}>
                        <Select.Option key="all">Все</Select.Option>
                        <Select.Option key="changes">Изменения</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item>
                      <Checkbox onChange={this.onChangeColumnFilter} id={"current"} defaultChecked={true}>
                        Текущее положение
                      </Checkbox>
                    </Form.Item>
                    <Form.Item>
                      <Checkbox onChange={this.onChangeColumnFilter} id={"changes"} defaultChecked={true}>
                        Предлагаемые изменения
                      </Checkbox>
                    </Form.Item>
                    <Form.Item>
                      <Checkbox onChange={this.onChangeColumnFilter} id={"difference"} defaultChecked={true}>
                        Разница
                      </Checkbox>
                    </Form.Item>
                  </Form>
                </div>
              </Col>
              <Col md={24} lg={12}>
                <h3 style={{fontWeight: "bold"}}>Текущее положение и причины возникновения изменений</h3>

                <div>
                  <Form onSubmit={this.saveRequestInfo} layout="horizontal" className="compact-form">
                    <Form.Item label={<Msg entityName={OrgStructureRequest.NAME} propertyName='modifyDate'/>}
                               key='modifyDate'
                               style={{marginBottom: '12px'}}>
                      {this.props.form.getFieldDecorator('modifyDate')(<DatePicker/>)}
                    </Form.Item>

                    <Form.Item label={"Обоснование для изменения"}>
                      <TextArea
                        onChange={event => {
                          const {value} = event.currentTarget;
                          this.setComment(value);
                        }}
                        placeholder={"Обоснование для изменения"}
                        rows={4}/>
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
                    <Button htmlType="button" className={"b-btn"}>
                      <Icon type="close"/>
                      <FormattedMessage id="management.editor.cancel"/>
                    </Button>
                  </Link>
                </div>
              </Col>
            </Row>
          </div>

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
          </div>
        </Card>

        {this.showOrgCreateModal ?
          <OrganizationEditor row={this.selectedRow}
                              treeData={this.treeData}
                              isNew={this.isNew}
                              form={this.props.form}
                              closeModal={() => this.showOrgCreateModal = false}
                              onSave={this.onSaveOrganization}/> : null}

        {this.showPosCreateModal ?
          <PositionEditor row={this.selectedRow}
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
    } else {
      this.dataInstance.setItem(new OrgStructureRequest());
    }

    this.reloadTreeData();

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
  })(OrgStructureRequestEditComponent)
);
