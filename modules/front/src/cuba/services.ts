import {FetchOptions} from "@cuba-platform/rest";
import {cubaREST} from "../index";
import {getCubaREST} from "@cuba-platform/react";

export const restServices = {
  userMenuService: {
    getTimeZones: (params?: {}, fetchOpts?: FetchOptions) => {
      return getCubaREST()!.invokeService(
        "krj_UserSettingService",
        "getTimeZones",
        {...params},
        fetchOpts
      );
    },
  }
};
