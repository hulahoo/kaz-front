import { getCubaREST } from "@cuba-platform/react";
import * as React from "react";

type ImageProps= {
    imageId:string,
}

type ImageState={
    imageUrl?: string
}

export class ConcourseImage extends React.Component<ImageProps, ImageState> {
    state: ImageState = {
        imageUrl: ""
    }

    render(){
        return(<img style={{float:"left",
                            width:"800px",
                            height:"400px",
                            objectFit: "cover",
                            borderRadius:"8px",
                            border:"2px solid black",
                            }}
                    src={this.state.imageUrl} alt="indisp."/>)
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