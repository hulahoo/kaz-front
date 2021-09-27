import React from "react";
import React__default from "react";
import {Button, DatePicker, Divider, Form, Input, InputNumber, message, Select, Spin, TimePicker} from "antd";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {MetaPropertyInfo} from "@cuba-platform/rest";
import {observer} from "mobx-react";
import {observable} from "mobx";
import {
  ComparisonType,
  DataCollectionStore,
  generateEnumFilter,
  getCubaREST,
  getPropertyInfoNN,
  injectMainStore,
  isPreservedCondition,
  MainStoreInjected,
  withLocalizedForm
} from "@cuba-platform/react";
import {FormComponentProps} from "antd/lib/form";
import moment__default from "moment";
import moment, {Moment} from "moment";
import {FilterDropdownProps} from "antd/es/table/interface";
import {MainStore} from "@cuba-platform/react/dist/app/MainStore";
// import {DataTableListEditor} from "@cuba-platform/react/dist/ui/table/DataTableListEditor";
// import dataTableIntervalEditor from "@cuba-platform/react/dist/ui/table/DataTableIntervalEditor";

export type FilterValue = { value: string | string[], operator: ComparisonType }

export type CustomFilterProps = {
  filterValue?: (entityProperty: string) => FilterValue | undefined,
  entityName: string,
  entityProperty: string,
  filterProps: FilterDropdownProps,
  propertyCaption?: string,
  loadFilterValues?: () => Promise<Array<FilterEntityValue>>,
  onChangeValue?: (entityProperty: string, filterValue?: FilterValue) => void,
}

export type FilterEntityValue = {
  value: string,
  caption: string
}

@injectMainStore
@observer
class CustomFilter extends React.Component<CustomFilterProps & MainStoreInjected & WrappedComponentProps & FormComponentProps> {

  // @observable.ref filters: Record<string, string[]> | undefined;
  @observable operator: ComparisonType | undefined;
  @observable value: any;

  @observable
  nestedEntityOptions: FilterEntityValue[] = [];

  // @observable
  propertyInfoNN: MetaPropertyInfo;

  getFieldDecorator: any;

  @observable
  loading: boolean = true;

  defaultFilterValue?: FilterValue;

  componentDidMount() {
    this.defaultFilterValue = this.props.filterValue ? this.props.filterValue(this.props.entityProperty) : undefined;
    this.value = this.defaultFilterValue ? this.defaultFilterValue.value : undefined;
    this.operator = this.getDefaultOperator();
    const propertyInfo = this.getPropertyInfo();
    const metaClassInfo = this.props.mainStore!.metadata!.find((classInfo) => {
      return classInfo.entityName === propertyInfo.type;
    });
    if (metaClassInfo) {
      // This is a nested entity column. Fetch select options.
      if (this.props.loadFilterValues) {
        this.props.loadFilterValues().then(values => this.nestedEntityOptions = values)
          .then(() => this.loading = false)
          .catch(() => {
            message.error(this.props.intl.formatMessage({id: 'cubaReact.dataTable.failedToLoadNestedEntities'}));
            this.loading = false;
          });
      } else {
        getCubaREST()!.loadEntities(metaClassInfo.entityName, {view: '_minimal'})
          .then((resp) => {
            resp.forEach((instance) => {
              this.nestedEntityOptions.push({
                caption: instance._instanceName,
                value: instance['id']
              });
            });
            this.loading = false;
          })
          .catch(() => {
            message.error(this.props.intl.formatMessage({id: 'cubaReact.dataTable.failedToLoadNestedEntities'}));
            this.loading = false;
          });
      }
    } else this.loading = false;
  }

  getPropertyInfo = () => {
    if (!this.propertyInfoNN) this.propertyInfoNN = getPropertyInfoNN(this.props.entityProperty, this.props.entityName, this.props.mainStore!.metadata!);
    return this.propertyInfoNN;
  }

