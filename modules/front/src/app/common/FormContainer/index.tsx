import React from 'react';

class FormContainer extends React.Component {
  render() {
    return (
      <div className={"form-container"} key={"form-container"}>
        {this.props.children}
      </div>
    );
  }
}

export default FormContainer;