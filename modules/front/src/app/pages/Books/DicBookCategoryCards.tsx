import * as React from "react";
import {observer} from "mobx-react";
import {Button, Icon, Rate, Select, Tabs} from "antd";
import {DicBookCategory} from "../../../cuba/entities/base/tsadv$DicBookCategory";
import Page from "../../hoc/PageContentHoc";
import {injectIntl, WrappedComponentProps} from "react-intl";
import PanelCard from "../../components/CourseCard";
import {Link} from "react-router-dom";
import {getBlobUrl} from "../../util/util";
import {queryCollection} from "../../util/QueryDataCollectionStore";
import {SerializedEntity} from "@cuba-platform/rest";
import {Book} from "../../../cuba/entities/base/tsadv$Book";
import Meta from "antd/es/card/Meta";
import ImageLogo from "../../components/ImageLogo";
import {getCubaREST} from "@cuba-platform/react";
import Notification from "../../util/notification/Notification";
import Section from "../../hoc/Section";

export const bookFileProperties = ["fb2", "epub", "mobi", "kf8", "pdf", "djvu"];

@observer
class DicBookCategoryCards extends React.Component<WrappedComponentProps> {
  dataCollection = queryCollection<DicBookCategory>(DicBookCategory.NAME, "books", {});

  fields = [
    "langValue",

    "langValue1",

    "langValue2",

    "langValue3",

    "langValue4",

    "langValue5",

    "books",

    "order"
  ];

  downloadBook = (fileId: string, fileName: string, extension: string) => {
    getCubaREST()!.getFile(fileId).then((value: Blob) => {
      const anchor = document.createElement('a');
      anchor.href = URL.createObjectURL(value);
      anchor.target = '_blank';
      anchor.download = fileName + '.' + extension;

      anchor.click();
    }).catch(() => {
      Notification.error({
        message: this.props.intl.formatMessage({id: "Не удалось скачать книгу"}),
      })
    });
  };

  selectBookHandler = (fileId: string, option: React.ReactElement<HTMLLIElement>) => {
    this.downloadBook(fileId, (option.props["children"] as any).name, (option.props["children"] as any).extension);
  };

  render() {
    const {status, items} = this.dataCollection;

    if (status === "LOADING") {
      return <Icon type="spin"/>;
    }

    return (
      <Page pageName={this.props.intl.formatMessage({id: "menu.books"})}>
        <Section size="large" visible={false}>
          <div className="narrow-layout">
            <Tabs>
              {status === 'DONE' ? items.map(category => <Tabs.TabPane
                tab={(category as SerializedEntity<DicBookCategory>)._instanceName} key={category.id}>
                <div className={"courses-cards-wrapper"}>
                  <div className={"courses-cards"}>
                    {category.books!.map(book => <PanelCard key={book.id}
                                                            loading={false}
                                                            name={(book as SerializedEntity<Book>)._instanceName}
                                                            header={
                                                              <Link to={"/book/" + book.id} key={book.id}><ImageLogo
                                                                type="promise"
                                                                imgSrcProp={book.image ? getBlobUrl(book.image.id) : undefined}
                                                                name={book.bookNameLang1!}/></Link>}>
                      <Meta title={(book as SerializedEntity<Book>)._instanceName}
                            description={<>
                              {bookFileProperties.find(fp => (book as {}).hasOwnProperty(fp)) != undefined
                                ? <Select placeholder={"Скачать книгу"} style={{width: '100%'}}
                                          onSelect={this.selectBookHandler}>
                                  {bookFileProperties.filter(fp => (book as {}).hasOwnProperty(fp)).map(fp =>
                                    // @ts-ignore
                                    <Select.Option key={book[fp].id!} name={book[fp]._instanceName}
                                                   extension={fp}>{fp}</Select.Option>)}
                                </Select>
                                : <></>}
                              <Button type="primary" style={{width: '100%', marginTop: '5px'}}>В мои
                                книги</Button></>}/>
                    </PanelCard>)}
                  </div>
                </div>
              </Tabs.TabPane>) : <></>}
            </Tabs>
          </div>
        </Section>
      </Page>
    );
  }
}

export default injectIntl(DicBookCategoryCards)