import {getCubaREST} from "@cuba-platform/react";
import Notification from "./notification/Notification";
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

export const link = (windowProperty: WindowProperty) => {
  let entityName = windowProperty.entityName!;
  entityName = entityName.substring(Math.max(entityName!.indexOf("$"), entityName!.indexOf("_")) + 1);
  return entityName.charAt(0).toLocaleLowerCase() + entityName.substring(1);
};