  render() {
    this.getFieldDecorator = this.props.form.getFieldDecorator;
    if (this.loading || !this.propertyInfoNN || !this.operator) {
      return (React__default.createElement(Spin, {
        tip: this.props.intl.formatMessage({id: 'cubaReact.dataTable.loading'}),
        className: 'cuba-table-filter-loader'
      }));
    }
    const caption = this.props.propertyCaption ? this.props.propertyCaption : this.props.mainStore!.messages![`${this.props.entityName}.${this.props.entityProperty}`];
    return (React__default.createElement(Form, {layout: 'inline', onSubmit: this.handleSubmit},
      React__default.createElement("div", {className: 'cuba-table-filter'},
        React__default.createElement("div", {className: 'settings'},
          React__default.createElement("div", {className: 'cuba-filter-controls-layout'},
            React__default.createElement(Form.Item, {className: 'filtercontrol -property-caption'}, caption),
            React__default.createElement(Form.Item, {className: 'filtercontrol'},
              this.getFieldDecorator(`${this.props.entityProperty}.operatorsDropdown`, {initialValue: this.getDefaultOperator()})
              (React__default.createElement(Select, {
                dropdownMatchSelectWidth: false,
                onChange: this.changeOperator
              }, this.operatorTypeOptions))),
            this.simpleFilterEditor),
          this.complexFilterEditor),
        React__default.createElement(Divider, {className: 'divider'}),
        React__default.createElement("div", {className: 'footer'},
          // @ts-ignore
          React__default.createElement(Button, {htmlType: 'submit', type: 'link'},
            React__default.createElement(FormattedMessage, {id: 'cubaReact.dataTable.ok'})),
          // @ts-ignore
          React__default.createElement(Button, {htmlType: 'button', type: 'link', onClick: this.resetFilter},
            React__default.createElement(FormattedMessage, {id: 'cubaReact.dataTable.reset'}))))))
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.form.validateFields((err: any) => {
      if (!err) {
        this.props.filterProps.setSelectedKeys!([
          JSON.stringify({
            operator: this.operator,
            value: this.value
          })
        ]);
        this.props.filterProps.confirm!();
      }
    });
  };
  resetFilter = () => {
    if (this.getPropertyInfo().type === 'boolean') {
      this.value = 'true';
    } else {
      this.value = null;
    }
    this.props.form.resetFields();
    this.operator = this.getDefaultOperator();
    // @ts-ignore
    this.props.filterProps.clearFilters(this.props.filterProps.selectedKeys);
  };
  changeOperator = (newOperator: ComparisonType) => {
    const oldOperator = this.operator;
    const oldOperatorGroup = determineOperatorGroup(oldOperator!);
    const newOperatorGroup = determineOperatorGroup(newOperator);
    if (oldOperatorGroup !== newOperatorGroup) {
      this.props.form.resetFields();
      this.value = null;
    }
    this.operator = newOperator;
    this.setDefaultYesNoDropdown();
    if (this.props.onChangeValue) this.props.onChangeValue(this.props.entityProperty, {
      value: this.value,
      operator: this.operator
    });
  };
  setDefaultYesNoDropdown = () => {
    if (!this.value &&
      (this.operator === 'notEmpty' || this.getPropertyInfo().type === 'boolean')) {
      this.value = 'true';
    }
  };
  onTextInputChange = (event: any) => {
    this.setValue(event.target.value);
  };
  onDatePickerChange = (_date: any, dateString: any) => {
    this.setValue(dateString);
  };
  onTimePickerChange = (time: Moment) => {
    if (time) {
      this.setValue(time.format('HH:mm:ss.mmm'));
    }
  };
  onDateTimePickerChange = (dateTime: Moment) => {
    if (dateTime) {
      this.setValue(dateTime.format('YYYY-MM-DD HH:mm:ss.000'));
    }
  };
  setValue = (value: any) => {
    this.value = value;

    if (this.props.onChangeValue) this.props.onChangeValue(this.props.entityProperty, {
      value: value,
      operator: this.operator!
    });
  };

