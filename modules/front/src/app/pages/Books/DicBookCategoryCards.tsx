import * as React from "react";
import {observer} from "mobx-react";
import {Icon, Select, Tabs} from "antd";
import {DicBookCategory} from "../../../cuba/entities/base/tsadv$DicBookCategory";
import Page from "../../hoc/PageContentHoc";
import {injectIntl, WrappedComponentProps} from "react-intl";
import PanelCard from "../../components/CourseCard";
import {Link} from "react-router-dom";
import {downloadFile, getBlobUrl} from "../../util/util";
import {queryCollection, QueryDataCollectionStore} from "../../util/QueryDataCollectionStore";
import {SerializedEntity} from "@cuba-platform/rest";
import {Book} from "../../../cuba/entities/base/tsadv$Book";
import Meta from "antd/es/card/Meta";
import ImageLogo from "../../components/ImageLogo";
import Section from "../../hoc/Section";
import {observable} from "mobx";

export const bookFileProperties = ["fb2", "epub", "mobi", "kf8", "pdf", "djvu"];

@observer
class DicBookCategoryCards extends React.Component<WrappedComponentProps> {

  @observable
  dataCollection: QueryDataCollectionStore<DicBookCategory>;

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

  selectBookHandler = (fileId: string, option: React.ReactElement<HTMLLIElement>) => {
    downloadFile(fileId, option.props["name"], option.props["extension"], this.props.intl.formatMessage({id: "book.download.error"}));
  };

  render() {
    if (!this.dataCollection || this.dataCollection.status === "LOADING") {
      return <Icon type="spin"/>;
    }

    const {status, items} = this.dataCollection;

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
                                                              <Link to={"/book/" + book.id} key={book.id}>
                                                                <ImageLogo
                                                                  className="panel-logo"
                                                                  type="promise"
                                                                  imgSrcProp={book.image ? getBlobUrl(book.image.id) : undefined}
                                                                  name={book.bookNameLang1!}/>
                                                              </Link>}>
                      <Meta title={(book as SerializedEntity<Book>)._instanceName}
                            description={<>
                              {bookFileProperties.find(fp => (book as {}).hasOwnProperty(fp)) != undefined
                                ? <Select placeholder={this.props.intl.formatMessage({id: "book.download"})}
                                          style={{width: '100%'}}
                                          onSelect={this.selectBookHandler}>
                                  {bookFileProperties.filter(fp => (book as {}).hasOwnProperty(fp)).map(fp =>
                                    // @ts-ignore
                                    <Select.Option key={book[fp].id!} name={book[fp]._instanceName}
                                                   extension={fp}>{fp}</Select.Option>)}
                                </Select>
                                : <></>}
                              {/*<Button type="primary" style={{width: '100%', marginTop: '5px'}}>В мои*/}
                              {/*  книги</Button>*/}
                            </>}/>
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


  componentDidMount(): void {
    this.dataCollection = queryCollection<DicBookCategory>(DicBookCategory.NAME, "books", {}, {
      loadImmediately: false
    });

    this.dataCollection.afterLoad = () => {
      this.dataCollection.items = this.dataCollection.items.map(category => {
        const newCategory = category;
        newCategory.books = category.books!.filter(b => b.active);
        return newCategory;
      }).filter(category => category.books!.length > 0)
    };

    this.dataCollection.load();
  }
}

export default injectIntl(DicBookCategoryCards)