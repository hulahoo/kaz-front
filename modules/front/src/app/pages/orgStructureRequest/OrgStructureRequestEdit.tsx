import * as React from "react";
import {Alert, Card, Checkbox, Col, Dropdown, Form, Icon, Menu, Modal, Row, Select, Spin, Table} from "antd";

import {inject, observer} from "mobx-react";
import {OrgStructureRequestManagement} from "./OrgStructureRequestManagement";
import {FormComponentProps} from "antd/lib/form";
import {Link, withRouter} from "react-router-dom";
import {IReactionDisposer, observable, toJS} from "mobx";
import {FormattedMessage, injectIntl} from "react-intl";

import {collection, injectMainStore, instance, Msg, MultilineText, withLocalizedForm} from "@cuba-platform/react";

import "../../../app/App.css";

import {OrgStructureRequest} from "../../../cuba/entities/base/tsadv_OrgStructureRequest";
import Page from "../../hoc/PageContentHoc";
import {ReadonlyField} from "../../components/ReadonlyField";
import FormContainer from "../../common/FormContainer";
import TextArea from "antd/es/input/TextArea";
import {ClickParam} from "antd/lib/menu";
import OrganizationEditor from "./OrganizationEditor";
import {OrgStructureFilterParams, restServices} from "../../../cuba/services";
import Notification from "../../util/Notification/Notification";
import {EnumValueInfo} from "@cuba-platform/rest/dist-browser/model";
import PositionEditor from "./PositionEditor";
import {CheckboxChangeEvent} from "antd/lib/checkbox";
import {DicCompany} from "../../../cuba/entities/base/base_DicCompany";
import {OrganizationGroupExt} from "../../../cuba/entities/base/base$OrganizationGroupExt";
import {DicRequestStatus} from "../../../cuba/entities/base/tsadv$DicRequestStatus";
import {PersonGroupExt} from "../../../cuba/entities/base/base$PersonGroupExt";
import moment from "moment";
import DefaultDatePicker from "../../components/Datepicker";
import AbstractBprocEdit from "../Bproc/abstract/AbstractBprocEdit";
import {runReport} from "../../util/reportUtil";
import Button, {ButtonType} from "../../components/Button/Button";

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
  baseSalary: number[],
  mtPayrollPer: number[],
  mtPayroll: number[],
  children: OrgRequestRow[]
};

export type OrgRequestSaveModel = {
  id: string | null,
  company: string,
  department: string,
  author: string,
  modifyDate: any | null,
  requestDate: any,
  status: string,
  comment: string | null
};

export type OrgRequestGrade = {
  id: string,
  groupId: string,
  name: string
};

type ColumnValidator = () => boolean

export type DisplayColumn = {
  validators?: Array<ColumnValidator>
}

export interface DisplayColumnValidator {
  validate: (column: DisplayColumn) => boolean
}

export class DisplayColumnValidatorImpl implements DisplayColumnValidator {
  validate = (column: DisplayColumn): boolean => {
    if (column.validators == undefined) {
      return true;
    }
    for (let validator of column.validators) {
      const resultValidate = validator();
      if (!resultValidate) {
        return false;
      }
    }
    return true;
  };
}

export const gradeValidator = (availableSalary: boolean): boolean => {
  return availableSalary;
};

export class DisplayColumnValidatorFactory {
  private static instance = new DisplayColumnValidatorImpl;

  static getDisplayColumnValidator = (): DisplayColumnValidator => {
    return DisplayColumnValidatorFactory.instance;
  }
}

@injectMainStore
@inject("rootStore")
@observer
class OrgStructureRequestEditComponent extends AbstractBprocEdit<OrgStructureRequest, Props> {
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

  statusDc = collection<DicRequestStatus>(DicRequestStatus.NAME, {
    view: "_minimal"
  });

  authorsDc = collection<PersonGroupExt>(PersonGroupExt.NAME, {
    view: "_minimal"
  });

  availableSalary: boolean = false;

  fetchDataService = restServices.orgStructureService.getMergedOrgStructure.bind(null, {requestId: this.props.entityId});

  @observable
  changeTypeSelectedValue: string = 'all';

  @observable
  displaySelectedValue: string = 'all';

  @observable
  disabledChangeTypeSelect: boolean = false;

