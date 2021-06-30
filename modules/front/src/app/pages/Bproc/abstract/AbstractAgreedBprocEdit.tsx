import React, {Component} from 'react';
import AbstractBprocEdit from "./AbstractBprocEdit";
import {AbstractBprocRequest} from "../../../../cuba/entities/base/AbstractBprocRequest";
import {observable} from "mobx";
import Notification from "../../../util/Notification/Notification";
import {ReadonlyField} from "../../../components/ReadonlyField";

abstract class AbstractAgreedBprocEdit<T extends AbstractBprocRequest, K> extends AbstractBprocEdit<T, K> {

  @observable
  approverHrRoleCode: string;

  isUpdateBeforeOutcome = true;

  initVariablesByBproc = () => {
    if (this.activeUserTask && this.activeUserTask.hrRole && this.activeUserTask.hrRole.code) {
      this.approverHrRoleCode = this.activeUserTask.hrRole.code;
    }
  };

  beforeCompletePredicate = (outcome: string): Promise<boolean> => {
    if (outcome == 'APPROVE' && this.approverHrRoleCode === 'EMPLOYEE') {
      const isAgree = this.props.form.getFieldValue('isAgree');
      const isFamiliarization = this.props.form.getFieldValue('isFamiliarization');

      if (!isAgree) {
        Notification.info({
            message: this.props.intl.formatMessage({id: "for.approving.must.to.check.field"},
              {fieldName: this.mainStore.messages![this.dataInstance.entityName + '.isAgree']})
          }
        )
      }

      if (!isFamiliarization) {
        Notification.info({
            message: this.props.intl.formatMessage({id: "for.approving.must.to.check.field"},
              {fieldName: this.mainStore.messages![this.dataInstance.entityName + '.isFamiliarization']})
          }
        )
      }

      if (!isAgree || !isFamiliarization)
        return new Promise(resolve => resolve(false));
    }
    return new Promise(resolve => resolve(true));
  };

  agreedFields = () => {
    return (
      <>
        <ReadonlyField
          entityName={this.dataInstance.entityName}
          propertyName="isAgree"
          form={this.props.form}
          disabled={this.approverHrRoleCode !== 'EMPLOYEE'}
          getFieldDecoratorOpts={{valuePropName: 'checked'}}
          formItemOpts={{style: {marginBottom: "12px"}}}
        />
        <ReadonlyField
          entityName={this.dataInstance.entityName}
          propertyName="isFamiliarization"
          form={this.props.form}
          disabled={this.approverHrRoleCode !== 'EMPLOYEE'}
          getFieldDecoratorOpts={{valuePropName: 'checked'}}
          formItemOpts={{style: {marginBottom: "12px"}}}
        />
      </>
    );
  }
}

export default AbstractAgreedBprocEdit;