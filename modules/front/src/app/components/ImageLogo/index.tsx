import React, {Component, ImgHTMLAttributes} from 'react';
import NoImage from "../NoImage";
import {observer} from "mobx-react";
import {observable} from "mobx";

export type ImageType = "base64" | "src" | "promise"

export type ImageLogoProps = {
  type?: ImageType
  imgSrc?: string
  imgSrcProp?: Promise<string>
  name?: string
}

@observer
class ImageLogo extends Component<ImageLogoProps & React.ImgHTMLAttributes<HTMLImageElement>> {

  @observable
  logo: string;

  render() {
    const {type, imgSrc, imgSrcProp, name, ...rest} = this.props;

    const img = (this.logo ? this.logo : imgSrc);
    return (
      <>
        {this.logo || imgSrc
          ? <img {...rest} alt={name}
                 src={this.props.type === 'base64' ? "data:image/png;base64, " + img : img}/>
          : <NoImage {...this.props}/>} </>
    );
  }

  componentDidMount(): void {
    if (this.props.type === 'promise' && this.props.imgSrcProp) {
      this.props.imgSrcProp.then(response => {
        this.logo = response;
      }).catch(() => {

      })
    }
  }
}

export default ImageLogo;