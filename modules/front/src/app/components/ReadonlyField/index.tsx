import * as React from "react";
import {createElement} from "react";
import {observer} from "mobx-react";
import {Form, Select} from "antd";
import {DataCollectionStore, FormField, injectMainStore, MainStoreInjected, Msg, WithId} from "@cuba-platform/react";
import {FormComponentProps, FormItemProps} from "antd/lib/form";
import {GetFieldDecoratorOptions} from "antd/lib/form/Form";
import {MetaPropertyInfo} from "@cuba-platform/rest/dist-node/model";
import {DEFAULT_DATE_PATTERN} from "../../util/Date/Date";
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
    const isAssociation = propertyInfo && propertyInfo.attributeType === 'ASSOCIATION';
    const isSelectField = !isFile && isAssociation && optionsContainer;

    const format = this.props.format || (isDate ? DEFAULT_DATE_PATTERN : undefined);

    const props = {
      entityName: entityName,
      propertyName: propertyName,
      disabled: disabled,
      optionsContainer: optionsContainer,
      style: style,
      format: format,
    };

    const mode = this.getSelectMode(propertyInfo!.cardinality);

    return createElement(Form.Item,
      Object.assign({key: formItemKey ? formItemKey : propertyName}, formItemOpts),
      getFieldDecorator(fieldDecoratorId ? fieldDecoratorId : propertyName, getFieldDecoratorOpts)(
        isSelectField && false
          ? createElement(EntitySelectField, Object.assign({},
          {mode, optionsContainer},
          {allowClear: this.getAllowClear(propertyInfo)},
          {showSearch: true},
          props))
          : createElement(isFile && isToManyRelation ? MultiFileUpload : FormField, props))
    );
  }

  getAllowClear = (propertyInfo: any) => {
    return !propertyInfo.mandatory;
  }

  getSelectMode = (cardinality: string) => {
    if (cardinality === "ONE_TO_MANY" || cardinality === "MANY_TO_MANY") {
      return "multiple";
    }
    return "default";
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

const EntitySelectField = observer((props) => {
  const {optionsContainer} = props, rest = __rest(props, ["optionsContainer"]);
  return (createElement(Select, Object.assign({}, rest, {loading: optionsContainer && optionsContainer.status === "LOADING"}),
// @ts-ignore
    optionsContainer && optionsContainer.items.map(entity => createElement(Select.Option, {
      value: entity.id,
      key: entity.id
    }, entity._instanceName))));
});

// @ts-ignore
// noinspection PointlessBooleanExpressionJS
var __rest = (undefined && undefined.__rest) || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
// @ts-ignore
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};