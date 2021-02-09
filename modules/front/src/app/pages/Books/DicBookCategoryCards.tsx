import * as React from "react";
import {observer} from "mobx-react";
import {Card, Icon} from "antd";
import {collection, EntityProperty} from "@cuba-platform/react";
import {DicBookCategory} from "../../../cuba/entities/base/tsadv$DicBookCategory";
import Page from "../../hoc/PageContentHoc";
import {injectIntl, WrappedComponentProps} from "react-intl";

@observer
class DicBookCategoryCards extends React.Component<WrappedComponentProps> {
  dataCollection = collection<DicBookCategory>(DicBookCategory.NAME, {
    view: "portal-books-category-browse",
    sort: "-updateTs"
  });
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

  render() {
    const {status, items} = this.dataCollection;

    if (status === "LOADING") {
      return <Icon type="spin"/>;
    }

    return (
      <Page pageName={this.props.intl.formatMessage({id: "menu.books"})}>
        <div className="narrow-layout">
          {items.map(e => (
            <Card
              title={e._instanceName}
              key={e.id}
              style={{marginBottom: "12px"}}
            >
              {this.fields.map(p => (
                <EntityProperty
                  entityName={DicBookCategory.NAME}
                  propertyName={p}
                  value={e[p]}
                  key={p}
                />
              ))}
            </Card>
          ))}
        </div>
      </Page>
    );
  }
}

export default injectIntl(DicBookCategoryCards)