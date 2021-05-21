import {restServices} from "../../cuba/services";

export const downloadReport = (reportCode: string, entityId: string, fileName: string, entityParamName:string) => {
  restServices.commonReportsService.downloadReportByCode({
    reportCode: reportCode,
    entityId: entityId,
    entityParamName: entityParamName
  }).then(report => {
    const link = document.createElement('a');
    link.href = `data:application/octet-stream;base64,${report.content}`;
    link.download = `${fileName}.${report.extension}`;
    link.click();
  });
};