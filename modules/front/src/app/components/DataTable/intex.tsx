import React, {Component} from 'react';
import {DataTable, injectMainStore} from "@cuba-platform/react";
import {DataTableProps} from "@cuba-platform/react/dist/ui/table/DataTable";
import {MetaPropertyInfo} from "@cuba-platform/rest";
import {formatDate} from "../../util/Date/Date";
import {FileDescriptor} from "../../../cuba/entities/base/sys$FileDescriptor";
import {downloadFile} from "../../util/util";
import {FormattedMessage} from "react-intl";

export type ColumnRender<T> = {
  column: string,
  render: (text: any, record: T, rowIndex: number, colIndex: number) => React.ReactNode;
}

interface DataTableFormatProps<E> extends DataTableProps<E> {
  render?: ColumnRender<E>[],
}

@injectMainStore
export default class DataTableFormat<E> extends Component<DataTableFormatProps<E>> {
  render() {
    return (
      <DataTable
        columnProps={{render: this.renderColumn}}
        {...this.props}/>
    );
  }

  rowIndex = -1;
  colIndex = -1;

  renderColumn = (text: any, record: E, index: number): React.ReactNode => {
    if (this.rowIndex !== index) {
      this.rowIndex = index;
      this.colIndex = -1;
    }
    this.colIndex++;

    const field = this.props.fields[this.colIndex % this.props.fields.length];

    if (this.props.render) {
      const render = this.props.render.find(value => value.column === field);
      if (render)
        return render.render(text, record, index, this.colIndex);
    }

    const propertyInfo = this.getPropertyInfo(field);
    const isDate = propertyInfo && (propertyInfo.type === 'date' || propertyInfo.type === 'dateTime');
    const isFile = propertyInfo && (propertyInfo.type === 'sys$FileDescriptor');
    const isBoolean = propertyInfo && (propertyInfo.type === 'boolean');

    if (isBoolean)
      return this.renderBoolean(record[field])
    if (isDate)
      return formatDate(record[field]);

    if (isFile) return this.renderFile(record[field]);

    return text;
  }

  renderBoolean = (booleanValue?: boolean) => {
    return <FormattedMessage id={booleanValue ? 'cubaReact.dataTable.yes' : 'cubaReact.dataTable.no'}/>;
  }

  renderFile = (file?: FileDescriptor) => {
    if (file)
      return (
        <a onClick={() => {
          downloadFile((file as FileDescriptor).id,
            (file as FileDescriptor).name as string,
            (file as FileDescriptor).extension as string,
            "");
        }}>
          {(file as FileDescriptor).name}
        </a>
      )
    return (<span/>);
  }

  getPropertyInfo = (propertyName: string): MetaPropertyInfo | null => {
    const metaClass = this.props.mainStore!.metadata!.find(mci => mci.entityName === this.props.dataCollection.entityName);
    if (metaClass == null) {
      return null;
    }
    const propInfo = metaClass.properties.find(prop => prop.name === propertyName);
    return propInfo || null;
  }

}