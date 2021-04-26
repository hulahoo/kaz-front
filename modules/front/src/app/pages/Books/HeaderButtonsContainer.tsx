import React, {Component} from 'react';
import {Book} from "../../../cuba/entities/base/tsadv$Book";
import {Dropdown, Menu, Select} from "antd";
import {bookFileProperties} from "./DicBookCategoryCards";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {downloadFile, openPdfInNewTab} from "../../util/util";
import Button, {ButtonType} from "../../components/Button/Button";
import {inject} from "mobx-react";
import {getCubaREST} from "@cuba-platform/react";
import {BookView} from "../../../cuba/entities/base/tsadv$BookView";
import {RootStoreProp} from "../../store";
import {PersonGroupExt} from "../../../cuba/entities/base/base$PersonGroupExt";

type Props = {
  book: Book
}

@inject("rootStore")
class HeaderButtonsContainer extends Component<Props & WrappedComponentProps & RootStoreProp> {

  incrementBookView = () => {
    const {personGroupId} = this.props.rootStore!.userInfo;

    getCubaREST()!.searchEntitiesWithCount<BookView>(BookView.NAME, {
      conditions: [{
        property: "book.id",
        operator: "=",
        value: this.props.book.id
      }, {
        property: "personGroup.id",
        operator: "=",
        value: this.props.rootStore!.userInfo.personGroupId
      }]
    }).then(response => {
      if (response.count === 0) {
        const bookView = new BookView();
        bookView.book = this.props.book;
        bookView.personGroup = new PersonGroupExt();
        bookView.personGroup.id = personGroupId;

        getCubaREST()!.commitEntity<BookView>(BookView.NAME, bookView, {});
      }
    });
  };

  downloadBookHandler = (fileId: string, option: React.ReactElement<HTMLLIElement>) => {
    downloadFile(fileId, option.props["name"], option.props["extension"], this.props.intl.formatMessage({id: "book.download.error"}))
      .then(response => {
        this.incrementBookView();
      });
  };

  openBookInNewTab = () => {
    const {book} = this.props;
    openPdfInNewTab(book.pdf!.id, (this.props.book as any)._instanceName!, this.props.intl.formatMessage({id: "book.download.error"}))
      .then(response => {
        this.incrementBookView();
      });
  };

  render() {
    const {book} = this.props;

    return bookFileProperties.find(fp => (book as {}).hasOwnProperty(fp)) != undefined
      ?
      <div>
        <Select placeholder={this.props.intl.formatMessage({id: "book.download"})}
                className="selection-download-book"
                style={{}}
                onSelect={this.downloadBookHandler}>
          {bookFileProperties.filter(fp => (book as {}).hasOwnProperty(fp)).map(fp =>
            // @ts-ignore
            <Select.Option key={book[fp].id!} name={book[fp]._instanceName}
                           extension={fp}>{fp}</Select.Option>)}
        </Select>
        <Button buttonType={ButtonType.PRIMARY} onClick={this.openBookInNewTab}
                disabled={this.props.book.pdf == undefined}>{this.props.intl.formatMessage({id: 'book.view'})}</Button>
      </div>
      : <></>;
  }
}

export default injectIntl(HeaderButtonsContainer);