import * as React from "react";
import {createElement} from "react";
import {observer} from "mobx-react";
import {Form} from "antd";
import {DataCollectionStore, FormField, injectMainStore, MainStoreInjected, Msg, WithId} from "@cuba-platform/react";
import {FormComponentProps, FormItemProps} from "antd/lib/form";
import {GetFieldDecoratorOptions} from "antd/lib/form/Form";
import {MetaPropertyInfo} from "@cuba-platform/rest/dist-node/model";
import {DEFAULT_DATE_PATTERN} from "../../util/Date/Date";
import {FileDescriptor} from "../../../cuba/entities/base/sys$FileDescriptor";
import {MultiFileUpload} from "../MultiFileUpload";

@observer
@injectMainStore
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
      getFieldDecoratorOpts,
      formItemKey,
      disabled,
      style
    } = this.props;
    const formItemOpts = Object.assign({}, this.props.formItemOpts);

    if (!formItemOpts.label)
      formItemOpts.label = createElement(Msg, {entityName: entityName, propertyName: propertyName});

    const propertyInfo = this.getPropertyInfo();
    const isDate = propertyInfo && (propertyInfo.type === 'date' || propertyInfo.type === 'dateTime');
    const isFile = propertyInfo && (propertyInfo.type === 'sys$FileDescriptor');
    const isToManyRelation = propertyInfo && this.isToManyRelation(propertyInfo.cardinality);

    const format = this.props.format || (isDate ? DEFAULT_DATE_PATTERN : undefined);

    const props = {
      entityName: entityName,
      propertyName: propertyName,
      disabled: disabled,
      optionsContainer: optionsContainer,
      style: style,
      format: format,
    };

    return createElement(Form.Item,
      Object.assign({key: formItemKey ? formItemKey : propertyName}, formItemOpts),
      getFieldDecorator(fieldDecoratorId ? fieldDecoratorId : propertyName, getFieldDecoratorOpts)(
        createElement(isFile && isToManyRelation ? MultiFileUpload : FormField, props))
    );
  }

  getPropertyInfo = (): MetaPropertyInfo | null => {
    const metaClass = this.props.mainStore!.metadata!.find(mci => mci.entityName === this.props.entityName);
    if (metaClass == null) {
      return null;
    }
    const propInfo = metaClass.properties.find(prop => prop.name === this.props.propertyName);
    return propInfo || null;
  }

  isToManyRelation = (cardinality: string) => {
    return cardinality === "ONE_TO_MANY" || cardinality === "MANY_TO_MANY";
  }
}

export const parseToJsonFromFieldValue = (fieldValue?: any[]) => {
  return fieldValue ? fieldValue.map(value => value.id) : undefined;
}

export const parseToFieldValueFromDataInstanceValue = (dataInstanceValue?: any[] | null) => {
  return dataInstanceValue ? dataInstanceValue.map((file: FileDescriptor) => {
    return {id: file.id, name: file.name}
  }) : undefined;
}