  getOperatorCaption = (operator: ComparisonType) => {
    switch (operator) {
      case '=':
      case '>':
      case '>=':
      case '<':
      case '<=':
      case '<>':
        return operator;
      case 'startsWith':
      case 'endsWith':
      case 'contains':
      case 'doesNotContain':
      case 'in':
      case 'notIn':
      case 'notEmpty':
      case 'inInterval':
        return this.props.intl.formatMessage({id: 'cubaReact.dataTable.operator.' + operator});
      default:
        throw new Error(`Unexpected ComparisonType ${operator}`);
    }
  };

  getDefaultOperator() {
    if (this.defaultFilterValue && this.defaultFilterValue.operator) return this.defaultFilterValue.operator;

    const propertyInfo = this.getPropertyInfo();
    switch (propertyInfo.attributeType) {
      case 'ENUM':
      case 'ASSOCIATION':
      case 'COMPOSITION':
        return '=';
    }
    switch (propertyInfo.type) {
      case 'boolean':
        return '=';
      case 'date':
      case 'time':
      case 'dateTime':
        return '=';
      case 'int':
      case 'long':
      case 'double':
      case 'decimal':
        return '=';
      case 'string':
        return 'contains';
      default:
        throw new Error(`Unexpected property type ${propertyInfo.type}`);
    }
  }

  get operatorTypeOptions() {
    const propertyInfo = this.getPropertyInfo();
    const availableOperators = getAvailableOperators(propertyInfo);
    return availableOperators.map((operator) => {
      return React__default.createElement(Select.Option, {
        key: `${this.props.entityProperty}.${operator}`,
        value: operator
      }, this.getOperatorCaption(operator));
    });
  }

  get simpleFilterEditor() {
    return isComplexOperator(this.operator!) ? null : this.conditionInput;
  }

  get complexFilterEditor() {
    return isComplexOperator(this.operator!) ? this.conditionInput : null;
  }

  get conditionInput() {
    const propertyInfo = this.getPropertyInfo();
    switch (propertyInfo.attributeType) {
      // In case of enum generic filter will not be rendered, enum filter will be rendered instead
      case 'ASSOCIATION':
      case 'COMPOSITION':
        switch (this.operator) {
          case '=':
          case '<>':
            return this.selectField;
          case 'in':
          case 'notIn':
            return this.listEditor;
          case 'notEmpty':
            return this.yesNoSelectField;
        }
    }
    switch (propertyInfo.type) {
      case 'boolean':
        return this.yesNoSelectField;
      case 'dateTime':
        switch (this.operator) {
          case '=':
          case '<>':
          case '>':
          case '>=':
          case '<':
          case '<=':
            return this.dateTimePickerField;
          case 'in':
          case 'notIn':
            return this.listEditor;
          case 'notEmpty':
            return this.yesNoSelectField;
          case 'inInterval':
            return this.intervalEditor;
        }
        throw new Error(`Unexpected combination of property type ${propertyInfo.type} and condition operator ${this.operator}`);
      case 'date':
        switch (this.operator) {
          case '=':
          case '<>':
          case '>':
          case '>=':
          case '<':
          case '<=':
            return this.datePickerField;
          case 'in':
          case 'notIn':
            return this.listEditor;
          case 'notEmpty':
            return this.yesNoSelectField;
          case 'inInterval':
            return this.intervalEditor;
        }
        throw new Error(`Unexpected combination of property type ${propertyInfo.type} and condition operator ${this.operator}`);
      case 'time':
        switch (this.operator) {
          case '=':
          case '<>':
          case '>':
          case '>=':
          case '<':
          case '<=':
            return this.timePickerField;
          case 'in':
          case 'notIn':
            return this.listEditor;
          case 'notEmpty':
            return this.yesNoSelectField;
        }
        throw new Error(`Unexpected combination of property type ${propertyInfo.type} and condition operator ${this.operator}`);
      case 'int':
      case 'long':
      case 'double':
      case 'decimal':
        switch (this.operator) {
          case '=':
          case '<>':
          case '>':
          case '>=':
          case '<':
          case '<=':
            return this.numberInputField;
          case 'in':
          case 'notIn':
            return this.listEditor;
          case 'notEmpty':
            return this.yesNoSelectField;
        }
        throw new Error(`Unexpected combination of property type ${propertyInfo.type} and condition operator ${this.operator}`);
      case 'string':
        switch (this.operator) {
          case 'contains':
          case 'doesNotContain':
          case '=':
          case '<>':
          case 'startsWith':
          case 'endsWith':
            return this.textInputField;
          case 'in':
          case 'notIn':
            return this.listEditor;
          case 'notEmpty':
            return this.yesNoSelectField;
        }
        throw new Error(`Unexpected combination of property type ${propertyInfo.type} and condition operator ${this.operator}`);
      default:
        throw new Error(`Unexpected combination of property type ${propertyInfo.type} and condition operator ${this.operator}`);
    }
  }

