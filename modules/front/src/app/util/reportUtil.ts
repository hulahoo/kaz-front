import {restServices} from "../../cuba/services";
import Notification from "./Notification/Notification";
import {IntlFormatters} from "react-intl";

export const downloadReport = (reportCode: string, entityId: string, fileName: string, entityParamName: string) => {
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

export const runReport = async (reportCode: string, params: any, intl: IntlFormatters) => {
  await restServices.reports.loadReportByCode(reportCode)
    .then(async report => {
      await restServices.reports.run(report.id,
        params,
        reason => Notification.error({
          message: intl.formatMessage({id: "management.editor.error"})
        })
      )
    }).catch(reason => {
      Notification.error({
        message: intl.formatMessage({id: "report.not.found"}, {
          reportCode: reportCode
        })
      })
    })
};