import * as React from "react";
import { FormEvent } from "react";
import { Alert, Button, Card, Form, message } from "antd";
import { inject, observer } from "mobx-react";
import { DismissalRequestManagement } from "./DismissalRequestManagement";
import { Redirect, withRouter } from "react-router-dom";
import { IReactionDisposer, observable, toJS } from "mobx";
import {
  FormattedMessage,
  injectIntl
} from "react-intl";
import { ReadonlyField } from "../../components/ReadonlyField";
import {
  instance,
  injectMainStore,
  collection,
  withLocalizedForm,
  extractServerValidationErrors,
  constructFieldsWithErrors,
  clearFieldErrors,
  MultilineText
} from "@cuba-platform/react";

import "../../../app/App.css";

import { DismissalRequest } from "../../../cuba/entities/base/tsadv_DismissalRequest";
import AbstractBprocEdit from "../Bproc/abstract/AbstractBprocEdit";
import MsgEntity from "../../components/MsgEntity";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import Buttonv2, { ButtonType } from "../../components/Button/Button";
import { goBackOrHomePage, isEquals } from "../../util/util";
import LoadingPage from "../LoadingPage";
import moment from "moment";
import { FileDescriptor } from "../../../cuba/entities/base/sys$FileDescriptor";
import { restServices } from "../../../cuba/services";
import { PersonProfile } from "../MyTeam/MyTeamCard";
import { DicRequestStatus } from "../../../cuba/entities/base/tsadv$DicRequestStatus";

type EditorProps = {
  entityId: string;
  withoutPage?: boolean;
  setData(data: any): void;
  openInterview(): void;
  setEntityId(entityId: string): void;
};

const PageWrapper: React.FC<{ entityName: string, withoutPage?: boolean }> = ({ children, entityName, withoutPage }) => {
  if (withoutPage) return <>{children}</>;
  return (
    <Page pageName={<MsgEntity entityName={entityName} />}>
      <Section className='large'>
        {children}
      </Section>
    </Page>
  )
}

@inject("rootStore")
@injectMainStore
@observer
class DismissalRequestEditComponent extends AbstractBprocEdit<DismissalRequest, EditorProps> {

  processDefinitionKey = "dismissal-request";

  dataInstance = instance<DismissalRequest>(DismissalRequest.NAME, {
    view: "dismissalRequestEdit",
    loadImmediately: false
  });

  statusDc = collection<DicRequestStatus>(DicRequestStatus.NAME, {
    view: "_minimal"
  });

  employeeFileDc = collection<FileDescriptor>(FileDescriptor.NAME, {
    view: "dismissalRequestEdit"
  });

  @observable
  editDismissal: DismissalRequest;

  instanceEditDismissal = instance<DismissalRequest>(DismissalRequest.NAME, {
    view: "dismissalRequestEdit",
    loadImmediately: false
  });

  @observable
  updated = false;
  reactionDisposer: IReactionDisposer;

  @observable
  changedMap = new Map<string, boolean>();

  @observable
  person: PersonProfile;

  fields = [
    "employeeName",

    "staffUnit",

    "position",

    "subdivision",

    "dateOfReceipt",

    "reasonForDismissal",

    "dateOfDismissal",

    "employeeFile"

  ];

  isUpdateBeforeOutcome = true;

  @observable
  globalErrors: string[] = [];

  personGroupId: string;

