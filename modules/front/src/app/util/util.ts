import {getCubaREST} from "@cuba-platform/react";
import Notification from "./Notification/Notification";
import {WindowProperty} from "../../cuba/entities/base/uactivity$WindowProperty";

export const getBlobUrl = (fileId: string) => {
  return getCubaREST()!.getFile(fileId).then(responseBlob => URL.createObjectURL(responseBlob))
};

export const downloadFile = (fileId: string, fileName: string, extension: string, fileNotFoundMessage: string) => {
  getCubaREST()!.getFile(fileId).then((value: Blob) => {
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(value);
    anchor.target = '_blank';
    anchor.download = fileName + '.' + extension;

    anchor.click();
  }).catch(() => {
    Notification.error({
      message: fileNotFoundMessage,
    })
  });
};

export const link = (entityName: string) => {
  const link = entityName!.substring(Math.max(entityName!.indexOf("$"), entityName!.indexOf("_")) + 1);
  return "/" + link.charAt(0).toLocaleLowerCase() + link.substring(1);
};

export const wrapSrcBase64 = (url: string) => {
  return "data:image/png;base64, " + url;
};