  get textInputField() {
    return (React__default.createElement(Form.Item, {
      hasFeedback: true,
      className: 'filtercontrol'
    }, this.getFieldDecorator(`${this.props.entityProperty}.input`, {
      initialValue: null,
      rules: [{required: true, message: this.props.intl.formatMessage({id: 'cubaReact.dataTable.requiredField'})}]
    })(React__default.createElement(Input, {onChange: this.onTextInputChange}))));
  }

  get numberInputField() {
    return (React__default.createElement(Form.Item, {
      hasFeedback: true,
      className: 'filtercontrol'
    }, this.getFieldDecorator(`${this.props.entityProperty}.input`, {
      initialValue: this.value,
      rules: [{required: true, message: this.props.intl.formatMessage({id: 'cubaReact.dataTable.requiredField'})}]
    })(React__default.createElement(InputNumber, {onChange: this.setValue}))));
  }

  get selectField() {
    return (React__default.createElement(Form.Item, {className: 'filtercontrol'}, this.getFieldDecorator(`${this.props.entityProperty}.input`, {
      initialValue: this.value,
      rules: [{required: true, message: this.props.intl.formatMessage({id: 'cubaReact.dataTable.requiredField'})}]
    })(React__default.createElement(Select, {
      dropdownMatchSelectWidth: false,
      showSearch:true,
      className: 'cuba-filter-select',
      optionFilterProp: "children",
      onSelect: this.setValue,
    }, this.selectFieldOptions))));
  }

  get selectFieldOptions() {
    return this.nestedEntityOptions.map((option) => {
      return (React__default.createElement(Select.Option, {
        title: option.caption,
        value: option.value,
        key: option.value
      }, option.caption));
    });
  }

  get yesNoSelectField() {
    return (React__default.createElement(Form.Item, {className: 'filtercontrol'}, this.getFieldDecorator(`${this.props.entityProperty}.input`, {
      initialValue: this.value ? this.value : 'true',
      rules: [{required: true}]
    })(React__default.createElement(Select, {
        dropdownMatchSelectWidth: false,
        className: 'cuba-filter-select',
        onSelect: this.setValue
      },
      React__default.createElement(Select.Option, {value: 'true'},
        React__default.createElement(FormattedMessage, {id: 'cubaReact.dataTable.yes'})),
      React__default.createElement(Select.Option, {value: 'false'},
        React__default.createElement(FormattedMessage, {id: 'cubaReact.dataTable.no'}))))));
  }

  get listEditor() {
    // return (React__default.createElement(Form.Item, {className: 'filtercontrol -complex-editor'},
    //   React__default.createElement(DataTableListEditor, {
    //     onChange: (value) => this.value = value,
    //     id: this.props.entityProperty,
    //     propertyInfo: this.getPropertyInfo(),
    //     getFieldDecorator: this.props.form.getFieldDecorator,
    //     nestedEntityOptions: this.nestedEntityOptions
    //   })));
    return '';
  }

