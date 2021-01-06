import React from 'react';
import {ColumnProps, TableProps} from "antd/es/table";
import {observer} from "mobx-react";
import {action, observable} from "mobx";
import {Table} from "antd";
import {DefaultRestParams, Sort} from "../../../cuba/services";
import {
  SorterResult,
  TableCurrentDataSource, TableEventListeners,
  TableRowSelection
} from "antd/lib/table/interface";
import {PaginationConfig} from "antd/lib/pagination";

export enum SelectRowType {
  NONE = "none",
  SINGLE = "single",
  MULTI = "multi"
}

type PaginationPosition = 'top' | 'bottom' | 'both';

type WrappedItems<T> = {
  count?: number,
  data: Array<T>
}

type KzmTableProps<T> = {
  selectRowType?: SelectRowType,
  columns: ColumnProps<T>[],
  paginationPosition?: PaginationPosition,
  fetch: (defaultParams: DefaultRestParams) => Promise<string>
  countFetch?: () => Promise<number>,
  onRowClick?: (record: T, index: number, event: Event) => void,
  tableProps: TableProps<T>
}

type TableState<T> = {
  loading: boolean,
  pagination?: PageConfig,
  selectedRowKeys: string[] | number[],
  items: Array<T>,
  sorterColumns: SorterResult<T>[]
}

type PageConfig = {
  position?: PaginationPosition,
  length?: number
}

@observer
export default class KzmTable<T> extends React.Component<KzmTableProps<T>> {

  @observable tableState: TableState<T> = {
    loading: false,
    selectedRowKeys: [],
    items: [],
    pagination: {
      position: this.props.paginationPosition
    },
    sorterColumns: []
  };

  componentDidMount() {
    this.setLoading(true);
    if (this.props.countFetch) {
      this.props.countFetch().then(pageCount => {
        this.setPageCount(pageCount);
        this.loadTable(1, 10);
      })
    } else {
      this.loadTable(1, 10);
    }
  }

  @action
  setItems = (items: Array<T>) => {
    this.tableState.items = items;
  }

  @action
  setPageCount = (pageCount: number | undefined) => {
    if (this.tableState.pagination) {
      this.tableState.pagination.length = pageCount;
    }
  }

  @action
  setLoading = (loading: boolean) => {
    this.tableState.loading = loading;
  }

  @action
  setSelectedRowKeys = (value: string[] | number[]) => {
    this.tableState.selectedRowKeys = value;
  }

  @action
  addSelectedRowKey = (value: any) => {
    this.tableState.selectedRowKeys.push(value);
  }

  @action
  addSortColumn = (value: SorterResult<T>) => {
    this.tableState.sorterColumns.push(value);
  }

  @action
  clearSelectedRowKeys = () => {
    console.log('cleared');
    this.tableState.selectedRowKeys = [];
  }

  onTableChange = (pagination: PaginationConfig, filters: Partial<Record<keyof T, string[]>>, sorter: SorterResult<T>, extra: TableCurrentDataSource<T>) => {
    console.log(filters);
    console.log(sorter);
    this.loadTable(pagination.current, 10, sorter);
  }

  loadTable = (page?: number, pageSize?: number, sort?: Sort) => {
    this.props.fetch({page, pageSize, sort}).then((response: string) => {
      const data = JSON.parse(response);
      if (data.hasOwnProperty("data")) {
        const wrappedData = data as WrappedItems<any>;
        this.setPageCount(wrappedData.count);
        this.setItems(wrappedData.data);
      } else {
        this.setItems((data as any[]));
      }
    });
  }

  render() {
    let rowSelection: TableRowSelection<any> | undefined;
    let onRowClick: ((record: T, index: number, event: Event) => void) | undefined;

    if (this.props.selectRowType) {
      switch (this.props.selectRowType) {
        case SelectRowType.MULTI: {
          rowSelection = {type: 'checkbox'};
          break;
        }
        case SelectRowType.SINGLE: {
          // rowSelection = {
          //   type: 'radio',
          //   selectedRowKeys: this.tableState.selectedRowKeys
          // }
          onRowClick = (record: T, index: number, event: Event) => {
            if (this.tableState.selectedRowKeys.length === 1
              && this.tableState.selectedRowKeys[0] == index) {
              if (this.props.onRowClick) {
              }
            } else {
              this.clearSelectedRowKeys();
              this.addSelectedRowKey(index);
              if (this.props.onRowClick) {
                this.props.onRowClick(record, index, event);
              }
            }
          }
          break;
        }
        default: {
          onRowClick = this.props.onRowClick;
          break;
        }
      }
    } else {
      onRowClick = this.props.onRowClick;
    }

    const tableEventListeners = (record: T, index: number) => {
      return {
        onClick: (arg: React.MouseEvent) => {
          if (onRowClick) {
            onRowClick.call(this, record, index, arg);
          }
        }
      } as TableEventListeners
    };
    const className = (this.props.selectRowType ? this.props.selectRowType + "-table" : "")
      + (onRowClick ? " actionable" : "");
    return (
      <div className={"table-container"}>
        <Table className={className}
               pagination={this.tableState.pagination}
               columns={this.props.columns}
               dataSource={this.tableState.items}
               onRow={tableEventListeners}
               rowSelection={rowSelection}
               onChange={this.onTableChange}
               {...this.props.tableProps}
        />
      </div>
    );
  }
}