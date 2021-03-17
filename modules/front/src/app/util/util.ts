import {getCubaREST} from "@cuba-platform/react";
import Notification from "./Notification/Notification";
import {AbstractDictionary} from "../../cuba/entities/base/AbstractDictionary";
import {AbstractBprocRequest} from "../../cuba/entities/base/AbstractBprocRequest";
import {AssignedPerformancePlan} from "../../cuba/entities/base/tsadv$AssignedPerformancePlan";

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

export const dicValue = (dictionary: AbstractDictionary, lang: string) => {
  lang = lang.toLocaleLowerCase();
  switch (lang) {
    case "ru":
      return dictionary["langValue1"];
    case "en":
      return dictionary["langValue3"];
    case "kz":
      return dictionary["langValue2"];
  }
  return dictionary["langValue1"];
};

export const getBusinessKey = (request: AbstractBprocRequest) => {
  if (request instanceof AssignedPerformancePlan || request["_entityName"] === AssignedPerformancePlan.NAME)
    return request.id + "/" + request["stepStageStatus"];
  return request.id;
};

