import * as React from "react";
import {FormEvent} from "react";
import {Alert, Col, Form, message, Modal, Row, Spin} from "antd";
import {inject, observer} from "mobx-react";
import {InsuredPersonManagement} from "./InsuredPersonManagement";
import {FormComponentProps} from "antd/lib/form";
import {Redirect} from "react-router-dom";
import {IReactionDisposer, observable, reaction, toJS} from "mobx";
import {injectIntl, WrappedComponentProps} from "react-intl";

import {
  clearFieldErrors,
  collection,
  constructFieldsWithErrors,
  extractServerValidationErrors,
  Field,
  injectMainStore,
  instance,
  MainStoreInjected,
  MultilineText,
  withLocalizedForm
} from "@cuba-platform/react";

import "../../../app/App.css";

import {InsuredPerson} from "../../../cuba/entities/base/tsadv$InsuredPerson";
import {DicRelationshipType} from "../../../cuba/entities/base/tsadv$DicRelationshipType";
import {DicSex} from "../../../cuba/entities/base/base$DicSex";
import {DicDocumentType} from "../../../cuba/entities/base/tsadv$DicDocumentType";
import {DicRegion} from "../../../cuba/entities/base/base$DicRegion";
import {Address} from "../../../cuba/entities/base/tsadv$Address";
import {ReadonlyField} from "../../components/ReadonlyField";
import {restServices} from "../../../cuba/services";
import {RouteComponentProps} from "react-router";
import {SerializedEntity} from "@cuba-platform/rest";
import {RootStoreProp} from "../../store";
import {DEFAULT_DATE_PATTERN} from "../../util/Date/Date";

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  entityId: string;
  visible: boolean;
};

type EditorHandlers = {
  onChangeVisible: (value: boolean) => void;
  insuranceContract: () => string;
  refreshDs: () => void;
};

@inject("rootStore")
@injectMainStore
@observer
class InsuredPersonMemberComponent extends React.Component<Props & WrappedComponentProps & MainStoreInjected & RootStoreProp & RouteComponentProps<any> & EditorHandlers> {
  dataInstance = instance<InsuredPerson>(InsuredPerson.NAME, {
    view: "insuredPerson-editView",
    loadImmediately: false
  });
  /*  */
  familyDataCollection = collection<InsuredPerson>(InsuredPerson.NAME, {
    view: "insuredPerson-browseView",
    sort: "-updateTs"
  });

  relativesDc = collection<DicRelationshipType>(DicRelationshipType.NAME, {
    view: "_minimal",
    filter: {
      conditions: [
        {
          property: "code",
          value: "PRIMARY",
          operator: "<>",
        }
      ]
    }
  });

  sexsDc = collection<DicSex>(DicSex.NAME, {view: "_minimal"});

  documentTypesDc = collection<DicDocumentType>(DicDocumentType.NAME, {
    view: "_minimal"
  });

  regionsDc = collection<DicRegion>(DicRegion.NAME, {view: "_minimal"});

  addressTypesDc = collection<Address>(Address.NAME, {view: "_minimal"});

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

    "company",

    "employee",

    "relative",

    "job",

    "sex",

    "documentType",

    "region",

    "addressType",

    "file",

    "statementFile",

