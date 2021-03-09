import React, {Component} from 'react';
import {Carousel, Icon} from "antd";
import {wrapSrcBase64} from "../../util/util";
import {observer} from "mobx-react";
import {NavLink} from "react-router-dom";

type ImageType = "base64" | "src"

export type SliderFile = {
  type: ImageType,
  src: string,
  url?: string
}

type CarouselProps = {
  images?: SliderFile[]
}

@observer
export default class extends Component<CarouselProps> {

  imagesCarousel: Carousel | null;

  render() {
    const imagesCarouselElements = this.props.images
      ? this.props.images.map((image) => {
        const imageContainer = <div className="main-menu-carousel-image-container">
          <img className="main-menu-carousel-image"
               src={image.type === "base64" ? wrapSrcBase64(image.src) : image.src}/>
        </div>;
        return image.url ? (<a href={image.url}>{imageContainer}</a>) : imageContainer
      })
      : null;

    const carouselNextArrow = (
      <Icon
        type="right"
        className="main-carousel-bottom-menu-arrow"
        onClick={() => this.imagesCarousel!.next()}
      />
    );
    const carouselPreviousArrow = (
      <Icon
        type="left"
        className="main-carousel-bottom-menu-arrow"
        onClick={() => this.imagesCarousel!.prev()}
      />);

    return (
      <div className={"items-carousel"}>
        <Carousel
          className="main-menu-carousel"
          infinite
          autoplay
          ref={prop => (this.imagesCarousel = prop)}
          dots={false}>
          {imagesCarouselElements}
        </Carousel>
        <div className={"carousel-bottom-menu"}>
          <div className="main-carousel-bottom-menu">
            {carouselPreviousArrow}
            {carouselNextArrow}
          </div>
        </div>
      </div>
    );
  }
}