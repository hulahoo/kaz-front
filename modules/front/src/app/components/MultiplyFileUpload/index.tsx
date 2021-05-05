import React, {Component} from 'react';
import {FileUploadProps, getCubaREST} from "@cuba-platform/react";
import {WrappedComponentProps} from "react-intl";
import {message} from "antd";

class MultiplyFileUpload extends Component<FileUploadProps & WrappedComponentProps> {
  fileList = [];
  reactionDisposers = [];
  constructor() {
    super(...arguments);
    this.handlePreview = (_file) => {
      getCubaREST()!.getFile(this.fileList[0].uid).then((blob) => {
        const objectUrl = URL.createObjectURL(blob);
        const fileName = this.fileList[0].name;
        if (isImageFile(fileName)) {
          // Open image in a new tab
          window.open(objectUrl);
        }
        else {
          // Download file with correct filename
          const anchor = document.createElement('a');
          anchor.href = objectUrl;
          anchor.download = fileName;
          anchor.click();
        }
        URL.revokeObjectURL(objectUrl);
      });
    };
    this.handleRemove = (_file) => {
      this.fileList = [];
      if (this.props.onChange) {
        this.props.onChange(null);
      }
    };
  }
  componentDidMount() {
    this.reactionDisposers.push(reaction(() => this.props.value, () => {
      if (this.props.value) {
        this.fileList = [{
          uid: this.props.value.id,
          name: this.props.value.name,
          size: 0,
          type: '',
          url: '#',
        }];
      }
    }));
  }
  componentWillUnmount() {
    this.reactionDisposers.forEach(disposer => disposer());
  }
  render() {
    const defaultUploadProps = {
      action: getCubaREST().getFileUploadURL(),
      headers: { 'Authorization': 'Bearer ' + getCubaREST().restApiToken },
      fileList: this.fileList,
      onChange: this.handleChange,
      onPreview: this.handlePreview,
      onRemove: this.handleRemove,
      disabled: this.props.disabled,
      showUploadList: {
        showDownloadIcon: false,
        showPreviewIcon: true,
        showRemoveIcon: true,
      },
      className: this.props.enableFullWidth ? '_cuba-file-upload-full-width-enabled' : '',
    };
    const uploadProps = Object.assign({}, defaultUploadProps, this.props.uploadProps);
    return (createElement(Upload, Object.assign({}, uploadProps), this.props.render ? this.props.render(this.props.value) : createElement(FileUploadDropArea, { fileInfo: this.props.value })));
  }
  handleChange = (info:) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1); // Limit to a single file
    if (info.file.status === 'error') {
      message.error(this.props.intl.formatMessage({ id: 'cubaReact.fileUpload.uploadFailed' }));
    }
    if (info.file.status === 'done') {
      fileList[0].uid = info.file.response.id;
      fileList[0].url = '#';
      if (this.props.onChange) {
        this.props.onChange({
          id: info.file.response.id,
          name: info.file.response.name,
        });
      }
    }
    this.fileList = [...fileList];
  };

};

export default MultiplyFileUpload;