  get intervalEditor() {
    // return (React__default.createElement(Form.Item, {className: 'filtercontrol -complex-editor'},
    //   // @ts-ignore
    //   React__default.createElement(dataTableIntervalEditor, {
    //     // @ts-ignore
    //     onChange: (value) => this.value = value,
    //     id: this.props.entityProperty,
    //     getFieldDecorator: this.props.form.getFieldDecorator
    //   })));
    return '';
  } ;

  get datePickerField() {
    return (React__default.createElement(Form.Item, {
      hasFeedback: true,
      className: 'filtercontrol'
    }, this.getFieldDecorator(`${this.props.entityProperty}.input`, {
      initialValue: this.value ? moment(this.value) : null,
      rules: [{required: true, message: this.props.intl.formatMessage({id: 'cubaReact.dataTable.requiredField'})}]
    })(React__default.createElement(DatePicker, {placeholder: 'YYYY-MM-DD', onChange: this.onDatePickerChange}))));
  }

  get timePickerField() {
    return (React__default.createElement(Form.Item, {
      hasFeedback: true,
      className: 'filtercontrol'
    }, this.getFieldDecorator(`${this.props.entityProperty}.input`, {
      initialValue: null,
      rules: [{required: true, message: this.props.intl.formatMessage({id: 'cubaReact.dataTable.requiredField'})}]
    })(React__default.createElement(TimePicker, {
      placeholder: 'HH:mm:ss',
      defaultOpenValue: moment__default('00:00:00', 'HH:mm:ss'),
      onChange: this.onTimePickerChange
    }))));
  }

  get dateTimePickerField() {
    return (React__default.createElement(Form.Item, {hasFeedback: true, className: 'filtercontrol'},
      React__default.createElement("div", {className: 'cuba-filter-controls-layout'},
        React__default.createElement(Form.Item, {
          hasFeedback: true,
          className: 'filtercontrol'
        }, this.getFieldDecorator(`${this.props.entityProperty}.input`, {
          initialValue: null,
          rules: [{required: true, message: this.props.intl.formatMessage({id: 'cubaReact.dataTable.requiredField'})}]
        })(React__default.createElement(DatePicker, {placeholder: 'YYYY-MM-DD'}))),
        React__default.createElement(Form.Item, {
          hasFeedback: true,
          className: 'filtercontrol'
        }, this.getFieldDecorator(`${this.props.entityProperty}.input`, {
          initialValue: null,
          rules: [{required: true, message: this.props.intl.formatMessage({id: 'cubaReact.dataTable.requiredField'})}]
        })(React__default.createElement(TimePicker, {
          placeholder: 'HH:mm:ss',
          defaultOpenValue: moment__default('00:00:00', 'HH:mm:ss'),
          onChange: this.onDateTimePickerChange
        }))))));
  }
}

function determineOperatorGroup(operator: ComparisonType) {
  switch (operator) {
    case '=':
    case '>':
    case '>=':
    case '<':
    case '<=':
    case '<>':
    case 'startsWith':
    case 'endsWith':
    case 'contains':
    case 'doesNotContain':
      return 'singleValue';
    case 'in':
    case 'notIn':
      return 'listValue';
    case 'notEmpty':
      return 'logicalValue';
    case 'inInterval':
      return 'intervalValue';
    default:
      throw new Error(`Unexpected ComparisonType ${operator}`);
  }
}

export const operatorTypeOptions = (props: any, entityName: string, property: string) => {
  const propertyInfo = getPropertyInfoNN(property, entityName, props.mainStore!.metadata);
  const availableOperators = getAvailableOperators(propertyInfo);
  return availableOperators.map((operator) => {
    return React__default.createElement(Select.Option, {
      key: `${props.entityProperty}.${operator}`,
      value: operator
    }, getOperatorCaption(props, operator));
  });
}

