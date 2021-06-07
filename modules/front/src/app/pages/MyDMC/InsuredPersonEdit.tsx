import * as React from "react";
import {FormEvent} from "react";
import {Alert, Button, Card, Col, Form, message, Modal, Row, Spin, Tag} from "antd";
import {inject, observer} from "mobx-react";
import {InsuredPersonManagement} from "./InsuredPersonManagement";
import {FormComponentProps} from "antd/lib/form";
import {Link, Redirect, withRouter} from "react-router-dom";
import {action, IReactionDisposer, observable, reaction, toJS} from "mobx";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";

import {catchException, downloadFile} from "../../util/util";

import {
  clearFieldErrors,
  collection,
  constructFieldsWithErrors,
  extractServerValidationErrors,
  FileUpload,
  injectMainStore,
  instance,
  MainStoreInjected,
  MultilineText,
  withLocalizedForm
} from "@cuba-platform/react";

import "../../../app/App.css";

import {InsuredPerson} from "../../../cuba/entities/base/tsadv$InsuredPerson";
import {DicMICAttachmentStatus} from "../../../cuba/entities/base/tsadv$DicMICAttachmentStatus";
import {InsuranceContract} from "../../../cuba/entities/base/tsadv$InsuranceContract";
import {DicCompany} from "../../../cuba/entities/base/base_DicCompany";
import {PersonGroupExt} from "../../../cuba/entities/base/base$PersonGroupExt";
import {DicRelationshipType} from "../../../cuba/entities/base/tsadv$DicRelationshipType";
import {JobGroup} from "../../../cuba/entities/base/tsadv$JobGroup";
import {DicSex} from "../../../cuba/entities/base/base$DicSex";
import {DicDocumentType} from "../../../cuba/entities/base/tsadv$DicDocumentType";
import {DicRegion} from "../../../cuba/entities/base/base$DicRegion";
import {FileDescriptor} from "../../../cuba/entities/base/sys$FileDescriptor";
import {ReadonlyField} from "../../components/ReadonlyField";
import {restServices} from "../../../cuba/services";
import {RouteComponentProps} from "react-router";
import {SerializedEntity} from "@cuba-platform/rest";
import {RootStoreProp} from "../../store";
import {DataCollectionStore} from "@cuba-platform/react/dist/data/Collection";
import {DEFAULT_DATE_PATTERN} from "../../util/Date/Date";
import {DicAddressType} from "../../../cuba/entities/base/tsadv$DicAddressType";
import DataTableFormat from "../../components/DataTable/intex";
import {collectionWithAfterLoad} from "../../util/DataCollectionStoreWithAfterLoad";
import InsuredPersonMemberComponent from "./InsuredPersonMember";
import Notification from "../../util/Notification/Notification";

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  entityId: string;
};


@injectMainStore
@inject("rootStore")
@observer
class InsuredPersonEditComponent extends React.Component<Props & RootStoreProp & WrappedComponentProps & MainStoreInjected & RouteComponentProps<any>> {

  @observable
  visible: boolean = false;

  dataInstance = instance<InsuredPerson>(InsuredPerson.NAME, {
    view: "insuredPerson-editView",
    loadImmediately: false
  });

  familyDataCollection = collection<InsuredPerson>(InsuredPerson.NAME, {
    view: "insuredPerson-browseView",
    sort: "-updateTs",
    loadImmediately: false,
    filter: {
      conditions: [{
        property: 'id',
        operator: '=',
        value: null
      }]
    }
  });

  statusRequestsDc = collection<DicMICAttachmentStatus>(
    DicMICAttachmentStatus.NAME,
    {view: "_minimal"}
  );

  @observable
  annexes: FileDescriptor[];

  @observable
  insuranceContractsDc: DataCollectionStore<InsuranceContract>;

  companysDc = collection<DicCompany>(DicCompany.NAME, {view: "_minimal"});

  employeesDc = collection<PersonGroupExt>(PersonGroupExt.NAME, {
    view: "_minimal"
  });

  relativesDc = collection<DicRelationshipType>(DicRelationshipType.NAME, {
    view: "_minimal"
  });

