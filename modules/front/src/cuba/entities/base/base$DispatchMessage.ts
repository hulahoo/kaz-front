import { AbstractParentEntity } from "./AbstractParentEntity";
import { Dispatch } from "./base$Dispatch";
export class DispatchMessage extends AbstractParentEntity {
  static NAME = "base$DispatchMessage";
  dispatch?: Dispatch | null;
  code?: string | null;
}
export type DispatchMessageViewName = "_minimal" | "_local" | "_base";
export type DispatchMessageView<
  V extends DispatchMessageViewName
> = V extends "_minimal"
  ? Pick<DispatchMessage, "id" | "dispatch" | "code">
  : V extends "_local"
  ? Pick<
      DispatchMessage,
      "id" | "code" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      DispatchMessage,
      | "id"
      | "dispatch"
      | "code"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
