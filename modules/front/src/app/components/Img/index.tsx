import React, {HTMLAttributes} from 'react';
import NoImage from "../NoImage";

type Props = {
  isBase: boolean,
  src?: string,
  alt?: string,
}

class Img extends React.Component<Props & HTMLAttributes<HTMLImageElement>> {
  render() {
    const {isBase, src} = this.props;
    return src
      ? <img {...this.props} src={isBase ? ("data:image/png;base64, " + src) : src}/>
      : <NoImage/>;
  }
}

export default Img;