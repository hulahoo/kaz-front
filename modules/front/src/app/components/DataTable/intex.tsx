import React, {Component} from 'react';
import {DataTable, injectMainStore} from "@cuba-platform/react";
import {DataTableProps} from "@cuba-platform/react/dist/ui/table/DataTable";
import {MetaPropertyInfo} from "@cuba-platform/rest";
import {formatDate} from "../../util/Date/Date";

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
      <DataTable columnProps={{render: this.renderColumn}} {...this.props}/>
    );
  }

  rowIndex = -1;
  colIndex = -1;

  renderColumn = (text: any, record: E, index: number): React.ReactNode => {
    if (this.rowIndex != index) {
      this.rowIndex = index;
      this.colIndex = -1;
    }
    this.colIndex++;

    const field = this.props.fields[this.colIndex];

    if (this.props.render) {
      const render = this.props.render.find(value => value.column == field);
      if (render)
        return render.render(text, record, index, this.colIndex);
    }

    const propertyInfo = this.getPropertyInfo(field);
    const isDate = propertyInfo && (propertyInfo.type == 'date' || propertyInfo.type == 'dateTime');

    if (isDate)
      return formatDate(record[field]);

    return text;
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