  @observable
  disabledDisplaySelect: boolean = false;

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

  @observable
  isCbCompany: boolean = false;

  @observable
  loadingReport: boolean = false;

  reactionDisposer: IReactionDisposer;

  fields = ["requestNumber", "requestDate", "company", "department", "status", "author", "modifyDate", "comment", "comment", "file"];

  locale = this.props.mainStore!.locale!;

  @observable
  globalErrors: string[] = [];

  @observable
  columnsOptions = {
    'current': true,
    'changes': true,
    'difference': true,
  };

  processDefinitionKey: string = OrgStructureRequest.PROCESS_DEFINITION_KEY;

  reloadTreeData = () => {
    this.treeLoading = true;
    this.fillTreeData(this.fetchDataService());
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

  onChangeTypeFilter = (propertyFilterName: string, value: string, option: React.ReactElement<HTMLLIElement>) => {
    this.changeTypeSelectedValue = value;
    if (value !== 'all') {
      this.displaySelectedValue = this.props.intl.formatMessage({id: "org.request.filter.v1"});
    }
    this.disabledDisplaySelect = value !== 'all';

    this.filterTable(propertyFilterName, value);
  }

  onChangeDisplayFilter = (propertyFilterName: string, value: string, option: React.ReactElement<HTMLLIElement>) => {
    this.displaySelectedValue = value;
    if (value !== 'all') {
      this.changeTypeSelectedValue = this.props.intl.formatMessage({id: "org.request.filter.v1"})
    }
    this.disabledChangeTypeSelect = value !== 'all';
    this.filterTable(propertyFilterName, value);
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
      if (!this.isNewEntity()) {
        formData.id = this.props.entityId;
      }

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
    console.log(record);
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
        restServices.orgStructureService.excludeData({
          requestId: this.props.entityId,
          data: row
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
            dataIndex: 'baseSalary[0]',
            validators: [gradeValidator.bind(null, this.availableSalary)]
          },
          {
            title: this.props.intl.formatMessage({id: "org.request.detail.tp1"}),
            dataIndex: 'mtPayrollPer[0]',
            validators: [gradeValidator.bind(null, this.availableSalary)]
          },
          {
            title: this.props.intl.formatMessage({id: "org.request.detail.tp"}),
            dataIndex: 'mtPayroll[0]',
            validators: [gradeValidator.bind(null, this.availableSalary)]
          }
        ],
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
            dataIndex: 'baseSalary[1]',
            validators: [gradeValidator.bind(null, this.availableSalary)]
          },
          {
            title: this.props.intl.formatMessage({id: "org.request.detail.tp1"}),
            dataIndex: 'mtPayrollPer[1]',
            validators: [gradeValidator.bind(null, this.availableSalary)]
          },
          {
            title: this.props.intl.formatMessage({id: "org.request.detail.tp"}),
            dataIndex: 'mtPayroll[1]',
            validators: [gradeValidator.bind(null, this.availableSalary)]
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
            dataIndex: 'baseSalary[2]',
            validators: [gradeValidator.bind(null, this.availableSalary)]
          },
          {
            title: this.props.intl.formatMessage({id: "org.request.detail.tp1"}),
            dataIndex: 'mtPayrollPer[2]',
            validators: [gradeValidator.bind(null, this.availableSalary)]
          },
          {
            title: this.props.intl.formatMessage({id: "org.request.detail.tp"}),
            dataIndex: 'mtPayroll[2]',
            validators: [gradeValidator.bind(null, this.availableSalary)]
          }
        ]
      }
    ];

    columns = columns
      .map((c: any) => {
        if (c.children) {
          c.children = (c.children as Array<DisplayColumn>)
            .filter(ch => {
              const displayColumnValidator = DisplayColumnValidatorFactory.getDisplayColumnValidator();
              return displayColumnValidator.validate((ch as DisplayColumn));
            });
        }
        return c;
      })
      .filter(c => {
        return this.columnsOptions[c.group];
      });

    const isDisabledFields = this.isNotDraft();

    const bprocButtons = [];
    if (!isDisabledFields)
      bprocButtons.push(<Button buttonType={ButtonType.PRIMARY}
                                disabled={status !== "DONE" && status !== "ERROR"}
                                loading={status === "LOADING"}
                                onClick={this.saveRequest}>
        <Icon type="check"/>
        <FormattedMessage id="management.editor.submit"/>
      </Button>);

    bprocButtons.push(<Link to={OrgStructureRequestManagement.PATH}>
      <Button buttonType={ButtonType.FOLLOW}>
        <Icon type="close"/>
        <FormattedMessage id="management.editor.cancel"/>
      </Button>
    </Link>);

    if (!this.isNewEntity()) bprocButtons.push(this.getOutcomeBtns());

    return (
      <Page>
        <Card className="narrow-layout card-actions-container" bordered={false}
              actions={bprocButtons}>
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
                      propertyName="status"
                      optionsContainer={this.statusDc}
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
            <Row type="flex">
              <Col md={24} lg={6}>
                <div
                  style={{borderRight: '2px solid #e8e8e8', marginRight: '20px', paddingRight: '20px', height: '100%'}}>
                  <h3 style={{fontWeight: "bold"}}>{this.props.intl.formatMessage({id: "org.request.filter"})}</h3>
                  <Form layout="vertical" className="compact-form">
                    <Form.Item label={this.props.intl.formatMessage({id: "org.request.filter.1"})}>
                      <Select onChange={this.onChangeTypeFilter.bind(null, 'changeTypeFilter')}
                              defaultActiveFirstOption={true}
                              value={this.changeTypeSelectedValue}
                              disabled={this.disabledChangeTypeSelect}
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
                      <Select onChange={this.onChangeDisplayFilter.bind(null, 'displayFilter')}
                              defaultActiveFirstOption={true}
                              value={this.displaySelectedValue}
                              disabled={this.disabledDisplaySelect}>
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
                <div
                  style={{borderRight: '2px solid #e8e8e8', marginRight: '20px', paddingRight: '20px', height: '100%'}}>
                  <h3
                    style={{fontWeight: "bold"}}>{this.props.intl.formatMessage({id: "org.request.comment.block"})}</h3>
                  <Form layout="horizontal" className="compact-form">
                    <Form.Item label={<Msg entityName={OrgStructureRequest.NAME} propertyName='modifyDate'/>}
                               key='modifyDate'
                               style={{marginBottom: '12px'}}>
                      {this.props.form.getFieldDecorator('modifyDate', {
                        rules: [{
                          required: true,
                          message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.modifyDate']})
                        }]
                      })(<DefaultDatePicker
                        disabled={isDisabledFields}/>)}
                    </Form.Item>

                    <Form.Item label={<Msg entityName={OrgStructureRequest.NAME} propertyName='comment'/>}
                               key="comment">
                      {this.props.form.getFieldDecorator('comment')
                      (<TextArea rows={4} disabled={isDisabledFields}/>)}
                    </Form.Item>
                  </Form>
                </div>
              </Col>
              <Col md={24} lg={6}>
                <div>
                  <ReadonlyField
                    entityName={this.dataInstance.entityName}
                    propertyName="file"
                    form={this.props.form}
                    disabled={isDisabledFields}
                    getFieldDecoratorOpts={{
                      rules: [{
                        required: !isDisabledFields,
                        message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: messages[this.dataInstance.entityName + '.file']})
                      }]
                    }}
                  />
                </div>
              </Col>
            </Row>
          </div>
          {!this.isNewEntity() ?
            <div className={"large-section section-container"}>
              <div>
                {this.tableButtons()}
              </div>
              <Table columns={columns}
                     loading={this.treeLoading}
                     dataSource={Array.from(this.treeData || '')}
                     rowKey={(r: OrgRequestRow) => r.rowKey + '/' + (r.pOrgGroupId || '')}
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

          {this.takCard()}

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
                          isDisabledFields={this.isOnApproving()}
                          isCbCompany={this.isCbCompany}
                          closeModal={() => this.showPosCreateModal = false}
                          onSave={this.onSavePosition}/> : null}
      </Page>
    );
  }

  loadData = () => {
    if (this.isNewEntity()) {
      restServices.orgStructureService.initialCreate()
        .then(data => {
          delete data.id;
          this.dataInstance.setItem(data);
        });
    } else {
      this.dataInstance.load(this.props.entityId);

      this.reloadTreeData();
    }
  };

  afterSendOnApprove = () => {
    this.props.history!.push(OrgStructureRequestManagement.PATH);
  };

  componentWillUnmount() {
    this.reactionDisposer();
  }

  componentDidMount() {
    super.componentDidMount();
    restServices.orgStructureService.availableSalary()
      .then((availableSalary: boolean) => {
        this.availableSalary = availableSalary;
      });

    restServices.employeeService.hasHrRole({dicHrCode: "C&B_COMPANY"})
      .then(response => this.isCbCompany = response);
  }

  tableButtons = () => {
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

    const buttons = [];

    const createButton = <Dropdown overlay={createLinks} key="create" disabled={!this.selectedRow}>
      <Button buttonType={ButtonType.FOLLOW} style={{width: 'auto'}}>
        <Icon type="plus"/>
        <FormattedMessage id="management.browser.create"/>
        <Icon type="down"/>
      </Button>
    </Dropdown>;
    const editButton = <Button buttonType={ButtonType.FOLLOW} style={{width: 'auto', margin: "0 12px 12px 12px"}}
                               htmlType="button"
                               key="edit"
                               disabled={!this.selectedRow || this.isOnApproving() && this.isCbCompany && this.selectedRow.elementType === 1}
                               onClick={this.preEdit}>
      <Icon type="edit"/>
      <FormattedMessage id="management.browser.edit"/>
    </Button>;
    const deleteButton = <Button buttonType={ButtonType.FOLLOW} style={{width: 'auto', margin: "0 12px 12px 0"}}
                                 disabled={!this.selectedRow}
                                 onClick={this.excludeSelectedRow}
                                 key="exclude">
      <Icon type="delete"/>
      <FormattedMessage id="management.browser.exclude.ok"/>
    </Button>;
    const refreshButton = <Button buttonType={ButtonType.FOLLOW} style={{width: 'auto', margin: "0 12px 12px 0"}}
                                  onClick={this.reloadTreeData}
                                  key="refresh">
      <Icon type="sync"/>
      <FormattedMessage id="management.browser.refresh"/>
    </Button>;
    const printReportButton = <Button buttonType={ButtonType.FOLLOW} style={{width: 'auto', margin: "0 12px 12px 0"}}
                                      onClick={this.onClickDownloadReport}
                                      disabled={this.loadingReport}
                                      key="report-button">
      {this.loadingReport ? <Spin/> : <Icon type="file-excel"/>}
      {this.props.intl.formatMessage({id: 'orgStructureRequest.report'})}
    </Button>;
    const printOrderButton = <Button buttonType={ButtonType.FOLLOW} style={{width: 'auto', margin: "0 12px 12px 0"}}
                                     onClick={this.onClickDownloadOrder}
                                     key="order-button">
      <Icon type="file-excel"/>
      {this.props.intl.formatMessage({id: 'orgStructureRequest.order'})}
    </Button>;
    if (!this.isNotDraft()) {
      buttons.push(createButton, editButton, deleteButton);
    } else if (this.isCbCompany && this.isOnApproving()) {
      buttons.push(editButton);
    }
    buttons.push(refreshButton);
    buttons.push(printReportButton, printOrderButton);
    return buttons;
  };

  filterTable = (propertyFilterName: string, value: string) => {
    this.fetchDataService = restServices.orgStructureService.getMergedOrgStructureFilter.bind(null, ({
      requestId: this.props.entityId,
      [propertyFilterName]: value.toUpperCase()
    } as OrgStructureFilterParams));

    this.treeLoading = true;
    this.fillTreeData(this.fetchDataService());
  };

  fillTreeData = (fetchServiceResponse: Promise<Array<OrgRequestRow>>) => {
    fetchServiceResponse.then(loadedData => {
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
      })
  }

  onClickDownloadReport = async () => {
    this.loadingReport = true;
    const reportCode = "ORG_SRTUCTURE";

    const data = {
      parameters: [{
        name: "req",
        value: this.props.entityId
      }, {
        name: 'usr',
        value: this.props.rootStore!.userInfo.id!
      }]
    };
    await runReport(reportCode, data, this.props.intl);
    this.loadingReport = false;
    console.log(this.loadingReport);
  }

  onClickDownloadOrder = () => {

    const reportCode = "ORDER";

    const data = {
      parameters: [{
        name: "req",
        value: this.props.entityId
      }]
    };
    runReport(reportCode, data, this.props.intl);
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