export const getAvailableOperators = (propertyInfo: MetaPropertyInfo): ComparisonType[] => {
  switch (propertyInfo.attributeType) {
    case 'ENUM':
    case 'ASSOCIATION':
    case 'COMPOSITION':
      return ['=', '<>', 'notEmpty'];
  }

  switch (propertyInfo.type) {
    case 'boolean':
      return ['=', '<>', 'notEmpty'];
    case 'date':
    case 'dateTime':
      return ['=', '<>', '>', '>=', '<', '<=', 'notEmpty'];
    case 'time':
      return ['=', '<>', '>', '>=', '<', '<=', 'notEmpty'];
    case 'int':
    case 'long':
    case 'double':
    case 'decimal':
      return ['=', '<>', '>', '>=', '<', '<=', 'notEmpty'];
    case 'string':
      return ['contains', '=', '<>', 'doesNotContain', 'notEmpty', 'startsWith', 'endsWith'];
    default:
      throw new Error(`Unexpected property type ${propertyInfo.type}`);
  }
}
export const getOperatorCaption = (props: any, operator: ComparisonType) => {
  switch (operator) {
    case '=':
    case '>':
    case '>=':
    case '<':
    case '<=':
    case '<>':
      return operator;
    case 'startsWith':
    case 'endsWith':
    case 'contains':
    case 'doesNotContain':
    case 'in':
    case 'notIn':
    case 'notEmpty':
      // case 'inInterval':
      return props.intl.formatMessage({id: 'cubaReact.dataTable.operator.' + operator});
    default:
      throw new Error(`Unexpected ComparisonType ${operator}`);
  }
};

function isComplexOperator(operator: ComparisonType) {
  const complexOperators = ['in', 'notIn', 'inInterval'];
  return complexOperators.indexOf(operator) > -1;
}

export function enumFilter(property: string, entityName: string, mainStore: MainStore) {
  return generateEnumFilter(getPropertyInfoNN(property, entityName, mainStore.metadata!), mainStore);
}


/**
 * Sets filters on provided `dataCollection` based on current state of table filters
 *
 * @param tableFilters
 * @param fields
 * @param mainStore
 * @param dataCollection
 */
export function setFilters(tableFilters: Record<string, string[]>, fields: string[], mainStore: MainStore, dataCollection: DataCollectionStore<any>, getEntityName: (property: string) => string) {
  let entityFilter: any = undefined;
  if (dataCollection.filter && dataCollection.filter.conditions && dataCollection.filter.conditions.length > 0) {
    const preservedConditions = dataCollection.filter.conditions.filter(condition => {
      return isPreservedCondition(condition, fields);
    });
    if (preservedConditions.length > 0) {
      entityFilter = {
        conditions: preservedConditions
      };
    }
  }
  if (tableFilters) {
    fields.forEach((propertyName) => {
      if (tableFilters.hasOwnProperty(propertyName) && tableFilters[propertyName] && tableFilters[propertyName].length > 0) {
        if (!entityFilter) {
          entityFilter = {
            conditions: []
          };
        }
        if (getPropertyInfoNN(propertyName, getEntityName(propertyName), mainStore.metadata!).attributeType === 'ENUM') {
          // @ts-ignore // TODO fix cuba-react typing
          entityFilter.conditions.push({
            property: propertyName,
            operator: 'in',
            value: tableFilters[propertyName],
          });
        } else {
          const {operator, value} = JSON.parse(tableFilters[propertyName][0]);
          if (operator === 'inInterval') {
            const {minDate, maxDate} = value;
            entityFilter.conditions.push({
              property: propertyName,
              operator: '>=',
              value: minDate,
            });
            entityFilter.conditions.push({
              property: propertyName,
              operator: '<=',
              value: maxDate,
            });
          } else {
            entityFilter.conditions.push({
              property: propertyName,
              operator,
              value,
            });
          }
        }
      }
    });
  }
  dataCollection.filter = entityFilter;
}

export default injectIntl(
  withLocalizedForm<CustomFilterProps & WrappedComponentProps & MainStoreInjected>({
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
  })(CustomFilter)
);
