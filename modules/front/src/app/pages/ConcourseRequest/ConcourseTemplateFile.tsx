import { getCubaREST } from "@cuba-platform/react";
import * as React from "react";
import { FormattedMessage } from "react-intl";

type FileProps= {
  FileId:string,
}

type FileState={
  FileUrl?: string
}

export class ConcourseFile extends React.Component<FileProps, FileState> {
  state: FileState = {
    FileUrl: ""
  }

  render(){
    return(<a href={this.state.FileUrl} target={"_blank"} rel={"noreferrer noopener"} ><FormattedMessage id={"download"}/></a>)
  }

  componentDidMount(){
    const getUrl = async (FileId:string) => {

      let urlPromise = getCubaREST()!.getFile(FileId)
        .then(function(blob:Blob){
          return(URL.createObjectURL(blob))
        });

      let url = await urlPromise;
      this.setState({FileUrl: url})
    }

    getUrl(this.props.FileId);
  }
}