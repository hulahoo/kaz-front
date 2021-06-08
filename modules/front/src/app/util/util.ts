import {getCubaREST} from "@cuba-platform/react";
import Notification from "./Notification/Notification";
import {AbstractDictionary} from "../../cuba/entities/base/AbstractDictionary";
import {AbstractBprocRequest} from "../../cuba/entities/base/AbstractBprocRequest";
import {AssignedPerformancePlan} from "../../cuba/entities/base/tsadv$AssignedPerformancePlan";
import {PersonExt} from "../../cuba/entities/base/base$PersonExt";

export const getBlobUrl = (fileId: string): Promise<string> => {
  return getCubaREST()!.getFile(fileId).then(responseBlob => URL.createObjectURL(responseBlob));
};

export const getFileUrl = (fileId: string): string => {
  return `${getCubaREST()!.apiUrl}v2/files/${fileId}?access_token=${getCubaREST()!.restApiToken}`;
};

export const downloadFile = (fileId: string, fileName: string, extension: string, fileNotFoundMessage: string) => {
  return getCubaREST()!.getFile(fileId)
    .then(value => saveFile(value, `${fileName}.${extension}`))
    .catch(reason => {
      Notification.error({
        message: fileNotFoundMessage,
      });
      throw reason;
    });
};

export const saveFile = (value: Blob, fileNameWithExtension: string) => {
  const anchor = document.createElement('a');
  anchor.href = URL.createObjectURL(value);
  anchor.target = '_blank';
  anchor.download = fileNameWithExtension;

  anchor.click();
};

export const openPdfInNewTab = (fileId: string, fileName: string, fileNotFoundMessage: string) => {
  return getCubaREST()!.getFile(fileId)
    .then((value: Blob) => {
      const anchor = document.createElement('a');
      anchor.href = URL.createObjectURL(value);
      anchor.target = '_blank';
      anchor.name = fileName;

      anchor.click();
    }).catch(reason => {
      Notification.error({
        message: fileNotFoundMessage,
      });

      throw reason;
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

export const getFullName = (person: PersonExt, lang: string): string => {
  lang = lang.toLocaleLowerCase();
  if (lang === 'en') return person.lastNameLatin + ' ' + person.middleNameLatin + ' ' + person.firstNameLatin;
  return person.lastName + ' ' + person.middleName + ' ' + person.firstName;
};

export const catchException = (promise: Promise<any>): Promise<any> => {
  return promise.catch(async (response: any) => {
    const reader = response.response.body.getReader();

    let receivedLength = 0;
    let chunks = [];
    while (true) {
      const {done, value} = await reader.read();

      if (done) {
        break;
      }

      chunks.push(value);
      receivedLength += value.length;
    }

    let chunksAll = new Uint8Array(receivedLength);
    let position = 0;
    for (let chunk of chunks) {
      chunksAll.set(chunk, position);
      position += chunk.length;
    }

    let result = new TextDecoder("utf-8").decode(chunksAll);
    const parse = JSON.parse(result);
    throw new Error(parse.message);
  })
};

export const isNumber = (number: any): boolean => {
  return number !== undefined && number !== null && !isNaN(number);
}
