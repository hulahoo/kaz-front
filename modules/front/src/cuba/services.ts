import {FetchOptions} from "@cuba-platform/rest";
import {cubaREST} from "../index";
import {getCubaREST} from "@cuba-platform/react";

export const restServices = {
  userMenuService: {
    userMenuList: (params?: {}, fetchOpts?: FetchOptions) => {
      return getCubaREST()!.invokeService(
        "tsadv_UserMenuService",
        "userMenuList",
        {...params},
        fetchOpts
      );
    },
  }
};
