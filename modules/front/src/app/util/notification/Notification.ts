import {ArgsProps} from "antd/es/notification";
import {notification} from "antd";

export default new class {
  error = (arg: ArgsProps) => {
    notification.open({...arg, className: "error-notification"})
  }

  info = (arg: ArgsProps) => {
    notification.info({...arg, className: "info-notification"})
  }

  success = (arg: ArgsProps) => {
    notification.open({...arg, className: "success-notification"})
  }
}