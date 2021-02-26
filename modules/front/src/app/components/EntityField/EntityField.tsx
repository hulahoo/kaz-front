import React, {Component, createElement} from 'react';
import {Form, Input} from "antd";
import {DataCollectionStore, WithId} from "@cuba-platform/react";
import {WrappedFormUtils} from "antd/es/form/Form";

type FormProps = {
  form: WrappedFormUtils,
  formField: string,
}

type EntityFieldProps = {
  label?: string | React.ReactNode,
  optionsContainer?: DataCollectionStore<WithId>,
  readonly?: boolean,
  displayProperty: string,
  entity: any
  entityFormFieldProperty?: string,
  formProps?: FormProps,
  key?: string
}

class EntityField extends Component<EntityFieldProps> {
  render() {
    const {optionsContainer, label, formProps, readonly, displayProperty, entityFormFieldProperty, entity} = this.props;

    // const renderComponent = readonly
    //   ? <Input value={entity[]} key="key"/>

    return (
      <Form.Item label={label}>
        {/*{formProps ? formProps.form.getFieldDecorator(formProps.formField)(*/}

        {/*)}*/}
      </Form.Item>
    );
  }
}

export default EntityField;