  update = () => {
    if (this.isNotDraft())
      return this.dataInstance.update(this.getUpdateEntityData());
    return this.dataInstance.update({
      personGroup: this.personGroupId,
      ...this.getUpdateEntityData()
    });
  };

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
            this.props.intl.formatMessage({ id: "management.editor.success" })
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
              this.props.intl.formatMessage({ id: "management.editor.error" })
            );
          }
        });
    });
  };

  handleOpenInterview = () => {
    this.props.setData(this.dataInstance.item);
    this.props.openInterview();
  }

  render() {

    let isNotDraft = this.isNotDraft();
    let isOnApproved = this.dataInstance.item && this.dataInstance.item.status ? this.dataInstance.item.status.code === "APPROVED" : false;
    let isUserInitiator = this.isUserInitiator;
    let isOnREVISION = this.dataInstance.item && this.dataInstance.item.status ? this.dataInstance.item.status.code === "TO_BE_REVISED" : false;
    let isOnApproving = this.isOnApproving();
    let isOnCANCELED = this.dataInstance.item && this.dataInstance.item.status ? this.dataInstance.item.status.code === "CANCELED_BY_INITIATOR" : false;

    if (!isNotDraft) {
      isUserInitiator = true;
    }

    // const messages = this.mainStore.messages!;
    // if (!messages) {
    //   return <LoadingPage />
    // }

    if (!this.dataInstance) {
      return <LoadingPage />
    }

    if (this.updated) {
      return <Redirect to={this.dataInstance.item && this.dataInstance.item.id} />;
    }
    console.log(this.dataInstance.item)
    return (
      <PageWrapper entityName={DismissalRequest.NAME} withoutPage={this.props.withoutPage}>
        <Card
          className="narrow-layout card-actions-container"
          bordered={false}
          actions={[
            <Buttonv2 buttonType={ButtonType.FOLLOW}
              onClick={() => goBackOrHomePage(this.props.history!)}>{this.props.intl.formatMessage({ id: "close" })}</Buttonv2>,
            this.getOutcomeBtns()]}>

          <Form onSubmit={this.handleSubmit} layout="vertical">
            {/* <ReadonlyField
              disabled
              entityName={DismissalApplication.NAME}
              propertyName="employeeName"
              form={this.props.form}
              formItemOpts={{ style: { marginBottom: "12px" } }}
              getFieldDecoratorOpts={{}}
            /> */}

            {
              this.renderDissimalRequestFields()
            }

            <ReadonlyField
              entityName={DismissalRequest.NAME}
              propertyName="reasonForDismissal"
              form={this.props.form}
              formItemOpts={{ style: { marginBottom: "12px" } }}
              getFieldDecoratorOpts={{
                rules: [{ required: true }]
              }}
              disabled={isOnApproving || isOnCANCELED || isOnApproving || !isUserInitiator && isOnREVISION || isOnApproved}
            />

            <ReadonlyField
              disabled={isOnApproving || isOnCANCELED || isOnApproving || !isUserInitiator && isOnREVISION || isOnApproved}
              entityName={DismissalRequest.NAME}
              propertyName="dateOfDismissal"
              form={this.props.form}
              formItemOpts={{
                style: { marginBottom: "12px" },
                hasFeedback: false
              }}
              getFieldDecoratorOpts={{
                rules: [{ required: true }]
              }}
            />

            <ReadonlyField
              disabled={isOnApproving || isOnCANCELED || isOnApproving || !isUserInitiator && isOnREVISION || isOnApproved}
              entityName={DismissalRequest.NAME}
              propertyName="employeeFile"
              form={this.props.form}
              formItemOpts={{ style: { marginBottom: "12px" } }}
            />

            {this.takCard()}

            {this.globalErrors.length > 0 && (
              <Alert
                message={<MultilineText lines={toJS(this.globalErrors)} />}
                type="error"
                style={{ marginBottom: "24px" }}
              />
            )}

            <Form.Item style={{ textAlign: "left" }}>
              <Button
                disabled={!isOnApproved && isUserInitiator || !isUserInitiator || isOnApproving || isOnCANCELED || !isUserInitiator && isOnREVISION}
                htmlType="button"
                onClick={this.handleOpenInterview}
                style={{ marginLeft: "8px" }}
              >
                <FormattedMessage id="dismissal.downloadExitInterview" />
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </PageWrapper >
    );
  }

  renderDissimalRequestFields = () => {
    return (
      <>
        <ReadonlyField
          entityName={DismissalRequest.NAME}
          propertyName="employeeName"
          form={this.props.form}
          formItemOpts={{ style: { marginBottom: "12px" } }}
          disabled
        />
        <ReadonlyField
          entityName={DismissalRequest.NAME}
          propertyName="staffUnit"
          form={this.props.form}
          formItemOpts={{ style: { marginBottom: "12px" } }}
          disabled
        />
        <ReadonlyField
          entityName={DismissalRequest.NAME}
          propertyName="position"
          form={this.props.form}
          formItemOpts={{ style: { marginBottom: "12px" } }}
          disabled
        />
        <ReadonlyField
          entityName={DismissalRequest.NAME}
          propertyName="subdivision"
          form={this.props.form}
          formItemOpts={{ style: { marginBottom: "12px" } }}
          disabled
        />
        <ReadonlyField
          entityName={DismissalRequest.NAME}
          propertyName="dateOfReceipt"
          form={this.props.form}
          formItemOpts={{ style: { marginBottom: "12px" } }}
          disabled
        />
      </>
    )
  }

  // renderEditDissimalFields = () => {
  //   return (
  //     <>
  //       <Form.Item
  //         label={createElement(Msg, { entityName: DismissalApplication.NAME, propertyName: "employeeName" })}>
  //         <Input
  //           value={
  //             this.editDismissal
  //               ? this.editDismissal.employeeName || ''
  //               : this.person && this.person.fullName || ""}
  //           disabled />
  //       </Form.Item>

  //       <Form.Item
  //         label={createElement(Msg, { entityName: DismissalApplication.NAME, propertyName: "staffUnit" })}>
  //         <Input
  //           value={
  //             this.editDismissal
  //               ? this.editDismissal.staffUnit || ''
  //               : this.person && this.person.positionName || ""}
  //           disabled />
  //       </Form.Item>

  //       <Form.Item
  //         label={createElement(Msg, { entityName: DismissalApplication.NAME, propertyName: "position" })}>
  //         <Input
  //           value={
  //             this.editDismissal
  //               ? this.editDismissal.position || ''
  //               : this.person && this.person.positionName || ""}
  //           disabled />
  //       </Form.Item>

  //       <Form.Item
  //         label={createElement(Msg, { entityName: DismissalApplication.NAME, propertyName: "subdivision" })}>
  //         <Input
  //           value={
  //             this.editDismissal
  //               ? this.editDismissal.subdivision || ''
  //               : this.person && this.person.organizationName || ""}
  //           disabled />
  //       </Form.Item>

  //       <Form.Item
  //         label={createElement(Msg, { entityName: DismissalApplication.NAME, propertyName: "dateOfReceipt" })}>
  //         <DefaultDatePicker
  //           value={
  //             this.editDismissal
  //               ? moment(this.editDismissal.dateOfReceipt) || ''
  //               : moment()}
  //           disabled />
  //       </Form.Item>
  //     </>
  //   )
  // }

  onReactionDisposerEffect = (item: DismissalRequest | undefined) => {
    this.personGroupId = item && item.personGroup ? item.personGroup.id! : this.props.rootStore!.userInfo!.personGroupId!;

    const dismissalId = this.props.entityId;

    restServices.employeeService.personProfile(this.personGroupId)
      .then(value => {
        this.person = value;
        if (dismissalId === DismissalRequestManagement.NEW_SUBPATH) {
          this.props.form.setFields({
            employeeName: { value: value.fullName },
            staffUnit: { value: value.positionName },
            position: { value: value.positionName },
            subdivision: { value: value.organizationName },
            dateOfReceipt: { value: moment(value.hireDate) }
          });
        }
      })

    restServices.dismissalService.getDismissalRequest({personGroupId: this.personGroupId})
    .then(value => {console.log(value);})
  }

  afterSendOnApprove = () => {
    console.log(this.dataInstance.item && this.dataInstance.item.id);
    // this.props.history!.push("/dismissalRequest");
    this.props.setEntityId(this.dataInstance.item && this.dataInstance.item.id);
  };
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
  })(withRouter(DismissalRequestEditComponent))
);