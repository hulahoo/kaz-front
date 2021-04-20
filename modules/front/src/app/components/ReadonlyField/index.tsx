import * as React from "react";
import {createElement} from "react";
import {observer} from "mobx-react";
import {Form} from "antd";
import {DataCollectionStore, FormField, MainStoreInjected, Msg, WithId} from "@cuba-platform/react";
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
  disabled?: boolean;
  style?: React.CSSProperties;
  format?: string | string[];
}> {
  render() {
    const {getFieldDecorator} = this.props.form;
    const {
      entityName,
      propertyName,
      optionsContainer,
      fieldDecoratorId,
      format,
      getFieldDecoratorOpts,
      formItemKey,
      disabled,
      style,
    } = this.props;
    const formItemOpts = Object.assign({}, this.props.formItemOpts);

    if (!formItemOpts.label)
      formItemOpts.label = createElement(Msg, {entityName: entityName, propertyName: propertyName});

    const props = {
      entityName: entityName,
      propertyName: propertyName,
      disabled: disabled,
      optionsContainer: optionsContainer,
      style: style,
      format:format,
    };
    return createElement(Form.Item,
      Object.assign({key: formItemKey ? formItemKey : propertyName}, formItemOpts),
      getFieldDecorator(fieldDecoratorId ? fieldDecoratorId : propertyName, getFieldDecoratorOpts)(
        createElement(FormField, props)
      )
    );
  }
}