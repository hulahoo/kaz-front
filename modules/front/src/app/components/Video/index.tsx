import React from 'react';
import {getBlobUrl} from "../../util/util";
import {observer} from "mobx-react";
import {observable, runInAction} from "mobx";
import {Spin} from "antd";

type Props = {
  fileId: string
}

@observer
class Video extends React.Component<Props> {

  @observable
  blobUrl: string;

  render() {
    return (
      <Spin spinning={!this.blobUrl}>
        <video controls={true} src={this.blobUrl} style={{width: '100%', height: '100%'}}/>
      </Spin>
    );
  }

  componentDidMount(): void {
    getBlobUrl(this.props.fileId).then(blobUrl => {
      runInAction(() => {
        this.blobUrl = blobUrl;
      })
    });
  }
}

export default Video;