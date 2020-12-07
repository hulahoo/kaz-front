import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicCountry } from "./base$DicCountry";
import { DicRegion } from "./base$DicRegion";
import { DicCity } from "./base$DicCity";
import { DicCityDistrict } from "./base$DicCityDistrict";
export class AbstractCisAddress extends AbstractParentEntity {
  country?: DicCountry | null;
  region?: DicRegion | null;
  city?: DicCity | null;
  cityDistrict?: DicCityDistrict | null;
  street?: string | null;
  house?: string | null;
  apartment?: string | null;
  additionalInformationLang1?: string | null;
  additionalInformationLang2?: string | null;
  additionalInformationLang3?: string | null;
  additionalInformationLang4?: string | null;
  additionalInformationLang5?: string | null;
}
