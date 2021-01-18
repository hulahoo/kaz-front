import * as React from "react";
import {observer} from "mobx-react";
import {createElement} from "react";
import {Form} from "antd";
import {DataCollectionStore, FormField, MainStoreInjected, WithId} from "@cuba-platform/react";
import {FormComponentProps, FormItemProps} from "antd/lib/form";
import {GetFieldDecoratorOptions} from "antd/lib/form/Form";

@observer
export class ReadonlyField extends React.Component<MainStoreInjected & FormComponentProps & {
  entityName: string;
  propertyName: string;
  optionsContainer?: DataCollectionStore<WithId>;
  formItemKey?: string;
  formItemOpts?: FormItemProps;
  fieldDecoratorId?: string;
  getFieldDecoratorOpts?: GetFieldDecoratorOptions;
}> {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { entityName, propertyName, optionsContainer, fieldDecoratorId, getFieldDecoratorOpts, formItemKey } = this.props;
    const formItemOpts = Object.assign({}, this.props.formItemOpts);

    return createElement(Form.Item,
      Object.assign({ key: formItemKey ? formItemKey : propertyName }, formItemOpts),
      getFieldDecorator(fieldDecoratorId ? fieldDecoratorId : propertyName, getFieldDecoratorOpts)(createElement(FormField, { entityName: entityName, propertyName: propertyName, disabled: true, optionsContainer: optionsContainer })));
  }
}
