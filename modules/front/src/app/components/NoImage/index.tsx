import React from 'react';

class NoImage extends React.Component {
  render() {
    return (
      <img className="no-image" alt={"no image"} src={require("../../../resources/img/no-image.svg")}/>
    );
  }
}

export default NoImage;