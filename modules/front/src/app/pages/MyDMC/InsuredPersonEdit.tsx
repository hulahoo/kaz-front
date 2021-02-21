import * as React from "react";
import {FormEvent} from "react";
import {Alert, Button, Card, Col, Form, message, Row, Spin} from "antd";
import {observer} from "mobx-react";
import {InsuredPersonManagement} from "./InsuredPersonManagement";
import {FormComponentProps} from "antd/lib/form";
import {Link, Redirect} from "react-router-dom";
import {IReactionDisposer, observable, reaction, toJS} from "mobx";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";

import {
  clearFieldErrors,
  collection,
  constructFieldsWithErrors,
  extractServerValidationErrors,
  Field,
  instance,
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
import {Address} from "../../../cuba/entities/base/tsadv$Address";
import {FileDescriptor} from "../../../cuba/entities/base/sys$FileDescriptor";
import {ReadonlyField} from "../../components/ReadonlyField";
import {restServices} from "../../../cuba/services";

type Props = FormComponentProps & EditorProps;

type EditorProps = {
  entityId: string;
};

@observer
class InsuredPersonEditComponent extends React.Component<Props & WrappedComponentProps> {
  dataInstance = instance<InsuredPerson>(InsuredPerson.NAME, {
    view: "insuredPerson-editView",
    loadImmediately: false
  });

  statusRequestsDc = collection<DicMICAttachmentStatus>(
    DicMICAttachmentStatus.NAME,
    {view: "_minimal"}
  );

  insuranceContractsDc = collection<InsuranceContract>(InsuranceContract.NAME, {
    view: "_minimal"
  });

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

  addressTypesDc = collection<Address>(Address.NAME, {view: "_minimal"});

  filesDc = collection<FileDescriptor>(FileDescriptor.NAME, {
    view: "_minimal"
  });

  statementFilesDc = collection<FileDescriptor>(FileDescriptor.NAME, {
    view: "_minimal"
  });

  @observable
  updated = false;
  reactionDisposer: IReactionDisposer;

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
        .update(this.props.form.getFieldsValue(this.fields))
        .then(() => {
          message.success(
            this.props.intl.formatMessage({id: "management.editor.success"})
          );
          this.updated = true;
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
  };

  render() {
    if (this.updated) {
      return <Redirect to={InsuredPersonManagement.PATH}/>;
    }

    const {status} = this.dataInstance;
    console.log(status);
    let field_style = {marginBottom: "12px", margin: "10px",};
    let card_style = {margin: "10px"};
    return (
      <Card className="narrow-layout">
        <Spin spinning={status == 'LOADING'}>
          <Form onSubmit={this.handleSubmit} layout="vertical">
            <Row gutter={16}>
              <Col span={8}>
                <Card size="small" title="Общие сведения" style={card_style}>

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
                                 propertyName="firstName"
                                 form={this.props.form}
                                 formItemOpts={{style: {display: "none"}}}
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
                                   rules: [{required: true}]
                                 }}
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

                  <Field
                    entityName={InsuredPerson.NAME}
                    propertyName="documentType"
                    form={this.props.form}
                    formItemOpts={{style: field_style}}
                    optionsContainer={this.documentTypesDc}
                    getFieldDecoratorOpts={{
                      rules: [{required: true}]
                    }}
                  />

                  <Field
                    entityName={InsuredPerson.NAME}
                    propertyName="documentNumber"
                    form={this.props.form}
                    formItemOpts={{style: field_style}}
                    getFieldDecoratorOpts={{
                      rules: [{required: true}]
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
              </Col>
              <Col span={8}>
                <Card size="small" title="Cведения по ДМС" style={card_style}>
                  <Field
                    entityName={InsuredPerson.NAME}
                    propertyName="insuranceContract"
                    form={this.props.form}
                    formItemOpts={{style: field_style}}
                    optionsContainer={this.insuranceContractsDc}
                    getFieldDecoratorOpts={{
                      rules: [{required: true}]
                    }}
                  />

                  <ReadonlyField disabled={true}
                                 entityName={InsuredPerson.NAME}
                                 propertyName="attachDate"
                                 form={this.props.form}
                                 formItemOpts={{style: field_style}}
                                 getFieldDecoratorOpts={{
                                   rules: [{required: true}]
                                 }}
                  />
                  <ReadonlyField disabled={true}
                                 entityName={InsuredPerson.NAME}
                                 propertyName="exclusionDate"
                                 form={this.props.form}
                                 formItemOpts={{style: field_style}}
                                 getFieldDecoratorOpts={{}}
                  />


                  <ReadonlyField disabled={true}
                                 entityName={InsuredPerson.NAME}
                                 propertyName="statusRequest"
                                 form={this.props.form}
                                 formItemOpts={{style: field_style}}
                                 optionsContainer={this.statusRequestsDc}
                                 getFieldDecoratorOpts={{
                                   rules: [{required: true}]
                                 }}
                  />
                  <ReadonlyField disabled={true}
                                 entityName={InsuredPerson.NAME}
                                 propertyName="insuranceProgram"
                                 form={this.props.form}
                                 formItemOpts={{style: field_style}}
                                 getFieldDecoratorOpts={{
                                   rules: [{required: true}]
                                 }}
                  />

                  {/*   <Field
                  entityName={InsuredPerson.NAME}
                  propertyName="amount"
                  form={this.props.form}
                  formItemOpts={{style: field_style}}
                  getFieldDecoratorOpts={{}}
                />
*/}
                  <ReadonlyField disabled={true}
                                 entityName={InsuredPerson.NAME}
                                 propertyName="totalAmount"
                                 form={this.props.form}
                                 formItemOpts={{style: {display: "none",}}}
                                 getFieldDecoratorOpts={{
                                   rules: [{required: true}]
                                 }}
                  />

                  <Field
                    entityName={InsuredPerson.NAME}
                    propertyName="region"
                    form={this.props.form}
                    formItemOpts={{style: field_style}}
                    optionsContainer={this.regionsDc}
                    getFieldDecoratorOpts={{
                      rules: [{required: true}]
                    }}
                  />


                  <Field
                    entityName={InsuredPerson.NAME}
                    propertyName="file"
                    form={this.props.form}
                    formItemOpts={{style: field_style}}
                    optionsContainer={this.filesDc}
                    getFieldDecoratorOpts={{}}
                  />
                  <Field
                    entityName={InsuredPerson.NAME}
                    propertyName="statementFile"
                    form={this.props.form}
                    formItemOpts={{style: field_style}}
                    optionsContainer={this.statementFilesDc}
                    getFieldDecoratorOpts={{}}
                  />

                  <Field
                    entityName={InsuredPerson.NAME}
                    propertyName="comment"
                    form={this.props.form}
                    formItemOpts={{style: field_style}}
                    getFieldDecoratorOpts={{}}
                  />

                </Card>
              </Col>
            </Row>


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
      </Card>
    );
  }

  componentDidMount() {
    if (this.props.entityId !== InsuredPersonManagement.NEW_SUBPATH) {
      this.dataInstance.load(this.props.entityId);
    } else {
      restServices.documentService.getInsuredPerson({
        type: "Employee",
      }).then(value => this.dataInstance.setItem(value));
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
  })(InsuredPersonEditComponent)
);
