import { AbstractParentEntity } from "./AbstractParentEntity";
import { Dispatch } from "./base$Dispatch";
export class DispatchMessage extends AbstractParentEntity {
  static NAME = "base$DispatchMessage";
  dispatch?: Dispatch | null;
  code?: string | null;
}
export type DispatchMessageViewName = "_base" | "_local" | "_minimal";
export type DispatchMessageView<
  V extends DispatchMessageViewName
> = V extends "_base"
  ? Pick<
      DispatchMessage,
      | "id"
      | "dispatch"
      | "code"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      DispatchMessage,
      "id" | "code" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<DispatchMessage, "id" | "dispatch" | "code">
  : never;
