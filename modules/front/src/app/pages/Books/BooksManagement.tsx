import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import BookInfo from "./BookInfo";
import DicBookCategoryCards from "./DicBookCategoryCards";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class BooksManagement extends React.Component<Props> {
  static PATH = "/book";
  static NEW_SUBPATH = "new";

  render() {
    const {entityId} = this.props.match.params;
    return (
      <>
        {entityId ? (
          <BookInfo entityId={entityId}/>
        ) : (
          <DicBookCategoryCards/>
        )}
      </>
    );
  }
}