  jobsDc = collection<JobGroup>(JobGroup.NAME, {view: "_minimal"});

  sexsDc = collection<DicSex>(DicSex.NAME, {view: "_minimal"});

  documentTypesDc = collection<DicDocumentType>(DicDocumentType.NAME, {
    view: "_minimal"
  });

  regionsDc = collection<DicRegion>(DicRegion.NAME, {view: "_minimal"});

  addressTypesDc = collection<DicAddressType>(DicAddressType.NAME, {view: "_minimal"});

  @observable
  updated = false;
  reactionDisposer: IReactionDisposer;

  @observable selectedRowKey: string | undefined;

  fields = [
    "attachDate",

    "firstName",

    "secondName",

    "middleName",

    "jobMember",

    "iin",

    "birthdate",

    "documentNumber",

    "address",

    "insuranceProgram",

    "type",

    "amount",

    "totalAmount",

    "exclusionDate",

    "comment",

    "statusRequest",

    "insuranceContract",

    "company",

    "employee",

    "relative",

    "job",

    "sex",

    "documentType",

    "region",

    "addressType",

    "file",

    "statementFile"
  ];

  memberFields = [
    "relative",
    "secondName",
    "firstName",
    "middleName",
    "birthdate",
    "iin",
    "documentType",
    "documentNumber",
    "attachDate",
    "insuranceProgram",
    "amount",
    "region",
    "insuranceContract",
    "statementFile",
  ];

  rowIndex = -1;
  colIndex = 0;

  @observable
  globalErrors: string[] = [];

  @observable
  isCreateMember: boolean = false;

