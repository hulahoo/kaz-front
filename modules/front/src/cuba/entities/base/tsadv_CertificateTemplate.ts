import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicReceivingType } from "./tsadv_DicReceivingType";
import { DicCertificateType } from "./tsadv_DicCertificateType";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { DicLanguage } from "./tsadv$DicLanguage";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { Report } from "./report$Report";
export class CertificateTemplate extends AbstractParentEntity {
  static NAME = "tsadv_CertificateTemplate";
  receivingType?: DicReceivingType | null;
  certificateType?: DicCertificateType | null;
  organization?: OrganizationGroupExt | null;
  language?: DicLanguage | null;
  showSalary?: boolean | null;
  signer?: PersonGroupExt | null;
  report?: Report | null;
}
export type CertificateTemplateViewName = "_base" | "_local" | "_minimal";
export type CertificateTemplateView<
  V extends CertificateTemplateViewName
> = V extends "_base"
  ? Pick<
      CertificateTemplate,
      | "id"
      | "showSalary"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      CertificateTemplate,
      | "id"
      | "showSalary"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