    "insuredPersonId"
  ];

  @observable
  globalErrors: string[] = [];

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error(
          this.props.intl.formatMessage({
            id: "management.editor.validationError"
          })
        );
        return;
      }
      this.dataInstance
        .update({
          insuranceContract: {id: this.props.insuranceContract()},
          ...this.props.form.getFieldsValue(this.fields)
        })
        .then(() => {
          message.success(
            this.props.intl.formatMessage({id: "management.editor.success"})
          );
          // this.updated = true;
          this.props.refreshDs();
          this.props.onChangeVisible(false)
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
          this.props.onChangeVisible(false)
        });
    });
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

        return this.familyDataCollection.delete(e);
      }
    });
  };

  render() {
    if (this.updated) {
      return <Redirect to={InsuredPersonManagement.PATH}/>;
    }

    const {status} = this.dataInstance;
    let field_style = {marginBottom: "12px", margin: "10px",};

    return (
      <Modal
        visible={this.props.visible}
        onOk={this.handleSubmit}
        width={750}
        onCancel={this.props.onChangeVisible.bind(null, false)}>
        <Spin spinning={status == 'LOADING'}>
          <Form onSubmit={this.handleSubmit} layout="vertical">

            <ReadonlyField
              entityName={InsuredPerson.NAME}
              propertyName="employee"
              form={this.props.form}
              formItemOpts={{style: {display: "none"}}}
              getFieldDecoratorOpts={{
                rules: [{required: true,}]
              }}
            />

            <Field
              entityName={InsuredPerson.NAME}
              propertyName="jobMember"
              form={this.props.form}
              formItemOpts={{style: {display: "none",}}}
              optionsContainer={this.relativesDc}
            />

            <Field
              entityName={InsuredPerson.NAME}
              propertyName="type"
              form={this.props.form}
              formItemOpts={{style: {display: "none"}}}
              optionsContainer={this.documentTypesDc}
              getFieldDecoratorOpts={{
                rules: [{
                  required: true,
                  message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: this.props.mainStore!.messages![this.dataInstance.entityName + '.type']}),
                }]
              }}
            />

            <Field
              entityName={InsuredPerson.NAME}
              propertyName="insuranceProgram"
              form={this.props.form}
              formItemOpts={{style: {display: "none"}}}
              getFieldDecoratorOpts={{
                rules: [{
                  required: true,
                  message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: this.props.mainStore!.messages![this.dataInstance.entityName + '.insuranceProgram']}),
                }]
              }}
            />

            <ReadonlyField
              entityName={InsuredPerson.NAME}
              propertyName="company"
              form={this.props.form}
              formItemOpts={{style: {display: "none"}}}
              getFieldDecoratorOpts={{
                rules: [{
                  required: true,
                  message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: this.props.mainStore!.messages![this.dataInstance.entityName + '.company']}),
                }]
              }}
            />

            <ReadonlyField
              entityName={InsuredPerson.NAME}
              propertyName="statusRequest"
              form={this.props.form}
              formItemOpts={{style: {display: "none"}}}
              getFieldDecoratorOpts={{
                rules: [{
                  required: true,
                  message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: this.props.mainStore!.messages![this.dataInstance.entityName + '.statusRequest']}),
                }]
              }}
            />

            <ReadonlyField
              entityName={InsuredPerson.NAME}
              propertyName="totalAmount"
              form={this.props.form}
              formItemOpts={{style: {display: "none",}}}
              getFieldDecoratorOpts={{
                rules: [{
                  required: true,
                  message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: this.props.mainStore!.messages![this.dataInstance.entityName + '.totalAmount']}),
                }]
              }}
            />

            <Row>

              <Col md={24} lg={12}>

                <ReadonlyField
                  entityName={InsuredPerson.NAME}
                  propertyName="firstName"
                  form={this.props.form}
                  formItemOpts={{style: field_style}}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: this.props.mainStore!.messages![this.dataInstance.entityName + '.firstName']}),
                    }]
                  }}
                />

                <ReadonlyField
                  entityName={InsuredPerson.NAME}
                  propertyName="secondName"
                  form={this.props.form}
                  formItemOpts={{style: field_style}}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: this.props.mainStore!.messages![this.dataInstance.entityName + '.secondName']}),
                    }]
                  }}
                />
                <ReadonlyField
                  entityName={InsuredPerson.NAME}
                  propertyName="middleName"
                  form={this.props.form}
                  formItemOpts={{style: field_style}}
                />


                <Field
                  entityName={InsuredPerson.NAME}
                  propertyName="sex"
                  form={this.props.form}
                  formItemOpts={{style: field_style}}
                  optionsContainer={this.sexsDc}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: this.props.mainStore!.messages![this.dataInstance.entityName + '.sex']}),
                    }]
                  }}
                />

                <Field
                  entityName={InsuredPerson.NAME}
                  propertyName="iin"
                  form={this.props.form}
                  formItemOpts={{style: field_style}}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: this.props.mainStore!.messages![this.dataInstance.entityName + '.iin']}),
                    }, {
                      validator: (rule, value, callback) => {
                        if (value && !((value as string).match('^\\d{12}$'))) {
                          callback(this.props.intl.formatMessage({id: "format.incorrect"}, {name: this.props.mainStore!.messages![this.dataInstance.entityName + '.iin']}))
                        } else callback();
                      }
                    }]
                  }}
                />

                <ReadonlyField
                  disabled={false}
                  entityName={InsuredPerson.NAME}
                  propertyName="birthdate"
                  form={this.props.form}
                  format={DEFAULT_DATE_PATTERN}
                  formItemOpts={{style: field_style}}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: this.props.mainStore!.messages![this.dataInstance.entityName + '.birthdate']}),
                    }]
                  }}
                />

                <Field
                  entityName={InsuredPerson.NAME}
                  propertyName="relative"
                  form={this.props.form}
                  formItemOpts={{style: field_style}}
                  optionsContainer={this.relativesDc}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: this.props.mainStore!.messages![this.dataInstance.entityName + '.relative']}),
                    }]
                  }}
                />

              </Col>
              <Col md={24} lg={12}>

                <Field
                  entityName={InsuredPerson.NAME}
                  propertyName="documentType"
                  form={this.props.form}
                  formItemOpts={{style: field_style}}
                  optionsContainer={this.documentTypesDc}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: this.props.mainStore!.messages![this.dataInstance.entityName + '.documentType']}),
                    }]
                  }}
                />

                <Field
                  entityName={InsuredPerson.NAME}
                  propertyName="documentNumber"
                  form={this.props.form}
                  formItemOpts={{style: field_style}}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: this.props.mainStore!.messages![this.dataInstance.entityName + '.documentNumber']}),
                    }]
                  }}
                />
                <Field
                  entityName={InsuredPerson.NAME}
                  propertyName="region"
                  form={this.props.form}
                  formItemOpts={{style: field_style}}
                  optionsContainer={this.regionsDc}
                  getFieldDecoratorOpts={{
                    rules: [{
                      required: true,
                      message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: this.props.mainStore!.messages![this.dataInstance.entityName + '.region']}),
                    }]
                  }}
                />
                <Field
                  entityName={InsuredPerson.NAME}
                  propertyName="addressType"
                  form={this.props.form}
                  formItemOpts={{style: field_style}}
                  optionsContainer={this.addressTypesDc}
                  getFieldDecoratorOpts={{}}
                />
                <Field
                  entityName={InsuredPerson.NAME}
                  propertyName="address"
                  form={this.props.form}
                  formItemOpts={{style: field_style}}
                  getFieldDecoratorOpts={{}}
                />

                <ReadonlyField disabled={true}
                               entityName={InsuredPerson.NAME}
                               propertyName="amount"
                               form={this.props.form}
                               formItemOpts={{style: field_style}}
                               getFieldDecoratorOpts={{
                                 rules: [{
                                   required: true,
                                   message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: this.props.mainStore!.messages![this.dataInstance.entityName + '.amount']}),
                                 }]
                               }}
                />
                <ReadonlyField disabled={true}
                               entityName={InsuredPerson.NAME}
                               propertyName="attachDate"
                               form={this.props.form}
                               formItemOpts={{style: field_style}}
                               format={DEFAULT_DATE_PATTERN}
                               getFieldDecoratorOpts={{
                                 rules: [{
                                   required: true,
                                   message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: this.props.mainStore!.messages![this.dataInstance.entityName + '.attachDate']}),
                                 }]
                               }}
                />

              </Col>

            </Row>

            <ReadonlyField
              entityName={InsuredPerson.NAME}
              propertyName="job"
              form={this.props.form}
              formItemOpts={{style: {display: "none"}}}
              getFieldDecoratorOpts={{}}
            />

            <ReadonlyField
              entityName={InsuredPerson.NAME}
              propertyName="exclusionDate"
              form={this.props.form}
              formItemOpts={{style: {display: "none"}}}
              format={DEFAULT_DATE_PATTERN}
            />

            <ReadonlyField
              entityName={InsuredPerson.NAME}
              propertyName="statementFile"
              form={this.props.form}
              getFieldDecoratorOpts={{
                rules: [{
                  required: true,
                  message: this.props.intl.formatMessage({id: "form.validation.required"}, {fieldName: this.props.mainStore!.messages![this.dataInstance.entityName + '.statementFile']}),
                }]
              }}
            />

            {this.globalErrors.length > 0 && (
              <Alert
                message={<MultilineText lines={toJS(this.globalErrors)}/>}
                type="error"
                style={{marginBottom: "24px"}}
              />
            )}
          </Form>
        </Spin>
      </Modal>
    );
  }

  componentDidMount() {
    if (this.props.entityId !== undefined) {
      this.dataInstance.load(this.props.entityId);
    } else {
      restServices.documentService.getInsuredPerson({
        type: "Member",
      }).then(value => {
        value.id = undefined;
        this.dataInstance.setItem(value);
      });
    }
    this.reactionDisposer = reaction(
      () => {
        return this.dataInstance.item;
      },
      () => {
        this.props.form.setFieldsValue(this.dataInstance.getFieldValues(this.fields));
      }
    );
  }

  componentWillUnmount() {
    this.reactionDisposer();
  }
}


export default injectIntl(
  withLocalizedForm<EditorProps & EditorHandlers>({
    onValuesChange: (props: any, changedValues: any) => {

      // Reset server-side errors when field is edited
      Object.keys(changedValues).forEach((fieldName: string) => {
        props.form.setFields({
          [fieldName]: {
            value: changedValues[fieldName]
          }
        });

        const bithDate = props.form.getFieldsValue(["birthdate"]);
        const relative = props.form.getFieldsValue(["relative"]);
        if (bithDate && relative && (fieldName == 'birthdate' || fieldName == 'relative'))
          restServices.documentService.calcAmount({
            personGroupExtId: props.form.getFieldsValue(["employee"])["employee"],
            insuranceContractId: props.insuranceContract(),
            bith: bithDate["birthdate"],
            relativeTypeId: relative["relative"],
          }).then(val => {
            props.form.setFieldsValue({amount: val});
          });

      });
    }
  })(InsuredPersonMemberComponent)
);
