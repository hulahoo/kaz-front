import React from 'react';
import {ColumnProps, PaginationConfig} from "antd/es/table";
import {observer} from "mobx-react";
import {action, observable} from "mobx";
import {Table} from "antd";

type PaginationPosition = 'top' | 'bottom' | 'both';

type WrappedItems<T> = {
  count?: number,
  data: T[]
}

type TableProps<T> = {
  columns: ColumnProps<T>[],
  paginationPosition?: PaginationPosition,
  fetch: (page?: number, pageSize?: number) => Promise<T[] | WrappedItems<T>>
  countFetch?: () => Promise<number>,
}

type TableState = {
  loading: boolean,
  pagination?: PageConfig,
  items: any[],
}

type PageConfig = {
  position?: PaginationPosition,
  length?: number
}

@observer
export default class KzmTable<T> extends React.Component<TableProps<T>> {

  @observable state: TableState = {
    loading: false,
    items: [],
    pagination: {
      position: this.props.paginationPosition
    }
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
  setItems = (items: any[]) => {
    this.state.items = items;
  }

  @action
  setPageCount = (pageCount: number | undefined) => {
    if (this.state.pagination) {
      this.state.pagination.length = pageCount;
    }
  }

  @action
  setLoading = (loading: boolean) => {
    this.state.loading = loading;
  }

  loadTable = (page?: number, pageSize?: number,) => {
    this.props.fetch(page, pageSize).then(data => {
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
    return (
      <div className={"table-container"}>
        <Table pagination={this.state.pagination} columns={this.props.columns} dataSource={this.state.items}/>
      </div>
    );
  }
}