  update = (): Promise<boolean> => {
    let promise: Promise<any> = new Promise<boolean>(resolve => resolve(false));
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error(
          this.props.intl.formatMessage({
            id: "management.editor.validationError"
          })
        );
        return;
      }
      promise = this.dataInstance
        .update(this.props.form.getFieldsValue(this.fields))
        .then(() => {
          message.success(
            this.props.intl.formatMessage({id: "management.editor.success"})
          );
          return true;
        })
        .catch((e: any) => {
          if (e.response && typeof e.response.json === "function") {
            e.response.json().then((response: any) => {
              clearFieldErrors(this.props.form);
              const {
                globalErrors,
                fieldErrors
              } = extractServerValidationErrors(response);
              this.globalErrors = globalErrors;
              if (fieldErrors.size > 0) {
                this.props.form.setFields(
                  constructFieldsWithErrors(fieldErrors, this.props.form)
                );
              }

              if (fieldErrors.size > 0 || globalErrors.length > 0) {
                message.error(
                  this.props.intl.formatMessage({
                    id: "management.editor.validationError"
                  })
                );
              } else {
                message.error(
                  this.props.intl.formatMessage({
                    id: "management.editor.error"
                  })
                );
              }
            });
          } else {
            message.error(
              this.props.intl.formatMessage({id: "management.editor.error"})
            );
          }
        });
    });
    return promise;
  }

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    this.update().then(value => this.updated = value);
  };

  showDeletionDialog = (e: SerializedEntity<InsuredPerson>) => {
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
        this.selectedRowKey = undefined;

        this.familyDataCollection.delete(e).then(v => {
          this.refreshDs();
        });
        return;
      }
    });
  };

  @action
  onChangeVisible = (value: boolean): void => {
    if (value)
      this.update().then(updatedSuccess => this.visible = updatedSuccess && value);
    else
      this.visible = value;
  }

  onChangeInsuranceContract = (insuranceContractId?: string) => {
    if (!insuranceContractId) return;

    if (this.insuranceContractsDc && this.insuranceContractsDc.status !== 'LOADING') {
      this.insuranceContractsDc.items.filter(value => value.id === insuranceContractId)
        .forEach(insuranceContract => {
          if (insuranceContract.attachments)
            this.annexes = insuranceContract.attachments.map(value => value.attachment).filter(value => value) as FileDescriptor[];
          this.props.form.setFieldsValue({insuranceProgram: insuranceContract.insuranceProgram})
        });
    }

    this.initPersonMembers(insuranceContractId);
  }

  render() {
    if (this.updated) {
      return <Redirect to={InsuredPersonManagement.PATH}/>;
    }

    const {status} = this.dataInstance;
    let field_style = {marginBottom: "12px", margin: "10px",};
    let card_style = {margin: "10px"};

    const buttons = [
      <Button
        htmlType="button"
        style={{margin: "12px"}}
        type="primary"
        icon={"plus"}
        key='create'
        onClick={() => {
          this.isCreateMember = true;
          this.showModal();
        }}
      />,
      <Button
        htmlType="button"
        style={{margin: "12px"}}
        type="primary"
        icon={"edit"}
        key='edit'
        disabled={this.selectedRowKey === undefined}
        onClick={() => {
          this.isCreateMember = false;
          this.showModal();
        }}
      />,
      <Button
        htmlType="button"
        style={{margin: "12px"}}
        type="primary"
        icon={"delete"}
        key='delete'
        disabled={this.selectedRowKey === undefined}
        onClick={this.deleteSelectedRow}
      />
    ];

    let isMemberAttach = this.props.entityId !== InsuredPersonManagement.NEW_SUBPATH;
    return (
      <Card className="narrow-layout">
        <Spin spinning={status == 'LOADING'}>
          <Form onSubmit={this.handleSubmit} layout="vertical">
            <Row gutter={16}>
              <Col span={8}>
                <Card size="small" title={this.props.intl.formatMessage({id: 'general.information'})}
                      style={card_style}>

                  <ReadonlyField disabled={true}
                                 entityName={InsuredPerson.NAME}
                                 propertyName="employee"
                                 form={this.props.form}
                                 formItemOpts={{style: field_style}}
                                 optionsContainer={this.employeesDc}
                                 getFieldDecoratorOpts={{
                                   rules: [{required: true,}]
                                 }}
                  />

                  <ReadonlyField disabled={true}
                                 entityName={InsuredPerson.NAME}
                                 propertyName="relative"
                                 form={this.props.form}
                                 formItemOpts={{style: field_style}}
                                 optionsContainer={this.relativesDc}
                                 getFieldDecoratorOpts={{
                                   rules: [{required: true}]
                                 }}
                  />

                  <ReadonlyField disabled={true}
                                 entityName={InsuredPerson.NAME}
                                 propertyName="secondName"
                                 form={this.props.form}
                                 formItemOpts={{style: {display: "none"}}}
                                 getFieldDecoratorOpts={{
                                   rules: [{required: true}],
                                 }}
                  />

                  <ReadonlyField disabled={true}
                                 entityName={InsuredPerson.NAME}
                                 propertyName="firstName"
                                 form={this.props.form}
                                 formItemOpts={{style: {display: "none"}}}
                                 getFieldDecoratorOpts={{
                                   rules: [{required: true}]
                                 }}
                  />

                  <ReadonlyField disabled={true}
                                 entityName={InsuredPerson.NAME}
                                 propertyName="middleName"
                                 form={this.props.form}
                                 formItemOpts={{style: {display: "none"}}}
                                 getFieldDecoratorOpts={{}}
                  />

                  <ReadonlyField disabled={true}
                                 entityName={InsuredPerson.NAME}
                                 propertyName="iin"
                                 form={this.props.form}
                                 formItemOpts={{style: field_style}}
                                 getFieldDecoratorOpts={{
                                   rules: [{required: true}]
                                 }}
                  />

                  <ReadonlyField disabled={true}
                                 entityName={InsuredPerson.NAME}
                                 propertyName="sex"
                                 form={this.props.form}
                                 formItemOpts={{style: field_style}}
                                 optionsContainer={this.sexsDc}
                                 getFieldDecoratorOpts={{
                                   rules: [{required: true}]
                                 }}
                  />

                  <ReadonlyField disabled={true}
                                 entityName={InsuredPerson.NAME}
                                 propertyName="birthdate"
                                 form={this.props.form}
                                 formItemOpts={{style: field_style}}
                                 getFieldDecoratorOpts={{
                                   rules: [{required: true}],
                                 }}
                                 format={DEFAULT_DATE_PATTERN}
                  />

                  <ReadonlyField disabled={true}
                                 entityName={InsuredPerson.NAME}
                                 propertyName="type"
                                 form={this.props.form}
                                 formItemOpts={{style: {display: "none"}}}
                                 optionsContainer={this.documentTypesDc}
                                 getFieldDecoratorOpts={{
                                   rules: [{required: true}]
                                 }}
                  />

                  <ReadonlyField disabled={isMemberAttach}
                                 entityName={InsuredPerson.NAME}
                                 propertyName="documentType"
                                 form={this.props.form}
                                 formItemOpts={{style: field_style}}
                                 optionsContainer={this.documentTypesDc}
                                 getFieldDecoratorOpts={{
                                   rules: [{required: true}]
                                 }}
                  />

                  <ReadonlyField disabled={isMemberAttach}
                                 entityName={InsuredPerson.NAME}
                                 propertyName="documentNumber"
                                 form={this.props.form}
                                 formItemOpts={{style: field_style}}
                                 getFieldDecoratorOpts={{
                                   rules: [{required: true}]
                                 }}
                  />

                  <ReadonlyField disabled={isMemberAttach}
                                 entityName={InsuredPerson.NAME}
                                 propertyName="addressType"
                                 form={this.props.form}
                                 formItemOpts={{style: field_style}}
                                 optionsContainer={this.addressTypesDc}
                                 getFieldDecoratorOpts={{}}
                  />
                  <ReadonlyField disabled={isMemberAttach}
                                 entityName={InsuredPerson.NAME}
                                 propertyName="address"
                                 form={this.props.form}
                                 formItemOpts={{style: field_style}}
                                 getFieldDecoratorOpts={{}}
                  />


                  <ReadonlyField disabled={true}
                                 entityName={InsuredPerson.NAME}
                                 propertyName="company"
                                 form={this.props.form}
                                 formItemOpts={{style: field_style}}
                                 optionsContainer={this.companysDc}
                                 getFieldDecoratorOpts={{
                                   rules: [{required: true}]
                                 }}
                  />

                  <ReadonlyField disabled={true}
                                 entityName={InsuredPerson.NAME}
                                 propertyName="job"
                                 form={this.props.form}
                                 formItemOpts={{style: field_style}}
                                 optionsContainer={this.jobsDc}
                                 getFieldDecoratorOpts={{}}
                  />

                </Card>
                <Card style={{margin: "10px"}}>
                  <ReadonlyField disabled={true}
                                 entityName={InsuredPerson.NAME}
                                 propertyName="totalAmount"
                                 form={this.props.form}
                                 formItemOpts={{style: field_style}}
                                 getFieldDecoratorOpts={{
                                   rules: [{required: true}]
                                 }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" title={this.props.intl.formatMessage({id: 'insurance.information'})}
                      style={card_style}>
                  <ReadonlyField entityName={InsuredPerson.NAME}
                                 propertyName="insuranceContract"
                                 form={this.props.form}
                                 formItemOpts={{style: field_style}}
                                 optionsContainer={this.insuranceContractsDc}
                                 getFieldDecoratorOpts={{
                                   rules: [{
                                     required: true,
                                     message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: this.props.mainStore!.messages![this.dataInstance.entityName + '.insuranceContract']})
                                   }],
                                   getValueFromEvent: args => {
                                     this.onChangeInsuranceContract(args);
                                     return args;
                                   }
                                 }}
                  />

                  <ReadonlyField disabled={true}
                                 entityName={InsuredPerson.NAME}
                                 propertyName="attachDate"
                                 form={this.props.form}
                                 formItemOpts={{style: field_style}}
                                 format={DEFAULT_DATE_PATTERN}
                  />
                  <ReadonlyField disabled={true}
                                 entityName={InsuredPerson.NAME}
                                 propertyName="exclusionDate"
                                 form={this.props.form}
                                 formItemOpts={{style: field_style}}
                                 getFieldDecoratorOpts={{}}
                                 format={DEFAULT_DATE_PATTERN}
                  />


                  <ReadonlyField disabled={true}
                                 entityName={InsuredPerson.NAME}
                                 propertyName="statusRequest"
                                 form={this.props.form}
                                 formItemOpts={{style: field_style}}
                                 optionsContainer={this.statusRequestsDc}
                  />
                  <ReadonlyField disabled={true}
                                 entityName={InsuredPerson.NAME}
                                 propertyName="insuranceProgram"
                                 form={this.props.form}
                                 formItemOpts={{style: field_style}}
                  />

                  <ReadonlyField disabled={isMemberAttach}
                                 entityName={InsuredPerson.NAME}
                                 propertyName="region"
                                 form={this.props.form}
                                 formItemOpts={{style: field_style}}
                                 optionsContainer={this.regionsDc}
                                 getFieldDecoratorOpts={{
                                   rules: [{
                                     required: true,
                                     message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: this.props.mainStore!.messages![this.dataInstance.entityName + '.region']})
                                   }]
                                 }}
                  />

                  <Form.Item style={field_style}
                             label={<FormattedMessage id={'withholding.statement'}/>}>
                    {this.props.form.getFieldDecorator("statementFile", {
                      initialValue: this.dataInstance.item && this.dataInstance.item.statementFile ? {
                        id: this.dataInstance.item.statementFile.id,
                        name: this.dataInstance.item.statementFile.name
                      } : undefined
                    })(<FileUpload/>)}
                  </Form.Item>

                  <ReadonlyField disabled={isMemberAttach}
                                 entityName={InsuredPerson.NAME}
                                 propertyName="comment"
                                 form={this.props.form}
                                 formItemOpts={{style: field_style}}
                                 getFieldDecoratorOpts={{}}
                  />

                </Card>

                <Card size="small" title={<FormattedMessage id="annexes"/>} style={card_style}>
                  <span style={{color: "red", paddingLeft: 10}}><FormattedMessage id="see.documents"/></span>
                  <br/>
                  {this.annexes
                    ? this.annexes
                      .map(a =>
                        <Tag
                          style={{margin: "10px"}}
                          color={"blue"}
                          onClick={() => {
                            downloadFile((a as FileDescriptor).id,
                              (a as FileDescriptor).name as string,
                              (a as FileDescriptor).extension as string,
                              "");
                          }
                          }> {(a as FileDescriptor).name}</Tag>)
                    : <></>}
                </Card>
              </Col>
            </Row>

            {isMemberAttach ?
              <Card title={this.props.intl.formatMessage({id: 'family.member.information'})} style={{margin: "10px"}}>
                <DataTableFormat
                  dataCollection={this.familyDataCollection}
                  fields={this.memberFields}
                  enableFiltersOnColumns={[]}
                  hideSelectionColumn={true}
                  onRowSelectionChange={this.handleRowSelectionChange}
                  buttons={buttons}
                />
              </Card>
              : <></>}


            {this.globalErrors.length > 0 && (
              <Alert
                message={<MultilineText lines={toJS(this.globalErrors)}/>}
                type="error"
                style={{marginBottom: "24px"}}
              />
            )}

            <Form.Item style={{textAlign: "center"}}>
              <Link to={InsuredPersonManagement.PATH}>
                <Button htmlType="button">
                  <FormattedMessage id="management.editor.cancel"/>
                </Button>
              </Link>
              <Button
                type="primary"
                htmlType="submit"
                disabled={status !== "DONE" && status !== "ERROR"}
                loading={status === "LOADING"}
                style={{marginLeft: "8px"}}
              >
                <FormattedMessage id="management.editor.submit"/>
              </Button>
            </Form.Item>
          </Form>
        </Spin>
        <InsuredPersonMemberComponent entityId={this.isCreateMember ? undefined : this.selectedRowKey}
                                      visible={this.visible}
                                      insuranceContract={() => this.props.form.getFieldValue('insuranceContract')}
                                      onChangeVisible={this.onChangeVisible} refreshDs={this.refreshDs}/>
      </Card>
    );
  }

  calcTotalAmount = () => {
    restServices.documentService.calcTotalAmount({
      insuredPersonId: this.props.entityId
    }).then(value => {
      if (this.dataInstance.item!)
        this.props.form.setFieldsValue({totalAmount: value});
    })
  }

  initPersonMembers = (insuranceContractId?: string) => {
    const contractId = insuranceContractId || this.props.form.getFieldValue('insuranceContract')
      || (this.dataInstance.item && this.dataInstance.item.insuranceContract ? this.dataInstance.item!.insuranceContract.id : undefined);
    if (contractId)
      restServices.documentService.getInsuredPersonMembersWithNewContract({
        insuredPersonId: this.props!.entityId!,
        contractId: contractId
      }).then(value => {
        this.familyDataCollection.clear();

        // @ts-ignore
        this.familyDataCollection.items = Array.from(value);

        const totalAmount = this.familyDataCollection.items.map(item => item.amount)
          .filter(item => item)
          .map(item => parseFloat(item))
          .reduce((i1, i2) => i1 + i2, 0);

        this.props.form.setFieldsValue({totalAmount: totalAmount})
      })
  }

  refreshDs = () => {
    // this.calcTotalAmount();
    this.initPersonMembers();
  }

  subscribeMemberToMIC = () => {
    this.props.history.push(InsuredPersonManagement.PATH + "/" + InsuredPersonManagement.NEW_SUBPATH);
  };

  editMicMember = () => {
    this.props.history.push(InsuredPersonManagement.PATH + "/" + this.selectedRowKey);
  };

  handleRowSelectionChange = (selectedRowKeys: string[]) => {
    this.selectedRowKey = selectedRowKeys[0];
  };

  getRecordById(id: string): SerializedEntity<InsuredPerson> {
    const record:
      | SerializedEntity<InsuredPerson>
      | undefined = this.familyDataCollection.items.find(record => record.id === id);

    if (!record) {
      throw new Error("Cannot find entity with id " + id);
    }

    return record;
  }

  deleteSelectedRow = () => {
    this.showDeletionDialog(this.getRecordById(this.selectedRowKey!));
  };

  showModal = () => {
    this.onChangeVisible(true);
  };

  componentDidMount() {
    if (this.props.entityId !== InsuredPersonManagement.NEW_SUBPATH) {
      this.dataInstance.load(this.props.entityId);
      this.refreshDs();
    } else {
      catchException(restServices.documentService.getInsuredPerson({
        type: "Employee",
      }).then(value => {
        value.id = undefined;
        this.dataInstance.setItem(value);
      })).catch(value => {
        Notification.error({
          message: value.message
        });
        this.props.history!.goBack();
      });
    }
    this.reactionDisposer = reaction(
      () => {
        return this.dataInstance.item;
      },
      (item) => {

        this.initPersonMembers();

        const afterInsuranceContract = () => {
          if (item && item.insuranceContract) this.onChangeInsuranceContract(item.insuranceContract.id)
        };

        afterInsuranceContract();
        const personGroupId = item!.employee ? item!.employee.id : this.props.rootStore!.userInfo!.personGroupId;

        restServices.portalHelperService.companiesForLoadDictionary({personGroupId: personGroupId as string})
          .then(value => {
            restServices.documentService.getMyInsuraces()
              .then(items => {
                const usedInsuranceContracts = items ? items
                  .filter(item => item.id !== this.props.entityId)
                  .map(item => item.insuranceContract)
                  .filter(item => item)
                  .map(item => item!.id) : [];

                this.insuranceContractsDc = collectionWithAfterLoad<InsuranceContract>(InsuranceContract.NAME,
                  afterInsuranceContract,
                  {
                    view: "insuranceContract-editView",
                    filter: {
                      conditions: [{
                        property: "company.id",
                        operator: "in",
                        value: value
                      }, {
                        property: 'id',
                        operator: 'notIn',
                        value: usedInsuranceContracts
                      }]
                    }
                  });

              })
          })

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
  })(withRouter(InsuredPersonEditComponent))
);
