import * as React from "react";
import {createElement} from "react";
import {FileInfo} from "@cuba-platform/react/dist/ui/FileUpload";
import {UploadProps} from "antd/es/upload";
import {Icon, message, Upload} from "antd";
import {getCubaREST} from "@cuba-platform/react";
import {FormattedMessage} from "react-intl";
import {IReactionDisposer, reaction} from "mobx";

import "./style.less";
import {observer} from "mobx-react";

export type CustomFileUploadProps<E extends FileInfo | FileInfo[]> = {
  value?: E,
  onChange?: (arg: any) => void,
  enableFullWidth?: boolean,
  disabled?: boolean,
  uploadProps?: UploadProps,
  render?: (fileInfo: E | undefined) => React.ReactNode,
};

@observer
export class MultiFileUpload<E extends FileInfo | FileInfo[]> extends React.Component<CustomFileUploadProps<E>> {

  fileList: any[];
  reactionDisposer: IReactionDisposer;
  handleChange: (info: any) => void;
  handlePreview: (info: any) => void;
  handleRemove: (info: any) => void;
  onChange: any;

  constructor() {
    // @ts-ignore
    super(...arguments);
    this.fileList = [];
    this.onChange = this.props.onChange;
    this.handleChange = (info) => {
      let fileList = [...info.fileList];
      if (info.file.status === 'error') {
        // @ts-ignore
        message.error(this.props.intl.formatMessage({id: 'cubaReact.fileUpload.uploadFailed'}));
      }
      if (info.file.status === 'done') {
        fileList[0].uid = info.file.response.id;
        fileList[0].url = '#';

        if (this.onChange) {
          this.onChange(this.getDoneList());
        }
      }
      fileList.filter(newFile => !this.fileList.find(file => file.uid === newFile.uid
        || (file.response && newFile.response && newFile.response.id === file.response.id)))
        .forEach(newFile => this.fileList.push(newFile));
    };
    this.handlePreview = (_file) => {

      // console.log(_file);

      // const file = this.fileList.find(value => value.uid === _file.id) || this.fileList[0];
      getCubaREST()!.getFile(_file.uid).then((blob) => {
        const objectUrl = URL.createObjectURL(blob);
        const fileName = _file.name;

        if (isImageFile(fileName)) {
          // Open image in a new tab
          window.open(objectUrl);
        } else {
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
      this.fileList.splice(this.fileList.indexOf(_file), 1);

      if (this.onChange) {
        this.onChange(this.getDoneList());
      }
    };
  }

  getDoneList = () => {
    return this.fileList.filter(value => value.status === 'done')
      .map(value => value.response)
      .map(response => {
        return {
          id: response.id,
          name: response.name,
        }
      });
  }

  componentDidMount() {
    this.reactionDisposer = reaction(() => this.props.value, (item) => {
      this.initFileList(this.props.value);
    });
  }

  initFileList = (value?: E) => {
    const parser = (fileInfo: FileInfo) => {
      return {
        uid: fileInfo.id,
        name: fileInfo.name,
        status: 'done',
        response: {
          id: fileInfo.id,
          name: fileInfo.name,
        },
        size: 0,
        type: '',
        url: '#',
      }
    }
    if (value) {
      this.fileList = Array.isArray(value)
        ? value.map(parser)
        : value ? [parser(value as FileInfo)] : []
    }
  }

  componentWillUnmount() {
    this.reactionDisposer();
  }

  render() {
    const defaultUploadProps = {
      action: getCubaREST()!.getFileUploadURL(),
      headers: {'Authorization': 'Bearer ' + getCubaREST()!.restApiToken},
      fileList: this.fileList,
      onChange: this.handleChange,
      onPreview: this.handlePreview,
      onRemove: this.handleRemove,
      disabled: this.props.disabled,
      multiple: true,
      showUploadList: {
        showDownloadIcon: false,
        showPreviewIcon: true,
        showRemoveIcon: true,
      },
      className: this.props.enableFullWidth !== false ? '_cuba-file-upload-full-width-enabled' : '',
    };
    const uploadProps = Object.assign({}, defaultUploadProps, this.props.uploadProps);
    return (createElement(Upload, Object.assign({}, uploadProps), this.props.render ? this.props.render(this.props.value) :
      <CustomFileUploadDropArea fileInfo={this.props.value} disabled={this.props.disabled}/>));
  }
}

function isImageFile(fileName: string) {
  return !!fileName.match('.*(jpg|jpeg|gif|png)$');
}

class CustomFileUploadDropArea<E extends FileInfo | FileInfo[]> extends React.Component<{ fileInfo?: E, disabled?: boolean }> {
  render() {
    // if (this.props.disabled) return <></>;
    return (
      (Array.isArray(this.props.fileInfo) && this.props.fileInfo.length === 0 || !this.props.fileInfo)
        ? (createElement("div", {className: 'cuba-file-drop-area'},
        createElement(Icon, {className: 'replaceicon', type: 'upload'}),
        createElement("span", {className: 'replacetext'},
          createElement(FormattedMessage, {id: 'cubaReact.fileUpload.replace'}))))
        : (createElement("div", {className: 'cuba-file-drop-area'},
        createElement(Icon, {className: 'uploadicon', type: 'upload'}),
        createElement("div", {className: 'uploadtext'},
          createElement(FormattedMessage, {id: 'cubaReact.fileUpload.upload'}))))
      // )
    );
  }
}