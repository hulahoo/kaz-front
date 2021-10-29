import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import ConcourseRequestAttachmentsEdit from "./ConcourseRequestAttachmentsEdit";
import ConcourseRequestAttachmentsList from "./ConcourseRequestAttachmentsList";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class ConcourseRequestAttachmentsManagement extends React.Component<
  Props
> {
  static PATH = "/concourseRequestAttachmentsManagement";
  static NEW_SUBPATH = "new";

  render() {
    const { entityId } = this.props.match.params;
    return (
      <>
        {/*{entityId ? (*/}
        {/*  <ConcourseRequestAttachmentsEdit entityId={entityId} />*/}
        {/*) : (*/}
        {/*  <ConcourseRequestAttachmentsList />*/}
        {/*)}*/}
      </>
    );
  }
}
