import { getCubaREST } from "@cuba-platform/react";
import * as React from "react";

type ImageProps= {
    imageId:string,
}

type ImageState={
    imageUrl?: string
}

export class DownloadFile extends React.Component<ImageProps, ImageState> {
    state: ImageState = {
        imageUrl: ""
    }

    render(){
        return(<a href={this.state.imageUrl}>Request template</a>)
    }

    componentDidMount(){
        const getUrl = async (imageId:string) => {

           let urlPromise = getCubaREST()!.getFile(this.props.imageId)
            .then(function(blob:Blob){
                return(URL.createObjectURL(blob))
           });

           let url = await urlPromise;
           this.setState({imageUrl: url})
        }

        getUrl(this.props.imageId);
    }
}